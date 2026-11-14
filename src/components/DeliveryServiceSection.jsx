import { STORE_INFO } from '../data/marketData.js';
import { Truck, Check, Phone, MessageCircle, Building2, Home, ShieldCheck } from 'lucide-react';

const STREAMS = [
  {
    icon: Building2,
    title: 'Restaurant Wholesale & Commercial Crates',
    sub: 'Scheduled drops for Las Vegas Ethiopian dining spots',
    text: 'We deliver standing bulk orders directly to local kitchens. Daily warm crates of 100% pure teff injera, 25 lb sacks of stone-ground berbere, shiro, certified teff flour, and custom-cut grass-fed meat packages.',
    points: ['Standing weekly routes', 'Wholesale bulk discounts'],
  },
  {
    icon: Home,
    title: 'Home & Ceremony Event Delivery',
    sub: 'Fresh groceries & celebratory meat brought to your door',
    text: 'Hosting a family dinner, birthday, holiday feast, or wedding ceremony? Order fresh grass-fed tibs, kitfo, or tire meat by the kilo, or whole & half sheep and goats delivered to your house, along with fresh ambasha, berbere, Ethiopian beer, and wine without leaving your home.',
    points: ['Whole & half sheep / goat', 'Zelle & Cash on delivery'],
  },
];

export const DeliveryServiceSection = () => {
  return (
    <section id="delivery-service" className="theme-dark forest-glow section relative overflow-hidden">
      <div className="container-x">
        {/* Split header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">03</span>
              Mobile Service
              <span className="amharic text-[13px] tracking-normal text-accent">· የቤትና የሬስቶራንት ማድረስ</span>
              <span className="text-muted">/</span>
              Dedicated Van
            </p>
            <h2 className="h-section mt-4">
              Yenat Market Delivery Van — <span className="accent-gold">Fast Home &amp; Restaurant Supply</span>
            </h2>
          </div>
          <p className="lead lg:col-span-5">
            Need fresh grass-fed meat by the kilo, warm daily teff injera, or bulk wholesale restaurant supplies delivered
            directly to your door? Our dedicated Yenat delivery van operates throughout the Las Vegas valley.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Van photo */}
          <figure className="lg:col-span-7">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-forest-800 lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/f_auto,q_auto,w_1400/v1792350713/yenat_market/delivery/yenat_real_delivery_van.jpg"
                alt="Yenat Market delivery van delivering fresh Ethiopian groceries and meat across Las Vegas"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.06em] text-forest-950">
                <Truck className="h-3.5 w-3.5" />
                Yenat Mobile Delivery Van
              </span>
              <figcaption className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <p className="font-display text-xl font-semibold text-ink sm:text-2xl">Serving Homes, Restaurants &amp; Event Venues Valley-Wide</p>
                <p className="mt-1.5 text-[13px] text-body">Spring Valley · Summerlin · Henderson · North Las Vegas · Strip Area</p>
              </figcaption>
            </div>
          </figure>

          {/* Streams */}
          <div className="flex flex-col lg:col-span-5">
            <div className="border-t border-line">
              {STREAMS.map(({ title, sub, text, points }, i) => (
                <div key={title} className="border-b border-line py-7">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl font-semibold leading-none text-accent/50 tabular-nums">0{i + 1}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-ink">

                        {title}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-muted">{sub}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-body">{text}</p>
                      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold text-ink">
                        {points.map((p) => (
                          <li key={p} className="flex items-center gap-1.5">
                            <Check className="h-4 w-4 text-gold-400" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2.5 text-[14px] text-body">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
              Temperature-controlled transport for meat and injera boxes.
              <span className="ml-auto hidden shrink-0 rounded-full border border-line px-2.5 py-0.5 text-[11.5px] font-bold text-accent sm:inline">
                Daily Scheduled Runs
              </span>
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
              <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Van Dispatch: (702) 240-8222
              </a>
              <a href={STORE_INFO.phoneClean} className="btn btn-ghost">
                <Phone className="h-4 w-4 text-accent" />
                Call Dispatch Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
