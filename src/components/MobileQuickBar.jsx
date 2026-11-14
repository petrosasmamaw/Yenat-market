import { Phone, MapPin, MessageCircle, Store, Home } from 'lucide-react';
import { STORE_INFO } from '../data/marketData.js';

const item = 'flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold transition-transform active:scale-95';

export const MobileQuickBar = ({ route = 'home' }) => {
  const onMarket = route === 'market';

  const goHome = (e) => {
    // Already on the home page → just scroll to the top
    if (!onMarket) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="theme-dark fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md md:hidden" aria-label="Mobile navigation">
      <div className="grid grid-cols-5 items-end gap-1 rounded-2xl border border-line bg-forest-950/92 p-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        <a href="#/market" aria-current={onMarket ? 'page' : undefined} className={`${item} ${onMarket ? 'text-gold-300' : 'text-ink'}`}>
          <Store className="h-[19px] w-[19px] text-gold-400" aria-hidden />
          <span className="leading-none">Market</span>
          <span className={`h-1 w-1 rounded-full ${onMarket ? 'bg-gold-400' : 'bg-transparent'}`} aria-hidden />
        </a>

        <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-berbere-300`}>
          <MessageCircle className="h-[19px] w-[19px]" aria-hidden />
          <span className="leading-none">WhatsApp</span>
          <span className="h-1 w-1" aria-hidden />
        </a>

        {/* Home — raised centre button */}
        <a href="#/" onClick={goHome} aria-current={!onMarket ? 'page' : undefined} className="flex flex-col items-center gap-1 pb-1 text-[11px] font-bold text-ink">
          <span className={`-mt-7 grid h-14 w-14 place-items-center rounded-full border-4 border-forest-950 shadow-lg transition-transform active:scale-95 ${!onMarket ? 'bg-gold-400 text-forest-950' : 'bg-forest-700 text-gold-300'}`}>
            <Home className="h-6 w-6" aria-hidden />
          </span>
          <span className="leading-none">Home</span>
        </a>

        <a href={STORE_INFO.phoneClean} className={`${item} text-ink`}>
          <Phone className="h-[19px] w-[19px] text-gold-400" aria-hidden />
          <span className="leading-none">Call</span>
          <span className="h-1 w-1" aria-hidden />
        </a>

        <a href={STORE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-ink`}>
          <MapPin className="h-[19px] w-[19px] text-gold-400" aria-hidden />
          <span className="leading-none">Visit GPS</span>
          <span className="h-1 w-1" aria-hidden />
        </a>
      </div>
    </nav>
  );
};
