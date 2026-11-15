import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_INFO } from '../data/marketData.js';
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '#siga-butchery', label: 'Fresh Butchery', title: 'Fresh Butchery & Siga (ስጋ)' },
  { href: '#departments', label: 'Injera & Aisles', title: 'Fresh Injera & Market Aisles' },
  { href: '#delivery-service', label: 'Delivery Van', title: 'Las Vegas Delivery Service' },
  { href: '#reviews', label: 'Celebrity Reviews', title: 'Celebrity & Community Reviews' },
  { href: '#schedule', label: 'Schedule', title: 'Daily Drop Schedule' },
  { href: '#visit', label: 'Visit Us', title: 'Location & Hours' },
];

const EASE = [0.16, 1, 0.3, 1];

/** Logo lockup rebuilt for dark ground: leaf-green cart · gold YENAT · red — MARKET — */
export const BrandLockup = ({ compact = false }) => (
  <span className="flex items-center gap-2.5">
    <img
      src="/yenat-cart-on-dark.png"
      alt=""
      className={`w-auto select-none transition-all duration-300 group-hover:-translate-x-0.5 ${compact ? 'h-8' : 'h-9'}`}
      loading="eager"
    />
    <span className="flex flex-col items-center leading-none">
      <span className="font-display text-[23px] font-extrabold tracking-[0.03em] text-gold-400">YENAT</span>
      <span className="mt-[3px] flex w-full items-center gap-1.5 font-display text-[8.5px] font-bold tracking-[0.34em] text-berbere-400">
        <span className="h-[1.5px] flex-1 rounded-full bg-berbere-400" aria-hidden />
        <span className="-mr-[0.34em]">MARKET</span>
        <span className="h-[1.5px] flex-1 rounded-full bg-berbere-400" aria-hidden />
      </span>
    </span>
  </span>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');

  // Compact header after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`theme-dark sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-line bg-forest-950/85 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.9)] backdrop-blur-xl'
          : 'border-transparent bg-forest-900'
      }`}
    >
      <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-[60px]' : 'h-[68px]'}`}>
        {/* Brand */}
        <a href="/" className="group flex shrink-0 items-center gap-3" aria-label="Yenat Market Home">
          <BrandLockup compact={scrolled} />
          <span className="ml-1 hidden h-8 w-px bg-line-strong sm:block xl:hidden 2xl:block" aria-hidden />
          <span className="hidden leading-tight sm:block xl:hidden 2xl:block">
            <span className="amharic block text-[14px] font-semibold text-ink">የእናት ገበያ</span>
            <span className="block text-[11.5px] text-muted">Suite 102 · Las Vegas</span>
          </span>
        </a>

        {/* Desktop nav — the active link carries a sliding gold pill */}
        <nav className="hidden items-center rounded-full border border-line bg-forest-950/40 p-1 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                title={link.title}
                aria-current={active ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-300 ${
                  active ? 'text-forest-950' : 'text-body hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full bg-berbere-600 text-teff-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-berbere-500"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
          <a href={STORE_INFO.phoneClean} className="btn btn-gold btn-sm hidden md:inline-flex" title={`Call Yenat Market: ${STORE_INFO.phone}`}>
            <Phone className="h-4 w-4" />
            {STORE_INFO.phone}
          </a>
          <a href={STORE_INFO.phoneClean} className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-forest-950 md:hidden" aria-label="Call Yenat Market">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-gold-400 xl:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu — portalled so the blurred header can never clip it */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-dark fixed inset-0 z-50 xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="glow-night flex h-full flex-col overflow-y-auto">
              <div className="container-x flex h-[68px] shrink-0 items-center justify-between border-b border-line">
                <span className="font-display text-[18px] font-extrabold tracking-[0.05em]">
                  <span className="text-gold-400">YENAT</span> <span className="text-berbere-400">MARKET</span>
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="container-x flex-1 py-6">
                <div className="theme-gold band-gold mb-5 flex items-center justify-between rounded-2xl px-4 py-3 text-[13px]">
                  <span className="flex items-center gap-2 font-bold text-ink">
                    <span className="h-2 w-2 rounded-full bg-forest-500" />
                    Open Daily 10 AM – 12 AM Midnight
                  </span>
                  <span className="font-extrabold text-spice">Suite 102</span>
                </div>

                <nav aria-label="Mobile navigation">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="group flex items-center gap-4 border-b border-line py-[1.05rem]"
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease: EASE }}
                    >
                      <span className="font-display text-[13px] font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 font-display text-[21px] font-semibold leading-tight tracking-[-0.015em] text-ink">{link.title}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:rotate-45 group-hover:text-gold-400" />
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-7 grid gap-3">
                  <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={close} className="btn btn-red w-full">
                    <MessageCircle className="h-4 w-4" />
                    Message on WhatsApp ({STORE_INFO.phone})
                  </a>
                  <a href={STORE_INFO.phoneClean} className="btn btn-gold w-full">
                    <Phone className="h-4 w-4" />
                    Call Store: {STORE_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="tibeb shrink-0" aria-hidden />
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </header>
  );
};
