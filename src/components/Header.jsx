import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#departments', label: 'Aisles', title: 'Market Aisles' },
  { href: '#heritage', label: 'Heritage', title: 'Our Heritage' },
  { href: '#schedule', label: 'Fresh', title: 'Fresh Drops' },
  { href: '#coffee-ceremony', label: 'Coffee', title: 'Coffee Ritual' },
  { href: '#vendors', label: 'Vendors', title: 'For Vendors & Wholesale' },
  { href: '#visit', label: 'Visit', title: 'Location & Hours' },
];

export const Header = ({ onOpenVendorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] 2xl:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-4 h-[4.5rem] sm:h-20">
          {/* Logo — Amharic only when menu mode (more horizontal room) */}
          <a
            href="/"
            className="relative z-10 flex min-w-0 items-baseline gap-2 font-display text-lg font-bold tracking-tight text-stone-900 sm:text-xl 2xl:text-2xl hover:opacity-90 transition-opacity"
          >
            <span className="truncate">YENAT MARKET</span>
            <span className="hidden text-sm font-normal tracking-normal text-amber-800/80 sm:inline 2xl:hidden">
              የእናት ገበያ
            </span>
          </a>

          {/* Desktop nav — only when there is enough room inside max-w-7xl */}
          <nav
            className="hidden 2xl:flex min-w-0 items-center justify-center gap-1 px-2"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                title={link.title}
                className="rounded-md px-2.5 py-1.5 text-sm font-medium text-stone-600 whitespace-nowrap hover:bg-stone-100 hover:text-stone-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onOpenVendorModal}
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-amber-400 px-3 py-2 text-xs font-semibold text-stone-900 shadow-xs transition-colors hover:bg-amber-300 active:scale-[0.98] whitespace-nowrap"
            >
              <span className="hidden min-[90rem]:inline">Vendor & Wholesale Inquiries</span>
              <span className="min-[90rem]:hidden">Wholesale</span>
            </button>
            <a
              href={STORE_INFO.phoneClean}
              className="hidden md:inline-flex items-center justify-center rounded-md border border-stone-300 px-2.5 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900 whitespace-nowrap"
            >
              {STORE_INFO.phone}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden rounded-md p-2 text-stone-700 hover:bg-stone-100 hover:text-stone-900"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-stone-950/50 2xl:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="relative z-40 2xl:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 pt-2 pb-6 shadow-lg max-h-[min(70vh,28rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-0.5 text-sm font-medium text-stone-700" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-base text-stone-900 active:bg-stone-100"
              >
                {link.title}
              </a>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-2 border-t border-stone-200 pt-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenVendorModal();
              }}
              className="w-full rounded-md bg-amber-400 px-4 py-2.5 text-center text-xs font-semibold text-stone-900 shadow-xs"
            >
              Vendor & Wholesale Inquiries
            </button>
            <a
              href={STORE_INFO.phoneClean}
              className="w-full rounded-md border border-stone-300 px-4 py-2 text-center text-xs font-medium text-stone-800"
            >
              Call Store: {STORE_INFO.phone}
            </a>
          </div>
        </div>
        </>
      )}
    </header>
  );
};
