import { useState } from 'react';
import { FAQ_LIST, STORE_INFO } from '../data/marketData.js';
import { Plus, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id="faq" className="theme-moss surface weave-left glow-moss section">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — sticky intro */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow">
              <span className="num">07</span>
              Customer &amp; Partner Guidance
            </p>
            <p className="amharic mt-3 text-[15px] font-semibold text-accent">ተደጋግመው የሚጠየቁ ጥያቄዎች</p>
            <h2 className="h-section mt-4">
              Frequently Asked <span className="accent-gold">Questions</span>
            </h2>
            <p className="lead mt-5">
              Everything you need to know about our fresh daily baking, butchery, spices, and vendor programs.
            </p>

            <div className="card mt-8 p-5 sm:p-6">
              <p className="text-[14.5px] leading-relaxed text-body">
                Have a specific commercial question or seeking an unlisted ingredient? Message us on WhatsApp or call our store directly at{' '}
                <span className="font-semibold text-ink">{STORE_INFO.phone}</span>.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
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
          </Reveal>
        </div>

        {/* Right — accordion */}
        <div className="lg:col-span-8">
          <ul className="space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const id = `faq-${idx}`;
              return (
                <Reveal
                  as="li"
                  key={faq.question}
                  delay={Math.min(idx, 5) * 0.05}
                  className={`rounded-[20px] border transition-colors duration-300 ${
                    isOpen ? 'border-line-strong bg-panel' : 'border-line bg-panel/55 hover:border-line-strong'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="group flex w-full items-start gap-4 px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
                  >
                    <span className="mt-1 font-display text-[13px] font-semibold tabular-nums text-accent">{String(idx + 1).padStart(2, '0')}</span>
                    <span className={`flex-1 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.012em] transition-colors sm:text-[1.3rem] ${isOpen ? 'text-gold-300' : 'text-ink group-hover:text-gold-300'}`}>
                      {faq.question}
                    </span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-gold-400 bg-gold-400 text-forest-950' : 'border-line-strong text-ink group-hover:border-gold-400'}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    id={id}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-[15px] leading-[1.75] text-body sm:pb-7 sm:pl-[4.25rem] sm:pr-16 sm:text-[15.5px]">{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
