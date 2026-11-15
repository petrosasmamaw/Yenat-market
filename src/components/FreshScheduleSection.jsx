import { STORE_INFO } from '../data/marketData.js';
import { Clock, Phone, Check } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

const FEATURES = ['Fresh Butchery', 'Warm Teff Injera', 'Delivery Van', 'Spices & Coffee'];

export const FreshScheduleSection = () => {
  return (
    <section id="schedule" className="theme-dark glow-night relative">
      <div className="tibeb" aria-hidden />
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left */}
          <Reveal className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-forest-900 py-2 pl-2.5 pr-4 text-[13px] font-semibold text-accent">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-400 text-forest-950">
                <Clock className="h-4 w-4" />
              </span>
              Open Daily · 10:00 AM – 12:00 AM Midnight
            </p>
            <h2 className="h-section mt-6">
              All-Day Fresh Butchery, <span className="accent-gold">Warm Injera</span> &amp; Valley-Wide Delivery
            </h2>
            <p className="lead mt-5 max-w-2xl">
              We are open every single day from 10:00 AM until midnight. Stop in for fresh 100% grass-fed meat custom-trimmed for kitfo and tibs, steaming teff injera baked continuously, stone-ground berbere, and cold Habesha beer.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 rounded-xl border border-line bg-forest-900/70 px-3 py-3 text-[13.5px] font-semibold leading-tight text-ink">
                  <Check className="h-4 w-4 shrink-0 text-fresh" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right — call ahead card: solid logo gold */}
          <Reveal delay={0.12} className="theme-gold lg:col-span-5">
            <div className="band-gold relative overflow-hidden rounded-[26px] p-7 shadow-[0_40px_70px_-40px_rgb(237_177_47/0.75)] sm:p-9">
              <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-forest-950/[0.07]" aria-hidden />
              <p className="eyebrow">Call Ahead</p>
              <h3 className="mt-4 font-display text-[1.7rem] font-bold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[1.9rem]">
                Want your cuts ready <span className="text-spice">when you arrive?</span>
              </h3>
              <p className="mt-3 text-[15.5px] font-medium leading-relaxed text-body">
                Give our front counter a call and we will have fresh cuts, injera bundles, or a ceremony lamb waiting for you.
              </p>
              <a href={STORE_INFO.phoneClean} className="btn btn-primary mt-6 w-full">
                <Phone className="h-4 w-4" />
                Call: {STORE_INFO.phone}
              </a>
              <p className="mt-4 text-center text-[12.5px] font-medium text-muted">
                {STORE_INFO.fullAddress} · Free Front Lot Parking
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="tibeb" aria-hidden />
    </section>
  );
};
