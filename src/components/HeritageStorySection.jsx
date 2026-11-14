import React from 'react';
import { Heart, Sparkles, Flame, Users } from 'lucide-react';

export const HeritageStorySection = () => {
  return (
    <section id="heritage" className="border-b border-gold-300/15 surface-spotlight py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-berbere-300">
            <span>Our Roots & Philosophy</span>
            <span aria-hidden="true" className="text-sand">·</span>
            <span>የእናት ታሪክ</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl md:text-4xl text-gold-gradient">
            "Yenat" Means Mother — The Foundation of Every Authentic Meal
          </h2>
          <p className="text-sand text-base sm:text-lg mt-4 leading-relaxed">
            In Amharic, <strong className="text-cream font-medium font-display">Yenat (የእናት)</strong> literally translates to <em>"Of the Mother."</em> 
            In Ethiopian culture, a mother’s kitchen is not merely where meals are prepared — it is the heartbeat of unconditional warmth, generous hospitality, 
            and recipes perfected across generations.
          </p>
        </div>

        {/* Story Grid with real cultural imagery & pillars */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Imagery Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-gold-300/15 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Vibrant piles of authentic Ethiopian spices including berbere and turmeric"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Cultural Quote Card */}
            <div className="p-6 rounded-2xl bg-forest-900 border border-gold-300/15">
              <p className="text-sm italic text-sand leading-relaxed">
                “When you bring home our berbere or unwrap our steaming morning injera, you aren’t just preparing dinner. You are continuing a centuries-old tradition of care, community, and maternal devotion.”
              </p>
              <div className="mt-4 pt-4 border-t border-gold-300/15 text-xs font-medium text-sand-muted flex items-center justify-between">
                <span className="font-semibold text-cream">The Yenat Market Family</span>
                <span>Tropicana Ave, Las Vegas</span>
              </div>
            </div>
          </div>

          {/* Right Content Column: 4 Authentic Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-forest-900 border border-gold-300/15 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-400/15 text-gold-300 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-cream font-display">
                Pure Stone-Ground Milling
              </h3>
              <p className="text-sm text-sand leading-relaxed">
                Never diluted with industrial fillers. Our berbere, mitmita, and shiro blends are made from mountain sun-dried chilies and native korarima milled to traditional consistency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900 border border-gold-300/15 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-forest-700/80 text-gold-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-cream font-display">
                Three-Day Natural Wild Fermentation
              </h3>
              <p className="text-sm text-sand leading-relaxed">
                Authentic injera cannot be rushed with artificial vinegar or yeast. We allow natural heirloom starters (ersho) to slowly ferment iron-rich teff for tender texture and signature sour notes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900 border border-gold-300/15 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-berbere-500/15 text-berbere-300 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-cream font-display">
                Meticulous Custom Butchery
              </h3>
              <p className="text-sm text-sand leading-relaxed">
                Kitfo is an art of trust. We source premium grass-fed beef and hand-trim every ounce of sinew on dedicated cold stations, cutting to exact order while you watch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900 border border-gold-300/15 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-400/15 text-gold-300 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-cream font-display">
                Vegas Community Gathering Hub
              </h3>
              <p className="text-sm text-sand leading-relaxed">
                More than an aisle of groceries — a crossroads where the Las Vegas diaspora, culinary students, local restaurant owners, and curious home cooks exchange recipes and advice.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
