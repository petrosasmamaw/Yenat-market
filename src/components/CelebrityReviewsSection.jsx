import { useState, useEffect } from 'react';
import { CELEBRITY_REVIEWS, STORE_INFO } from '../data/marketData.js';
import { Star, Play, X, Video, BadgeCheck, Store, Quote } from 'lucide-react';

const FALLBACK = {
  'helen-berhe': '/celebrities/helen_berhe.jpg',
  'biniyam-shibre': '/celebrities/biniyam_shibre.jpg',
};

const STORE_FACTS = [
  { value: '10 AM – 12 AM', label: 'Open Daily until Midnight' },
  { value: 'Free Parking', label: 'Spacious Front Lot' },
  { value: 'Suite 102', label: 'W Tropicana & Decatur' },
];

export const CelebrityReviewsSection = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="reviews" className="theme-light grain section relative">
      <div className="container-x">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="num">04</span>
            Celebrity &amp; Community Endorsements
          </p>
          <p className="amharic mt-2 text-sm font-semibold text-accent">የታዋቂ ሰዎች ምስክርነት</p>
          <h2 className="h-section mt-4">
            Loved by Ethiopian Celebrities, <span className="accent-italic">Cultural Icons</span> &amp; Local Chefs
          </h2>
          <p className="lead mx-auto mt-5 max-w-2xl">
            When renowned artists, cultural icons, and community leaders visit Las Vegas, Yenat Market is their premier stop
            for genuine Ethiopian culinary heritage, pure grass-fed meat, and warm hospitality.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {CELEBRITY_REVIEWS.map((celeb) => (
            <article key={celeb.id} className="card group flex flex-col overflow-hidden">
              <button
                type="button"
                onClick={() => setSelected(celeb)}
                className="relative block aspect-[4/3] overflow-hidden bg-forest-900 text-left"
                aria-label={`Play review video from ${celeb.name}`}
              >
                <img
                  src={celeb.image}
                  alt={`${celeb.name} at Yenat Market Las Vegas`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  onError={(e) => FALLBACK[celeb.id] && (e.currentTarget.src = FALLBACK[celeb.id])}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.06em] text-forest-950">
                  <Video className="h-3.5 w-3.5" />
                  {celeb.videoBadge}
                </span>
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teff-50/95 text-berbere-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                <span className="theme-dark absolute inset-x-5 bottom-4">
                  <span className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    {celeb.name}
                    <BadgeCheck className="h-5 w-5 text-gold-400" />
                  </span>
                  <span className="amharic block text-[13px] text-gold-300">{celeb.amharicName}</span>
                  <span className="block text-[12.5px] text-body">{celeb.title}</span>
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 fill-teff-200 text-teff-200" aria-hidden />
                </div>
                <blockquote className="mt-4 text-[1.05rem] font-medium leading-[1.65] text-ink">
                  &ldquo;{celeb.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
                  <div className="text-[13px]">
                    <span className="block text-muted">Celebrity Favorite:</span>
                    <span className="font-bold text-ink">{celeb.favoriteProduct}</span>
                  </div>
                  <button type="button" onClick={() => setSelected(celeb)} className="btn btn-ghost btn-sm shrink-0">
                    <Play className="h-3.5 w-3.5 fill-current text-spice" />
                    Watch
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Store atmosphere */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -bottom-3 -left-3 hidden h-full w-full rounded-[30px] border border-gold-500/50 sm:block" aria-hidden />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-forest-900">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/f_auto,q_auto,w_1200/v1792350716/yenat_market/store/inside_yenat_market_store.jpg"
                alt="Inside Yenat Market Ethiopian grocery shelves and fresh butchery counter in Las Vegas"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest-950/80 px-3 py-1.5 text-[12px] font-semibold text-teff-50 backdrop-blur-sm">
                <Store className="h-3.5 w-3.5 text-gold-300" />
                Inside Our Las Vegas Store
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow">Warm Ethiopian Hospitality</p>
            <h3 className="mt-4 font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.1] text-ink">
              &ldquo;A Home Away from Home <span className="accent-italic">in Las Vegas</span>&rdquo;
            </h3>
            <p className="lead mt-5">
              Step inside Yenat Market and breathe in the comforting aromas of freshly roasted Yirgacheffe coffee beans,
              stone-ground berbere, and warm sourdough teff injera. Whether you are stocking your family pantry for the month,
              picking up custom-cut kitfo beef for a weekend gathering, or dropping by late at night before 12 AM midnight —
              our friendly staff welcomes you with genuine Ethiopian warmth.
            </p>
            <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
              {STORE_FACTS.map(({ value, label }) => (
                <div key={value} className="px-3 py-5 first:pl-0 sm:px-5">
                  <dt className="font-display text-lg font-semibold text-ink sm:text-xl">{value}</dt>
                  <dd className="mt-1 text-[12.5px] text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {selected && (
        <div
          className="theme-dark fixed inset-0 z-50 flex items-center justify-center bg-forest-950/85 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} video review`}
        >
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[24px] border border-line bg-forest-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <span className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-ink">
                <Video className="h-4 w-4 text-accent" />
                {selected.name} <span className="amharic text-sm text-accent">({selected.amharicName})</span> — Review &amp; Visit
              </span>
              <button onClick={() => setSelected(null)} className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink hover:border-gold-400" aria-label="Close video player">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex aspect-video flex-col items-center justify-center bg-forest-950 p-6 text-center">
              <img src={selected.image} alt={selected.name} className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="relative z-10 max-w-md space-y-3">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-forest-950">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
                <h4 className="font-display text-xl font-semibold text-ink">{selected.name}&apos;s Video Review at Yenat Market</h4>
                <p className="text-[13px] text-body">{selected.quote}</p>
                <span className="inline-block rounded-full border border-line px-3 py-1 text-[11.5px] font-medium text-accent">
                  User video upload slot ready · Contact store for media inquiries
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-[13px]">
              <span className="text-muted">Official store visit · 4780 W Tropicana Ave Suite 102, Las Vegas</span>
              <a href={STORE_INFO.phoneClean} className="btn btn-gold btn-sm">Call Front Counter</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
