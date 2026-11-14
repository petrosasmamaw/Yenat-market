import { useState, useEffect } from 'react';
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
      className={`theme-light sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-teff-50/95 shadow-[0_12px_30px_-20px_rgb(4_23_13/0.55)] backdrop-blur-md' : 'bg-teff-50'
      }`}
    >
      <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
        {/* Brand: cart mark + wordmark (same lettering as the logo) */}
        <a href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Yenat Market Home">
          <img
            src="/yenat-cart-mark.png"
            alt=""
            className={`w-auto select-none transition-all duration-300 group-hover:-translate-x-0.5 ${scrolled ? 'h-8' : 'h-9'}`}
            loading="eager"
          />
          <span className="flex flex-col items-center leading-none">
            <span className="text-[22px] font-extrabold tracking-[0.04em] text-[#C98E05]">YENAT</span>
            <span className="mt-[3px] flex w-full items-center gap-1.5 text-[8.5px] font-extrabold tracking-[0.34em] text-berbere-600">
              <span className="h-[1.5px] flex-1 rounded-full bg-berbere-600" aria-hidden />
              <span className="-mr-[0.34em]">MARKET</span>
              <span className="h-[1.5px] flex-1 rounded-full bg-berbere-600" aria-hidden />
            </span>
          </span>
          <span className="ml-2 hidden h-8 w-px bg-line sm:block xl:hidden 2xl:block" aria-hidden />
          <span className="hidden leading-tight sm:block xl:hidden 2xl:block">
            <span className="amharic block text-[14px] font-semibold text-ink">የእናት ገበያ</span>
            <span className="block text-[11.5px] text-muted">Suite 102 · Las Vegas</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                title={link.title}
                aria-current={active ? 'true' : undefined}
                className={`group relative px-3 py-2 text-[14px] font-semibold transition-colors ${active ? 'text-ink' : 'text-body hover:text-ink'}`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-berbere-600 transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
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
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-berbere-600 transition-colors hover:border-berbere-600 hover:bg-panel-2"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
          <a href={STORE_INFO.phoneClean} className="btn btn-primary btn-sm hidden md:inline-flex" title={`Call Yenat Market: ${STORE_INFO.phone}`}>
            <Phone className="h-4 w-4" />
            {STORE_INFO.phone}
          </a>
          <a href={STORE_INFO.phoneClean} className="grid h-10 w-10 place-items-center rounded-full bg-forest-500 text-teff-50 md:hidden" aria-label="Call Yenat Market">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-forest-500 xl:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="tibeb-thin" aria-hidden />

      {/* Mobile / tablet menu */}
      {open && (
        <div className="theme-dark fixed inset-0 z-50 xl:hidden animate-fade-in" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="forest-deep h-full overflow-y-auto">
            <div className="container-x flex h-16 items-center justify-between border-b border-line">
              <span className="text-[17px] font-extrabold tracking-[0.06em]">
                <span className="text-gold-400">YENAT</span> <span className="text-berbere-300">MARKET</span>
              </span>
              <button
                type="button"
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-x py-6">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-line px-4 py-3 text-[13px]">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-gold-400" />
                  Open Daily 10 AM – 12 AM Midnight
                </span>
                <span className="font-bold text-accent">Suite 102</span>
              </div>

              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="group flex items-center gap-4 border-b border-line py-4"
                  >
                    <span className="font-display text-sm text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-display text-[22px] font-semibold text-ink">{link.title}</span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:rotate-45 group-hover:text-gold-400" />
                  </a>
                ))}
              </nav>

              <div className="mt-6 grid gap-3">
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
          </div>
        </div>
      )}
    </header>
  );
};
