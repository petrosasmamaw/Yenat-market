import { useMemo, useState, useEffect } from 'react';
import { MARKET_ITEMS } from '../data/marketData.js';
import { ArrowLeft, Search, X, SearchX } from 'lucide-react';

// Display order + friendly labels for each department
const CATEGORIES = [
  { key: 'butchery', label: 'Fresh Butchery', amharic: 'ስጋ' },
  { key: 'injera-bakery', label: 'Injera & Bakery', amharic: 'እንጀራ' },
  { key: 'spices', label: 'Heritage Spices', amharic: 'ቅመማ ቅመም' },
  { key: 'drinks', label: 'Beers & Drinks', amharic: 'መጠጦች' },
  { key: 'coffee', label: 'Coffee & Ritual', amharic: 'ቡና' },
  { key: 'grains-pantry', label: 'Grains & Pantry', amharic: '' },
  { key: 'cultural', label: 'Cultural Goods', amharic: '' },
];

const SIGNATURE_IDS = new Set(['siga-ye-tibs', 'siga-ye-kitfo', 'siga-ye-tire', 'siga-ye-chkna']);

export const ProductCard = ({ item, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(item)}
    className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel text-left transition-all active:scale-[0.98] hover:border-forest-500/50"
  >
    <span className="relative block aspect-square overflow-hidden bg-panel-2">
      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      {SIGNATURE_IDS.has(item.id) && (
        <span className="absolute left-2 top-2 rounded-full bg-berbere-600 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.06em] text-teff-50">
          Signature
        </span>
      )}
    </span>
    <span className="flex flex-1 flex-col p-3">
      <span className="text-[11.5px] font-semibold text-accent">{item.departmentLabel}</span>
      <span className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-ink">{item.name}</span>
      <span className="amharic mt-0.5 line-clamp-1 text-[12px] text-muted">{item.amharicName}</span>
      <span className="mt-2 line-clamp-2 text-[12px] leading-snug text-body">{item.shortDesc}</span>
    </span>
  </button>
);

export const MarketPage = ({ onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const counts = useMemo(() => {
    const c = {};
    for (const item of MARKET_ITEMS) c[item.department] = (c[item.department] || 0) + 1;
    return c;
  }, []);

  const q = query.trim().toLowerCase();

  // Live filter by product title (English or Amharic) + selected category
  const results = useMemo(
    () =>
      MARKET_ITEMS.filter(
        (item) =>
          (category === 'all' || item.department === category) &&
          (!q || item.name.toLowerCase().includes(q) || item.amharicName.includes(query.trim()))
      ),
    [q, query, category]
  );

  // Group by category when browsing everything without a search
  const grouped = category === 'all' && !q;
  const sections = useMemo(
    () =>
      CATEGORIES.map((c) => ({ ...c, items: results.filter((i) => i.department === c.key) })).filter((s) => s.items.length),
    [results]
  );

  const chips = [{ key: 'all', label: 'All', count: MARKET_ITEMS.length }, ...CATEGORIES.map((c) => ({ ...c, count: counts[c.key] || 0 }))];
  const activeLabel = chips.find((c) => c.key === category)?.label;

  return (
    <div className="theme-light min-h-screen bg-teff-100 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-16">
      {/* Sticky page bar: back · title · search · categories */}
      <div className="sticky top-0 z-30 border-b border-line bg-teff-50/95 backdrop-blur-md">
        <div className="container-x">
          <div className="flex h-14 items-center gap-3">
            <a href="#/" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink" aria-label="Back to home">
              <ArrowLeft className="h-5 w-5" />
            </a>
            <img src="/yenat-cart-mark.png" alt="" className="h-7 w-auto" />
            <div className="min-w-0 leading-tight">
              <h1 className="text-[18px] font-extrabold text-ink">Market</h1>
              <p className="text-[12px] text-muted">{MARKET_ITEMS.length} products · Fresh daily in Suite 102</p>
            </div>
          </div>

          <div className="relative pb-3">
            <Search className="pointer-events-none absolute left-4 top-[22px] h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name…"
              aria-label="Search products by name"
              className="h-11 w-full rounded-full border border-line bg-panel pl-11 pr-11 text-[16px] text-ink placeholder:text-muted focus:border-forest-500 focus:outline-none focus:ring-4 focus:ring-forest-500/10 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-[22px] grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-panel-2 text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none sm:mx-0 sm:px-0" role="tablist" aria-label="Categories">
            {chips.map((c) => {
              const active = category === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={(e) => {
                    setCategory(c.key);
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  }}
                  className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13.5px] font-semibold transition-colors ${
                    active ? 'border-forest-500 bg-forest-500 text-teff-50' : 'border-line bg-panel text-body'
                  }`}
                >
                  {c.label}
                  <span className={`rounded-full px-1.5 text-[11px] font-bold tabular-nums ${active ? 'bg-teff-50/20 text-teff-50' : 'bg-panel-2 text-muted'}`}>
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-x pt-5">
        {/* Result line */}
        <p className="mb-4 text-[13px] text-muted" aria-live="polite">
          {q ? (
            <>
              <strong className="text-ink">{results.length}</strong> {results.length === 1 ? 'result' : 'results'} for “<span className="text-ink">{query.trim()}</span>”
              {category !== 'all' && <> in {activeLabel}</>}
            </>
          ) : (
            <>
              Showing <strong className="text-ink">{results.length}</strong> {category === 'all' ? 'products' : `in ${activeLabel}`}
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-line bg-panel px-6 py-14 text-center">
            <SearchX className="h-10 w-10 text-muted" />
            <p className="mt-4 text-lg font-bold text-ink">No products found</p>
            <p className="mt-1 text-[14px] text-muted">Try another name, like “injera”, “tibs” or “berbere”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="btn btn-primary btn-sm mt-6"
            >
              Clear search
            </button>
          </div>
        ) : grouped ? (
          <div className="space-y-9">
            {sections.map((s) => (
              <section key={s.key} aria-label={s.label}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h2 className="text-[19px] font-extrabold text-ink">
                    {s.label}
                    {s.amharic && <span className="amharic ml-2 text-[14px] font-semibold text-accent">{s.amharic}</span>}
                  </h2>
                  <button type="button" onClick={() => setCategory(s.key)} className="shrink-0 text-[13px] font-bold text-spice">
                    See {s.items.length}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {s.items.map((item) => (
                    <ProductCard key={item.id} item={item} onSelect={onSelectItem} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {results.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
