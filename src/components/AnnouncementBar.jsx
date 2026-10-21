import { Clock, Phone, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

export const AnnouncementBar = () => {
  return (
    <div className="w-full border-b border-stone-800 bg-stone-950 text-stone-200">
      {/* Mobile: clean single-line bar with phone & WhatsApp */}
      <div className="mx-auto max-w-7xl px-4 py-2 text-[11px] sm:hidden flex items-center justify-between gap-2 whitespace-nowrap overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Daily 10 AM – 12 AM</span>
        </div>
        <div className="flex items-center gap-2.5 text-stone-300">
          <a href={STORE_INFO.phoneClean} className="font-semibold text-white flex items-center gap-1">
            <Phone className="h-3 w-3 text-amber-400" />
            <span>(702) 240-8222</span>
          </a>
          <span className="text-stone-600">·</span>
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-semibold flex items-center gap-1"
          >
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Desktop & Tablet: Strictly ONE Clean Line */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-2 text-xs sm:flex sm:px-6 lg:px-8 whitespace-nowrap overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 text-stone-300">
          <span className="font-medium text-stone-200">{STORE_INFO.address}, Las Vegas NV 89103</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="font-bold text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Open Daily 10:00 AM – 12:00 AM (Midnight)</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-stone-300">
          <a
            href={STORE_INFO.phoneClean}
            className="font-medium text-stone-200 hover:text-amber-400 transition-colors"
          >
            Phone: {STORE_INFO.phone}
          </a>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-purple-300 font-mono font-medium">
            Zelle: {STORE_INFO.zelleNumber}
          </span>
        </div>
      </div>
    </div>
  );
};
