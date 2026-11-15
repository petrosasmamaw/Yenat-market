import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CELEBRITY_REVIEWS, STORE_INFO } from '../data/marketData.js';
import { Star, Play, X, Video, BadgeCheck, Store, Quote } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

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
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="reviews" className="theme-dark surface glow-dark section">
      <div className="container-x">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="num">04</span>
            Celebrity &amp; Community Endorsements
          </p>
          <p className="amharic mt-3 text-[15px] font-semibold text-accent">የታዋቂ ሰዎች ምስክርነት</p>
          <h2 className="h-section mt-4">
            Loved by Ethiopian Celebrities, <span className="accent-italic">Cultural Icons</span> &amp; Local Chefs
          </h2>
          <p className="lead mx-auto mt-5 max-w-2xl">
            When renowned artists, cultural icons, and community leaders visit Las Vegas, Yenat Market is their premier stop
            for genuine Ethiopian culinary heritage, pure grass-fed meat, and warm hospitality.
          </p>
        </Reveal>

        {/* Testimonial cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
          {CELEBRITY_REVIEWS.map((celeb, i) => (
            <Reveal as="article" key={celeb.id} delay={i * 0.1} className="card group flex flex-col overflow-hidden">
              <button
                type="button"
                onClick={() => setSelected(celeb)}
                className="relative block aspect-[4/3] overflow-hidden bg-forest-950 text-left"
                aria-label={`Play review video from ${celeb.name}`}
              >
                <img
                  src={celeb.image}
                  alt={`${celeb.name} at Yenat Market Las Vegas`}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  loading="lazy"
                  onError={(e) => FALLBACK[celeb.id] && (e.currentTarget.src = FALLBACK[celeb.id])}
                />
                <span className="photo-shade absolute inset-0" />
                <span className="badge badge-gold absolute left-4 top-4 px-3 py-1.5">
                  <Video className="h-3.5 w-3.5" />
                  {celeb.videoBadge}
                </span>
                <span className="pulse-ring absolute left-1/2 top-[42%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-forest-950 transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                <span className="absolute inset-x-5 bottom-4">
                  <span className="flex items-center gap-2 font-display text-[1.35rem] font-semibold tracking-[-0.015em] text-ink">
                    {celeb.name}
                    <BadgeCheck className="h-5 w-5 text-gold-400" />
                  </span>
                  <span className="amharic block text-[13.5px] font-medium text-gold-300">{celeb.amharicName}</span>
                  <span className="mt-0.5 block text-[12.5px] text-body">{celeb.title}</span>
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="h-[18px] w-[18px] fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="h-9 w-9 fill-berbere-600 text-berbere-600" aria-hidden />
                </div>
                <blockquote className="mt-5 text-[1.0625rem] font-medium leading-[1.7] text-ink">
                  &ldquo;{celeb.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div className="border-l-2 border-gold-400 pl-3 text-[13px]">
                    <span className="block text-muted">Celebrity Favorite:</span>
                    <span className="mt-0.5 block font-bold text-ink">{celeb.favoriteProduct}</span>
                  </div>
                  <button type="button" onClick={() => setSelected(celeb)} className="btn btn-ghost btn-sm shrink-0">
                    <Play className="h-3.5 w-3.5 fill-current text-accent" />
                    Watch
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Store atmosphere */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -bottom-3 -left-3 hidden h-full w-full rounded-[30px] border border-gold-400/40 sm:block" aria-hidden />
            <div className="photo aspect-[3/2] sm:aspect-[2/1]">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/f_auto,q_auto,w_1200/v1792350716/yenat_market/store/inside_yenat_market_store.jpg"
                alt="Inside Yenat Market Ethiopian grocery shelves and fresh butchery counter in Las Vegas"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="badge badge-glass absolute left-4 top-4 px-3 py-2">
                <Store className="h-3.5 w-3.5 text-gold-300" />
                Inside Our Las Vegas Store
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="eyebrow">Warm Ethiopian Hospitality</p>
            <h3 className="h-section mt-4 text-[clamp(1.7rem,3.1vw,2.6rem)]">
              &ldquo;A Home Away from Home <span className="accent-italic">in Las Vegas</span>&rdquo;
            </h3>
            <p className="lead mt-5">
              Step inside Yenat Market and breathe in the comforting aromas of freshly roasted Yirgacheffe coffee beans,
              stone-ground berbere, and warm sourdough teff injera. Whether you are stocking your family pantry for the month,
              picking up custom-cut kitfo beef for a weekend gathering, or dropping by late at night before 12 AM midnight —
              our friendly staff welcomes you with genuine Ethiopian warmth.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {STORE_FACTS.map(({ value, label }) => (
                <div key={value} className="rounded-2xl border border-line bg-panel px-3 py-4 sm:px-4">
                  <dt className="font-display text-[15px] font-semibold leading-tight text-accent sm:text-lg">{value}</dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-muted sm:text-[12.5px]">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Video modal */}
      {selected &&
        createPortal(
          <div
            className="theme-dark fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/90 p-4 backdrop-blur-md animate-fade-in"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} video review`}
          >
            <div className="animate-sheet relative w-full max-w-2xl overflow-hidden rounded-[24px] border border-line-strong bg-forest-900" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <span className="flex min-w-0 flex-wrap items-center gap-x-2 font-display text-[1.02rem] font-semibold text-ink">
                  <Video className="h-4 w-4 shrink-0 text-accent" />
                  {selected.name} <span className="amharic text-sm text-accent">({selected.amharicName})</span> — Review &amp; Visit
                </span>
                <button onClick={() => setSelected(null)} className="icon-btn h-10 w-10" aria-label="Close video player">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex aspect-[4/5] flex-col items-center justify-center bg-forest-950 p-6 text-center sm:aspect-video">
                <img src={selected.image} alt={selected.name} className="absolute inset-0 h-full w-full object-cover opacity-25" />
                <div className="relative z-10 max-w-md space-y-3">
                  <span className="pulse-ring mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-forest-950">
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </span>
                  <h4 className="h-card text-xl">{selected.name}&apos;s Video Review at Yenat Market</h4>
                  <p className="text-[13.5px] leading-relaxed text-body">{selected.quote}</p>
                  <span className="inline-block rounded-full border border-line-strong px-3 py-1.5 text-[11.5px] font-medium text-accent">
                    User video upload slot ready · Contact store for media inquiries
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-[13px]">
                <span className="text-muted">Official store visit · 4780 W Tropicana Ave Suite 102, Las Vegas</span>
                <a href={STORE_INFO.phoneClean} className="btn btn-gold btn-sm">Call Front Counter</a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
