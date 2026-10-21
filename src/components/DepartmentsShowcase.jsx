import { useState, useMemo } from 'react';
import { MARKET_ITEMS } from '../data/marketData.js';
import { Search, Sparkles, Box, ArrowRight, Grid, Layers } from 'lucide-react';

export const DepartmentsShowcase = ({
  onSelectItem,
  onOpenVendorModal,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [freshOnly, setFreshOnly] = useState(false);
  const [bulkOnly, setBulkOnly] = useState(false);

  const categories = [
    { key: 'all-curated', label: '1 Per Aisle (Default)' },
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

  const displayedItems = useMemo(() => {
    if (isDefaultCuratedView) {
      // 1 item from each department
      const seenDepts = new Set();
      const onePerCategory = [];
      for (const item of MARKET_ITEMS) {
        if (!seenDepts.has(item.department)) {
          seenDepts.add(item.department);
          onePerCategory.push(item);
        }
      }
      return onePerCategory;
    }
    return filteredItems;
  }, [isDefaultCuratedView, filteredItems]);

  return (
    <section id="departments" className="border-b border-stone-200 bg-[#FAF7F2] py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
              <span>Market Catalog · የገበያ እቃዎች</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Fresh Daily in Suite 102</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
              Explore Our Aisle Specialties
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              From our famous 100% pure teff injera and artisanal ambasha to fresh grass-fed meat by the kilo, 
              direct imported mountain spices, cold Heineken, Habesha beers, and fine wine.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenVendorModal}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-left text-xs font-semibold text-stone-800 shadow-2xs active:bg-stone-50 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0 sm:font-medium sm:text-stone-700 sm:underline sm:underline-offset-4 sm:decoration-stone-300 hover:text-stone-900"
          >
            <span className="sm:hidden">Restaurant wholesale & ceremony meat supply → Talk to our team</span>
            <span className="hidden sm:inline">Need bulk restaurant supply or ceremony meat? Talk to our team →</span>
          </button>
        </div>

        {/* Search & Department Segmented Tabs */}
        <div className="mt-8 space-y-4">
          
          {/* Search bar & quick toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search injera, ambasha, tibs, berbere, heineken..."
                className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-base text-stone-900 shadow-2xs placeholder:text-stone-400 transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:rounded-lg sm:py-2.5 sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick interactive filter toggles */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:flex sm:items-center">
              <button
                type="button"
                onClick={() => setFreshOnly(!freshOnly)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 font-medium transition-colors sm:min-h-0 sm:rounded-lg sm:px-3 sm:py-2 ${
                  freshOnly
                    ? 'border-amber-400 bg-amber-100 text-amber-950 shadow-2xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                <span className="leading-tight">Fresh daily</span>
              </button>

              <button
                type="button"
                onClick={() => setBulkOnly(!bulkOnly)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 font-medium transition-colors sm:min-h-0 sm:rounded-lg sm:px-3 sm:py-2 ${
                  bulkOnly
                    ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:text-stone-900'
                }`}
              >
                <Box className="h-3.5 w-3.5 shrink-0" />
                <span className="leading-tight">Bulk / wholesale</span>
              </button>
            </div>

          </div>

          {/* Department Segmented Controls with Mobile Fade Hint (Buttons with click handlers) */}
          <div className="relative">
            <div className="-mx-4 flex max-w-[100vw] gap-2 overflow-x-auto border-b border-stone-200 px-4 pb-2.5 snap-x snap-mandatory scrollbar-none sm:mx-0 sm:max-w-full sm:gap-1.5 sm:px-0">
              {categories.map((cat) => {
                const isActive =
                  (cat.key === 'all-curated' && activeTab === 'all' && !showAllProducts) ||
                  (cat.key === 'all-full' && activeTab === 'all' && showAllProducts) ||
                  (cat.key === activeTab);

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleTabClick(cat.key)}
                    className={`shrink-0 snap-start px-3.5 sm:px-4 py-2.5 sm:py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors sm:rounded-lg min-h-[42px] sm:min-h-0 flex items-center justify-center ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            {/* Subtle right-edge scroll fade indicator on small mobile viewports */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-2.5 w-8 bg-gradient-to-l from-[#FAF7F2] to-transparent sm:hidden" />
          </div>

        </div>

        {/* Results Count & Status */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-2">
            {isDefaultCuratedView ? (
              <>
                <span>Showing <strong className="text-stone-800">1 specialty per category</strong> (7 departments)</span>
                <button
                  type="button"
                  onClick={() => setShowAllProducts(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-[11px] shadow-2xs transition-all active:scale-95 flex items-center gap-1"
                >
                  <Grid className="w-3 h-3" />
                  <span>List All 20 Products</span>
                </button>
              </>
            ) : (
              <>
                <span>Showing <strong className="text-stone-800">{displayedItems.length}</strong> items in catalog</span>
                {activeTab === 'all' && showAllProducts && (
                  <button
                    type="button"
                    onClick={() => setShowAllProducts(false)}
                    className="px-2.5 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-[11px] transition-colors active:scale-95 flex items-center gap-1"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Show 1 Per Category</span>
                  </button>
                )}
              </>
            )}
            {activeTab !== 'all' && <span> · in {categories.find((c) => c.key === activeTab)?.label}</span>}
          </div>
          <span className="hidden sm:inline">Stock updated daily at 4780 W Tropicana Ave Suite 102 · Open until 12 AM</span>
        </div>

        {/* Items Grid */}
        {displayedItems.length === 0 ? (
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
            <p className="text-stone-700 font-medium">No market items match your search criteria.</p>
            <p className="text-xs text-stone-500">Try searching for "injera", "ambasha", "tibs", "berbere", or "heineken".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
                setShowAllProducts(false);
                setFreshOnly(false);
                setBulkOnly(false);
              }}
              className="mt-2 text-xs font-semibold text-amber-800 underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group cursor-pointer bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-52 bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Fresh status tag */}
                    <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-sm">
                      {item.freshStatus}
                    </div>

                    {item.bulkAvailable && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Wholesale
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    
                    {/* Department metadata with separator */}
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-1">
                      <span>{item.departmentLabel}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="font-display font-normal text-stone-500">{item.amharicName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>

                    {/* Culinary note */}
                    <div className="mt-3 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                      <strong className="text-stone-900 font-semibold">Culinary use:</strong> {item.culinaryUse}
                    </div>

                  </div>
                </div>

                {/* Card Footer: Details CTA */}
                <div className="px-5 py-3.5 bg-[#FAF7F2]/80 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">{item.unitExample}</span>
                  <span className="font-bold text-stone-900 group-hover:text-amber-700 flex items-center gap-1 transition-colors">
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* If in Curated View: Banner CTA to View All 20 Products */}
        {isDefaultCuratedView && (
          <div className="mt-8 rounded-2xl bg-white p-6 border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-display font-bold text-stone-900 text-sm sm:text-base">
                Looking for our full catalog of butchery cuts, grains & drinks?
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Currently showing 1 top item from each aisle (7 items). Click below to view all 20 products.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowAllProducts(true);
              }}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              <span>List All 20 Market Products</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}

        {/* If in Full View: Button to collapse back to 1 per category */}
        {activeTab === 'all' && showAllProducts && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setShowAllProducts(false);
                document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs shadow-2xs active:scale-95 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>Collapse to 1 Specialty Per Category</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
