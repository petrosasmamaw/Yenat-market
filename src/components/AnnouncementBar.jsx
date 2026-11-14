import { Clock, Phone, MessageCircle, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

const Dot = () => <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold-500/70" />;

export const AnnouncementBar = () => {
  return (
    <div className="theme-dark w-full bg-forest-950 text-[12.5px] text-body">
      {/* Mobile: one clean line — hours + call + WhatsApp */}
      <div className="container-x flex h-9 items-center justify-between gap-3 sm:hidden">
        <span className="flex items-center gap-1.5 font-semibold text-accent">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          Daily 10 AM – 12 AM
        </span>
        <div className="flex items-center gap-3">
          <a href={STORE_INFO.phoneClean} className="flex items-center gap-1 font-semibold text-ink">
            <Phone className="h-3 w-3 text-accent" aria-hidden />
            (702) 240-8222
          </a>
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-accent"
          >
            <MessageCircle className="h-3 w-3" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Tablet & desktop: one line */}
      <div className="container-x hidden h-10 items-center justify-between gap-6 whitespace-nowrap sm:flex">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
            {STORE_INFO.address}, Las Vegas NV 89103
          </span>
          <Dot />
          <span className="flex items-center gap-1.5 font-semibold text-accent">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Open Daily 10:00 AM – 12:00 AM (Midnight)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href={STORE_INFO.phoneClean} className="transition-colors hover:text-ink">
            Phone: <span className="font-semibold text-ink">{STORE_INFO.phone}</span>
          </a>
          <Dot />
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-gold-300"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp
          </a>
          <Dot />
          <span className="hidden md:inline">
            Zelle: <span className="font-semibold text-ink tabular-nums">{STORE_INFO.zelleNumber}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
