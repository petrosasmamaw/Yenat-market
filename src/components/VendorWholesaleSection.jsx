import { STORE_INFO } from '../data/marketData.js';
import { Building2, ShoppingBag, Truck, Check, ArrowRight, ShieldCheck, Phone, MessageCircle } from 'lucide-react';

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

export const VendorWholesaleSection = () => {
  return (
    <section id="vendors" className="theme-light section relative bg-teff-50">
      <div className="container-x">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">05</span>
              B2B Commercial Partnerships
              <span className="amharic text-[13px] tracking-normal text-accent">· ለነጋዴዎችና ለሆቴሎች</span>
            </p>
            <h2 className="h-section mt-4">
              Partner with Las Vegas’ <span className="accent-italic">Established</span> Ethiopian Marketplace
            </h2>
          </div>
          <p className="lead lg:col-span-5">
            Whether you are a Las Vegas restaurateur sourcing authentic culinary staples or an East African food producer
            seeking prime retail shelf space, Yenat Market provides the supply chain consistency, community trust, and volume you need.
          </p>
        </div>

        {/* Pillars — editorial columns */}
        <div className="mt-14 grid grid-cols-1 border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
          {PILLARS.map(({ icon: Icon, title, text, points, cta }, i) => {
            const CtaIcon = cta.icon;
            return (
              <div key={title} className="flex flex-col border-b border-line py-10 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-900 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-3xl font-semibold text-accent/40">{ROMAN[i]}</span>
                </div>
                <h3 className="mt-6 font-display text-[1.5rem] font-semibold leading-tight text-ink">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{text}</p>
                <ul className="mb-8 mt-5 space-y-2.5 text-[14px] text-ink">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={cta.href}
                  {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`btn btn-sm ${cta.style} mt-auto w-full`}
                >
                  <CtaIcon className="h-4 w-4" />
                  {cta.label}
                </a>
              </div>
            );
          })}
        </div>

        {/* Partner ribbon */}
        <div className="theme-dark mt-14 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-forest-900 p-7 sm:p-9 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-semibold text-accent">
              <ShieldCheck className="h-4 w-4" />
              Certified Partner Network
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">
              Ready to introduce your product or establish restaurant delivery?
            </p>
            <p className="mt-1 text-[14px] text-body">
              Call or WhatsApp our market manager directly — we reply quickly during store hours.
            </p>
          </div>
          <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold group shrink-0">
            Contact Us on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
