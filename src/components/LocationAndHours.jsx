import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Clock, Phone, Navigation, Copy, Check, Car, ExternalLink } from 'lucide-react';

export const LocationAndHours = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="border-b border-stone-200 bg-[#FAF7F2] py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Essential Coordinates (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
                <span>Find Us in Las Vegas</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>አድራሻና የስራ ሰዓት</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
                Plan Your Visit to Yenat Market
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Located on West Tropicana Avenue with convenient access from the Strip, I-15, and the 215 Beltway. 
                Spacious parking and friendly staff ready to guide your selection.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Physical Address</div>
                    <div className="text-lg font-bold text-stone-900 font-display mt-0.5">{STORE_INFO.name}</div>
                    <div className="text-sm text-stone-700">{STORE_INFO.fullAddress}</div>
                    <div className="text-xs text-stone-500 mt-1">{STORE_INFO.landmarks}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={STORE_INFO.phoneClean}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-800" />
                  <span>Call {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Store Hours</div>
                  <div className="text-base font-bold text-stone-900 font-display mt-0.5">
                    Open 7 Days a Week: 8:30 AM – 9:00 PM
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-600 space-y-1.5 border-t border-stone-100">
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span>Monday – Thursday</span>
                  <span className="font-semibold text-stone-900">8:30 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span>Friday – Saturday</span>
                  <span className="font-semibold text-stone-900">8:30 AM – 9:00 PM (Fresh Ambasha & Weekend Feasts)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="font-semibold text-stone-900">8:30 AM – 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Parking & Accessibility */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-stone-700 flex items-start gap-3">
              <Car className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950 font-semibold">Free Customer & Commercial Parking:</strong>
                <p className="text-stone-600 mt-0.5">
                  Spacious open lot directly facing the market entrance. Easy drive-up staging for wholesale orders and restaurant crate pickups.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Map Presentation & Interactive Guide (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Styled Map Container */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              
              {/* Visual simulated street representation */}
              <div className="relative h-52 overflow-hidden bg-stone-100 sm:h-64 md:h-72">
                <iframe
                  title="Yenat Market Location"
                  src="https://maps.google.com/maps?q=4780+W+Tropicana+Ave,+Las+Vegas,+NV+89103&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] grayscale-[0.2]"
                  loading="lazy"
                />
              </div>

              {/* Map Footer Information */}
              <div className="p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-stone-900 font-display">4780 W Tropicana Ave</div>
                  <div className="text-stone-500">Cross-street: W Tropicana Ave & S Decatur Blvd</div>
                </div>

                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-800 font-semibold hover:text-amber-900 underline underline-offset-4"
                >
                  Get GPS Turn-by-Turn →
                </a>
              </div>

            </div>

            {/* Transit & Area Proximity Guide */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 font-display text-base">8 Min</div>
                <div className="text-stone-500 mt-0.5">From Las Vegas Strip</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 font-display text-base">5 Min</div>
                <div className="text-stone-500 mt-0.5">From I-15 Tropicana Exit</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 font-display text-base">Free</div>
                <div className="text-stone-500 mt-0.5">Surface Lot Parking</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
