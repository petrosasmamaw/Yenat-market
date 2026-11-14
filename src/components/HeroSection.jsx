import { ArrowRight, Clock, MapPin, BadgeCheck, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

const HIGHLIGHTS = [
  { icon: Clock, label: 'Open daily', value: '10 AM – Midnight' },
  { icon: MapPin, label: 'W. Tropicana Ave', value: 'Suite 102 · Las Vegas' },
  { icon: BadgeCheck, label: 'We accept', value: 'EBT · Zelle · Cards' },
];

export const HeroSection = () => {
  return (
    <section className="theme-dark forest-glow relative isolate overflow-hidden">
      {/* ── Right: "Welcome to Yenat Market" sign — dissolves into the canopy ── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[56%]">
        <div className="hero-photo-mask absolute inset-0 overflow-hidden">
          <img
            src="/hero-yenat-sign.jpg"
            alt="Welcome to Yenat Market Las Vegas sign"
            className="hero-kenburns h-full w-full object-cover object-[50%_30%]"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/45 via-transparent to-transparent mix-blend-multiply" />
        </div>

        {/* Floating card */}
        <div className="hero-rise [animation-delay:700ms] absolute bottom-12 right-10 rounded-2xl border border-line bg-forest-950/80 p-4 backdrop-blur-md">
          <p className="text-[13px] font-semibold text-spice">Minutes from the Strip</p>
          <p className="mt-1 flex items-center gap-2 whitespace-nowrap font-display text-base font-semibold text-ink">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
            </span>
            Open today · 10 AM – 12 AM
          </p>
        </div>
      </div>

      <div className="container-x relative">
        <div className="grid items-center lg:min-h-[680px] lg:grid-cols-2 xl:min-h-[720px]">
          {/* ── Left ── */}
          <div className="py-12 text-center sm:py-16 lg:py-16 lg:pr-12 lg:text-left">
            {/* Liquid logo plate keeps the green cart visible on green */}
            <div className="hero-rise inline-block">
              <div className="liquid-logo w-56 sm:w-64 xl:w-[290px]">
                <div className="liquid-inner px-8 py-9 sm:px-10 sm:py-11">
                  <img src="/yenat-logo-cropped.png" alt="Yenat Market" className="w-full select-none mix-blend-multiply" loading="eager" />
                </div>
              </div>
            </div>

            <div className="hero-rise [animation-delay:120ms] mt-8 flex justify-center lg:justify-start">
              <p className="eyebrow">
                <span className="amharic text-[13px] font-semibold tracking-normal text-accent">{STORE_INFO.amharicName}</span>
                <span className="text-muted">/</span>
                Mother&apos;s Market
              </p>
            </div>

            <h1 className="hero-rise [animation-delay:200ms] h-display mt-4">
              A taste of Ethiopia, <span className="accent-gold">right here in Las&nbsp;Vegas.</span>
            </h1>

            <p className="hero-rise [animation-delay:280ms] lead mx-auto mt-5 max-w-[30rem] lg:mx-0">
              Fresh injera baked daily, custom-cut meat, heritage spices and Ethiopian coffee — all under one roof.
            </p>

            <div className="hero-rise [animation-delay:360ms] mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="#departments" className="btn btn-gold group w-full sm:w-auto">
                Explore the Market
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full sm:w-auto">
                <Navigation className="h-4 w-4 text-spice" />
                Get Directions
              </a>
            </div>

            <dl className="hero-rise [animation-delay:440ms] mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line text-left lg:mx-0">
              {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="min-w-0 px-3 py-4 first:pl-0 sm:px-5">
                  <dt className="flex items-center gap-1.5 text-[11.5px] font-medium text-muted">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    <span className="truncate">{label}</span>
                  </dt>
                  <dd className="mt-1 text-[13px] font-bold leading-snug text-ink sm:text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Mobile / tablet photo ── */}
          <div className="hero-photo-mask-mobile relative -mx-5 h-[440px] overflow-hidden sm:-mx-8 sm:h-[560px] lg:hidden">
            <img src="/hero-yenat-sign.jpg" alt="Welcome to Yenat Market Las Vegas sign" className="h-full w-full object-cover object-[50%_32%]" loading="eager" />
          </div>
        </div>
      </div>
      <div className="tibeb relative z-10" aria-hidden />
    </section>
  );
};
