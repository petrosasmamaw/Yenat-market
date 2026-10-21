import { Phone, MapPin, ShoppingBag, MessageCircle, Flame } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

export const MobileQuickBar = () => {
  return (
    <aside
      className="md:hidden fixed bottom-2.5 inset-x-3 z-40 mx-auto max-w-md"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-4 gap-1 p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_-5px_rgba(28,25,23,0.16),0_0_0_1px_rgba(28,25,23,0.06)] pb-[max(0.35rem,env(safe-area-inset-bottom))]">
        <a
          href="#siga-butchery"
          className="flex min-h-[50px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold text-stone-800 active:scale-95 active:bg-amber-100/70 transition-all"
        >
          <Flame className="h-4.5 w-4.5 text-amber-600" aria-hidden />
          <span className="leading-none">Meat (ስጋ)</span>
        </a>

        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[50px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold text-emerald-800 active:scale-95 active:bg-emerald-100/70 transition-all"
        >
          <MessageCircle className="h-4.5 w-4.5 text-emerald-600" aria-hidden />
          <span className="leading-none">WhatsApp</span>
        </a>

        <a
          href={STORE_INFO.phoneClean}
          className="flex min-h-[50px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold text-stone-800 active:scale-95 active:bg-stone-200/70 transition-all"
        >
          <Phone className="h-4.5 w-4.5 text-amber-800" aria-hidden />
          <span className="leading-none">Call</span>
        </a>

        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[50px] flex-col items-center justify-center gap-1 rounded-xl bg-amber-400 py-1.5 text-[11px] font-extrabold text-stone-950 shadow-xs active:scale-95 active:bg-amber-300 transition-all"
        >
          <MapPin className="h-4.5 w-4.5" aria-hidden />
          <span className="leading-none">Visit GPS</span>
        </a>
      </div>
    </aside>
  );
};
