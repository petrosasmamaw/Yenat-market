/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SigaButcherySection } from './components/SigaButcherySection';
import { DepartmentsShowcase } from './components/DepartmentsShowcase';
import { DeliveryServiceSection } from './components/DeliveryServiceSection';
import { CelebrityReviewsSection } from './components/CelebrityReviewsSection';
import { FreshScheduleSection } from './components/FreshScheduleSection';
import { VendorWholesaleSection } from './components/VendorWholesaleSection';
import { CoffeeRitualSection } from './components/CoffeeRitualSection';
import { LocationAndHours } from './components/LocationAndHours';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { VendorModal } from './components/VendorModal';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAF7F2] text-stone-900 selection:bg-amber-300 selection:text-stone-950">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Header with Official Logo Emblem & Navigation */}
      <Header onOpenVendorModal={() => setIsVendorModalOpen(true)} />

      {/* Main Landing Page Content */}
      <main className="flex-grow pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* Hero Section with 2-second Rotating 3D Payment Showcase */}
        <HeroSection onOpenVendorModal={() => setIsVendorModalOpen(true)} />

        {/* 100% Grass-Fed Butchery & Siga Showcase with Animated Gallery */}
        <SigaButcherySection onOpenVendorModal={() => setIsVendorModalOpen(true)} />

        {/* Interactive Market Departments: Injera & Ambasha Top Sellers, Spices, Drinks & Pantry */}
        <DepartmentsShowcase
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenVendorModal={() => setIsVendorModalOpen(true)}
        />

        {/* Dedicated Yenat Mobile Delivery Van Service */}
        <DeliveryServiceSection onOpenVendorModal={() => setIsVendorModalOpen(true)} />

        {/* Celebrity Video Reviews (Helen Berhe & Biniyam Shibre) & Shop Atmosphere */}
        <CelebrityReviewsSection />

        {/* Peak Freshness Timetable / Daily Drops (Open 10 AM - 12 AM Midnight) */}
        <FreshScheduleSection />

        {/* Dedicated B2B & Wholesale Vendor Hub */}
        <VendorWholesaleSection
          onOpenVendorModal={() => setIsVendorModalOpen(true)}
        />

        {/* Coffee Ritual & Buna Ceremony Showcase */}
        <CoffeeRitualSection />

        {/* Interactive Location, Suite 102, Hours & Payment Details */}
        <LocationAndHours />

        {/* Frequently Asked Questions */}
        <FaqSection onOpenVendorModal={() => setIsVendorModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenVendorModal={() => setIsVendorModalOpen(true)} />

      {/* Bottom Sticky Bar for Mobile Users */}
      <MobileQuickBar />

      {/* Modals */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenVendorModal={() => setIsVendorModalOpen(true)}
      />

      <VendorModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
      />
    </div>
  );
}
