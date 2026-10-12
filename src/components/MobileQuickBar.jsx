import { Phone, MapPin, ShoppingBag } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

export const MobileQuickBar = () => {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-stone-200/90 bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(28,25,23,0.08)]"
      aria-label="Quick actions"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-1 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href="#departments"
          className="flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-semibold text-stone-800 active:bg-stone-200/60"
        >
          <ShoppingBag className="h-5 w-5 text-amber-800" aria-hidden />
          Shop
        </a>
        <a
          href={STORE_INFO.phoneClean}
          className="flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-semibold text-stone-800 active:bg-stone-200/60"
        >
          <Phone className="h-5 w-5 text-amber-800" aria-hidden />
          Call
        </a>
        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-amber-400 py-2.5 text-[11px] font-semibold text-stone-900 active:bg-amber-300"
        >
          <MapPin className="h-5 w-5" aria-hidden />
          Visit
        </a>
      </div>
    </div>
  );
};
