import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Copy,
  Check,
  Car,
  ExternalLink,
  MessageCircle,
  Zap,
} from 'lucide-react';

export const LocationAndHours = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="border-b border-stone-200 bg-[#FAF7F2] py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Grid on Tablet & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Column: Essential Coordinates (6 cols on Tablet & Desktop) */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
                <span>Find Us in Las Vegas</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>አድራሻና የስራ ሰዓት</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
                Plan Your Visit to Yenat Market
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
                Conveniently located at <strong>4780 West Tropicana Ave. Suite 102</strong>, just 8 minutes west of the 
                Las Vegas Strip near Decatur Blvd. We are open every day from <strong>10:00 AM until 12:00 AM Midnight</strong>!
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Physical Store Location</div>
                    <div className="text-lg sm:text-xl font-extrabold text-stone-900 font-display mt-0.5">{STORE_INFO.name}</div>
                    <div className="text-xs sm:text-sm font-semibold text-stone-800">{STORE_INFO.address}</div>
                    <div className="text-xs sm:text-sm text-stone-600">{STORE_INFO.city}, {STORE_INFO.state} {STORE_INFO.zip}</div>
                    <div className="text-[11px] text-amber-800 font-medium mt-1">{STORE_INFO.landmarks}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons: Thumb-friendly 2-col on Mobile, Inline on Tablet & Desktop */}
              <div className="pt-3 border-t border-stone-100">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-2xs text-center active:scale-[0.98]"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3 opacity-60 hidden sm:inline" />
                  </a>

                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-2xs text-center active:scale-[0.98]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={STORE_INFO.phoneClean}
                    className="col-span-2 sm:col-span-1 inline-flex min-h-[42px] sm:min-h-0 items-center justify-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center active:scale-[0.98]"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-800" />
                    <span>Call Store: {STORE_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card (10 AM - 12 AM All Days) */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Store Hours</div>
                    <div className="text-base sm:text-lg font-bold text-stone-900 font-display mt-0.5">
                      Open Every Day: 10:00 AM – 12:00 AM (Midnight)
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold">
                  Open Late Daily
                </span>
              </div>

              <div className="pt-2 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-800">Monday – Thursday</span>
                  <span className="font-bold text-stone-900">10:00 AM – 12:00 AM Midnight</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-800">Friday – Saturday (Weekend Butchery & Fresh Ambasha)</span>
                  <span className="font-bold text-stone-900">10:00 AM – 12:00 AM Midnight</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-stone-800">Sunday (Coffee Ritual & Groceries)</span>
                  <span className="font-bold text-stone-900">10:00 AM – 12:00 AM Midnight</span>
                </div>
              </div>
            </div>

            {/* Parking & Accessibility */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-stone-700 flex items-start gap-3">
              <Car className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950 font-bold">Free Customer & Commercial Parking:</strong>
                <p className="text-stone-600 mt-0.5">
                  Large open surface parking lot directly facing Suite 102. Easy drive-up staging for wholesale orders and restaurant crate pickups.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Google Map Presentation (6 cols on Tablet & Desktop) */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Styled Map Container */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              
              {/* Map embed */}
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-stone-100">
                <iframe
                  title="Yenat Market Location at 4780 West Tropicana Ave Suite 102"
                  src="https://maps.google.com/maps?q=4780+West+Tropicana+Ave+Suite+102,+Las+Vegas,+NV+89103&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Map Footer Information */}
              <div className="p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-extrabold text-stone-900 font-display text-sm">4780 West Tropicana Ave. Suite 102</div>
                  <div className="text-stone-500">Cross-street: W Tropicana Ave & S Decatur Blvd · Las Vegas, NV 89103</div>
                </div>

                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-colors shadow-2xs"
                >
                  Open in Google Maps →
                </a>
              </div>

            </div>

            {/* Transit & Area Proximity Guide */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200">
                <div className="font-extrabold text-stone-900 font-display text-lg">8 Min</div>
                <div className="text-stone-500 mt-0.5">From Las Vegas Strip</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200">
                <div className="font-extrabold text-stone-900 font-display text-lg">5 Min</div>
                <div className="text-stone-500 mt-0.5">From I-15 Tropicana Exit</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200">
                <div className="font-extrabold text-stone-900 font-display text-lg">Suite 102</div>
                <div className="text-stone-500 mt-0.5">Spacious Front Parking</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
