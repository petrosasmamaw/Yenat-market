import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Phone, Clock, Heart, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer = ({ onOpenVendorModal }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-14 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-16 md:pb-16 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-1 border border-stone-700 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src="/yenat-logo-cropped.png"
                  alt="Yenat Market Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5 font-display text-xl font-extrabold text-white tracking-tight">
                  <span>YENAT</span>
                  <span className="text-amber-500">MARKET</span>
                </div>
                <span className="text-xs text-amber-400 font-display font-semibold">የእናት ገበያ · Las Vegas</span>
              </div>
            </div>
            
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Las Vegas’ authentic Ethiopian marketplace, fresh custom butchery, and daily bakery. 
              Offering custom-cut meats by the kilo, fresh daily teff injera, stone-ground spices, cold beverages, and city-wide van delivery.
            </p>

            <div className="pt-2 text-stone-400 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={STORE_INFO.phoneClean} className="hover:text-white transition-colors">
                  Call: {STORE_INFO.phone}
                </a>
                <span className="text-stone-600">·</span>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors">
                  {STORE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-medium">{STORE_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Butchery & Aisles
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#siga-butchery" className="hover:text-white transition-colors">
                  100% Grass-Fed Ox, Sheep & Goat (ስጋ)
                </a>
              </li>
              <li>
                <a href="#siga-butchery" className="hover:text-white transition-colors">
                  Ye Tibs, Ye Tire, Ye Kitfo & Ye Chkna
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Daily 100% Pure Teff Injera & Ambasha
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Stone-Ground Berbere, Mitmita & Shiro
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition-colors">
                  Heineken, Habesha Beers & Honey Wine
                </a>
              </li>
              <li>
                <a href="#delivery-service" className="hover:text-white transition-colors">
                  Las Vegas Delivery Van Service
                </a>
              </li>
            </ul>
          </div>

          {/* Wholesale & Commercial (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Catering & Commercial
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Wedding & Holiday Ceremony Meat Supply
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Live Meat Roasting Service (የጥብስ ዝግጅት)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Restaurant Wholesale Teff, Meat & Spices
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Celebrity Video Reviews (Helen Berhe, Biniyam)
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Daily Drop Timetable (Open until 12 AM)
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods & Coordinates (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Accepted Payments
            </div>
            <div className="space-y-1.5 text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <span className="text-emerald-400 font-bold">✓</span> Cash & In-Store
              </div>
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <span className="text-emerald-400 font-bold">✓</span> Debit & Credit Cards
              </div>
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <span className="text-emerald-400 font-bold">✓</span> MasterCard & Visa
              </div>
              <div className="flex items-center gap-1.5 text-blue-300 font-medium">
                <span className="text-blue-400 font-bold">✓</span> EBT / SNAP Cards
              </div>
              <div className="flex items-center gap-1.5 text-purple-300 font-medium">
                <span className="text-purple-400 font-bold">✓</span> Zelle: {STORE_INFO.zelleNumber}
              </div>
            </div>

            <div className="pt-3">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
              >
                Directions to Suite 102 →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Yenat Market LLC. All rights reserved.</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span>4780 West Tropicana Ave. Suite 102, Las Vegas, NV 89103</span>
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
