import React from 'react';
import { STORE_INFO } from '../data/marketData';
import { ArrowDown, Sparkles, MapPin, Clock, Phone, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenVendorModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVendorModal }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-stone-200">
      {/* Background warm grain texture accent */}
      <div className="absolute inset-0 bg-radial from-amber-50/60 via-transparent to-transparent pointer-events-none opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker without pill border */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span className="font-display">የእናት ገበያ</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Mother’s Market · Las Vegas, Nevada</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 font-normal">Est. 2012</span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 font-display leading-[1.08] [text-wrap:balance]">
              The Heart of Ethiopian Flavor & Heritage in Las Vegas
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              From <strong className="text-stone-900 font-medium">100% pure teff injera</strong> baked hot every sunrise to 
              stone-ground mountain berbere, custom kitfo butchery, and ceremonial highland coffee. 
              Supplying Southern Nevada home cooks, premier chefs, and trusted wholesale vendor partners with authentic East African goods.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#departments"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Explore Market Aisles</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenVendorModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-all shadow-2xs active:scale-[0.99]"
              >
                <span>Vendor & Wholesale Inquiries</span>
              </button>
            </div>

            {/* Trust and Location Evidence Bar */}
            <div className="pt-6 border-t border-stone-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>Tropicana Ave</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">8 min from LV Strip</div>
                </div>

                <div>
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Injera Twice Daily</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">7:30 AM & 2:00 PM</div>
                </div>

                <div>
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Custom Butchery</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">Lean Kitfo & Tibs Cuts</div>
                </div>

                <div>
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Open 7 Days</span>
                  </div>
                  <div className="text-stone-500 mt-0.5">8:30 AM – 9:00 PM</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Anchor (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/90">
              <img
                src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Ethiopian Beyaynetu feast served on fresh teff injera"
                className="w-full h-[430px] object-cover hover:scale-[1.02] transition-transform duration-700"
                loading="eager"
              />

              {/* Measured Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Overlaid Authentic Information Card */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-xl bg-stone-900/85 backdrop-blur-md border border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                      Fresh Today in Las Vegas
                    </div>
                    <div className="text-base font-semibold text-white mt-0.5 font-display">
                      Daily 100% Teff Injera & Stone-Ground Berbere
                    </div>
                    <p className="text-xs text-stone-300 mt-1 leading-normal">
                      Naturally fermented 3-day starter. Sourced directly from Ethiopian highland grower cooperatives.
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-300 font-medium">In Store Now</span>
                    <span aria-hidden="true">·</span>
                    <span>Aisle 1 & Bakery Counter</span>
                  </div>
                  <a
                    href={STORE_INFO.phoneClean}
                    className="text-amber-300 hover:text-white underline underline-offset-2 flex items-center gap-1 font-medium"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Store</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Small floating authentic card */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-stone-200 shadow-md text-xs max-w-[200px]">
              <div className="text-amber-800 font-semibold font-display">Wholesale Partner</div>
              <div className="text-stone-600 mt-0.5">Supplying 20+ Las Vegas dining & catering partners</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
