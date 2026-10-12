import React from 'react';
import { TESTIMONIALS } from '../data/marketData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
            <span>Community Trust & Voices</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>የደንበኞች ምስክርነት</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display mt-2 [text-wrap:balance]">
            Trusted by Las Vegas Home Cooks, Caterers & Chefs
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Real feedback from the Southern Nevada culinary community who rely on Yenat Market every week.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-[#FAF7F2] border border-stone-200/90 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* 5 stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="font-bold text-stone-900 text-sm font-display">{t.name}</div>
                <div className="text-xs text-stone-500 mt-0.5">{t.role} · {t.location}</div>
                <div className="mt-2 text-[11px] text-amber-900 font-medium bg-amber-50/80 p-2 rounded-md border border-amber-200/50">
                  <span className="text-stone-500">Weekly Staple: </span>
                  {t.favoriteItem}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
