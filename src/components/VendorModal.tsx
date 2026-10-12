import React, { useState } from 'react';
import { STORE_INFO } from '../data/marketData';
import { X, CheckCircle, Building2, Phone, Mail, Send } from 'lucide-react';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose }) => {
  const [partnerType, setPartnerType] = useState('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift local processing
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-bold">
              Commercial & Vendor Hub
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display mt-0.5">
              Partner with Yenat Market
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-display text-stone-900">
                Inquiry Received
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-stone-900">{contactName || businessName}</strong>. Our market manager reviews all commercial proposals and wholesale requests. We will reach out to you within 24 business hours at {email || phone || 'your contact coordinates'}.
              </p>
              
              <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
                Need urgent assistance for this week's food service? Call our direct store desk at{' '}
                <a href={STORE_INFO.phoneClean} className="font-semibold text-stone-900 underline">
                  {STORE_INFO.phone}
                </a>.
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md shadow-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600">
                Please provide your information below. We welcome Las Vegas restaurants, caterers, food distributors, and artisanal East African producers.
              </p>

              {/* Partnership Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  I Am Inquiring About:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPartnerType('restaurant')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      partnerType === 'restaurant'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Restaurant Wholesale
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerType('shelf-space')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      partnerType === 'shelf-space'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Retail Shelf Space
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerType('catering')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      partnerType === 'catering'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Catering / Bulk Order
                  </button>
                </div>
              </div>

              {/* Business Name & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Business / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Red Sea Bistro, Habesha Cafe"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
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
                    placeholder="e.g. Dawit, Elena"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(702) 555-0199"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
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
                    placeholder="contact@restaurant.com"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Details & Items Requested */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Details or Estimated Weekly Requirements
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Need weekly 50 lb berbere, 10 packs of daily 100% teff injera, and beef cuts for weekend service..."
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              {/* Trust disclaimer */}
              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>We respect commercial confidentiality and never share vendor information.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-2xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Partnership Proposal'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
