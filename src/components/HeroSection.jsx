import { STORE_INFO } from '../data/marketData.js';
import { ArrowDown, Sparkles, MapPin, Clock, Phone, ShieldCheck } from 'lucide-react';

export const HeroSection = ({ onOpenVendorModal }) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-24 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-radial from-amber-50/60 via-transparent to-transparent opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Mobile-first: hero image on top */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Ethiopian Beyaynetu feast served on fresh teff injera"
                className="h-52 w-full object-cover sm:h-64 md:h-80 lg:h-[430px] lg:transition-transform lg:duration-700 lg:hover:scale-[1.02]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-stone-900/90 p-3.5 text-white backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
                  Fresh today in Las Vegas
                </div>
                <div className="mt-0.5 font-display text-sm font-semibold text-white sm:text-base">
                  100% Teff Injera & Stone-Ground Berbere
                </div>
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3 text-[11px] text-stone-300 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-medium text-emerald-300">In store now</span>
                  </div>
                  <a
                    href={STORE_INFO.phoneClean}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-white/10 px-3 font-medium text-amber-300 active:bg-white/20 sm:min-h-0 sm:bg-transparent sm:px-0 sm:justify-start"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    Call store
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-amber-200/60 bg-amber-50/80 p-3.5 text-xs sm:hidden">
              <div className="font-display font-semibold text-amber-900">Wholesale partner</div>
              <p className="mt-0.5 text-stone-600">
                Supplying 20+ Las Vegas restaurants & caterers
              </p>
            </div>
          </div>

          <div className="order-2 space-y-5 sm:space-y-6 lg:order-1 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-amber-800 sm:text-xs">
              <span className="font-display">የእናት ገበያ</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Mother&apos;s Market</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-normal text-stone-600">Las Vegas · Est. 2012</span>
            </div>

            <h1 className="font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-stone-900 [text-wrap:balance] sm:text-4xl md:text-5xl lg:text-6xl">
              The Heart of Ethiopian Flavor & Heritage in Las Vegas
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base md:text-lg">
              From <strong className="font-medium text-stone-900">100% pure teff injera</strong> baked hot every
              sunrise to stone-ground berbere, custom kitfo butchery, and ceremonial highland coffee — for home cooks,
              chefs, and wholesale partners across Southern Nevada.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#departments"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-stone-900 shadow-sm transition-all active:scale-[0.99] hover:bg-amber-300 sm:w-auto sm:rounded-md"
              >
                <span>Explore market aisles</span>
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <button
                type="button"
                onClick={onOpenVendorModal}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-2xs transition-all active:scale-[0.99] hover:bg-stone-50 sm:w-auto sm:rounded-md"
              >
                Wholesale inquiries
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 border-t border-stone-200/80 pt-5 sm:grid-cols-4 sm:gap-4">
              {[
                { icon: MapPin, title: 'Tropicana Ave', sub: '8 min from Strip' },
                { icon: Sparkles, title: 'Injera twice daily', sub: '7:30 AM & 2 PM' },
                { icon: ShieldCheck, title: 'Custom butchery', sub: 'Kitfo & tibs cuts' },
                { icon: Clock, title: 'Open 7 days', sub: '8:30 AM – 9 PM' },
              ].map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-[11px] sm:bg-transparent sm:border-0 sm:p-0 sm:text-xs"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
                    <span className="leading-tight">{title}</span>
                  </div>
                  <div className="mt-1 text-stone-500 sm:mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
