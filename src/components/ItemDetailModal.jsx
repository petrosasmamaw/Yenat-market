import { STORE_INFO } from '../data/marketData.js';
import { X, Phone, MapPin, Sparkles, Box, MessageCircle } from 'lucide-react';

export const ItemDetailModal = ({
  item,
  onClose,
  onOpenVendorModal,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(94dvh,46rem)] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-stone-200 bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Bottom-Sheet Drag Handle */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/90 text-stone-700 hover:text-stone-900 shadow-xs hover:bg-white transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-52 sm:h-64 bg-stone-100 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />

          {/* Overlaid Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <span>{item.departmentLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-display text-white">{item.amharicName}</span>
            </div>
            <h3 className="text-2xl font-bold font-display mt-0.5">{item.name}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          
          {/* Origin & Freshness Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/80">
            <div>
              <span className="text-stone-500 block">Origin & Sourcing</span>
              <strong className="text-stone-900 font-semibold mt-0.5 block">{item.origin}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Freshness Guarantee</span>
              <strong className="text-emerald-800 font-semibold mt-0.5 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {item.freshStatus}
              </strong>
            </div>
          </div>

          {/* Full description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              About This Specialty
            </h4>
            <p className="mt-2 text-sm text-stone-700 leading-relaxed">
              {item.fullDesc}
            </p>
          </div>

          {/* Culinary Use & Recipe Application */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>Culinary Tradition & Use</span>
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
              {item.culinaryUse}
            </p>
          </div>

          {/* Sizing & Packaging */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-2 border-t border-stone-100">
            <div>
              <span className="text-stone-500 block">Pack / Portion Size:</span>
              <div className="font-bold text-stone-900 mt-0.5">{item.unitExample}</div>
            </div>

            {item.bulkAvailable && (
              <div className="flex items-center gap-1.5 text-amber-950 bg-amber-100 px-3 py-1 rounded-lg font-semibold">
                <Box className="w-3.5 h-3.5" />
                <span>Bulk / Restaurant Quantities Available</span>
              </div>
            )}
          </div>

          {/* In-Store Location & Hours */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-stone-700">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Available daily at <strong>{STORE_INFO.address}</strong> (Open until 12 AM)</span>
            </div>
            <a
              href={STORE_INFO.phoneClean}
              className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-700"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call store: {STORE_INFO.phone}</span>
            </a>
          </div>

        </div>

        {/* Modal Footer with Safe-Area Compliance */}
        <div className="flex flex-col gap-2 border-t border-stone-200 bg-stone-50 p-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="hidden px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 sm:inline-flex sm:rounded-md active:scale-95"
          >
            Close
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] px-4 py-2.5 text-xs font-bold text-white shadow-2xs sm:min-h-0 sm:w-auto transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </a>

            {item.bulkAvailable && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenVendorModal();
                }}
                className="min-h-[44px] w-full rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:scale-[0.98] px-4 py-2.5 text-xs font-semibold text-stone-800 shadow-2xs sm:min-h-0 sm:w-auto transition-all"
              >
                Wholesale quote
              </button>
            )}

            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] px-4 py-2.5 text-xs font-bold text-stone-900 shadow-2xs sm:min-h-0 sm:w-auto transition-all"
            >
              Directions
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
