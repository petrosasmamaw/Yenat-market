import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Phone, Clock, Heart, Mail, MessageCircle, Check, ArrowUpRight } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Butchery & Aisles',
    links: [
      ['#siga-butchery', '100% Grass-Fed Ox, Sheep & Goat (ስጋ)'],
      ['#departments', 'Ye Tibs, Ye Tire, Ye Kitfo & Ye Chkna'],
      ['#departments', 'Daily 100% Pure Teff Injera & Ambasha'],
      ['#departments', 'Stone-Ground Berbere, Mitmita & Shiro'],
      ['#departments', 'Heineken, Habesha Beers & Honey Wine'],
      ['#delivery-service', 'Las Vegas Delivery Van Service'],
    ],
  },
  {
    title: 'Catering & Commercial',
    links: [
      ['#siga-butchery', 'Wedding & Holiday Ceremony Meat Supply'],
      ['#siga-butchery', 'Live Meat Roasting Service (የጥብስ ዝግጅት)'],
      ['#vendors', 'Restaurant Wholesale Teff, Meat & Spices'],
      ['#reviews', 'Celebrity Video Reviews (Helen Berhe, Biniyam)'],
      ['#schedule', 'Daily Drop Timetable (Open until 12 AM)'],
    ],
  },
];

const PAYMENTS = ['Cash & In-Store', 'Debit & Credit Cards', 'MasterCard & Visa', 'EBT / SNAP Cards', `Zelle: ${STORE_INFO.zelleNumber}`];

const ColTitle = ({ children }) => (
  <p className="flex items-center gap-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
    <span className="h-[2px] w-5 rounded-full bg-berbere-500" aria-hidden />
    {children}
  </p>
);

export const Footer = () => {
  return (
    <footer className="theme-dark glow-night relative text-[14px] text-body">
      <div className="tibeb" aria-hidden />
      <div className="container-x pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-14 sm:pt-20 md:pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-end gap-4">
              <img src="/yenat-logo-on-dark.png" alt="Yenat Market Logo" className="w-36 select-none" loading="lazy" />
              <div className="pb-1">
                <p className="sr-only">
                  <span>YENAT</span> <span>MARKET</span>
                </p>
                <p className="amharic text-[14px] font-semibold text-gold-300">የእናት ገበያ · Las Vegas</p>
              </div>
            </div>

            <p className="mt-6 max-w-sm leading-[1.7] text-muted">
              Las Vegas’ authentic Ethiopian marketplace, fresh custom butchery, and daily bakery.
              Offering custom-cut meats by the kilo, fresh daily teff injera, stone-ground spices, cold beverages, and city-wide van delivery.
            </p>

            <ul className="mt-6 space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{STORE_INFO.fullAddress}</span>
              </li>
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={STORE_INFO.phoneClean} className="transition-colors hover:text-ink">Call: {STORE_INFO.phone}</a>
                <span aria-hidden className="text-muted">·</span>
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-accent hover:text-gold-300">
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${STORE_INFO.email}`} className="break-all transition-colors hover:text-ink">{STORE_INFO.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="font-semibold text-accent">{STORE_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ title, links }) => (
            <div key={title} className="lg:col-span-3">
              <ColTitle>{title}</ColTitle>
              <ul className="mt-5 space-y-3">
                {links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="group inline-flex items-start gap-2 text-muted transition-colors hover:text-ink">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-gold-400/50 transition-colors group-hover:bg-gold-400" aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payments */}
          <div className="md:col-span-2 lg:col-span-2">
            <ColTitle>Accepted Payments</ColTitle>
            <ul className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
              {PAYMENTS.map((p) => (
                <li key={p} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13px] font-medium text-body lg:rounded-none lg:border-0 lg:p-0 lg:text-[14px]">
                  <Check className="h-4 w-4 shrink-0 text-fresh" />
                  {p}
                </li>
              ))}
            </ul>
            <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-6 !whitespace-normal">
              Directions to Suite 102
              <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[13px] text-muted sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Yenat Market LLC. All rights reserved.
            <span aria-hidden className="mx-2">·</span>
            4780 West Tropicana Ave. Suite 102, Las Vegas, NV 89103
          </p>
          <p className="flex shrink-0 items-center gap-1.5">
            Crafted with love for Ethiopian culinary tradition
            <Heart className="h-3.5 w-3.5 fill-berbere-500 text-berbere-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
