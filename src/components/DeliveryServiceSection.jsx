import { STORE_INFO } from '../data/marketData.js';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building2,
  Home,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';

export const DeliveryServiceSection = ({ onOpenVendorModal }) => {
  return (
    <section id="delivery-service" className="border-b border-stone-200 bg-[#FAF7F2] py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
            <Truck className="w-4 h-4 text-amber-700" />
            <span>Mobile Service · የቤትና የሬስቶራንት ማድረስ</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Dedicated Van</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
            Yenat Market Delivery Van — Fast Home & Restaurant Supply
          </h2>

          <p className="mt-3 text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Need fresh grass-fed meat by the kilo, warm daily teff injera, or bulk wholesale restaurant supplies delivered 
            directly to your door? Our dedicated Yenat delivery van operates throughout the Las Vegas valley.
          </p>
        </div>

        {/* Van Feature Grid: 2-Column on Tablet & Desktop */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Delivery Van Image Showcase (6 cols on Tablet & Desktop) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-white shadow-md group">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/v1792350713/yenat_market/delivery/yenat_real_delivery_van.jpg"
                alt="Yenat Market delivery van delivering fresh Ethiopian groceries and meat across Las Vegas"
                className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              {/* Badge on Van Image */}
              <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" />
                <span>Yenat Mobile Delivery Van</span>
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <div className="text-sm sm:text-base font-bold font-display">
                  Serving Homes, Restaurants & Event Venues Valley-Wide
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  Spring Valley · Summerlin · Henderson · North Las Vegas · Strip Area
                </div>
              </div>
            </div>

            {/* Quick Van Info Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Temperature-controlled transport for meat and injera boxes.</span>
              </div>
              <span className="shrink-0 font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded text-[11px] self-start sm:self-auto">
                Daily Scheduled Runs
              </span>
            </div>
          </div>

          {/* Right Column: 2 Delivery Streams (Homes & Restaurants) (6 cols on Tablet & Desktop) */}
          <div className="md:col-span-6 space-y-4 sm:space-y-5">
            
            {/* Stream 1: Restaurant & Caterer Wholesale Delivery */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-amber-800">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
                    Restaurant Wholesale & Commercial Crates
                  </h3>
                  <div className="text-xs text-stone-500">Scheduled drops for Las Vegas Ethiopian dining spots</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We deliver standing bulk orders directly to local kitchens. Daily warm crates of 100% pure teff injera, 
                25 lb sacks of stone-ground berbere, shiro, certified teff flour, and custom-cut grass-fed meat packages.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-stone-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Standing weekly routes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Wholesale bulk discounts</span>
                </div>
              </div>
            </div>

            {/* Stream 2: Family & Event Home Delivery */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Home className="w-5 h-5 text-emerald-900" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
                    Home & Ceremony Event Delivery
                  </h3>
                  <div className="text-xs text-stone-500">Fresh groceries & celebratory meat brought to your door</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Hosting a family dinner, birthday, holiday feast, or wedding ceremony? Order fresh grass-fed tibs, kitfo, or tire meat by the kilo, 
                or whole &amp; half sheep and goats delivered to your house, along with fresh ambasha, berbere, Ethiopian beer, and wine without leaving your home.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-stone-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Whole &amp; half sheep / goat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zelle &amp; Cash on delivery</span>
                </div>
              </div>
            </div>

            {/* Direct Van Dispatch Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Van Dispatch: (702) 240-8222</span>
              </a>

              <a
                href={STORE_INFO.phoneClean}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs shadow-2xs transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Call Dispatch Desk</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
