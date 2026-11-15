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
      <button type="button" className="absolute inset-0 bg-forest-950/80 backdrop-blur-md animate-fade-in" aria-label="Close" onClick={onClose} />

      <div
        className="theme-dark animate-sheet relative z-10 flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-line-strong bg-forest-900 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.95)] sm:max-h-[90vh] sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-60 shrink-0 overflow-hidden bg-forest-950 sm:h-80">
          <img src={item.image} alt={item.name} className="hero-kenburns h-full w-full object-cover" />
          <div className="photo-shade pointer-events-none absolute inset-0" />
          <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-teff-50/50 sm:hidden" />
          <button onClick={onClose} className="icon-btn absolute right-4 top-4" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-6 bottom-5 sm:inset-x-8">
            <p className="flex flex-wrap items-baseline gap-x-2 text-[12.5px] font-semibold text-gold-300">
              {item.departmentLabel}
              <span className="amharic text-ink">{item.amharicName}</span>
            </p>
            <h3 className="mt-1.5 font-display text-[1.9rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.25rem]">{item.name}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-4">
              <dt className="meta font-semibold">Origin &amp; Sourcing</dt>
              <dd className="mt-1.5 text-[14.5px] font-semibold leading-snug text-ink">{item.origin}</dd>
            </div>
            <div className="rounded-2xl border border-forest-300/25 bg-forest-300/[0.07] p-4">
              <dt className="meta font-semibold">Freshness Guarantee</dt>
              <dd className="mt-1.5 flex items-center gap-1.5 text-[14.5px] font-semibold leading-snug text-fresh">
                <Sparkles className="h-4 w-4 shrink-0" />
                {item.freshStatus}
              </dd>
            </div>
          </dl>

          <div>
            <h4 className="eyebrow">About This Specialty</h4>
            <p className="mt-3 text-[15.5px] leading-[1.75] text-body">{item.fullDesc}</p>
          </div>

          <blockquote className="rounded-r-2xl border-l-[3px] border-gold-400 bg-panel py-4 pl-5 pr-4">
            <h4 className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">Culinary Tradition &amp; Use</h4>
            <p className="mt-2 text-[1.05rem] font-medium leading-relaxed text-ink">{item.culinaryUse}</p>
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <div>
              <span className="meta block">Pack / Portion Size:</span>
              <span className="mt-1 block font-bold text-ink">{item.unitExample}</span>
            </div>
            {item.bulkAvailable && (
              <span className="chip border-gold-400/50 text-accent">
                <Box className="h-3.5 w-3.5" />
                Bulk / Restaurant Quantities Available
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-panel-2 p-4 text-[14px] sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start gap-2 text-body sm:items-center">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:mt-0" />
              <span>Available daily at <strong className="text-ink">{STORE_INFO.address}</strong> (Open until 12 AM)</span>
            </span>
            <a href={STORE_INFO.phoneClean} className="inline-flex shrink-0 items-center gap-1.5 font-bold text-accent">
              <Phone className="h-4 w-4" />
              Call store: {STORE_INFO.phone}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2.5 border-t border-line bg-forest-950 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <button type="button" onClick={onClose} className="hidden text-[14px] font-semibold text-muted hover:text-ink sm:inline">
            Close
          </button>
          <div className="grid grid-cols-2 gap-2.5 sm:flex">
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
