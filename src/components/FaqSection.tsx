import React, { useState } from 'react';
import { FAQ_LIST } from '../data/marketData';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  onOpenVendorModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenVendorModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
            <span>Customer & Partner Guidance</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>ተደጋግመው የሚጠየቁ ጥያቄዎች</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display mt-2 [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Everything you need to know about our fresh daily baking, butchery, spices, and vendor programs.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-stone-200 overflow-hidden bg-[#FAF7F2]/60 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-display font-semibold text-stone-900 hover:text-amber-900 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Strip */}
        <div className="mt-10 text-center text-xs text-stone-500">
          <span>Have a specific commercial question or seeking an unlisted ingredient? </span>
          <button
            onClick={onOpenVendorModal}
            className="text-amber-800 font-semibold hover:underline underline-offset-4"
          >
            Submit an inquiry online
          </button>
          <span> or call our store desk directly at (702) 240-8222.</span>
        </div>

      </div>
    </section>
  );
};
