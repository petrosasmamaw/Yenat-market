import { STORE_INFO } from '../data/marketData.js';
import { Clock, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const FreshScheduleSection = () => {
  return (
    <section id="schedule" className="border-b border-stone-200 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Schedule Banner */}
        <div className="relative rounded-3xl bg-stone-900 text-white p-6 sm:p-8 md:p-10 overflow-hidden shadow-lg border border-stone-800">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left: Hours & Headline */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Daily · 10:00 AM – 12:00 AM Midnight</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                All-Day Fresh Butchery, Warm Injera & Valley-Wide Delivery
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed">
                We are open every single day from 10:00 AM until midnight. Stop in for fresh 100% grass-fed meat custom-trimmed for kitfo and tibs, steaming teff injera baked continuously, stone-ground berbere, and cold Habesha beer.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-stone-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Fresh Butchery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-stone-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Warm Teff Injera</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-stone-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Delivery Van</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-stone-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Spices & Coffee</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Call & Action CTA */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Order Pickup & Delivery Hold
                </div>
                <div className="text-white font-display text-lg sm:text-xl font-bold mt-1">
                  Need a custom meat order ready?
                </div>
                <p className="text-stone-300 text-xs mt-1">
                  Call our front counter ahead of time to hold fresh cuts, catering injera bundles, or ceremony whole lamb.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={STORE_INFO.phoneClean}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {STORE_INFO.phone}</span>
                </a>
              </div>

              <div className="text-[11px] text-stone-400 text-center sm:text-left">
                {STORE_INFO.fullAddress} · Free Front Lot Parking
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
