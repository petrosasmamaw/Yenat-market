import { useState, useEffect, useRef, useCallback } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import {
  Flame,

  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,

  Truck,
  Leaf,
  Ban,
  Scale,
} from 'lucide-react';

const SLIDE_MS = 2500;

const GALLERY_SLIDES = [
  {
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346481/yenat_market/ceremony/ceremony_roasting_1.jpg',
    title: 'Ceremonial Whole Carcass Preparation & Butchery',
    caption: 'Pasture-raised whole sheep & goats freshly prepared with traditional butcher mastery for weddings & celebrations.',
  },
  {
    mediaUrl: '/ceremony/van-hanging-beef.jpg',
    title: 'Chilled Van Delivery — Whole Grass-Fed Beef Quarters',
    caption: 'Fresh beef quarters hung on rails inside our refrigerated van, delivered cold and clean to your event, church hall or home.',
  },
  {
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346485/yenat_market/ceremony/ceremony_roasting_3.jpg',
    title: 'Golden Charcoal Roasting for Festive Banquets',
    caption: 'Hardwood charcoal-fired ceremonial roasting prepared on-site across Las Vegas for holiday banquets.',
  },
  {
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1794310733/yenat_market/ceremony/ceremony_hanging_cuts.jpg',
    title: 'Custom Event Carcass & Prime Butchery Preparation',
    caption: 'Freshly hung and aged whole and quarter grass-fed beef and lamb, expertly prepped for weddings, holidays, and large family banquets.',
  },
  {
    mediaUrl: '/ceremony/butcher-cutting-fresh.jpg',
    title: 'Cut Fresh to Order at Our Butcher Counter',
    caption: 'Every order is hand-carved in Suite 102 — tibs, kitfo and ceremony portions trimmed to your exact weight by the kilo.',
  },
];

const SERVICES = [
  {
    icon: Flame,
    title: 'Live Roasting Service (የጥብስ ዝግጅት)',
    text: 'We roast tender marinated grass-fed meat on-demand for special events and cultural celebrations.',
  },
  {
    icon: Truck,
    title: 'Direct Venue Delivery via Our Van',
    text: 'Chilled delivery directly to your home, church hall, reception center, or restaurant in Las Vegas.',
  },
];

const GRASS_FED_POINTS = [
  { icon: Leaf, label: 'Pasture-raised' },
  { icon: Ban, label: 'Hormone-free' },
  { icon: Scale, label: 'By the kilo' },
];

const pad = (n) => String(n).padStart(2, '0');

// Ask Cloudinary for a resized, auto-format/quality version (local images pass through)
const cld = (url, w) => (url.includes('/image/upload/') ? url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${w}/`) : url);

export const SigaButcherySection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = GALLERY_SLIDES.length;

  const go = useCallback((i) => setActive((i + total) % total), [total]);
  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  // Auto-advance (pauses on hover / touch)
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, next]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
    setPaused(false);
  };

  const slide = GALLERY_SLIDES[active];

  return (
    <section id="siga-butchery" className="theme-light grain section relative overflow-hidden">
      <div className="container-x">

        {/* ═════════ 1. Ceremonies & Catering ═════════ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Content */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="eyebrow">
              <span className="num">01</span>
              Special Ceremonies &amp; Catering
            </p>
            <p className="amharic mt-2 text-sm font-semibold text-accent">የንጹህ ስጋ ማዕከል</p>

            <h2 className="h-section mt-4">
              Fresh Meat for Weddings, Holidays &amp; <span className="accent-italic">Live Roasting</span>
            </h2>

            <p className="lead mt-5">
              Planning an Ethiopian wedding, christening, holiday banquet (Meskel, Genna, Fasika, Eid), or family memorial?
              We supply whole and half grass-fed sheep, goats, and oxen custom-slaughtered to your event specifications.
            </p>

            <ul className="mt-8 border-t border-line">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 border-b border-line py-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-900 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-[1.15rem] font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-body">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={STORE_INFO.phoneClean} className="btn btn-primary">
                <Phone className="h-4 w-4" />
                Call {STORE_INFO.phone}
              </a>
              <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MessageCircle className="h-4 w-4 text-spice" />
                WhatsApp Us
              </a>
            </div>

            <p className="mt-5 text-[13px] text-muted">
              * WhatsApp photos &amp; video updates from the butchery floor can be provided upon request.
            </p>
          </div>

          {/* Gallery */}
          <div
            className="order-1 lg:order-2 lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              {/* offset gold frame — editorial detail */}
              <div className="pointer-events-none absolute -right-3 -top-3 hidden h-full w-full rounded-[30px] border border-gold-500/50 sm:block" aria-hidden />

              <div
                className="theme-dark relative aspect-[4/5] overflow-hidden rounded-[28px] bg-forest-950 sm:aspect-[4/3] lg:aspect-auto lg:h-[600px]"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                role="region"
                aria-roledescription="carousel"
                aria-label="Ceremony & butchery photos"
              >
                <div
                  className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                >
                  {GALLERY_SLIDES.map((s, i) => (
                    <div key={s.mediaUrl} className="relative h-full w-full shrink-0 overflow-hidden" aria-hidden={i !== active}>
                      <img src={cld(s.mediaUrl, 400)} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-55 blur-2xl" />
                      <div className="absolute inset-0 bg-forest-950/35" />
                      <img
                        src={cld(s.mediaUrl, 1400)}
                        alt={s.title}
                        className="relative h-full w-full object-contain drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent px-6 pb-6 pt-24 sm:px-8 sm:pb-7">
                  <div key={active} className="animate-card-switch">
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-[1.65rem]">{slide.title}</h3>
                    <p className="mt-1.5 line-clamp-2 max-w-xl text-[13px] text-body sm:text-[15px]">{slide.caption}</p>
                  </div>
                </div>

                {/* Counter */}
                <div className="absolute left-5 top-5 z-30 font-display text-sm font-semibold tabular-nums text-ink">
                  {pad(active + 1)} <span className="text-muted">— {pad(total)}</span>
                </div>

                {/* Arrows */}
                <div className="absolute right-5 top-5 z-30 flex gap-2">
                  {[
                    { fn: prev, Icon: ChevronLeft, label: 'Previous photo' },
                    { fn: next, Icon: ChevronRight, label: 'Next photo' },
                  ].map(({ fn, Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={fn}
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-forest-950/50 text-ink backdrop-blur transition-colors hover:bg-gold-400 hover:text-forest-950"
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
              {GALLERY_SLIDES.map((s, i) => (
                <button
                  key={s.mediaUrl}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show photo ${i + 1}: ${s.title}`}
                  aria-current={i === active}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-all ${
                    i === active ? 'ring-2 ring-forest-500 ring-offset-2 ring-offset-teff-100' : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  <img src={cld(s.mediaUrl, 300)} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {i === active && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-forest-950/40">
                      <span
                        key={`${active}-${paused}`}
                        className="slide-progress block h-full bg-gold-400"
                        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═════════ 2. 100% Grass-fed — slim ribbon ═════════ */}
        <div className="theme-dark mt-16 overflow-hidden rounded-2xl bg-forest-900">
          <div className="tibeb-thin" aria-hidden />
          <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-8 sm:px-8">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold text-ink sm:text-[1.4rem]">
                100% Grass-Fed <span className="text-accent">Meat</span>
              </h3>
              <p className="mt-1 text-[14px] text-body">
                Pasture-raised oxen, sheep &amp; goats — <span className="font-semibold text-spice">no hormones, no grains</span>. Cut fresh by the kilo.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {GRASS_FED_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="chip text-ink">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm shrink-0">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ═════════ 3. Whole & Half Sheep & Goat Delivery ═════════ */}
        <div className="card mt-6 overflow-hidden">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-12">
            <div className="relative h-56 md:col-span-4 md:h-auto">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/c_crop,x_0,y_205,w_472,h_717/v1792346478/yenat_market/meat/sheep_goat_house_delivery.jpg"
                alt="Whole and half grass-fed sheep and goat with direct home delivery in Las Vegas"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.06em] text-forest-950">
                Direct House Delivery
              </span>
            </div>

            <div className="p-6 sm:p-8 md:col-span-8 md:p-10">
              <p className="eyebrow">
                <Truck className="h-3.5 w-3.5" />
                Customer Delivery
              </p>
              <p className="amharic mt-1 text-sm font-semibold text-accent">የበግና የፍየል ስጋ ቤት ድረስ</p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-[1.75rem]">
                Whole &amp; Half Sheep &amp; Goat Delivered to <span className="text-spice">Your House</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                We sell 100% natural grass-fed whole and half sheep and goats to our customers.
                Custom-carved to your exact cooking preferences and delivered cold and fresh straight to your front door across Las Vegas for family feasts,
                holidays, or gatherings.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: {STORE_INFO.whatsapp}
                </a>
                <a href={STORE_INFO.phoneClean} className="btn btn-ghost btn-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  Call: {STORE_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
