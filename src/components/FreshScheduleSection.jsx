import { useState } from 'react';
import { SCHEDULE_DAYS, STORE_INFO } from '../data/marketData.js';
import { Clock, CheckCircle2 } from 'lucide-react';

export const FreshScheduleSection = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const activeSchedule = SCHEDULE_DAYS[selectedDayIdx];

  return (
    <section id="schedule" className="border-b border-stone-200 bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
            <span>Peak Freshness Timetable</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>የእለቱ ፕሮግራም</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 [text-wrap:balance] sm:text-3xl md:text-4xl">
            When to Catch Our Warmest Batches in Las Vegas
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            We believe true quality happens on schedule. From steaming morning injera directly off our griddles 
            to morning deliveries of fresh kitfo-grade beef, plan your visit for the freshest experience.
          </p>
        </div>

        {/* Interactive Schedule Selector */}
        {/* Interactive Schedule Selector: 2-Column on Tablet & Desktop */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:mt-10 md:grid-cols-12 md:gap-6 lg:gap-8">
          {/* Mobile: horizontal day picker with fade hint */}
          <div className="relative md:hidden -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
              {SCHEDULE_DAYS.map((sched, idx) => (
                <button
                  key={`mobile-${sched.day}`}
                  type="button"
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`min-w-[9.5rem] shrink-0 snap-start rounded-xl border px-3.5 py-3 text-left transition-all min-h-[50px] ${
                    selectedDayIdx === idx
                      ? 'border-amber-800/40 bg-[#FAF7F2] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  <div className={`text-xs font-bold font-display ${selectedDayIdx === idx ? 'text-stone-900' : 'text-stone-700'}`}>
                    {sched.day.split(' ')[0]}
                  </div>
                  <div className="mt-1 text-[10px] text-stone-500">{sched.badge}</div>
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute right-4 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent" />
          </div>

          {/* Tablet & Desktop: vertical day list */}
          <div className="hidden md:col-span-4 md:block md:space-y-2">
            {SCHEDULE_DAYS.map((sched, idx) => (
              <button
                key={sched.day}
                onClick={() => setSelectedDayIdx(idx)}
                className={`w-full text-left p-3.5 lg:p-4 rounded-xl border transition-all flex items-start justify-between ${
                  selectedDayIdx === idx
                    ? 'bg-[#FAF7F2] border-amber-800/40 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300 text-stone-600'
                }`}
              >
                <div>
                  <div className={`text-sm font-bold font-display ${selectedDayIdx === idx ? 'text-stone-900' : 'text-stone-700'}`}>
                    {sched.day}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>{sched.time}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                  selectedDayIdx === idx ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-600'
                }`}>
                  {sched.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Schedule Showcase Card (8 cols on Tablet & Desktop) */}
          <div className="space-y-4 sm:space-y-5 rounded-2xl border border-stone-200/90 bg-[#FAF7F2] p-4 sm:p-6 lg:p-8 md:col-span-8">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                  {activeSchedule.day} Schedule
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-stone-900 sm:text-2xl">
                  {activeSchedule.title}
                </h3>
              </div>

              <div className="text-xs font-medium text-stone-700 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Peak Drop Time: {activeSchedule.time}</span>
              </div>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {activeSchedule.description}
            </p>

            {/* Checklist of what's ready */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-medium">100% Teff & Blend Injera:</strong>
                  <div className="text-stone-500 mt-0.5">Warm rolls packaged in 5 & 10 pack bundles</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-medium">Dedicated Meat Cutting:</strong>
                  <div className="text-stone-500 mt-0.5">Custom trim for Kitfo (raw or lebleb) and Tibs</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-medium">Spices by Weight:</strong>
                  <div className="text-stone-500 mt-0.5">Stone-ground Berbere, Mitmita, Shiro scoops</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-medium">Green Coffee Beans:</strong>
                  <div className="text-stone-500 mt-0.5">Yirgacheffe & Sidama raw sacks ready for roasting</div>
                </div>
              </div>
            </div>

            {/* Timetable footer */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-stone-500">
                Need to hold an order for pickup? Call our desk ahead of time.
              </div>
              <a
                href={STORE_INFO.phoneClean}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-2.5 text-center text-xs font-semibold text-stone-900 active:bg-amber-300 sm:w-auto sm:bg-transparent sm:py-0 sm:font-semibold sm:text-inherit sm:underline sm:underline-offset-4 hover:text-amber-800"
              >
                Call front counter: {STORE_INFO.phone}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
