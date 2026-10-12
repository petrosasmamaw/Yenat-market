import React from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { Flame, Sparkles, Coffee, ShieldCheck } from 'lucide-react';

export const CoffeeRitualSection = () => {
  return (
    <section id="coffee-ceremony" className="border-b border-stone-200 bg-[#FAF7F2] py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-1 space-y-4 lg:order-1 lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                alt="Ethiopian coffee ceremony with rich black brew poured into cini cups"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-amber-800 font-bold block">Raw Green Beans</span>
                <span className="text-stone-500 mt-0.5 block">Grade 1 Washed Yirgacheffe & Sidama</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-amber-800 font-bold block">Ceremony Pottery</span>
                <span className="text-stone-500 mt-0.5 block">Hand-shaped Jebena & Cini cup sets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cultural Ceremony Steps (7 cols) */}
          <div className="order-2 space-y-5 sm:space-y-6 lg:col-span-7">
            
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
                <span>The Sacred Coffee Ceremony</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>የቡና ቁርስና ስነ-ስርዓት</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 [text-wrap:balance] sm:text-3xl md:text-4xl">
                Buna: Honoring the Birthplace of Coffee
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                In Ethiopia, coffee is never just grabbed in a hurry — it is an unhurried social ceremony of blessing, conversation, 
                and hospitality known as <em>Buna</em>. At Yenat Market, we carry everything required to perform the authentic ritual at home or in your restaurant.
              </p>
            </div>

            {/* 3 Steps of the ritual */}
            <div className="space-y-4 pt-2">
              
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold font-display text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    Pan Roasting & Scent of Frankincense
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Raw green beans are washed and pan-roasted over charcoal or flame until glossy dark brown and cracking. 
                    The fragrant smoke is carried to guests, accompanied by aromatic gum resin (Itan / Frankincense).
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200/80 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold font-display text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    The Clay Jebena Simmer
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Freshly ground beans are placed in the hand-turned black clay <em>Jebena</em> with water and brought to a gentle rolling boil. 
                    The spherical bottom allows grounds to settle naturally, creating an exquisitely smooth cup.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200/80 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold font-display text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    The Three Pours (Abol, Tona, Baraka)
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Poured in a graceful continuous stream from a height into small handleless ceramic cups (Cini). 
                    Three rounds are shared with loved ones: Abol (first, strongest), Tona (second), and Baraka (the final blessing).
                  </p>
                </div>
              </div>

            </div>

            {/* Quick in-store note */}
            <div className="text-xs text-stone-500 pt-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Full ceremonial sets, green beans, and Itan incense are located in <strong>Aisle 4</strong>.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
