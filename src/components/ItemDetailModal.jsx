import { useEffect } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { X, Phone, MapPin, Sparkles, Box, MessageCircle, Navigation } from 'lucide-react';

export const ItemDetailModal = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <button type="button" className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm animate-fade-in" aria-label="Close" onClick={onClose} />

      <div
        className="theme-light relative z-10 flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-teff-100 shadow-2xl animate-card-switch sm:max-h-[90vh] sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-56 shrink-0 overflow-hidden bg-forest-900 sm:h-72">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" />
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-teff-50/60 sm:hidden absolute left-1/2 top-0 -translate-x-1/2" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-teff-50/90 text-forest-900 transition-transform hover:scale-105"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="theme-dark absolute inset-x-6 bottom-5">
            <p className="flex flex-wrap items-baseline gap-x-2 text-[12.5px] font-semibold text-gold-300">
              {item.departmentLabel}
              <span className="amharic text-ink">{item.amharicName}</span>
            </p>
            <h3 className="mt-1 font-display text-3xl font-semibold text-ink">{item.name}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-7 sm:px-8">
          <dl className="grid grid-cols-1 gap-4 border-y border-line py-5 sm:grid-cols-2 sm:divide-x sm:divide-line">
            <div>
              <dt className="text-[13px] font-semibold text-muted">Origin &amp; Sourcing</dt>
              <dd className="mt-1 text-[14.5px] font-semibold text-ink">{item.origin}</dd>
            </div>
            <div className="sm:pl-5">
              <dt className="text-[13px] font-semibold text-muted">Freshness Guarantee</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[14.5px] font-semibold text-forest-500">
                <Sparkles className="h-4 w-4" />
                {item.freshStatus}
              </dd>
            </div>
          </dl>

          <div>
            <h4 className="eyebrow">About This Specialty</h4>
            <p className="mt-3 text-[15.5px] leading-[1.75] text-body">{item.fullDesc}</p>
          </div>

          <blockquote className="border-l-[3px] border-gold-500 pl-5">
            <h4 className="text-[13px] font-semibold text-spice">Culinary Tradition &amp; Use</h4>
            <p className="mt-2 text-[1.05rem] font-medium leading-relaxed text-ink">{item.culinaryUse}</p>
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <div>
              <span className="block text-[12.5px] text-muted">Pack / Portion Size:</span>
              <span className="mt-0.5 block font-bold text-ink">{item.unitExample}</span>
            </div>
            {item.bulkAvailable && (
              <span className="chip border-forest-500/40 text-forest-500">
                <Box className="h-3.5 w-3.5" />
                Bulk / Restaurant Quantities Available
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-panel-2 p-4 text-[14px] sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-body">
              <MapPin className="h-4 w-4 shrink-0 text-forest-500" />
              <span>Available daily at <strong className="text-ink">{STORE_INFO.address}</strong> (Open until 12 AM)</span>
            </span>
            <a href={STORE_INFO.phoneClean} className="inline-flex shrink-0 items-center gap-1.5 font-bold text-spice">
              <Phone className="h-4 w-4" />
              Call store: {STORE_INFO.phone}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2.5 border-t border-line bg-teff-50 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <button type="button" onClick={onClose} className="hidden text-[14px] font-semibold text-muted hover:text-ink sm:inline">
            Close
          </button>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm">
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
            <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
