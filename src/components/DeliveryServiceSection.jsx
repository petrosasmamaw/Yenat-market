import { STORE_INFO } from '../data/marketData.js';
import { Truck, Check, Phone, MessageCircle, Building2, Home, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

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
    <section id="delivery-service" className="theme-moss surface weave-left glow-moss section overflow-hidden">
      <div className="container-x">
        {/* Split header */}
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">03</span>
              Mobile Service
              <span className="amharic">· የቤትና የሬስቶራንት ማድረስ</span>
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
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* Van photo */}
          <Reveal as="figure" className="lg:col-span-7">
            <div className="photo group aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/f_auto,q_auto,w_1400/v1792350713/yenat_market/delivery/yenat_real_delivery_van.jpg"
                alt="Yenat Market delivery van delivering fresh Ethiopian groceries and meat across Las Vegas"
                className="absolute inset-0 h-full w-full object-cover object-[38%_50%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="photo-shade absolute inset-0" />
              <span className="badge badge-gold absolute left-4 top-4 px-3 py-1.5 sm:left-5 sm:top-5">
                <Truck className="h-3.5 w-3.5" />
                Yenat Mobile Delivery Van
              </span>
              <figcaption className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
                <p className="h-sub">Serving Homes, Restaurants &amp; Event Venues Valley-Wide</p>
                <p className="mt-2 text-[13px] font-medium text-gold-200 sm:text-[14px]">Spring Valley · Summerlin · Henderson · North Las Vegas · Strip Area</p>
              </figcaption>
            </div>
          </Reveal>

          {/* Streams */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {STREAMS.map(({ icon: Icon, title, sub, text, points }, i) => (
              <Reveal key={title} delay={0.08 + i * 0.08} className="card p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[2rem] font-bold leading-none text-accent/35 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="h-card mt-5 text-[1.3rem]">{title}</h3>
                <p className="meta mt-1">{sub}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-body">{text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {points.map((p) => (
                    <li key={p} className="chip">
                      <Check className="h-3.5 w-3.5 text-fresh" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <p className="flex items-center gap-2.5 px-1 text-[14px] text-body">
                <ShieldCheck className="h-4 w-4 shrink-0 text-fresh" />
                Temperature-controlled transport for meat and injera boxes.
                <span className="badge ml-auto hidden shrink-0 border border-line-strong py-1.5 text-accent sm:inline-flex">
                  Daily Scheduled Runs
                </span>
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Van Dispatch: (702) 240-8222
                </a>
                <a href={STORE_INFO.phoneClean} className="btn btn-ghost">
                  <Phone className="h-4 w-4 text-accent" />
                  Call Dispatch Desk
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
