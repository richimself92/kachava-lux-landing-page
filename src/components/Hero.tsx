import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, Compass } from 'lucide-react';

interface HeroProps {
  onInquireClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onInquireClick, onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-[#132219] text-[#f3efe6] overflow-hidden pt-28 pb-16 lg:py-32">
      {/* Background Image Layer with Luxury Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85"
          alt="Kachava Lux Private Villa in Tulum"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-105"
        />
        {/* Subtle luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132219] via-[#132219]/60 to-[#132219]/70" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#132219]/30 to-[#132219]/90" />
      </div>

      {/* Decorative Golden Ambient Accent */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#ad7800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#705836]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Editorial Subheader Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1c3023]/90 border border-[#ad7800]/40 backdrop-blur-md mb-6 sm:mb-8 animate-fade-in shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ad7800] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-[#c7b79e]">
            Exclusive Curated Package • Tulum, Mexico
          </span>
        </div>

        {/* Main Headline in Refined Serif Typography */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.12] max-w-4xl text-[#f3efe6] mb-6">
          An Intimate Sanctuary <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#c7b79e]">Where Mayan Jungle</span> Meets{' '}
          <span className="text-[#ad7800] font-normal">Turquoise Sea</span>
        </h1>

        {/* Editorial Lead Paragraph */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#f3efe6]/85 font-light leading-relaxed mb-8 sm:mb-10 text-balance">
          Experience Kachava Lux in Tulum with our limited-time all-inclusive residence package. Four nights of secluded architectural elegance, a private half-day Caribbean yacht charter, in-villa gourmet chef breakfasts, round-trip airport transfers, and your curated choice of championship PGA golf or signature massages.
        </p>

        {/* Pricing Card Highlight */}
        <div className="w-full max-w-xl mx-auto mb-10 p-5 sm:p-6 rounded-sm bg-[#1c3023]/90 border border-[#ad7800]/40 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-[#c7b79e] font-medium">Limited-Time Package</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#ad7800]/20 text-[#ad7800] border border-[#ad7800]/30">
                  Save 51%
                </span>
              </div>
              <div className="flex items-baseline justify-center sm:justify-start gap-3">
                <span className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#f3efe6]">
                  $3,950 <span className="text-base font-sans font-light text-[#c7b79e]">USD</span>
                </span>
                <span className="text-sm sm:text-base text-[#c7b79e]/60 line-through">
                  $8,000 Retail Value
                </span>
              </div>
            </div>

            <div className="sm:border-l sm:border-[#264332] sm:pl-5 text-center sm:text-left">
              <span className="text-xs text-[#c7b79e] block font-light">Direct Reservation</span>
              <span className="text-xs font-medium text-[#ad7800] tracking-wide block">
                Includes All 5 Core Privileges
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12 sm:mb-14">
          <button
            onClick={onInquireClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-gradient-to-r from-[#ad7800] to-[#8a5f00] hover:from-[#c28702] hover:to-[#9e6d00] text-[#f3efe6] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl shadow-[#ad7800]/25 hover:shadow-[#ad7800]/40 hover:scale-[1.02]"
          >
            <span>Inquire For Your Dates</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm bg-[#132219]/80 hover:bg-[#1c3023] text-[#c7b79e] hover:text-[#f3efe6] border border-[#c7b79e]/30 hover:border-[#ad7800] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm"
          >
            <span>View Inclusions & Breakdown</span>
          </button>
        </div>

        {/* 5 Inclusions Fast Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-5xl border-t border-[#264332]/80 pt-8 text-left">
          <div className="p-3 rounded bg-[#132219]/60 border border-[#264332]/60">
            <span className="text-[10px] text-[#ad7800] font-semibold block uppercase tracking-wider mb-1">01. Stay</span>
            <span className="text-xs text-[#f3efe6] font-medium block">4-Night Villa Stay</span>
            <span className="text-[11px] text-[#c7b79e]/80 block">Private pool & terrace</span>
          </div>

          <div className="p-3 rounded bg-[#132219]/60 border border-[#264332]/60">
            <span className="text-[10px] text-[#ad7800] font-semibold block uppercase tracking-wider mb-1">02. Sea</span>
            <span className="text-xs text-[#f3efe6] font-medium block">Half-Day Private Yacht</span>
            <span className="text-[11px] text-[#c7b79e]/80 block">Riviera Maya cruise</span>
          </div>

          <div className="p-3 rounded bg-[#132219]/60 border border-[#264332]/60">
            <span className="text-[10px] text-[#ad7800] font-semibold block uppercase tracking-wider mb-1">03. Culinary</span>
            <span className="text-xs text-[#f3efe6] font-medium block">Gourmet In-Villa Breakfast</span>
            <span className="text-[11px] text-[#c7b79e]/80 block">Prepared by private chef</span>
          </div>

          <div className="p-3 rounded bg-[#132219]/60 border border-[#264332]/60">
            <span className="text-[10px] text-[#ad7800] font-semibold block uppercase tracking-wider mb-1">04. Arrival</span>
            <span className="text-xs text-[#f3efe6] font-medium block">VIP Airport Transfers</span>
            <span className="text-[11px] text-[#c7b79e]/80 block">Round-trip private chauffeur</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded bg-[#132219]/60 border border-[#264332]/60">
            <span className="text-[10px] text-[#ad7800] font-semibold block uppercase tracking-wider mb-1">05. Choice</span>
            <span className="text-xs text-[#f3efe6] font-medium block">Golf OR Spa Choice</span>
            <span className="text-[11px] text-[#c7b79e]/80 block">2 PGA rounds or 2 massages</span>
          </div>
        </div>
      </div>
    </section>
  );
};
