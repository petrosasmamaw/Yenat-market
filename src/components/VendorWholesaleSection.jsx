import React from 'react';
import { STORE_INFO } from '../data/marketData.js';
import { Building2, ShoppingBag, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const VendorWholesaleSection = ({
  onOpenVendorModal,
}) => {
  return (
    <section id="vendors" className="border-b border-stone-800 bg-stone-900 py-12 text-stone-100 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>B2B Commercial Partnerships</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>ለነጋዴዎችና ለሆቴሎች</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-3xl md:text-4xl">
            Partner with Las Vegas’ Established Ethiopian Marketplace
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3 leading-relaxed">
            Whether you are a Las Vegas restaurateur sourcing authentic culinary staples or an East African food producer 
            seeking prime retail shelf space, Yenat Market provides the supply chain consistency, community trust, and volume you need.
          </p>
        </div>

        {/* 3 Value Pillars for Vendors & Commercial Buyers */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          
          {/* Pillar 1: Restaurant Wholesale Supply */}
          <div className="bg-stone-800/80 rounded-2xl p-5 sm:p-7 border border-stone-700/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Wholesale for Restaurants & Caterers
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Consistency is everything in commercial dining. We supply 25 lb and 50 lb restaurant sacks of premium stone-ground Berbere, Shiro powder, raw Teff flour, and morning crates of fresh Teff injera.
              </p>
              
              <ul className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Scheduled standing weekly orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Volume commercial tier pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dedicated butchery cuts prepared to spec</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenVendorModal}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              Request Commercial Price Sheet
            </button>
          </div>

          {/* Pillar 2: Retail Shelf Space for Brands & Importers */}
          <div className="bg-stone-800/80 rounded-2xl p-5 sm:p-7 border border-stone-700/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center border border-emerald-400/20">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Retail Shelf Space for Importers
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Do you produce or import authentic East African packaged foods, herbal teas, cold-pressed oils, incense, or cookware? Get your products on high-traffic shelves viewed by thousands of loyal shoppers every month.
              </p>
              
              <ul className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Prominent endcap and eye-level shelf placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Temperature-controlled dry and refrigerated storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Prompt vendor settlement terms</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenVendorModal}
              className="w-full text-center px-4 py-3 sm:py-2.5 text-xs font-semibold text-white bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded-xl sm:rounded-md transition-colors min-h-[44px] sm:min-h-0"
            >
              Apply for Shelf Placement
            </button>
          </div>

          {/* Pillar 3: Reliable Logistics & Trust */}
          <div className="bg-stone-800/80 rounded-2xl p-5 sm:p-7 border border-stone-700/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center border border-blue-400/20">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Local Logistics & Storage Support
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Situated on the strategic Tropicana Avenue corridor minutes from the Strip, our facility provides hassle-free loading, pallet staging, and convenient order pickups for Las Vegas commercial partners.
              </p>
              
              <ul className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Easy drive-up loading zone on Tropicana</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Early morning pickup windows available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Flexible payment options for established accounts</span>
                </li>
              </ul>
            </div>

            <a
              href={STORE_INFO.phoneClean}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-stone-200 hover:text-white bg-transparent border border-stone-600 hover:border-stone-500 rounded-md transition-colors block"
            >
              Call Commercial Desk: (702) 240-8222
            </a>
          </div>

        </div>

        {/* Vendor Onboarding Strip */}
        <div className="mt-12 p-8 rounded-2xl bg-stone-800/50 border border-stone-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Partner Network</span>
            </div>
            <div className="text-lg font-bold text-white font-display">
              Ready to introduce your product or establish restaurant delivery?
            </div>
            <p className="text-xs text-stone-400">
              Our market manager reviews vendor applications and wholesale quotes within 24 business hours.
            </p>
          </div>

          <button
            onClick={onOpenVendorModal}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Start Partnership Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
