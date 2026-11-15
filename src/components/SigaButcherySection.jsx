import { STORE_INFO } from '../data/marketData.js';
import { Flame, Phone, MessageCircle, Truck, Leaf, Ban, Scale } from 'lucide-react';
import { PhotoGallery } from './PhotoGallery.jsx';
import { Reveal } from './Reveal.jsx';

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

export const SigaButcherySection = () => {
  return (
    <section id="siga-butchery" className="theme-moss surface glow-moss section overflow-hidden">
      <div className="container-x">

        {/* ═════════ 1. Ceremonies & Catering ═════════ */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-9 lg:grid-cols-12 lg:grid-rows-[auto_1fr] xl:gap-x-16">

          {/* Heading */}
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">
              <span className="num">01</span>
              Special Ceremonies &amp; Catering
            </p>
            <p className="amharic mt-3 text-[15px] font-semibold text-accent">የንጹህ ስጋ ማዕከል</p>

            <h2 className="h-section mt-4">
              Fresh Meat for Weddings, Holidays &amp; <span className="accent-italic">Live Roasting</span>
            </h2>

            <p className="lead mt-5">
              Planning an Ethiopian wedding, christening, holiday banquet (Meskel, Genna, Fasika, Eid), or family memorial?
              We supply whole and half grass-fed sheep, goats, and oxen custom-slaughtered to your event specifications.
            </p>
          </Reveal>

          {/* Gallery */}
          <Reveal delay={0.1} className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <PhotoGallery slides={GALLERY_SLIDES} label="Ceremony & butchery photos" />
          </Reveal>

          {/* Services + actions */}
          <Reveal delay={0.05} className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <ul className="grid gap-3">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="card flex gap-4 p-4 sm:p-5">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="h-card text-[1.1rem]">{title}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={STORE_INFO.phoneClean} className="btn btn-primary">
                <Phone className="h-4 w-4" />
                Call {STORE_INFO.phone}
              </a>
              <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MessageCircle className="h-4 w-4 text-accent" />
                WhatsApp Us
              </a>
            </div>

            <p className="meta mt-5">
              * WhatsApp photos &amp; video updates from the butchery floor can be provided upon request.
            </p>
          </Reveal>
        </div>

        {/* ═════════ 2. 100% Grass-fed — gold ribbon ═════════ */}
        <Reveal className="theme-gold band-gold mt-14 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-36px_rgb(237_177_47/0.7)] sm:mt-16">
          <div className="flex flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.7rem]">
                100% Grass-Fed <span className="text-accent">Meat</span>
              </h3>
              <p className="mt-1.5 text-[15px] font-medium text-body">
                Pasture-raised oxen, sheep &amp; goats — <span className="font-bold text-spice">no hormones, no grains</span>. Cut fresh by the kilo.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {GRASS_FED_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="chip bg-forest-950/10">
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
        </Reveal>

        {/* ═════════ 3. Whole & Half Sheep & Goat Delivery ═════════ */}
        <Reveal className="card mt-6 overflow-hidden">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-12">
            <div className="relative h-72 overflow-hidden md:col-span-4 md:h-auto md:min-h-[340px]">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/c_crop,x_0,y_205,w_472,h_717/v1792346478/yenat_market/meat/sheep_goat_house_delivery.jpg"
                alt="Whole and half grass-fed sheep and goat with direct home delivery in Las Vegas"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-forest-950/40" aria-hidden />
              <span className="badge badge-gold absolute left-4 top-4">Direct House Delivery</span>
            </div>

            <div className="p-6 sm:p-8 md:col-span-8 md:p-10 lg:p-12">
              <p className="eyebrow">
                <Truck className="h-3.5 w-3.5" />
                Customer Delivery
              </p>
              <p className="amharic mt-2 text-[15px] font-semibold text-accent">የበግና የፍየል ስጋ ቤት ድረስ</p>
              <h3 className="h-sub mt-3 font-bold">
                Whole &amp; Half Sheep &amp; Goat Delivered to <span className="text-accent">Your House</span>
              </h3>
              <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.7] text-body">
                We sell 100% natural grass-fed whole and half sheep and goats to our customers.
                Custom-carved to your exact cooking preferences and delivered cold and fresh straight to your front door across Las Vegas for family feasts,
                holidays, or gatherings.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
        </Reveal>

      </div>
    </section>
  );
};
