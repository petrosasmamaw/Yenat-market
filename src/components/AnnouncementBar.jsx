import { Clock, MapPin, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

export const AnnouncementBar = () => {
  return (
    <div className="w-full border-b border-stone-800 bg-stone-900 text-stone-200">
      {/* Mobile: compact strip + thumb-friendly actions */}
      <div className="mx-auto max-w-7xl px-4 py-3 sm:hidden">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-400">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Open daily · 8:30 AM – 9:00 PM</span>
        </div>
        <p className="mt-1 text-center text-[11px] leading-snug text-stone-400">
          Fresh teff injera · 7:30 AM & 2:00 PM
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={STORE_INFO.phoneClean}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-stone-800 px-3 text-xs font-semibold text-white active:bg-stone-700"
          >
            <Phone className="h-4 w-4 text-amber-400" aria-hidden />
            Call store
          </a>
          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-stone-600 bg-stone-900 px-3 text-xs font-semibold text-stone-100 active:bg-stone-800"
          >
            <MapPin className="h-4 w-4 text-amber-400" aria-hidden />
            Directions
          </a>
        </div>
      </div>

      {/* Tablet / desktop */}
      <div className="mx-auto hidden max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-xs sm:flex sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-normal tracking-wide">
          <span>{STORE_INFO.fullAddress}</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="font-medium text-amber-400">Daily 8:30 AM – 9:00 PM</span>
          <span aria-hidden="true" className="hidden md:inline text-stone-500">·</span>
          <span className="hidden md:inline text-stone-300">
            Fresh Teff Injera Batches 7:30 AM & 2:00 PM
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-300">
          <a
            href={STORE_INFO.phoneClean}
            className="font-medium underline decoration-stone-600 underline-offset-2 transition-colors hover:text-amber-400"
          >
            Direct: {STORE_INFO.phone}
          </a>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-amber-400"
          >
            Directions (Tropicana Ave)
          </a>
        </div>
      </div>
    </div>
  );
};
