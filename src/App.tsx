/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HeritageStorySection } from './components/HeritageStorySection';
import { DepartmentsShowcase } from './components/DepartmentsShowcase';
import { FreshScheduleSection } from './components/FreshScheduleSection';
import { VendorWholesaleSection } from './components/VendorWholesaleSection';
import { CoffeeRitualSection } from './components/CoffeeRitualSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { VendorModal } from './components/VendorModal';
import { ProductItem } from './data/marketData';

export default function App() {
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-amber-300 selection:text-stone-950">
      {/* Top Quiet Announcement Bar */}
      <AnnouncementBar />

      {/* Top Navigation Bar adhering to the 3-Zone Contract */}
      <Header onOpenVendorModal={() => setIsVendorModalOpen(true)} />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onOpenVendorModal={() => setIsVendorModalOpen(true)} />

        {/* Heritage Story: "Yenat Means Mother" */}
        <HeritageStorySection />

        {/* Interactive Market Departments Showcase */}
        <DepartmentsShowcase
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenVendorModal={() => setIsVendorModalOpen(true)}
        />

        {/* Peak Freshness Timetable / Daily Drops */}
        <FreshScheduleSection />

        {/* Dedicated B2B & Wholesale Vendor Hub */}
        <VendorWholesaleSection
          onOpenVendorModal={() => setIsVendorModalOpen(true)}
        />

        {/* Coffee Ritual & Ceremony Showcase */}
        <CoffeeRitualSection />

        {/* Community Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* Interactive Location, Hours & Visit Details */}
        <LocationAndHours />

        {/* Frequently Asked Questions */}
        <FaqSection onOpenVendorModal={() => setIsVendorModalOpen(true)} />
      </main>

      {/* Restrained Anti-Slop Footer */}
      <Footer onOpenVendorModal={() => setIsVendorModalOpen(true)} />

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
