import React from 'react';
import { ExperienceOption } from '../types';
import { Sparkles, Trophy, Flower2, Check, ArrowDown } from 'lucide-react';

interface ExperienceChoiceSelectorProps {
  selectedChoice: ExperienceOption;
  onSelectChoice: (choice: ExperienceOption) => void;
  onContinueToForm: () => void;
}

export const ExperienceChoiceSelector: React.FC<ExperienceChoiceSelectorProps> = ({
  selectedChoice,
  onSelectChoice,
  onContinueToForm,
}) => {
  return (
    <section id="experience-choice" className="py-20 lg:py-28 bg-[#faf8f5] text-[#242924] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ad7800] block mb-3">
            Tailor Your Stay
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#132219] mb-5">
            Your Included Experience Choice
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-5" />
          <p className="text-base text-[#705836] font-light leading-relaxed">
            Every Kachava Lux package includes your choice between two championship rounds of golf at PGA Riviera Maya OR two restorative in-villa signature massage sessions. Select your preference below to pre-fill your reservation inquiry.
          </p>
        </div>

        {/* Interactive Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: PGA Riviera Maya Golf */}
          <div
            onClick={() => onSelectChoice('golf')}
            className={`relative rounded-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
              selectedChoice === 'golf'
                ? 'border-[#ad7800] bg-white shadow-2xl ring-2 ring-[#ad7800]/20'
                : 'border-[#c7b79e]/40 bg-[#f3efe6]/50 hover:border-[#ad7800]/50 shadow-md'
            }`}
          >
            {/* Top Selection Ribbon */}
            {selectedChoice === 'golf' && (
              <div className="absolute top-0 right-0 bg-[#ad7800] text-[#f3efe6] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-sm z-20 shadow-sm flex items-center gap-1.5">
                <Check className="w-3 h-3" />
                <span>Selected Preference</span>
              </div>
            )}

            <div>
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80"
                  alt="PGA Riviera Maya Golf Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-[#c7b79e] text-xs uppercase tracking-wider mb-1">
                    <Trophy className="w-4 h-4 text-[#ad7800]" />
                    <span>Option A • Championship Golf</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
                    Two Rounds at PGA Riviera Maya
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                <p className="text-sm text-[#4b554b] leading-relaxed mb-6 font-light">
                  Play the premier PGA facility in Latin America. Carved masterfully into the Mayan jungle by renowned architect Robert Trent Jones II, this 18-hole championship course integrates natural cenotes, limestone rock formations, and native mangrove forests.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Two complete 18-hole green fees included with shared golf cart</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Access to practice driving range, putting greens, and clubhouse amenities</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Preferred tee-time reservations coordinated directly by our villa concierge</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Can be enjoyed by one player over two days or two players playing together</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector Button */}
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChoice('golf');
                }}
                className={`w-full py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  selectedChoice === 'golf'
                    ? 'bg-[#ad7800] text-white shadow-md'
                    : 'bg-[#ece5d8] text-[#705836] hover:bg-[#ad7800] hover:text-white'
                }`}
              >
                {selectedChoice === 'golf' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Selected for My Package</span>
                  </>
                ) : (
                  <span>Choose PGA Golf Option</span>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Signature Massages */}
          <div
            onClick={() => onSelectChoice('massage')}
            className={`relative rounded-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
              selectedChoice === 'massage'
                ? 'border-[#ad7800] bg-white shadow-2xl ring-2 ring-[#ad7800]/20'
                : 'border-[#c7b79e]/40 bg-[#f3efe6]/50 hover:border-[#ad7800]/50 shadow-md'
            }`}
          >
            {/* Top Selection Ribbon */}
            {selectedChoice === 'massage' && (
              <div className="absolute top-0 right-0 bg-[#ad7800] text-[#f3efe6] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-sm z-20 shadow-sm flex items-center gap-1.5">
                <Check className="w-3 h-3" />
                <span>Selected Preference</span>
              </div>
            )}

            <div>
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="In-Villa Signature Massage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-[#c7b79e] text-xs uppercase tracking-wider mb-1">
                    <Flower2 className="w-4 h-4 text-[#ad7800]" />
                    <span>Option B • In-Villa Sanctuary Spa</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
                    Two Signature Massage Sessions
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                <p className="text-sm text-[#4b554b] leading-relaxed mb-6 font-light">
                  Surrender to tranquility without ever leaving your villa. Two 60-minute tailored therapeutic massage sessions performed by certified holistic therapists, utilizing cold-pressed botanical oils, aromatic Copal essences, and rhythmic restorative techniques.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Two full 60-minute custom massage treatments (Deep Tissue, Swedish, or Mayan Relaxing)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Performed in your secluded villa terrace, poolside cabana, or air-conditioned suite</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Organic botanicals, hot towels, and aromatherapy essences included</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#2e372e]">
                    <Check className="w-4 h-4 text-[#ad7800] shrink-0 mt-0.5" />
                    <span>Can be enjoyed as a couples simultaneous session or two separate appointments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector Button */}
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChoice('massage');
                }}
                className={`w-full py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  selectedChoice === 'massage'
                    ? 'bg-[#ad7800] text-white shadow-md'
                    : 'bg-[#ece5d8] text-[#705836] hover:bg-[#ad7800] hover:text-white'
                }`}
              >
                {selectedChoice === 'massage' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Selected for My Package</span>
                  </>
                ) : (
                  <span>Choose Massage Sessions Option</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation & CTA to Jump to Form */}
        <div className="text-center">
          <button
            onClick={onContinueToForm}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#705836] hover:text-[#ad7800] transition-colors group"
          >
            <span>Proceed to Reservation Form with {selectedChoice === 'golf' ? 'Golf Choice' : 'Massage Choice'}</span>
            <ArrowDown className="w-4 h-4 text-[#ad7800] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
