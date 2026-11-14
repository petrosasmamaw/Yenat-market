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

export const Footer = () => {
  return (
    <footer className="theme-dark relative bg-forest-950 text-[14px] text-body">
      <div className="tibeb" aria-hidden />
      <div className="container-x pb-[calc(6rem+env(safe-area-inset-bottom))] pt-16 sm:pt-20 md:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="logo-chip grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl p-1.5">
                <img src="/yenat-logo-cropped.png" alt="Yenat Market Logo" className="h-full w-full object-contain mix-blend-multiply" />
              </span>
              <div>
                <p className="text-[20px] font-extrabold tracking-[0.06em]">
                  <span className="text-gold-400">YENAT</span> <span className="text-berbere-300">MARKET</span>
                </p>
                <p className="amharic text-[13px] font-semibold text-gold-300">የእናት ገበያ · Las Vegas</p>
              </div>
            </div>

            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Las Vegas’ authentic Ethiopian marketplace, fresh custom butchery, and daily bakery.
              Offering custom-cut meats by the kilo, fresh daily teff injera, stone-ground spices, cold beverages, and city-wide van delivery.
            </p>

            <ul className="mt-6 space-y-3">
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
                <a href={`mailto:${STORE_INFO.email}`} className="transition-colors hover:text-ink">{STORE_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span className="font-semibold text-accent">{STORE_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ title, links }) => (
            <div key={title} className="lg:col-span-3">
              <p className="text-[13px] font-semibold text-ink">{title}</p>
              <ul className="mt-5 space-y-3">
                {links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="text-muted transition-colors hover:text-ink">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payments */}
          <div className="lg:col-span-2">
            <p className="text-[13px] font-semibold text-ink">Accepted Payments</p>
            <ul className="mt-5 space-y-2.5">
              {PAYMENTS.map((p) => (
                <li key={p} className="flex items-center gap-2 font-medium text-body">
                  <Check className="h-4 w-4 shrink-0 text-gold-400" />
                  {p}
                </li>
              ))}
            </ul>
            <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-6">
              Directions to Suite 102
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[13px] text-muted sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Yenat Market LLC. All rights reserved.
            <span aria-hidden className="mx-2">·</span>
            4780 West Tropicana Ave. Suite 102, Las Vegas, NV 89103
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with love for Ethiopian culinary tradition
            <Heart className="h-3.5 w-3.5 fill-berbere-500 text-berbere-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
