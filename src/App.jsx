/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SigaButcherySection } from './components/SigaButcherySection';
import { DepartmentsShowcase } from './components/DepartmentsShowcase';
import { DeliveryServiceSection } from './components/DeliveryServiceSection';
import { CelebrityReviewsSection } from './components/CelebrityReviewsSection';
import { FreshScheduleSection } from './components/FreshScheduleSection';
import { VendorWholesaleSection } from './components/VendorWholesaleSection';
import { LocationAndHours } from './components/LocationAndHours';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { MarketPage } from './components/MarketPage';

// Tiny hash router: "#/market" → Market page, anything else → home page.
// (Section anchors like "#departments" keep working on the home page.)
const getRoute = () => (window.location.hash.startsWith('#/market') ? 'market' : 'home');

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => {
      const next = getRoute();
      setRoute((prev) => {
        if (prev === 'market' && next === 'home') {
          // Coming back home: go to the linked section, or the top
          const id = window.location.hash.slice(1);
          requestAnimationFrame(() => {
            const el = id && !id.startsWith('/') ? document.getElementById(id) : null;
            if (el) el.scrollIntoView();
            else window.scrollTo({ top: 0 });
          });
        }
        return next;
      });
      setSelectedItem(null);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const openItem = useCallback((item) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  return (
    <div className="theme-dark min-h-screen flex flex-col overflow-x-hidden bg-canvas text-body">
      {route === 'market' ? (
        <MarketPage onSelectItem={openItem} />
      ) : (
        <>
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Header with Official Logo Emblem & Navigation */}
          <Header />

          {/* Main Landing Page Content */}
          <main className="flex-grow">
            {/* Hero: Big brand logo + "Welcome to Yenat Market" sign */}
            <HeroSection />

            {/* 100% Grass-Fed Butchery & Siga Showcase with Animated Gallery */}
            <SigaButcherySection />

            {/* Market Catalog — on phones: 4 signature meats + "Explore more products" */}
            <DepartmentsShowcase onSelectItem={openItem} />

            {/* Dedicated Yenat Mobile Delivery Van Service */}
            <DeliveryServiceSection />

            {/* Celebrity Video Reviews (Helen Berhe & Biniyam Shibre) & Shop Atmosphere */}
            <CelebrityReviewsSection />

            {/* Peak Freshness Timetable / Daily Drops (Open 10 AM - 12 AM Midnight) */}
            <FreshScheduleSection />

            {/* Dedicated B2B & Wholesale Vendor Hub */}
            <VendorWholesaleSection />

            {/* Interactive Location, Suite 102, Hours & Payment Details */}
            <LocationAndHours />

            {/* Frequently Asked Questions */}
            <FaqSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Bottom navigation for phones */}
      <MobileQuickBar route={route} />

      {/* Product details */}
      <ItemDetailModal item={selectedItem} onClose={closeItem} />
    </div>
  );
}
