import { STORE_INFO } from '../data/marketData.js';
import { Clock, Phone, Check } from 'lucide-react';

const FEATURES = ['Fresh Butchery', 'Warm Teff Injera', 'Delivery Van', 'Spices & Coffee'];

export const FreshScheduleSection = () => {
  return (
    <section id="schedule" className="theme-dark forest-deep relative">
      <div className="tibeb" aria-hidden />
      <div className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
              <Clock className="h-4 w-4" />
              Open Daily · 10:00 AM – 12:00 AM Midnight
            </p>
            <h2 className="h-section mt-4">
              All-Day Fresh Butchery, <span className="accent-gold">Warm Injera</span> &amp; Valley-Wide Delivery
            </h2>
            <p className="lead mt-5 max-w-2xl">
              We are open every single day from 10:00 AM until midnight. Stop in for fresh 100% grass-fed meat custom-trimmed for kitfo and tibs, steaming teff injera baked continuously, stone-ground berbere, and cold Habesha beer.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 border-t border-line pt-3 text-[14px] font-semibold text-ink">
                  <Check className="h-4 w-4 shrink-0 text-gold-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — call ahead card (cream on green for contrast) */}
          <div className="theme-light lg:col-span-5">
            <div className="rounded-[24px] bg-teff-50 p-7 sm:p-9">
              <p className="eyebrow">Call Ahead</p>
              <h3 className="mt-3 font-display text-[1.6rem] font-bold leading-tight text-ink">
                Want your cuts ready <span className="text-spice">when you arrive?</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Give our front counter a call and we will have fresh cuts, injera bundles, or a ceremony lamb waiting for you.
              </p>
              <a href={STORE_INFO.phoneClean} className="btn btn-primary mt-6 w-full">
                <Phone className="h-4 w-4" />
                Call: {STORE_INFO.phone}
              </a>
              <p className="mt-4 text-center text-[12.5px] text-muted">
                {STORE_INFO.fullAddress} · Free Front Lot Parking
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tibeb" aria-hidden />
    </section>
  );
};
