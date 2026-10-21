import { useState, useEffect } from 'react';
import {
  ArrowDown,
  Sparkles,
  Clock,
  Check,
  MessageCircle,
  Truck,
  Flame,
  Zap,
} from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

// Ultra-realistic, high-fidelity payment cards with real high-resolution images
const PAYMENT_ITEMS = [
  {
    id: 'ebt',
    type: 'EBT / SNAP Card',
    badge: 'BENEFITS ACCEPTED',
    title: 'We Gladly Accept EBT at Checkout',
    subtitle: 'Use your Quest or State EBT card for qualified Ethiopian groceries, pure teff, and daily injera.',
    image: '/card-ebt-fitted.jpg',
    alt: 'Quest EBT SNAP Card accepted at Yenat Market',
  },
  {
    id: 'zelle',
    type: 'Zelle Pay',
    badge: 'INSTANT DIRECT PAY',
    title: `Zelle Accepted: ${STORE_INFO.zelleNumber}`,
    subtitle: 'Zero fees and instant payment confirmation for in-store checkout and Las Vegas delivery van orders.',
    image: '/card-zelle-fitted.jpg',
    alt: 'Zelle Instant Pay registered to 702-237-9645 at Yenat Market',
  },
  {
    id: 'mastercard-visa',
    type: 'MasterCard, Visa & Debit',
    badge: 'TAP · CHIP · SWIPE',
    title: 'Credit, Debit & Mobile Wallets',
    subtitle: 'MasterCard, Visa, Discover, American Express, Apple Pay, and Google Pay accepted with tap-to-pay.',
    image: '/card-mastercard-fitted.jpg',
    alt: 'MasterCard, Visa, and Platinum Debit accepted at Yenat Market',
  },
  {
    id: 'cash-debit',
    type: 'Cash & Store Debit',
    badge: 'COUNTER & DELIVERY',
    title: 'Cash & Store Debit Welcomed',
    subtitle: 'Traditional cash and PIN debit warmly accepted for all market grocery, meat, and delivery orders.',
    image: '/card-cash.svg',
    alt: 'Cash and Store Debit accepted at Yenat Market',
  },
];

export const HeroSection = ({ onOpenVendorModal }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switches every 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % PAYMENT_ITEMS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeItem = PAYMENT_ITEMS[currentIdx];

  return (
    <section className="relative overflow-hidden border-b border-stone-200/90 bg-gradient-to-b from-amber-50/50 via-[#FAF7F2] to-[#FAF7F2] py-8 sm:py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Equal Balanced 2-Column Grid on Tablet & Desktop (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-14">
          
          {/* Left Column: Authentic Ethiopian Marketplace */}
          <div className="w-full space-y-4 sm:space-y-5">
            
            {/* Top Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-900">
              <span className="font-display font-bold text-amber-800 text-sm">የእናት ገበያ</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full font-bold">
                Open Daily 10 AM – 12 AM Midnight
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 font-normal">Suite 102 · Las Vegas</span>
            </div>

            {/* Main Market Headline: Represents the whole market */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-4xl lg:text-[2.85rem] font-extrabold leading-[1.15] tracking-tight text-stone-900 [text-wrap:balance]">
              Authentic Ethiopian Grocery, Fresh Butchery & Daily Bakery
            </h1>

            {/* Butchery note at small text size */}
            <p className="text-xs sm:text-sm font-semibold text-amber-900 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Fresh custom butchery cuts (Ye Tibs, Ye Tire, Ye Kitfo & Ye Chkna) prepared daily by the kilo</span>
            </p>

            {/* Short, friendly paragraph describing the shop */}
            <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-stone-600">
              Your neighborhood market for daily 100% pure teff injera, golden ambasha, stone-ground heritage spices, 
              custom butcher-cut meats, Ethiopian coffee, and city-wide van delivery across Las Vegas.
            </p>

            {/* Action Buttons: Thumb-friendly on Mobile, Unified on Tablet & Desktop */}
            <div className="pt-1">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
                <a
                  href="#departments"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-lg bg-amber-400 px-3.5 py-2.5 sm:py-2 text-xs font-bold text-stone-900 shadow-2xs transition-all hover:bg-amber-300 active:scale-[0.98] text-center min-h-[44px] sm:min-h-0"
                >
                  <span>Explore Market</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>

                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-lg bg-emerald-600 px-3.5 py-2.5 sm:py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-emerald-500 active:scale-[0.98] text-center min-h-[44px] sm:min-h-0"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp: (702) 240-8222</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenVendorModal}
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 sm:py-2 text-xs font-semibold text-stone-800 shadow-2xs transition-all hover:bg-stone-50 active:scale-[0.98] min-h-[42px] sm:min-h-0"
                >
                  <span>Wholesale & Catering</span>
                </button>
              </div>
            </div>

            {/* 4 Feature Highlights with matching Frosted Milky Glass styling */}
            <div className="grid grid-cols-2 gap-2 border-t border-stone-200/90 pt-4 sm:grid-cols-4 sm:gap-3">
              {[
                { icon: Sparkles, title: 'Pure Teff Injera', sub: 'Baked Daily' },
                { icon: Flame, title: 'Custom Butchery', sub: 'Cut to Order by KG' },
                { icon: Truck, title: 'Delivery Van', sub: 'Homes & Restaurants' },
                { icon: Clock, title: 'Open Until 12 AM', sub: '7 Days a Week' },
              ].map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="rounded-xl sm:rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl p-2.5 sm:p-3 text-xs shadow-2xs hover:bg-white/90 transition-all"
                >
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
                    <span className="leading-tight text-[11px] sm:text-xs">{title}</span>
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-stone-500">{sub}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Symmetrical Frosted Milky Glass Box (50% Width, Perfectly Centered on Tablet & Desktop) */}
          <div
            className="w-full flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="w-full max-w-lg">
              
              {/* Frosted Milky Glass Box with Specular Highlight & Soft Ambient Glow */}
              <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_-10px_rgba(28,25,23,0.08),0_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_2px_rgba(255,255,255,0.9)] p-4 sm:p-6 lg:p-7 text-stone-900 transition-all duration-300">
                
                {/* Subtle soft ambient milky glow inside the container */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-200/30 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-purple-200/30 blur-2xl" />

                {/* Glass Top Bar */}
                <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-stone-200/70 text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Accepted Payment Methods</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-stone-600 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-rotates every 2s</span>
                  </span>
                </div>

                {/* Card Visual Stage (Proper ISO standard credit card ratio 1.586:1, edge-to-edge flush fit with realistic sheen) */}
                <div className="relative z-10 my-4 w-full">
                  <div
                    key={activeItem.id}
                    className="group relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-[0_16px_36px_-8px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.2)] animate-card-switch bg-stone-950 transition-all duration-300"
                  >
                    {/* Full Edge-to-Edge Card Artwork */}
                    <img
                      src={activeItem.image}
                      alt={activeItem.alt}
                      className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-102"
                      loading="eager"
                    />

                    {/* Subtle Holographic Glass Sheen Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.18] mix-blend-overlay" />
                    
                    {/* Inner Bevel Border for realistic credit card edge */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
                  </div>
                </div>

                {/* Text Area (Smoothly cross-fades with the card) */}
                <div
                  key={`text-${activeItem.id}`}
                  className="relative z-10 space-y-1 animate-card-switch pt-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-amber-900">
                      {activeItem.type}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60">
                      {activeItem.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
                    {activeItem.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {activeItem.subtitle}
                  </p>

                  {activeItem.id === 'zelle' && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-purple-50/90 border border-purple-200 text-xs font-semibold text-purple-950 flex items-center justify-between shadow-2xs">
                      <span className="text-purple-800 font-medium">Zelle Direct Number:</span>
                      <span className="text-purple-900 font-mono font-bold text-sm tracking-wide select-all">
                        {STORE_INFO.zelleNumber}
                      </span>
                    </div>
                  )}
                </div>

                {/* Indicators & Dots */}
                <div className="relative z-10 mt-5 pt-3.5 border-t border-stone-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {PAYMENT_ITEMS.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIdx === idx
                            ? 'w-6 bg-amber-500 shadow-xs'
                            : 'w-2 bg-stone-300 hover:bg-stone-400'
                        }`}
                        aria-label={`Select ${item.type}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-stone-500 font-medium">
                    {currentIdx + 1} of {PAYMENT_ITEMS.length}
                  </span>
                </div>

              </div>

              {/* Accepted Badges Underneath Card */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700">
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-stone-200 shadow-2xs flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> Cash
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-stone-200 shadow-2xs flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> Debit & Credit
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-stone-200 shadow-2xs flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> MasterCard
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-blue-600" /> EBT
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-900 border border-purple-200 shadow-2xs flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-purple-600" /> Zelle (702-237-9645)
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

