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
    className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-panel text-left transition-all duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_40px_-26px_rgb(0_0_0/0.8)]"
  >
    <span className="relative block aspect-square overflow-hidden bg-panel-2">
      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" loading="lazy" />
      {SIGNATURE_IDS.has(item.id) && (
        <span className="badge badge-red absolute left-2 top-2 px-2 text-[9.5px]">
          Signature
        </span>
      )}
    </span>
    <span className="flex flex-1 flex-col p-3.5">
      <span className="text-[11.5px] font-semibold text-accent">{item.departmentLabel}</span>
      <span className="mt-1 line-clamp-2 font-display text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.name}</span>
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
    <div className="theme-dark surface glow-dark min-h-screen pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-16">
      {/* Sticky page bar: back · title · search · categories */}
      <div className="sticky top-0 z-30 border-b border-line bg-forest-950/90 backdrop-blur-xl">
        <div className="container-x">
          <div className="flex h-16 items-center gap-3">
            <a href="#/" className="icon-btn" aria-label="Back to home">
              <ArrowLeft className="h-5 w-5" />
            </a>
            <img src="/yenat-cart-on-dark.png" alt="" className="h-7 w-auto" />
            <div className="min-w-0 leading-tight">
              <h1 className="font-display text-[19px] font-bold tracking-[-0.015em] text-ink">Market</h1>
              <p className="text-[12px] text-muted">{MARKET_ITEMS.length} products · Fresh daily in Suite 102</p>
            </div>
          </div>

          <div className="relative pb-3">
            <Search className="pointer-events-none absolute left-4 top-6 h-[18px] w-[18px] -translate-y-1/2 text-accent" />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name…"
              aria-label="Search products by name"
              className="h-12 w-full rounded-full border border-line bg-panel pl-11 pr-12 text-[16px] text-ink placeholder:text-muted focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-6 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-panel-2 text-ink"
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
                  className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13.5px] font-semibold transition-colors ${
                    active ? 'border-gold-400 bg-gold-400 text-forest-950' : 'border-line bg-panel text-body hover:border-line-strong'
                  }`}
                >
                  {c.label}
                  <span className={`rounded-full px-1.5 text-[11px] font-bold tabular-nums ${active ? 'bg-forest-950/15 text-forest-950' : 'bg-panel-2 text-muted'}`}>
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
            <p className="mt-4 font-display text-xl font-semibold text-ink">No products found</p>
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
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.key} aria-label={s.label}>
                <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-ink sm:text-[24px]">
                    {s.label}
                    {s.amharic && <span className="amharic ml-2 text-[14px] font-semibold text-accent">{s.amharic}</span>}
                  </h2>
                  <button type="button" onClick={() => setCategory(s.key)} className="shrink-0 rounded-full border border-line-strong px-3 py-1 text-[12.5px] font-bold text-accent transition-colors hover:border-gold-400">
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
