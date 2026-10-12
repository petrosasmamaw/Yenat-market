import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';

export const Footer = ({ onOpenVendorModal }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-16 md:pb-16 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-display text-white tracking-tight">
                YENAT MARKET
              </span>
              <span className="text-xs text-amber-400 font-display">የእናት ገበያ</span>
            </div>
            
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Las Vegas’ premier Ethiopian grocery, bakery, and butcher shop. 
              Honoring centuries of East African culinary tradition with daily fresh teff injera, stone-ground spices, and genuine community hospitality.
            </p>

            <div className="pt-2 text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{STORE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={STORE_INFO.phoneClean} className="hover:text-white transition-colors">
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{STORE_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Market Aisles
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Fresh 100% Teff Injera & Ambasha
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Stone-Ground Berbere & Mitmita
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Custom Kitfo & Tibs Butchery
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Green Yirgacheffe & Sidama Coffee
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Handcrafted Jebena Pots & Mesob
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial & Vendors (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Commercial & Vendors
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Wholesale Restaurant Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Retail Shelf Space for Food Brands
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Bulk Teff & Spice Standing Orders
                </button>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Fresh Daily Drops Schedule
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">
                  Loading & Pickup Access
                </a>
              </li>
            </ul>
          </div>

          {/* Visit Coordinates (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Visit Us
            </div>
            <div className="space-y-2 text-stone-400">
              <div>4780 W Tropicana Ave</div>
              <div>Las Vegas, NV 89103</div>
              <div className="pt-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md text-xs font-medium transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Yenat Market. All rights reserved.</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Las Vegas, Nevada</span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with love for Ethiopian culinary tradition</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
