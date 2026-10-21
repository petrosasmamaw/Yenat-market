import { useState, useEffect } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Truck,
  Scale,
  Video,
} from 'lucide-react';

const SIGA_CUTS = [
  {
    id: 'chkna',
    name: 'Ye Chkna Siga',
    amharicName: 'የጭከና ስጋ (Tenderloin)',
    animal: '100% Grass-Fed Beef Tenderloin',
    badge: 'Prized Filet Mignon',
    image: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346473/yenat_market/meat/chkna_tibs_cut.jpg',
    description: 'The most tender, luxurious cut of Ethiopian beef. Velvety tenderloin that melts in your mouth like butter. Ideal for special VIP tibs, wedding feasts, and raw delicacies.',
    tags: ['Tenderloin', 'Melts in Mouth', 'Gourmet Feast', 'Premium Reserve'],
  },
  {
    id: 'tire',
    name: 'Ye Tire Siga (Kurt)',
    amharicName: 'የጥሬ ስጋ (ቁርጥ)',
    animal: '100% Grass-Fed Prime Ox',
    badge: 'Connoisseur Raw Cut',
    image: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346474/yenat_market/meat/kurt_tire_siga.jpg',
    description: 'The pinnacle of authentic Ethiopian raw beef appreciation. Chosen from the freshest prime cuts of pasture-raised oxen, carved with surgical precision for qurata with mitmita and senafitch.',
    tags: ['Prime Raw Cut', 'Zero Sinew', 'Strict Chilling', 'By the Kilo'],
  },
  {
    id: 'tibs',
    name: 'Ye Tibs Siga',
    amharicName: 'የጥብስ ስጋ',
    animal: '100% Grass-Fed Ox, Lamb & Goat',
    badge: 'Sold by the Kilo (KG)',
    image: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346476/yenat_market/meat/ye_tibs_siga.jpg',
    description: 'Perfect succulent cubes with ideal marbling. Sizzles in the skillet with fresh rosemary, jalapeños, onions, awaze, and niter kibe butter for unforgettable Derek Tibs.',
    tags: ['Derek Tibs', 'Awaze Tibs', 'Grass-Fed', 'Cubed Fresh'],
  },
  {
    id: 'kitfo',
    name: 'Ye Kitfo Siga',
    amharicName: 'የክትፎ ስጋ',
    animal: '100% Grass-Fed Top Round',
    badge: 'Extra Lean Trimmed',
    image: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346477/yenat_market/meat/ye_kitfo_siga.jpg',
    description: 'Meticulously hand-trimmed of every single fiber of connective tissue and fat. Minced or finely sliced on demand for raw (tire), lightly warmed (leb-leb), or fully cooked kitfo.',
    tags: ['Hand Trimmed', 'Super Lean', 'Minced to Order', 'No Fillers'],
  },
];

const GALLERY_SLIDES = [
  {
    type: 'image',
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346481/yenat_market/ceremony/ceremony_roasting_1.jpg',
    title: 'Ceremonial Whole Carcass Preparation & Butchery',
    caption: 'Pasture-raised whole sheep & goats freshly prepared with traditional butcher mastery for weddings & celebrations.',
  },
  {
    type: 'image',
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346483/yenat_market/ceremony/ceremony_roasting_2.jpg',
    title: 'Live Outdoor Roasting Spit (የጥብስ ዝግጅት)',
    caption: 'Authentic charcoal rotisserie setup delivering hot sizzling roasted meat right to your event guests.',
  },
  {
    type: 'image',
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/image/upload/v1792346485/yenat_market/ceremony/ceremony_roasting_3.jpg',
    title: 'Golden Charcoal Roasting for Festive Banquets',
    caption: 'Hardwood charcoal-fired ceremonial roasting prepared on-site across Las Vegas for holiday banquets.',
  },
  {
    type: 'video',
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/video/upload/v1792346534/yenat_market/ceremony/ceremony_video_roasting_1.mp4',
    title: 'Live Roasting Action: Traditional Roasting Spit',
    caption: 'Real-time ceremony roasting — watch our skilled pit masters turning whole seasoned meat over glowing coals.',
  },
  {
    type: 'video',
    mediaUrl: 'https://res.cloudinary.com/dkcanqmko/video/upload/v1792346576/yenat_market/ceremony/ceremony_video_roasting_2.mp4',
    title: 'Live Roasting Action: Sizzling Celebration Cuts',
    caption: 'Live event sizzle — tender, golden cuts roasting over fire to mouthwatering perfection for catering events.',
  },
];

export const SigaButcherySection = ({ onOpenVendorModal }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance gallery animation (6 seconds per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % GALLERY_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);

  return (
    <section id="siga-butchery" className="relative border-b border-stone-200 bg-white py-14 sm:py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Core Specialty · የንጹህ ስጋ ማዕከል</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>100% Grass-Fed</span>
            </div>
            
            <h2 className="mt-2 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
              100% Grass-Fed Pasture Butchery & Custom Ceremony Roasting
            </h2>
            
            <p className="mt-3 text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Meat is the heart and soul of Yenat Market. We custom-slaughter{' '}
              <strong className="text-stone-900 font-semibold">100% grass-fed oxen, sheep, and goats</strong> — raised naturally on open pasture with{' '}
              <span className="text-amber-900 font-bold underline decoration-amber-400 underline-offset-4">zero artificial feeds, zero hormones, and zero grains</span>. 
              Sold by the kilo (KG) and cut fresh to order all day in Suite 102!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order Meat on WhatsApp: (702) 240-8222</span>
            </a>
          </div>
        </div>

        {/* 4 Signature Siga Cuts Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGA_CUTS.map((cut) => (
            <div
              key={cut.id}
              className="group bg-[#FAF7F2] rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 bg-stone-200 overflow-hidden">
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                    <Scale className="w-3 h-3 text-amber-400" />
                    <span>{cut.badge}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-amber-800 font-display">{cut.amharicName}</span>
                    <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">{cut.animal}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors">
                    {cut.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cut.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cut.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-stone-200 text-stone-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-4 bg-white border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Cut fresh to order</span>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                >
                  <span>Order by KG →</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Feature: Whole & Half Sheep & Goat House Delivery (Small & 1 Image) */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-[#1c1815] text-white overflow-hidden border border-amber-900/30 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Single Image Column (4 cols on md with controlled height) */}
            <div className="relative h-44 sm:h-48 md:h-56 lg:h-60 md:col-span-4 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/c_crop,x_0,y_205,w_472,h_717/v1792346478/yenat_market/meat/sheep_goat_house_delivery.jpg"
                alt="Whole and half grass-fed sheep and goat with direct home delivery in Las Vegas"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                Direct House Delivery
              </div>
            </div>

            {/* Compact Content Column (8 cols on md) */}
            <div className="p-5 sm:p-6 md:p-6 md:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Delivery · የበግና የፍየል ስጋ ቤት ድረስ</span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white">
                Whole &amp; Half Sheep &amp; Goat Delivered to Your House
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We sell 100% natural grass-fed whole and half sheep and goats to our customers. 
                Custom-carved to your exact cooking preferences and delivered cold and fresh straight to your front door across Las Vegas for family feasts, 
                holidays, or gatherings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order Sheep / Goat on WhatsApp: (702) 240-8222</span>
                </a>

                <a
                  href={STORE_INFO.phoneClean}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 font-semibold text-xs border border-white/15 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call: {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Animated Butchery & Roasting Gallery Showcase: 2-Column on Tablet & Desktop */}
        <div className="mt-14 rounded-3xl bg-stone-950 text-white overflow-hidden border border-stone-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Gallery Image Slider with Motion Effect (7 cols on Tablet & Desktop) */}
            <div className="relative h-72 sm:h-96 md:h-[26rem] lg:h-[30rem] md:col-span-7 overflow-hidden bg-stone-900">
              {GALLERY_SLIDES.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {slide.type === 'video' ? (
                    <video
                      src={slide.mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.mediaUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Floating Caption on Slide */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs flex items-center gap-1.5">
                        {slide.type === 'video' ? <Video className="w-3.5 h-3.5 text-amber-400" /> : null}
                        <span>{slide.type === 'video' ? 'Live Roasting Video' : 'Ceremony Photo'} #{index + 1}</span>
                      </span>
                      {slide.type === 'video' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Live Action
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-2xl font-bold font-display text-white">
                      {slide.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-stone-300 max-w-xl line-clamp-2 sm:line-clamp-none">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              ))}

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 transition-colors active:scale-95"
                aria-label="Previous gallery photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 transition-colors active:scale-95"
                aria-label="Next gallery photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-stone-800">
                {GALLERY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeSlide ? 'w-5 sm:w-6 bg-amber-400' : 'w-2 bg-stone-600'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Ceremony Roasting & Event Services Panel (5 cols on Tablet & Desktop) */}
            <div className="p-5 sm:p-7 md:p-6 lg:p-10 md:col-span-5 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <PartyPopper className="w-4 h-4" />
                <span>Special Ceremonies & Catering</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white leading-tight">
                Fresh Meat for Weddings, Holidays & Live Roasting Services
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Planning an Ethiopian wedding, christening, holiday banquet (Meskel, Genna, Fasika, Eid), or family memorial? 
                We supply whole and half grass-fed sheep, goats, and oxen custom-slaughtered to your event specifications.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-stone-200 bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Live Roasting Service (የጥብስ ዝግጅት):</strong>
                    <span>We roast tender marinated grass-fed meat on-demand for special events and cultural celebrations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-stone-200 bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Direct Venue Delivery via Our Van:</strong>
                    <span>Chilled delivery directly to your home, church hall, reception center, or restaurant in Las Vegas.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a
                  href={STORE_INFO.phoneClean}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-stone-950 font-bold text-xs transition-all"
                >
                  <Phone className="w-4 h-4 text-stone-900" />
                  <span>Call Butchery Desk: {STORE_INFO.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenVendorModal}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-700 hover:bg-stone-800 active:scale-[0.98] text-stone-200 font-semibold text-xs transition-all"
                >
                  Book Ceremony Meat Supply
                </button>
              </div>

              <p className="text-[11px] text-stone-400">
                * Note: WhatsApp photos & video updates from the butchery floor can be provided upon request.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
