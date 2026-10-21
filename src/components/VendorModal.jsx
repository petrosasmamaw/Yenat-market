import { useState } from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { X, CheckCircle, Building2, Send, MessageCircle } from 'lucide-react';

export const VendorModal = ({ isOpen, onClose }) => {
  const [partnerType, setPartnerType] = useState('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBusinessName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,42rem)] w-full flex-col overflow-hidden rounded-t-3xl border border-stone-200 bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Bottom-Sheet Drag Handle */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-800 font-bold">
              Commercial, Ceremony & Vendor Hub
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display mt-0.5">
              Wholesale & Ceremony Partnerships
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-display text-stone-900">
                Inquiry Received Successfully
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-stone-900">{contactName || businessName}</strong>. Our market manager reviews all commercial proposals, ceremony meat orders, and wholesale requests. We will reach out within 24 business hours.
              </p>
              
              <div className="pt-4 border-t border-stone-100 text-xs text-stone-600">
                Need urgent assistance for this week&apos;s food service or event? Call or WhatsApp us at{' '}
                <a href={STORE_INFO.phoneClean} className="font-bold text-stone-900 underline">
                  {STORE_INFO.phone}
                </a>.
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <span>Fastest response via WhatsApp:</span>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-800 underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>

              {/* Partnership Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  I Am Inquiring About:
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => setPartnerType('restaurant')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      partnerType === 'restaurant'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Restaurant Wholesale
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerType('ceremony-meat')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      partnerType === 'ceremony-meat'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Ceremony Meat & Roasting
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerType('delivery')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      partnerType === 'delivery'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Van Delivery Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerType('shelf-space')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      partnerType === 'shelf-space'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Retail Shelf Space
                  </button>
                </div>
              </div>

              {/* Business Name & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Business / Event Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Red Sea Bistro or Wedding Celebration"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dawit, Almaz"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(702) 555-0199"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Details & Items Requested */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Estimated Quantities or Event Details
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Need whole grass-fed sheep roasted for Saturday christening, or 50 lb berbere and daily injera crates for restaurant..."
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              {/* Trust disclaimer */}
              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Open 7 days a week: 10:00 AM – 12:00 AM Midnight. Delivery available across Las Vegas.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 min-h-[44px] flex items-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-xl transition-all shadow-2xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
