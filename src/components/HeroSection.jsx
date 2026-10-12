import { ArrowDown, Sparkles, MapPin, Clock, CreditCard, ShieldCheck } from 'lucide-react';

const EBT_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdQ5fiDs1XtSfazuduF0Mh7ozVLwP4NyimaLBxeC0Zg&s=10';

export const HeroSection = ({ onOpenVendorModal }) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-24 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-radial from-amber-50/60 via-transparent to-transparent opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Unified 3D EBT card */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[22rem] sm:max-w-md [perspective:1400px]">
              <div
                className="pointer-events-none absolute -bottom-4 left-[8%] right-[8%] h-12 rounded-[50%] bg-blue-900/25 blur-2xl"
                aria-hidden
              />
              <article
                className="relative flex flex-col overflow-hidden rounded-2xl bg-blue-900 shadow-[0_28px_60px_-18px_rgba(29,78,216,0.65),0_12px_24px_-8px_rgba(15,23,42,0.35)] ring-1 ring-blue-400/25 transition-transform duration-500 will-change-transform [transform:rotateX(6deg)_rotateY(-10deg)_translateZ(0)] hover:[transform:rotateX(2deg)_rotateY(-4deg)_translateZ(0)] sm:[transform:rotateX(5deg)_rotateY(-8deg)_translateZ(0)]"
              >
                <div className="relative shrink-0 bg-blue-800 leading-[0]">
                  <img
                    src={EBT_IMAGE}
                    alt="EBT card"
                    className="block h-auto w-full"
                    loading="eager"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-blue-900"
                    aria-hidden
                  />
                </div>

                <div className="relative -mt-px flex flex-col bg-gradient-to-b from-blue-900 to-blue-950 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold uppercase tracking-[0.2em] text-white sm:text-lg">
                      EBT
                    </span>
                    <CreditCard className="h-5 w-5 shrink-0 text-amber-300" aria-hidden />
                  </div>
                  <p className="mt-2 font-display text-lg font-bold leading-tight text-white sm:text-xl">
                    We accept EBT
                  </p>
                  <p className="mt-1 text-sm text-blue-100">You can use your card at checkout.</p>
                </div>
              </article>
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
                  className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-[11px] sm:border-0 sm:bg-transparent sm:p-0 sm:text-xs"
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
