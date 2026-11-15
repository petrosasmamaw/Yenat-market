import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Clock, Phone, Navigation, Copy, Check, Car, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

const HOURS = [
  { day: 'Monday – Thursday', note: '' },
  { day: 'Friday – Saturday', note: 'Weekend Butchery & Fresh Ambasha' },
  { day: 'Sunday', note: 'Coffee Ritual & Groceries' },
];

const PROXIMITY = [
  { value: '8 Min', label: 'From Las Vegas Strip' },
  { value: '5 Min', label: 'From I-15 Tropicana Exit' },
  { value: 'Suite 102', label: 'Spacious Front Parking' },
];

export const LocationAndHours = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(STORE_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="theme-dark surface glow-dark section">
      <div className="container-x">
        {/* Header */}
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">06</span>
              Find Us in Las Vegas
              <span className="amharic">· አድራሻና የስራ ሰዓት</span>
            </p>
            <h2 className="h-section mt-4">
              Plan Your Visit to <span className="accent-italic">Yenat Market</span>
            </h2>
          </div>
          <p className="lead lg:col-span-5">
            Conveniently located at <strong className="font-semibold text-ink">4780 West Tropicana Ave. Suite 102</strong>, just 8 minutes west of the
            Las Vegas Strip near Decatur Blvd. We are open every day from <strong className="font-semibold text-ink">10:00 AM until 12:00 AM Midnight</strong>!
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Left — address + hours */}
          <div className="space-y-5 lg:col-span-5">
            {/* Address */}
            <Reveal className="card p-6 sm:p-7">
              <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="icon-tile">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="meta font-semibold">Physical Store Location</p>
                    <p className="h-sub mt-1">{STORE_INFO.name}</p>
                    <p className="mt-2 text-[15px] font-semibold text-ink">{STORE_INFO.address}</p>
                    <p className="text-[15px] text-body">{STORE_INFO.city}, {STORE_INFO.state} {STORE_INFO.zip}</p>
                    <p className="mt-2.5 text-[13px] font-medium leading-snug text-accent">{STORE_INFO.landmarks}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                    copied ? 'border-forest-300 bg-forest-300/15 text-fresh' : 'border-line-strong text-ink hover:border-gold-400'
                  }`}
                  aria-live="polite"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-line pt-6">
                <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <Navigation className="h-4 w-4" />
                  Directions
                </a>
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href={STORE_INFO.phoneClean} className="btn btn-ghost btn-sm col-span-2">
                  <Phone className="h-4 w-4 text-accent" />
                  Call Store: {STORE_INFO.phone}
                </a>
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal delay={0.08} className="card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="meta flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4 text-accent" />
                    Store Hours
                  </p>
                  <p className="h-card mt-2 text-[1.2rem] sm:text-[1.3rem]">Open Every Day: 10:00 AM – 12:00 AM (Midnight)</p>
                </div>
                <span className="badge badge-gold hidden shrink-0 py-1.5 sm:inline-flex">Open Late Daily</span>
              </div>
              <table className="mt-5 w-full border-t border-line text-[14px]">
                <tbody>
                  {HOURS.map(({ day, note }) => (
                    <tr key={day} className="border-b border-line last:border-b-0">
                      <td className="py-3.5 pr-4 align-top">
                        <span className="font-semibold text-ink">{day}</span>
                        {note && <span className="mt-0.5 block text-[12.5px] text-muted">({note})</span>}
                      </td>
                      <td className="py-3.5 text-right align-top font-display font-semibold tabular-nums text-accent sm:whitespace-nowrap">10:00 AM – 12:00 AM Midnight</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            {/* Parking */}
            <Reveal delay={0.14}>
              <p className="flex items-start gap-3.5 rounded-[22px] border border-forest-300/25 bg-forest-300/[0.07] px-5 py-4 text-[14px] leading-relaxed text-body">
                <Car className="mt-0.5 h-5 w-5 shrink-0 text-fresh" />
                <span>
                  <strong className="font-bold text-ink">Free Customer &amp; Commercial Parking: </strong>
                  Large open surface parking lot directly facing Suite 102. Easy drive-up staging for wholesale orders and restaurant crate pickups.
                </span>
              </p>
            </Reveal>
          </div>

          {/* Right — map */}
          <Reveal delay={0.1} className="flex flex-col lg:col-span-7">
            <div className="card flex flex-1 flex-col overflow-hidden">
              <div className="relative min-h-80 flex-1 bg-forest-950 sm:min-h-[26rem]">
                {/* map is re-tinted to night-green so it never shows up as a white block */}
                <iframe
                  title="Yenat Market Location at 4780 West Tropicana Ave Suite 102"
                  src="https://maps.google.com/maps?q=4780+West+Tropicana+Ave+Suite+102,+Las+Vegas,+NV+89103&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(150deg)_saturate(0.75)_brightness(0.92)_contrast(0.95)]"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-400/15" aria-hidden />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-5 sm:p-6">
                <div>
                  <p className="h-card text-[1.1rem]">4780 West Tropicana Ave. Suite 102</p>
                  <p className="meta mt-1">Cross-street: W Tropicana Ave &amp; S Decatur Blvd · Las Vegas, NV 89103</p>
                </div>
                <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-[14px]">
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              {PROXIMITY.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-line bg-panel px-2 py-4 text-center sm:px-4 sm:py-5">
                  <dt className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-accent sm:text-[1.75rem]">{value}</dt>
                  <dd className="mt-1 text-[11.5px] leading-snug text-muted sm:text-[12.5px]">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
