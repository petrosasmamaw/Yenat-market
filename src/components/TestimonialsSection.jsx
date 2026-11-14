import { TESTIMONIALS } from '../data/marketData.js';
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="border-b border-gold-300/15 surface-quiet py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-berbere-300">
            <span>Community Trust & Voices</span>
            <span aria-hidden="true" className="text-sand">·</span>
            <span>የደንበኞች ምስክርነት</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl md:text-4xl text-gold-gradient">
            Trusted by Las Vegas Home Cooks, Caterers & Chefs
          </h2>
          <p className="mt-2 text-sm text-sand sm:text-base">
            Real feedback from the Southern Nevada culinary community who rely on Yenat Market every week.
          </p>
          <p className="mt-2 text-[11px] font-medium text-sand-muted md:hidden">Swipe to read more →</p>
        </div>

        <div className="mt-8 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex min-h-full w-[min(88vw,20rem)] shrink-0 snap-center flex-col justify-between space-y-5 rounded-2xl border border-gold-300/15 bg-forest-900 p-6 sm:w-[20rem] md:min-w-0 md:w-auto md:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-300" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-sand italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="border-t border-gold-300/15 pt-4">
                <div className="font-display text-sm font-bold text-cream">{t.name}</div>
                <div className="mt-0.5 text-xs text-sand-muted">{t.role} · {t.location}</div>
                <div className="mt-2 rounded-md border border-gold-200/50 bg-gold-400/10 p-2 text-[11px] font-medium text-gold-300">
                  <span className="text-sand-muted">Weekly staple: </span>
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
