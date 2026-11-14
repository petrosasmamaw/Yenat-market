import { useState } from 'react';
import { FAQ_LIST, STORE_INFO } from '../data/marketData.js';
import { Plus, MessageCircle, Phone } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id="faq" className="theme-dark forest-glow section relative">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — sticky intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">
              <span className="num">07</span>
              Customer &amp; Partner Guidance
            </p>
            <p className="amharic mt-2 text-sm font-semibold text-accent">ተደጋግመው የሚጠየቁ ጥያቄዎች</p>
            <h2 className="h-section mt-4">
              Frequently Asked <span className="accent-gold">Questions</span>
            </h2>
            <p className="lead mt-5">
              Everything you need to know about our fresh daily baking, butchery, spices, and vendor programs.
            </p>

            <div className="mt-8 rounded-2xl border border-line p-5">
              <p className="text-[14px] text-body">
                Have a specific commercial question or seeking an unlisted ingredient? Message us on WhatsApp or call our store directly at{' '}
                <span className="font-semibold text-ink">{STORE_INFO.phone}</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm">
                  <MessageCircle className="h-4 w-4" />
                  Message us on WhatsApp
                </a>
                <a href={STORE_INFO.phoneClean} className="btn btn-ghost btn-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  {STORE_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const id = `faq-${idx}`;
              return (
                <li key={faq.question} className="border-b border-line">
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="group flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="mt-1 font-display text-sm font-semibold tabular-nums text-accent">{String(idx + 1).padStart(2, '0')}</span>
                    <span className={`flex-1 font-display text-[1.25rem] font-semibold leading-snug transition-colors sm:text-[1.4rem] ${isOpen ? 'text-gold-300' : 'text-ink group-hover:text-gold-300'}`}>
                      {faq.question}
                    </span>
                    <span className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-gold-400 bg-gold-400 text-forest-950' : 'border-line text-ink'}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    id={id}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pl-10 pr-12 text-[15.5px] leading-[1.75] text-body">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
