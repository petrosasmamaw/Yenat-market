import React from 'react';
import { STORE_INFO } from '../data/marketData';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        <div className="flex items-center gap-2 tracking-wide font-normal">
          <span>{STORE_INFO.fullAddress}</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="text-amber-400 font-medium">Daily 8:30 AM – 9:00 PM</span>
          <span aria-hidden="true" className="hidden sm:inline text-stone-500">·</span>
          <span className="hidden sm:inline text-stone-300">Fresh Teff Injera Batches 7:30 AM & 2:00 PM</span>
        </div>
        <div className="flex items-center gap-4 text-stone-300">
          <a
            href={STORE_INFO.phoneClean}
            className="hover:text-amber-400 transition-colors font-medium underline underline-offset-2 decoration-stone-600"
          >
            Direct: {STORE_INFO.phone}
          </a>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Directions (Tropicana Ave)
          </a>
        </div>
      </div>
    </div>
  );
};
