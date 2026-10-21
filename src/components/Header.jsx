import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { href: '#siga-butchery', label: 'Fresh Butchery', title: 'Fresh Butchery & Siga (ስጋ)' },
  { href: '#departments', label: 'Injera & Aisles', title: 'Fresh Injera & Market Aisles' },
  { href: '#delivery-service', label: 'Delivery Van', title: 'Las Vegas Delivery Service' },
  { href: '#reviews', label: 'Celebrity Reviews', title: 'Celebrity & Community Reviews' },
  { href: '#schedule', label: 'Schedule', title: 'Daily Drop Schedule' },
  { href: '#visit', label: 'Visit Us', title: 'Location & Hours' },
];

export const Header = ({ onOpenVendorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-22 gap-2 sm:gap-4">
          
          {/* Logo Section with User's Official Emblem */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            aria-label="Yenat Market Home"
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 2xl:h-13 2xl:w-13 rounded-xl bg-white border border-stone-200 shadow-2xs p-1 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-sm">
              <img
                src="/yenat-logo-cropped.png"
                alt="Yenat Market Logo"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1 font-display text-base sm:text-lg 2xl:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                <span>YENAT</span>
                <span className="text-amber-600">MARKET</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                <span className="font-semibold text-amber-800">የእናት ገበያ</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500 hidden sm:inline">Suite 102 · Las Vegas</span>
                <span className="text-stone-500 sm:hidden">Vegas</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1.5 px-1 2xl:px-2"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                title={link.title}
                className="rounded-lg px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            {/* Quick 1-Tap Mobile Action: WhatsApp (visible only on mobile) */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-2xs active:scale-95 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Quick 1-Tap Mobile Action: Call (visible only on mobile) */}
            <a
              href={STORE_INFO.phoneClean}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-stone-200 text-stone-800 shadow-2xs active:scale-95 transition-all"
              aria-label="Call Yenat Market"
            >
              <Phone className="w-4 h-4 text-amber-700" />
            </a>

            {/* Tablet & Desktop WhatsApp Link */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 2xl:px-3 py-2 text-xs font-semibold shadow-2xs transition-colors whitespace-nowrap shrink-0"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">WhatsApp</span>
            </a>

            {/* Wholesale / Catering Modal (Visible on tablet & desktop) */}
            <button
              type="button"
              onClick={onOpenVendorModal}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-amber-400 hover:bg-amber-300 px-3 py-2 text-xs font-bold text-stone-900 shadow-2xs transition-colors active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span className="hidden xl:inline 2xl:hidden">Wholesale</span>
              <span className="inline xl:hidden 2xl:inline">Wholesale & Ceremonies</span>
            </button>

            {/* Direct Phone Call (Always completely visible on tablet & desktop, never cut off) */}
            <a
              href={STORE_INFO.phoneClean}
              className="hidden md:inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 hover:border-amber-400 bg-white px-2.5 2xl:px-3 py-2 text-xs font-bold text-stone-800 shadow-2xs transition-colors whitespace-nowrap shrink-0"
              title={`Call Yenat Market Front Desk: ${STORE_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden rounded-xl p-2 text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/80 sm:border-0 transition-colors shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-stone-950/60 backdrop-blur-xs xl:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="relative z-40 xl:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 pt-4 pb-6 shadow-2xl max-h-[min(85vh,36rem)] overflow-y-auto">
            {/* Live Store Status Banner */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-100/80 border border-amber-200/80 text-xs font-semibold text-amber-950 mb-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open Daily 10 AM – 12 AM Midnight</span>
              </div>
              <span className="text-[11px] text-amber-900 font-bold bg-amber-200/70 px-2 py-0.5 rounded">
                Suite 102
              </span>
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-medium text-stone-700" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-900 hover:bg-white active:bg-amber-100/70 border border-transparent hover:border-stone-200 transition-all flex items-center justify-between min-h-[48px]"
                >
                  <span className="font-display">{link.title}</span>
                  <span className="text-amber-800 text-sm">→</span>
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2.5 border-t border-stone-200 pt-4">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full min-h-[46px] rounded-xl bg-emerald-600 active:bg-emerald-500 px-4 py-3 text-center text-xs font-bold text-white shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp ({STORE_INFO.phone})</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onOpenVendorModal();
                }}
                className="w-full min-h-[46px] rounded-xl bg-amber-400 active:bg-amber-300 px-4 py-3 text-center text-xs font-bold text-stone-900 shadow-xs transition-all"
              >
                Wholesale & Ceremony Catering Inquiries
              </button>

              <a
                href={STORE_INFO.phoneClean}
                className="w-full min-h-[44px] rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-center text-xs font-semibold text-stone-800 flex items-center justify-center gap-2 shadow-2xs"
              >
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
