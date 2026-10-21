import { useState } from 'react';
import { CELEBRITY_REVIEWS, TESTIMONIALS, STORE_INFO } from '../data/marketData.js';
import {
  Star,
  Play,
  X,
  Sparkles,
  Heart,
  Video,
  CheckCircle,
  Store,
  Users,
} from 'lucide-react';

export const CelebrityReviewsSection = () => {
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);

  return (
    <section id="reviews" className="border-b border-stone-200 bg-white py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Celebrity & Community Endorsements · የታዋቂ ሰዎች ምስክርነት</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
            Loved by Ethiopian Celebrities, Cultural Icons & Local Chefs
          </h2>

          <p className="mt-3 text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
            When renowned artists, cultural icons, and community leaders visit Las Vegas, Yenat Market is their premier stop 
            for genuine Ethiopian culinary heritage, pure grass-fed meat, and warm hospitality.
          </p>
        </div>

        {/* Celebrity Spotlight Video Cards (Balanced 2-Column Showcase) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {CELEBRITY_REVIEWS.map((celeb) => (
            <div
              key={celeb.id}
              className="group relative rounded-3xl border border-stone-200 bg-[#FAF7F2] overflow-hidden shadow-2xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Video Thumbnail Container */}
                <div className="relative h-64 sm:h-72 bg-stone-900 overflow-hidden">
                  <img
                    src={celeb.image}
                    alt={`${celeb.name} at Yenat Market Las Vegas`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      if (celeb.id === 'helen-berhe') {
                        e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinlbBtmUAnftDhs-y7P6DASy2NT48yCVPRdw_uFNOSg&s=10';
                      } else if (celeb.id === 'biniyam-shibre') {
                        e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vd95oktzqZUIoJbrE4qGVRlEWDGPxpSxkwcIWXx8cg&s=10';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-amber-400 text-stone-950 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 uppercase tracking-wider">
                    <Video className="w-3.5 h-3.5" />
                    <span>{celeb.videoBadge}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    type="button"
                    onClick={() => setSelectedCelebrity(celeb)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-400/90 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-300 transition-all border-2 border-white/80 active:scale-95"
                    aria-label={`Play review video from ${celeb.name}`}
                  >
                    <Play className="w-6 h-6 fill-stone-950 ml-1" />
                  </button>

                  {/* Bottom overlay in image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-base sm:text-lg text-white">
                        {celeb.name}
                      </span>
                      <span className="text-amber-400 font-display font-semibold text-xs sm:text-sm">
                        ({celeb.amharicName})
                      </span>
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                    </div>
                    <div className="text-xs text-stone-300">
                      {celeb.title}
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{celeb.quote}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Card Footer: Favorite Item & Watch CTA */}
              <div className="p-4 sm:p-5 bg-white border-t border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 text-[11px] block">Celebrity Favorite:</span>
                  <span className="font-bold text-stone-900">{celeb.favoriteProduct}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCelebrity(celeb)}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold transition-colors flex items-center gap-1.5 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-950" />
                  <span>Watch</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Shop Atmosphere & Community Showcase: 2-Column on Tablet & Desktop */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-[#FAF7F2] border border-stone-200 p-5 sm:p-8 lg:p-12 overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Shop Photo & Visual (5 cols on Tablet & Desktop) */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <img
                src="https://res.cloudinary.com/dkcanqmko/image/upload/v1792350716/yenat_market/store/inside_yenat_market_store.jpg"
                alt="Inside Yenat Market Ethiopian grocery shelves and fresh butchery counter in Las Vegas"
                className="w-full h-64 sm:h-72 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>Inside Our Las Vegas Store</span>
              </div>
            </div>

            {/* Atmosphere Pitch (7 cols on Tablet & Desktop) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span>Warm Ethiopian Hospitality</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-stone-900">
                "A Home Away from Home in Las Vegas"
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Step inside Yenat Market and breathe in the comforting aromas of freshly roasted Yirgacheffe coffee beans, 
                stone-ground berbere, and warm sourdough teff injera. Whether you are stocking your family pantry for the month, 
                picking up custom-cut kitfo beef for a weekend gathering, or dropping by late at night before 12 AM midnight — 
                our friendly staff welcomes you with genuine Ethiopian warmth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                  <div className="font-extrabold text-stone-900 font-display text-base sm:text-lg">10 AM – 12 AM</div>
                  <div className="text-stone-500 mt-0.5 text-[11px]">Open Daily until Midnight</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                  <div className="font-extrabold text-stone-900 font-display text-base sm:text-lg">Free Parking</div>
                  <div className="text-stone-500 mt-0.5 text-[11px]">Spacious Front Lot</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                  <div className="font-extrabold text-stone-900 font-display text-base sm:text-lg">Suite 102</div>
                  <div className="text-stone-500 mt-0.5 text-[11px]">W Tropicana & Decatur</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Regular Community Testimonials */}
        <div className="mt-12 sm:mt-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-6">
            <Users className="w-4 h-4 text-amber-700" />
            <span>Las Vegas Community & Home Cook Voices</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-stone-700 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-3">
                  <div className="font-display text-sm font-bold text-stone-900">{t.name}</div>
                  <div className="text-[11px] text-stone-500">{t.role} · {t.location}</div>
                  <div className="mt-1.5 text-[11px] font-semibold text-amber-900">
                    Weekly pick: {t.favoriteItem}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {selectedCelebrity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-stone-900 rounded-3xl border border-stone-700 overflow-hidden shadow-2xl text-white">
            
            {/* Modal Header */}
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm sm:text-base font-display">
                  {selectedCelebrity.name} ({selectedCelebrity.amharicName}) — Review & Visit
                </span>
              </div>
              <button
                onClick={() => setSelectedCelebrity(null)}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display Container */}
            <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-6 text-center">
              <img
                src={selectedCelebrity.image}
                alt={selectedCelebrity.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 space-y-3 max-w-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 fill-stone-950 ml-1" />
                </div>
                <h4 className="text-lg font-bold font-display text-white">
                  {selectedCelebrity.name}&apos;s Video Review at Yenat Market
                </h4>
                <p className="text-xs text-stone-300">
                  {selectedCelebrity.quote}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[11px] font-medium text-amber-300 border border-white/10">
                    User video upload slot ready · Contact store for media inquiries
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-400">
                Official store visit · 4780 W Tropicana Ave Suite 102, Las Vegas
              </span>
              <a
                href={STORE_INFO.phoneClean}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-colors"
              >
                Call Front Counter
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
