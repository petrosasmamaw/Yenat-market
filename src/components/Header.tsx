import React, { useState } from 'react';
import { STORE_INFO } from '../data/marketData';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenVendorModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVendorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Bar strictly conforming to the 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="flex items-baseline gap-2 text-2xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span>YENAT MARKET</span>
            <span className="text-sm font-normal text-amber-800/80 tracking-normal hidden sm:inline">
              የእናት ገበያ
            </span>
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#departments"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Market Aisles
            </a>
            <a
              href="#heritage"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Our Heritage
            </a>
            <a
              href="#schedule"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Fresh Drops
            </a>
            <a
              href="#coffee-ceremony"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Coffee Ritual
            </a>
            <a
              href="#vendors"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              For Vendors & Wholesale
            </a>
            <a
              href="#visit"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Location & Hours
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenVendorModal}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
            >
              Vendor & Wholesale Inquiries
            </button>
            <a
              href={STORE_INFO.phoneClean}
              className="hidden md:inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 hover:border-stone-400 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              (702) 240-8222
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <a
              href="#departments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              Market Aisles & Goods
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              Our Heritage ('Yenat')
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              Fresh Daily Schedule
            </a>
            <a
              href="#coffee-ceremony"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              Coffee Ritual & Ceremony
            </a>
            <a
              href="#vendors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              For Vendors & Wholesale Buyers
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 text-stone-900"
            >
              Store Location & Hours
            </a>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVendorModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 rounded-md shadow-xs"
            >
              Vendor & Wholesale Inquiries
            </button>
            <a
              href={STORE_INFO.phoneClean}
              className="w-full text-center px-4 py-2 text-xs font-medium text-stone-800 border border-stone-300 rounded-md"
            >
              Call Store: (702) 240-8222
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
