import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { MapPin, Clock, Phone, Navigation, Copy, Check, Car, ArrowUpRight, MessageCircle } from 'lucide-react';

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
    <section id="visit" className="theme-light grain section relative">
      <div className="container-x">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="num">06</span>
              Find Us in Las Vegas
              <span className="amharic text-[13px] tracking-normal text-accent">· አድራሻና የስራ ሰዓት</span>
            </p>
            <h2 className="h-section mt-4">
              Plan Your Visit to <span className="accent-italic">Yenat Market</span>
            </h2>
          </div>
          <p className="lead lg:col-span-5">
            Conveniently located at <strong className="text-ink">4780 West Tropicana Ave. Suite 102</strong>, just 8 minutes west of the
            Las Vegas Strip near Decatur Blvd. We are open every day from <strong className="text-ink">10:00 AM until 12:00 AM Midnight</strong>!
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — address + hours */}
          <div className="space-y-8 lg:col-span-5">
            {/* Address */}
            <div className="card p-6 sm:p-7">
              <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-900 text-gold-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-muted">Physical Store Location</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-ink">{STORE_INFO.name}</p>
                    <p className="mt-1 text-[15px] font-semibold text-ink">{STORE_INFO.address}</p>
                    <p className="text-[15px] text-body">{STORE_INFO.city}, {STORE_INFO.state} {STORE_INFO.zip}</p>
                    <p className="mt-2 text-[13px] font-medium text-accent">{STORE_INFO.landmarks}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-forest-500"
                  aria-live="polite"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-forest-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-line pt-6 sm:flex sm:flex-wrap">
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
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
                    <Clock className="h-4 w-4 text-accent" />
                    Store Hours
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-ink">Open Every Day: 10:00 AM – 12:00 AM (Midnight)</p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-forest-900 px-3 py-1 text-[12px] font-bold text-gold-300 sm:inline">Open Late Daily</span>
              </div>
              <table className="mt-4 w-full border-t border-line text-[14px]">
                <tbody>
                  {HOURS.map(({ day, note }) => (
                    <tr key={day} className="border-b border-line">
                      <td className="py-3.5 pr-4 align-top">
                        <span className="font-semibold text-ink">{day}</span>
                        {note && <span className="block text-[12.5px] text-muted">({note})</span>}
                      </td>
                      <td className="whitespace-nowrap py-3.5 text-right align-top font-bold tabular-nums text-ink">10:00 AM – 12:00 AM Midnight</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Parking */}
            <p className="flex items-start gap-3 rounded-2xl bg-panel-2 px-5 py-4 text-[14px] text-body">
              <Car className="mt-0.5 h-5 w-5 shrink-0 text-forest-500" />
              <span>
                <strong className="font-bold text-ink">Free Customer &amp; Commercial Parking: </strong>
                Large open surface parking lot directly facing Suite 102. Easy drive-up staging for wholesale orders and restaurant crate pickups.
              </span>
            </p>
          </div>

          {/* Right — map */}
          <div className="lg:col-span-7">
            <div className="card overflow-hidden">
              <div className="relative h-80 bg-panel-2 sm:h-[26rem]">
                <iframe
                  title="Yenat Market Location at 4780 West Tropicana Ave Suite 102"
                  src="https://maps.google.com/maps?q=4780+West+Tropicana+Ave+Suite+102,+Las+Vegas,+NV+89103&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0 [filter:sepia(0.25)_saturate(0.9)]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-6">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">4780 West Tropicana Ave. Suite 102</p>
                  <p className="text-[13px] text-muted">Cross-street: W Tropicana Ave &amp; S Decatur Blvd · Las Vegas, NV 89103</p>
                </div>
                <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-[14px]">
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
              {PROXIMITY.map(({ value, label }) => (
                <div key={label} className="px-3 py-5 text-center sm:px-5">
                  <dt className="font-display text-2xl font-semibold text-ink sm:text-3xl">{value}</dt>
                  <dd className="mt-1 text-[12.5px] text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
