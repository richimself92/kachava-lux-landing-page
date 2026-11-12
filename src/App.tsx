import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InclusionsSection } from './components/InclusionsSection';
import { ValueComparison } from './components/ValueComparison';
import { ExperienceChoiceSelector } from './components/ExperienceChoiceSelector';
import { ExperienceGallery } from './components/ExperienceGallery';
import { InquiryForm } from './components/InquiryForm';
import { FaqSection } from './components/FaqSection';
import { TermsDisclaimer } from './components/TermsDisclaimer';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { AdminView } from './components/AdminView';
import { ExperienceOption } from './types';
import { testConnection } from './firebase';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<ExperienceOption>('golf');

  useEffect(() => {
    // Validate Firestore client connection
    testConnection();
  }, []);

  const scrollToInquire = () => {
    const el = document.getElementById('inquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInclusions = () => {
    const el = document.getElementById('inclusions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSelector = () => {
    const el = document.getElementById('experience-choice');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#242924] flex flex-col font-sans selection:bg-[#ad7800]/20 selection:text-[#705836]">
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectInquire={scrollToInquire}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onInquireClick={scrollToInquire}
          onExploreClick={scrollToInclusions}
        />

        {/* Detailed Inclusions Section */}
        <InclusionsSection
          onGoToSelector={scrollToSelector}
          onInquire={scrollToInquire}
        />

        {/* Retail-Value Comparison Section ($8,000 Retail vs $3,950 Package) */}
        <ValueComparison
          onInquire={scrollToInquire}
        />

        {/* Interactive Golf-or-Massage Experience Selector */}
        <ExperienceChoiceSelector
          selectedChoice={selectedChoice}
          onSelectChoice={setSelectedChoice}
          onContinueToForm={scrollToInquire}
        />

        {/* Experience Imagery Gallery */}
        <ExperienceGallery />

        {/* Lead Inquiry Form with Firestore & Server Validation */}
        <InquiryForm
          selectedChoice={selectedChoice}
          onChoiceChange={setSelectedChoice}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Terms & Availability Disclaimer */}
        <TermsDisclaimer />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCTA onInquire={scrollToInquire} />

      {/* Protected Admin View / Firestore Reviewer Portal */}
      <AdminView
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
