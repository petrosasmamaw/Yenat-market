import { ArrowRight, Clock, MapPin, BadgeCheck, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';
import { Rise } from './Reveal.jsx';

const HIGHLIGHTS = [
  { icon: Clock, label: 'Open daily', value: '10 AM – Midnight' },
  { icon: MapPin, label: 'W. Tropicana Ave', value: 'Suite 102 · Las Vegas' },
  { icon: BadgeCheck, label: 'We accept', value: 'EBT · Zelle · Cards' },
];

// Running band under the hero — words already used across the page
const BAND = ['Fresh Butchery', 'Warm Teff Injera', 'Delivery Van', 'Spices & Coffee', STORE_INFO.amharicName, 'Mother’s Market'];

export const HeroSection = () => {
  return (
    <section className="theme-dark surface glow-dark relative overflow-hidden">
      <div className="container-x">
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20 xl:gap-16">
          {/* ── Left: brand + message ── */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <Rise>
              <img
                src="/yenat-logo-on-dark.png"
                alt="Yenat Market"
                className="mx-auto w-44 select-none sm:w-52 lg:mx-0 xl:w-60"
                loading="eager"
              />
            </Rise>

            <Rise delay={0.1} className="mt-8 flex justify-center lg:justify-start">
              <p className="eyebrow">
                <span className="amharic">{STORE_INFO.amharicName}</span>
                <span className="text-muted">/</span>
                Mother&apos;s Market
              </p>
            </Rise>

            <Rise as="h1" delay={0.18} className="h-display mt-5">
              A taste of Ethiopia, <span className="accent-gold">right here in Las&nbsp;Vegas.</span>
            </Rise>

            <Rise as="p" delay={0.26} className="lead mx-auto mt-6 max-w-[32rem] lg:mx-0">
              Fresh injera baked daily, custom-cut meat, heritage spices and Ethiopian coffee — all under one roof.
            </Rise>

            <Rise delay={0.34} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="#departments" className="btn btn-gold group w-full sm:w-auto">
                Explore the Market
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full sm:w-auto">
                <Navigation className="h-4 w-4 text-accent" />
                Get Directions
              </a>
            </Rise>

            <Rise as="dl" delay={0.42} className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-2 text-left sm:gap-3 lg:mx-0">
              {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="min-w-0 rounded-2xl border border-line bg-forest-950/40 px-3 py-3.5 sm:px-4 sm:py-4">
                  <dt className="flex items-start gap-1.5 text-[11.5px] font-medium leading-tight text-muted">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    <span>{label}</span>
                  </dt>
                  <dd className="mt-1.5 font-display text-[13px] font-semibold leading-snug text-ink sm:text-[15px]">{value}</dd>
                </div>
              ))}
            </Rise>
          </div>

          {/* ── Right: the "Welcome to Yenat Market" sign in an arched window ── */}
          <Rise delay={0.2} y={36} className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:col-span-5 lg:max-w-none">
            {/* soft gold halo */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gold-400/10 blur-3xl" aria-hidden />

            <div className="arch-ring p-[3px] shadow-[0_50px_80px_-40px_rgb(0_0_0/0.9)]">
              <div className="arch relative aspect-[4/5] overflow-hidden bg-forest-950">
                <img
                  src="/hero-yenat-sign.jpg"
                  alt="Welcome to Yenat Market Las Vegas sign"
                  className="hero-kenburns h-full w-full object-cover object-[50%_36%]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating card */}
            <div className="floaty absolute -bottom-5 left-1/2 w-max max-w-[92%] -translate-x-1/2 lg:-left-10 lg:bottom-10 lg:translate-x-0">
              <div className="rounded-2xl border border-line-strong bg-forest-950/90 px-4 py-3.5 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Minutes from the Strip</p>
                <p className="mt-1.5 flex items-center gap-2.5 whitespace-nowrap font-display text-[15px] font-semibold text-ink sm:text-base">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-300 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-300" />
                  </span>
                  Open today · 10 AM – 12 AM
                </p>
              </div>
            </div>

            {/* brand-colour beads */}
            <span className="floaty-slow absolute -right-2 top-[18%] hidden h-5 w-5 rotate-45 rounded-[5px] bg-berbere-500 sm:block lg:-right-4" aria-hidden />
            <span className="floaty absolute -left-3 top-[34%] hidden h-3.5 w-3.5 rounded-full bg-gold-400 sm:block" aria-hidden />
          </Rise>
        </div>
      </div>

      {/* ── Gold running band ── */}
      <div className="theme-gold band-gold marquee relative mt-6 overflow-hidden border-y border-forest-950/20 py-3.5 lg:mt-0" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center">
              {BAND.map((word) => (
                <span key={word} className="flex items-center">
                  <span className={`px-6 text-[15px] font-bold uppercase tracking-[0.12em] text-ink sm:px-8 sm:text-[17px] ${word === STORE_INFO.amharicName ? 'amharic text-[17px] sm:text-[19px]' : 'font-display'}`}>
                    {word}
                  </span>
                  <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-berbere-600" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
