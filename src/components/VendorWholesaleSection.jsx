import { STORE_INFO } from '../data/marketData.js';
import { Building2, ShoppingBag, Truck, Check, ArrowRight, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

const PILLARS = [
  {
    icon: Building2,
    title: 'Wholesale for Restaurants & Caterers',
    text: 'Consistency is everything in commercial dining. We supply 25 lb and 50 lb restaurant sacks of premium stone-ground Berbere, Shiro powder, raw Teff flour, and morning crates of fresh Teff injera.',
    points: ['Scheduled standing weekly orders', 'Volume commercial tier pricing', 'Dedicated butchery cuts prepared to spec'],
    cta: { label: 'Call for Wholesale Prices', href: STORE_INFO.phoneClean, icon: Phone, style: 'btn-primary' },
  },
  {
    icon: ShoppingBag,
    title: 'Retail Shelf Space for Importers',
    text: 'Do you produce or import authentic East African packaged foods, herbal teas, cold-pressed oils, incense, or cookware? Get your products on high-traffic shelves viewed by thousands of loyal shoppers every month.',
    points: ['Prominent endcap and eye-level shelf placement', 'Temperature-controlled dry and refrigerated storage', 'Prompt vendor settlement terms'],
    cta: { label: 'WhatsApp About Shelf Space', href: STORE_INFO.whatsappUrl, icon: MessageCircle, style: 'btn-red', external: true },
  },
  {
    icon: Truck,
    title: 'Local Logistics & Storage Support',
    text: 'Situated on the strategic Tropicana Avenue corridor minutes from the Strip, our facility provides hassle-free loading, pallet staging, and convenient order pickups for Las Vegas commercial partners.',
    points: ['Easy drive-up loading zone on Tropicana', 'Early morning pickup windows available', 'Flexible payment options for established accounts'],
    cta: { label: 'Call Commercial Desk: (702) 240-8222', href: STORE_INFO.phoneClean, icon: Phone, style: 'btn-ghost' },
  },
];

const ROMAN = ['I', 'II', 'III'];
// one brand colour leads each pillar: green · gold · red
const TOP_RULE = ['bg-forest-300', 'bg-gold-400', 'bg-berbere-500'];

export const VendorWholesaleSection = () => {
  return (
    <section id="vendors" className="theme-moss surface glow-moss section">
      <div className="container-x">
        {/* Header */}
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">05</span>
              B2B Commercial Partnerships
              <span className="amharic">· ለነጋዴዎችና ለሆቴሎች</span>
            </p>
            <h2 className="h-section mt-4">
              Partner with Las Vegas’ <span className="accent-italic">Established</span> Ethiopian Marketplace
            </h2>
          </div>
          <p className="lead lg:col-span-5">
            Whether you are a Las Vegas restaurateur sourcing authentic culinary staples or an East African food producer
            seeking prime retail shelf space, Yenat Market provides the supply chain consistency, community trust, and volume you need.
          </p>
        </Reveal>

        {/* Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {PILLARS.map(({ icon: Icon, title, text, points, cta }, i) => {
            const CtaIcon = cta.icon;
            return (
              <Reveal key={title} delay={i * 0.09} className="card relative flex flex-col overflow-hidden p-6 sm:p-7 lg:p-8">
                <span className={`absolute inset-x-0 top-0 h-1 ${TOP_RULE[i]}`} aria-hidden />
                <div className="flex items-center justify-between">
                  <span className="icon-tile h-[52px] w-[52px]">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span className="font-serif text-[2.1rem] font-medium italic leading-none text-accent/40">{ROMAN[i]}</span>
                </div>
                <h3 className="h-sub mt-6 text-[1.4rem]">{title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-body">{text}</p>
                <ul className="mb-8 mt-5 space-y-3 border-t border-line pt-5 text-[14px] font-medium text-ink">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-forest-300/15">
                        <Check className="h-3 w-3 text-fresh" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={cta.href}
                  {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`btn btn-sm ${cta.style} mt-auto w-full !whitespace-normal`}
                >
                  <CtaIcon className="h-4 w-4 shrink-0" />
                  {cta.label}
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Partner ribbon — the one loud red moment on the page */}
        <Reveal className="theme-red band-red relative mt-6 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[26px] p-7 shadow-[0_40px_70px_-40px_rgb(200_16_46/0.8)] sm:p-9 lg:mt-8 lg:flex-row lg:items-center lg:p-11">
          <span className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full border-[22px] border-gold-300/10" aria-hidden />
          <div className="relative">
            <p className="flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
              <ShieldCheck className="h-4 w-4" />
              Certified Partner Network
            </p>
            <p className="h-sub mt-3 max-w-2xl font-bold">
              Ready to introduce your product or establish restaurant delivery?
            </p>
            <p className="mt-2 text-[15px] text-body">
              Call or WhatsApp our market manager directly — we reply quickly during store hours.
            </p>
          </div>
          <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold group relative w-full shrink-0 sm:w-auto">
            Contact Us on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
