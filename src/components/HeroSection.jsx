import { ArrowRight, Clock, MapPin, BadgeCheck, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

const HIGHLIGHTS = [
  { icon: Clock, label: 'Open daily', value: '10 AM – Midnight' },
  { icon: MapPin, label: 'W. Tropicana Ave', value: 'Suite 102 · Las Vegas' },
  { icon: BadgeCheck, label: 'We accept', value: 'EBT · Zelle · Cards' },
];

export const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAF7F2] border-b border-stone-200/80">
      {/* Soft brand glow behind the logo */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-amber-200/40 blur-3xl" />

      {/* ── Right: Edited "Welcome to Yenat Market" sign — bleeds to the edge on desktop ── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[52%] -z-0">
        <img
          src="/hero-yenat-sign.jpg"
          alt="Welcome to Yenat Market Las Vegas sign"
          className="hero-kenburns h-full w-full object-cover object-[50%_30%]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Smooth left-to-right blend into the page */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF7F2]/90 to-transparent" />

        {/* Floating glass badge */}
        <div className="hero-rise [animation-delay:600ms] absolute bottom-10 right-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-lg shadow-stone-900/10 backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Minutes from the Strip</p>
            <p className="text-sm font-bold text-stone-900">Open today · 10 AM – 12 AM</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:min-h-[620px] xl:min-h-[680px] items-center">
          {/* ── Left: Brand & simple content ── */}
          <div className="py-10 sm:py-14 lg:py-12 lg:pr-10 text-center lg:text-left">
            <img
              src="/yenat-logo-cropped.png"
              alt="Yenat Market"
              className="hero-rise mx-auto lg:mx-0 w-64 sm:w-80 xl:w-[360px] mix-blend-multiply select-none"
              loading="eager"
            />

            <div className="hero-rise [animation-delay:120ms] mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-900">
              <span className="font-bold">{STORE_INFO.amharicName}</span>
              <span className="h-1 w-1 rounded-full bg-amber-500" />
              <span>Mother&apos;s Market</span>
            </div>

            <h1 className="hero-rise [animation-delay:200ms] mt-4 font-display text-3xl sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight text-stone-900 [text-wrap:balance]">
              A taste of Ethiopia,{' '}
              <span className="text-[#0B5D35]">right here in Las&nbsp;Vegas.</span>
            </h1>

            <p className="hero-rise [animation-delay:280ms] mx-auto lg:mx-0 mt-4 max-w-md text-base sm:text-lg leading-relaxed text-stone-600">
              Fresh injera baked daily, custom-cut meat, heritage spices and Ethiopian coffee — all under one roof.
            </p>

            <div className="hero-rise [animation-delay:360ms] mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#departments"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0B5D35] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-[#094C2B] hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore the Market
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-stone-800 transition-all hover:border-amber-400 hover:bg-white"
              >
                <Navigation className="h-4 w-4 text-amber-600" />
                Get Directions
              </a>
            </div>

            <dl className="hero-rise [animation-delay:440ms] mt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-stone-200 pt-6 text-left max-w-lg mx-auto lg:mx-0">
              {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="min-w-0">
                  <dt className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-stone-500">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden />
                    <span className="truncate">{label}</span>
                  </dt>
                  <dd className="mt-1 text-xs sm:text-sm font-bold text-stone-900 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Mobile / tablet image: flows down from the content ── */}
          <div className="lg:hidden relative -mx-4 sm:-mx-6 h-[440px] sm:h-[560px] overflow-hidden">
            <img
              src="/hero-yenat-sign.jpg"
              alt="Welcome to Yenat Market Las Vegas sign"
              className="h-full w-full object-cover object-[50%_32%]"
              loading="eager"
            />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FAF7F2] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
