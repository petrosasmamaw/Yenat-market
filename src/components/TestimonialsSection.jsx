import { TESTIMONIALS } from '../data/marketData.js';
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="border-b border-stone-200 bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>Community Trust & Voices</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>የደንበኞች ምስክርነት</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 [text-wrap:balance] sm:text-3xl md:text-4xl">
            Trusted by Las Vegas Home Cooks, Caterers & Chefs
          </h2>
          <p className="mt-2 text-sm text-stone-600 sm:text-base">
            Real feedback from the Southern Nevada culinary community who rely on Yenat Market every week.
          </p>
          <p className="mt-2 text-[11px] font-medium text-stone-400 md:hidden">Swipe to read more →</p>
        </div>

        <div className="mt-8 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex min-h-full w-[min(88vw,20rem)] shrink-0 snap-center flex-col justify-between space-y-5 rounded-2xl border border-stone-200/90 bg-[#FAF7F2] p-6 sm:w-[20rem] md:min-w-0 md:w-auto md:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-stone-700 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="border-t border-stone-200/80 pt-4">
                <div className="font-display text-sm font-bold text-stone-900">{t.name}</div>
                <div className="mt-0.5 text-xs text-stone-500">{t.role} · {t.location}</div>
                <div className="mt-2 rounded-md border border-amber-200/50 bg-amber-50/80 p-2 text-[11px] font-medium text-amber-900">
                  <span className="text-stone-500">Weekly staple: </span>
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
