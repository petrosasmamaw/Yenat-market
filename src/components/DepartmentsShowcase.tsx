import React, { useState, useMemo } from 'react';
import { MARKET_ITEMS, ProductItem } from '../data/marketData';
import { Search, Sparkles, Box, ArrowRight } from 'lucide-react';

interface DepartmentsShowcaseProps {
  onSelectItem: (item: ProductItem) => void;
  onOpenVendorModal: () => void;
}

type DepartmentKey = 'all' | 'injera-bakery' | 'spices' | 'butchery' | 'coffee' | 'grains-pantry' | 'cultural';

export const DepartmentsShowcase: React.FC<DepartmentsShowcaseProps> = ({
  onSelectItem,
  onOpenVendorModal,
}) => {
  const [activeTab, setActiveTab] = useState<DepartmentKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [freshOnly, setFreshOnly] = useState(false);
  const [bulkOnly, setBulkOnly] = useState(false);

  const categories = [
    { key: 'all', label: 'All Aisles' },
    { key: 'injera-bakery', label: 'Injera & Bakery' },
    { key: 'spices', label: 'Spices & Blends' },
    { key: 'butchery', label: 'Fresh Butchery' },
    { key: 'coffee', label: 'Coffee & Ritual' },
    { key: 'grains-pantry', label: 'Grains & Pantry' },
    { key: 'cultural', label: 'Cultural Goods' },
  ];

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

  return (
    <section id="departments" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span>Market Catalog</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>የገበያ እቃዎች</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display mt-2">
              Explore Our Aisle Specialties
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Hand-selected Ethiopian staples, direct agricultural imports, and daily in-house preparations. 
              Click any specialty to view culinary traditions, pairings, and preparation tips.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVendorModal}
              className="text-xs font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4 decoration-stone-300"
            >
              Need bulk restaurant supply? Talk to our team →
            </button>
          </div>
        </div>

        {/* Search & Department Segmented Tabs */}
        <div className="mt-8 space-y-4">
          
          {/* Search bar & quick toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search berbere, teff, kitfo meat, injera, jebena..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 shadow-2xs transition-all"
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
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setFreshOnly(!freshOnly)}
                className={`px-3 py-2 rounded-lg border font-medium transition-colors flex items-center gap-1.5 ${
                  freshOnly
                    ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-2xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Daily Batches</span>
              </button>

              <button
                onClick={() => setBulkOnly(!bulkOnly)}
                className={`px-3 py-2 rounded-lg border font-medium transition-colors flex items-center gap-1.5 ${
                  bulkOnly
                    ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Wholesale / Bulk Available</span>
              </button>
            </div>

          </div>

          {/* Department Segmented Controls (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key as DepartmentKey)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === cat.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count & Status */}
        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-800">{filteredItems.length}</strong> items in catalog
            {activeTab !== 'all' && <span> · in {categories.find((c) => c.key === activeTab)?.label}</span>}
          </div>
          <span className="hidden sm:inline">Stock updated daily at 4780 W Tropicana Ave</span>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
            <p className="text-stone-700 font-medium">No market items match your search criteria.</p>
            <p className="text-xs text-stone-500">Try searching for "berbere", "injera", "teff", or "kitfo".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
                setFreshOnly(false);
                setBulkOnly(false);
              }}
              className="mt-2 text-xs font-semibold text-amber-800 underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group cursor-pointer bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Fresh status tag without pill border */}
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-sm">
                      {item.freshStatus}
                    </div>

                    {item.bulkAvailable && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Wholesale
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    
                    {/* Unboxed Department metadata with separator */}
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
                    <div className="mt-3 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                      <strong className="text-stone-800 font-medium">Culinary use:</strong> {item.culinaryUse}
                    </div>

                  </div>
                </div>

                {/* Card Footer: Details CTA */}
                <div className="px-5 py-3 bg-[#FAF7F2]/60 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">{item.unitExample}</span>
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700 flex items-center gap-1 transition-colors">
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
