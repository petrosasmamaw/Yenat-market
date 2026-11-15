import { useState, useMemo } from 'react';
import { MARKET_ITEMS, STORE_INFO } from '../data/marketData.js';
import { ProductCard } from './MarketPage.jsx';
import { Reveal } from './Reveal.jsx';
import { Search, Sparkles, Box, ArrowRight, ArrowUpRight, Grid, Layers } from 'lucide-react';

// Signature butchery cuts shown first in the default view
const SIGNATURE_CUT_IDS = ['siga-ye-tibs', 'siga-ye-kitfo', 'siga-ye-tire', 'siga-ye-chkna'];

export const DepartmentsShowcase = ({
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [freshOnly, setFreshOnly] = useState(false);
  const [bulkOnly, setBulkOnly] = useState(false);

  const categories = [
    { key: 'all-curated', label: 'Featured (Default)' },
    { key: 'all-full', label: 'All 20 Products' },
    { key: 'injera-bakery', label: 'Injera & Bakery' },
    { key: 'butchery', label: 'Fresh Butchery (ስጋ)' },
    { key: 'coffee', label: 'Coffee & Ritual (ቡና)' },
    { key: 'spices', label: 'Heritage Spices (ቅመማ ቅመም)' },
    { key: 'drinks', label: 'Beers & Drinks (መጠጦች)' },
    { key: 'grains-pantry', label: 'Grains & Pantry' },
    { key: 'cultural', label: 'Cultural Goods' },
  ];

  const handleTabClick = (key) => {
    if (key === 'all-curated') {
      setActiveTab('all');
      setShowAllProducts(false);
    } else if (key === 'all-full') {
      setActiveTab('all');
      setShowAllProducts(true);
    } else {
      setActiveTab(key);
    }
  };

  const isDefaultCuratedView =
    activeTab === 'all' && !showAllProducts && !searchQuery.trim() && !freshOnly && !bulkOnly;

  const filteredItems = useMemo(() => {
    return MARKET_ITEMS.filter((item) => {
      // Department filter
      if (activeTab !== 'all' && item.department !== activeTab) {
        return false;
      }
      // Fresh only filter
      if (freshOnly && !item.freshStatus.toLowerCase().includes('fresh') && !item.freshStatus.toLowerCase().includes('daily')) {
        return false;
      }
      // Bulk only filter
      if (bulkOnly && !item.bulkAvailable) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchAmharic = item.amharicName.includes(query);
        const matchDesc = item.shortDesc.toLowerCase().includes(query) || item.fullDesc.toLowerCase().includes(query);
        const matchCulinary = item.culinaryUse.toLowerCase().includes(query);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchName || matchAmharic || matchDesc || matchCulinary || matchTag;
      }
      return true;
    });
  }, [activeTab, searchQuery, freshOnly, bulkOnly]);

  // Curated view = the 4 signature butchery cuts on top, then 1 item from every other aisle
  const signatureCuts = useMemo(
    () => SIGNATURE_CUT_IDS.map((id) => MARKET_ITEMS.find((item) => item.id === id)).filter(Boolean),
    []
  );

  const onePerAisle = useMemo(() => {
    const seenDepts = new Set(['butchery']);
    const picks = [];
    for (const item of MARKET_ITEMS) {
      if (!seenDepts.has(item.department)) {
        seenDepts.add(item.department);
        picks.push(item);
      }
    }
    return picks;
  }, []);

  const displayedItems = isDefaultCuratedView ? [...signatureCuts, ...onePerAisle] : filteredItems;

  const renderCard = (item, { signature = false } = {}) => (
    <article
      key={item.id}
      onClick={() => onSelectItem(item)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelectItem(item))}
      role="button"
      tabIndex={0}
      aria-label={`View details: ${item.name}`}
      className="card card-hover group flex w-full cursor-pointer flex-col overflow-hidden"
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-panel-2 ${signature ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent" aria-hidden />
        {signature ? (
          <span className="badge badge-red absolute left-3 top-3">Signature</span>
        ) : (
          item.bulkAvailable && <span className="badge badge-gold absolute right-3 top-3">Wholesale</span>
        )}
        <span className="absolute bottom-3 left-3 flex max-w-[88%] items-center gap-1.5 text-[12px] font-semibold text-teff-50">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-300" aria-hidden />
          <span className="truncate">{item.freshStatus}</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap items-baseline gap-x-2 text-[12px] font-semibold text-accent">
          {item.departmentLabel}
          <span className="amharic font-medium text-muted">{item.amharicName}</span>
        </p>
        <h3 className="h-card mt-2">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] text-body">{item.shortDesc}</p>
        <p className="mt-4 line-clamp-4 rounded-r-lg border-l-2 border-gold-400 bg-forest-950/30 py-2 pl-3 pr-2 text-[13.5px] leading-relaxed text-body">
          <span className="font-bold text-ink">Culinary use: </span>
          {item.culinaryUse}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-5 py-3.5 text-[13px]">
        <span className="line-clamp-2 text-[12.5px] leading-snug text-muted">{item.unitExample}</span>
        <span className="flex shrink-0 items-center gap-1.5 font-bold text-ink transition-colors group-hover:text-accent">
          View details
          <span className="grid h-7 w-7 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </span>
      </div>
    </article>
  );

  const GroupHeading = ({ num, title, sub }) => (
    <div className="mb-7 flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong font-serif text-xl font-semibold italic text-accent">{num}</span>
      <div>
        <h3 className="h-sub">{title}</h3>
        <p className="meta mt-1">{sub}</p>
      </div>
      <span className="hidden h-px flex-1 bg-line sm:block" />
    </div>
  );

  return (
    <section id="departments" className="theme-dark surface glow-dark section">
      <div className="container-x">

        {/* Header */}
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">
              <span className="num">02</span>
              Market Catalog
              <span className="amharic">· የገበያ እቃዎች</span>
              <span className="text-muted">/</span>
              Fresh Daily in Suite 102
            </p>
            <h2 className="h-section mt-4">
              Explore Our <span className="accent-italic">Aisle Specialties</span>
            </h2>
            <p className="lead mt-4 max-w-2xl">
              From our famous 100% pure teff injera and artisanal ambasha to fresh grass-fed meat by the kilo,
              direct imported mountain spices, cold Heineken, Habesha beers, and fine wine.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-[14px]">
              <span className="sm:hidden">Restaurant wholesale & ceremony meat → WhatsApp our team</span>
              <span className="hidden sm:inline">Need bulk restaurant supply or ceremony meat? WhatsApp our team →</span>
            </a>
          </div>
        </Reveal>

        {/* ── Phones: 4 signature meats + Explore more products ── */}
        <div className="mt-9 md:hidden">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[20px] font-bold tracking-[-0.015em] text-ink">Signature Grass-Fed Cuts</h3>
            <span className="amharic shrink-0 text-[13px] font-semibold text-accent">የንጹህ ስጋ</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {signatureCuts.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>
          <a href="#/market" className="btn btn-primary mt-6 w-full">
            Explore more products
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="meta mt-3 text-center">{MARKET_ITEMS.length} products across 7 aisles · search by name</p>
        </div>

        {/* ── Tablet & desktop: full catalog with filters ── */}
        <div className="hidden md:block">

        {/* Toolbar */}
        <div className="mt-10 rounded-[26px] border border-line bg-forest-950/35 p-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search injera, ambasha, tibs, berbere, heineken..."
                aria-label="Search the market"
                className="h-12 w-full rounded-full border border-line bg-panel pl-11 pr-16 text-[15px] text-ink placeholder:text-muted focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-accent hover:text-ink">
                  Clear
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {[
                { on: freshOnly, set: setFreshOnly, Icon: Sparkles, label: 'Fresh daily' },
                { on: bulkOnly, set: setBulkOnly, Icon: Box, label: 'Bulk / wholesale' },
              ].map(({ on, set, Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => set(!on)}
                  aria-pressed={on}
                  className={`inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-5 text-[14px] font-semibold transition-colors lg:flex-none ${
                    on ? 'border-forest-300 bg-forest-300 text-forest-950' : 'border-line bg-panel text-body hover:border-line-strong hover:text-ink'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs — pills */}
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none" role="tablist" aria-label="Departments">
            {categories.map((cat) => {
              const isActive =
                (cat.key === 'all-curated' && activeTab === 'all' && !showAllProducts) ||
                (cat.key === 'all-full' && activeTab === 'all' && showAllProducts) ||
                cat.key === activeTab;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(cat.key)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ${
                    isActive ? 'bg-gold-400 text-forest-950' : 'text-body hover:bg-panel-2 hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status line */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
          <div className="flex flex-wrap items-center gap-3">
            {isDefaultCuratedView ? (
              <>
                <span>Showing <strong className="text-ink">4 signature cuts</strong> + <strong className="text-ink">1 favorite per aisle</strong></span>
                <button type="button" onClick={() => setShowAllProducts(true)} className="inline-flex items-center gap-1.5 font-bold text-accent underline-offset-4 hover:underline">
                  <Grid className="h-3.5 w-3.5" />
                  List All 20 Products
                </button>
              </>
            ) : (
              <>
                <span>Showing <strong className="text-ink">{displayedItems.length}</strong> items in catalog</span>
                {activeTab === 'all' && showAllProducts && (
                  <button type="button" onClick={() => setShowAllProducts(false)} className="inline-flex items-center gap-1.5 font-bold text-accent underline-offset-4 hover:underline">
                    <Layers className="h-3.5 w-3.5" />
                    Show 1 Per Category
                  </button>
                )}
              </>
            )}
            {activeTab !== 'all' && <span>· in {categories.find((c) => c.key === activeTab)?.label}</span>}
          </div>
          <span className="hidden lg:inline">Stock updated daily at 4780 W Tropicana Ave Suite 102 · Open until 12 AM</span>
        </div>

        {/* Grid */}
        {displayedItems.length === 0 ? (
          <div className="card mt-10 px-6 py-16 text-center">
            <p className="h-sub">No market items match your search criteria.</p>
            <p className="meta mt-2 text-[14px]">Try searching for "injera", "ambasha", "tibs", "berbere", or "heineken".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
                setShowAllProducts(false);
                setFreshOnly(false);
                setBulkOnly(false);
              }}
              className="btn btn-primary btn-sm mt-6"
            >
              Reset all filters
            </button>
          </div>
        ) : isDefaultCuratedView ? (
          <div className="mt-12 space-y-16">
            <div>
              <GroupHeading num="I" title="Signature Grass-Fed Cuts" sub="የንጹህ ስጋ · Cut fresh to order, sold by the kilo" />
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {signatureCuts.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.07} className="flex">{renderCard(item, { signature: true })}</Reveal>
                ))}
              </div>
            </div>
            <div>
              <GroupHeading num="II" title="One Favorite From Every Aisle" sub="Bakery, coffee, spices, pantry, drinks & cultural goods" />
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {onePerAisle.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 3) * 0.07} className="flex">{renderCard(item)}</Reveal>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div key={`${activeTab}-${showAllProducts}`} className="animate-card-switch mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {displayedItems.map((item) => renderCard(item, { signature: SIGNATURE_CUT_IDS.includes(item.id) }))}
          </div>
        )}

        {/* Curated view → full catalog CTA */}
        {isDefaultCuratedView && (
          <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[26px] border border-line-strong bg-panel-2 p-7 sm:p-9 lg:flex-row lg:items-center">
            <div>
              <h4 className="h-sub">
                Looking for our full catalog of butchery cuts, grains &amp; drinks?
              </h4>
              <p className="mt-2 text-[14.5px] text-body">
                Showing our 4 signature meat cuts plus 1 favorite from every aisle. Click below to view all 20 products.
              </p>
            </div>
            <button type="button" onClick={() => setShowAllProducts(true)} className="btn btn-gold group shrink-0">
              List All 20 Market Products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </Reveal>
        )}

        {activeTab === 'all' && showAllProducts && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => {
                setShowAllProducts(false);
                document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-ghost btn-sm"
            >
              <Layers className="h-4 w-4 text-accent" />
              Collapse to 1 Specialty Per Category
            </button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
