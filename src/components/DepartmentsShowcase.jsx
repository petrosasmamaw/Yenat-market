import { useState, useMemo } from 'react';
import { MARKET_ITEMS, STORE_INFO } from '../data/marketData.js';
import { ProductCard } from './MarketPage.jsx';
import { Search, Sparkles, Box, ArrowRight, Grid, Layers } from 'lucide-react';

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
      className="card card-hover group flex cursor-pointer flex-col overflow-hidden"
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-panel-2 ${signature ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {signature ? (
          <span className="absolute left-3 top-3 rounded-full bg-berbere-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-teff-50">
            Signature
          </span>
        ) : (
          item.bulkAvailable && (
            <span className="absolute right-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-forest-950">
              Wholesale
            </span>
          )
        )}
        <span className="absolute bottom-3 left-3 max-w-[85%] truncate rounded-full bg-forest-950/80 px-2.5 py-1 text-[11px] font-semibold text-teff-50 backdrop-blur-sm">
          {item.freshStatus}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap items-baseline gap-x-2 text-[12px] font-semibold text-accent">
          {item.departmentLabel}
          <span className="amharic font-medium text-muted">{item.amharicName}</span>
        </p>
        <h3 className="h-card mt-1.5">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] text-body">{item.shortDesc}</p>
        <p className="mt-4 line-clamp-4 border-l-2 border-gold-500 pl-3 text-[13.5px] leading-relaxed text-body">
          <span className="font-bold text-ink">Culinary use: </span>
          {item.culinaryUse}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-5 py-3.5 text-[13px]">
        <span className="line-clamp-2 text-[12.5px] leading-snug text-muted">{item.unitExample}</span>
        <span className="flex shrink-0 items-center gap-1 font-bold text-ink transition-colors group-hover:text-spice">
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );

  const GroupHeading = ({ num, title, sub }) => (
    <div className="mb-6 flex items-end gap-4">
      <span className="font-serif text-4xl font-semibold leading-none text-accent/40">{num}</span>
      <div>
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-0.5 text-[13px] text-muted">{sub}</p>
      </div>
      <span className="mb-2 hidden h-px flex-1 bg-line sm:block" />
    </div>
  );

  return (
    <section id="departments" className="theme-light section relative bg-teff-50">
      <div className="container-x">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">
              <span className="num">02</span>
              Market Catalog
              <span className="amharic text-[13px] tracking-normal text-accent">· የገበያ እቃዎች</span>
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
        </div>

        {/* ── Phones: 4 signature meats + Explore more products ── */}
        <div className="mt-8 md:hidden">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h3 className="text-[19px] font-extrabold text-ink">Signature Grass-Fed Cuts</h3>
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
          <p className="mt-2.5 text-center text-[13px] text-muted">{MARKET_ITEMS.length} products across 7 aisles · search by name</p>
        </div>

        {/* ── Tablet & desktop: full catalog with filters ── */}
        <div className="hidden md:block">

        {/* Toolbar */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search injera, ambasha, tibs, berbere, heineken..."
              aria-label="Search the market"
              className="h-12 w-full rounded-full border border-line bg-panel pl-11 pr-16 text-[15px] text-ink placeholder:text-muted focus:border-forest-500 focus:outline-none focus:ring-4 focus:ring-forest-500/10"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-muted hover:text-ink">
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
                className={`inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 text-[14px] font-semibold transition-colors sm:flex-none sm:px-5 ${
                  on ? 'border-forest-500 bg-forest-500 text-teff-50' : 'border-line bg-panel text-body hover:border-forest-500/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs — underline style */}
        <div className="relative mt-6 border-b border-line">
          <div className="-mx-5 flex gap-1 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0" role="tablist" aria-label="Departments">
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
                  className={`relative shrink-0 whitespace-nowrap px-3.5 py-3.5 text-[14px] font-semibold transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {cat.label}
                  <span className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-forest-500 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-10 bg-gradient-to-l from-teff-50 to-transparent sm:hidden" />
        </div>

        {/* Status line */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
          <div className="flex flex-wrap items-center gap-3">
            {isDefaultCuratedView ? (
              <>
                <span>Showing <strong className="text-ink">4 signature cuts</strong> + <strong className="text-ink">1 favorite per aisle</strong></span>
                <button type="button" onClick={() => setShowAllProducts(true)} className="inline-flex items-center gap-1.5 font-bold text-spice hover:underline underline-offset-4">
                  <Grid className="h-3.5 w-3.5" />
                  List All 20 Products
                </button>
              </>
            ) : (
              <>
                <span>Showing <strong className="text-ink">{displayedItems.length}</strong> items in catalog</span>
                {activeTab === 'all' && showAllProducts && (
                  <button type="button" onClick={() => setShowAllProducts(false)} className="inline-flex items-center gap-1.5 font-bold text-spice hover:underline underline-offset-4">
                    <Layers className="h-3.5 w-3.5" />
                    Show 1 Per Category
                  </button>
                )}
              </>
            )}
            {activeTab !== 'all' && <span>· in {categories.find((c) => c.key === activeTab)?.label}</span>}
          </div>
          <span className="hidden sm:inline">Stock updated daily at 4780 W Tropicana Ave Suite 102 · Open until 12 AM</span>
        </div>

        {/* Grid */}
        {displayedItems.length === 0 ? (
          <div className="card mt-10 px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold text-ink">No market items match your search criteria.</p>
            <p className="mt-2 text-[14px] text-muted">Try searching for "injera", "ambasha", "tibs", "berbere", or "heineken".</p>
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
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {signatureCuts.map((item) => renderCard(item, { signature: true }))}
              </div>
            </div>
            <div>
              <GroupHeading num="II" title="One Favorite From Every Aisle" sub="Bakery, coffee, spices, pantry, drinks & cultural goods" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {onePerAisle.map((item) => renderCard(item))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map((item) => renderCard(item, { signature: SIGNATURE_CUT_IDS.includes(item.id) }))}
          </div>
        )}

        {/* Curated view → full catalog CTA */}
        {isDefaultCuratedView && (
          <div className="theme-dark mt-14 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-forest-900 p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <h4 className="font-display text-2xl font-semibold text-ink">
                Looking for our full catalog of butchery cuts, grains &amp; drinks?
              </h4>
              <p className="mt-1.5 text-[14px] text-body">
                Showing our 4 signature meat cuts plus 1 favorite from every aisle. Click below to view all 20 products.
              </p>
            </div>
            <button type="button" onClick={() => setShowAllProducts(true)} className="btn btn-gold shrink-0">
              List All 20 Market Products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
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
