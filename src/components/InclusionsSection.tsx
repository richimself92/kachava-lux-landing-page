import React from 'react';
import { Home, Anchor, Coffee, Car, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface InclusionsSectionProps {
  onGoToSelector: () => void;
  onInquire: () => void;
}

export const InclusionsSection: React.FC<InclusionsSectionProps> = ({ onGoToSelector, onInquire }) => {
  const inclusions = [
    {
      number: '01',
      title: 'Four-Night Villa Stay',
      subtitle: 'Exclusive Architectural Residence in Tulum',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      description:
        'Settle into a private luxury residence enveloped in lush Tulum flora. Features spacious living areas, open-air stone terraces, a private swimming pool, sun lounges, and artisan Mexican craftsmanship with organic linens and contemporary finishes.',
      details: [
        'Four consecutive nights of secluded villa accommodations',
        'Private plunge pool and expansive outdoor lounging terrace',
        'Daily housekeeping and villa upkeep',
        'High-speed Wi-Fi and bespoke bathroom amenities',
      ],
    },
    {
      number: '02',
      title: 'Half-Day Private Yacht Experience',
      subtitle: 'Caribbean Coastal Charter Along the Riviera Maya',
      icon: Anchor,
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80',
      description:
        'Embark on a four-hour private yacht cruise over crystal-clear turquoise waters. Soak up the warm Mexican sunshine, anchor at pristine reefs for snorkeling, and experience the Riviera Maya coastline in complete maritime exclusivity.',
      details: [
        '4-hour private yacht charter for your party',
        'Certified captain and private crew',
        'Snorkeling gear and safety equipment provided',
        'Cruising coastal waters and secluded scenic bays',
      ],
    },
    {
      number: '03',
      title: 'Gourmet In-Villa Breakfast',
      subtitle: 'Chef-Prepared Morning Service in Your Residence',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
      description:
        'Awaken each morning to the enticing aromas of a gourmet breakfast prepared fresh in your villa’s kitchen by a dedicated private chef. Enjoy regional seasonal tropical fruits, artisan breads, eggs prepared to your liking, and freshly pressed juices and Mexican coffee.',
      details: [
        'Prepared daily in your villa across all four mornings',
        'Custom morning menu crafted by a dedicated chef',
        'Fresh tropical fruits, artisan pastries, eggs, and local specialties',
        'Freshly squeezed juices and premium Mexican coffee & teas',
      ],
    },
    {
      number: '04',
      title: 'Round-Trip Airport Transportation',
      subtitle: 'Private Chauffeur Service (Cancun or Tulum Airport)',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      description:
        'Travel seamlessly from terminal to villa door. Your private driver greets your party upon arrival at either Cancun International Airport (CUN) or the new Tulum International Airport (TQO) in a clean, air-conditioned luxury SUV.',
      details: [
        'Private meet-and-greet curbside at airport arrival',
        'Direct luxury transfer directly to Kachava Lux in Tulum',
        'Return scheduled transfer to airport on departure day',
        'Bottled mineral water and cool towels on board',
      ],
    },
    {
      number: '05',
      title: 'Your Bespoke Experience Choice',
      subtitle: 'Either Two Golf Rounds at PGA Riviera Maya OR Two Massage Sessions',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      description:
        'Tailor your retreat with one included signature pursuit. Choose either two 18-hole green fees at the renowned PGA Riviera Maya golf club, or indulge in two rejuvenating therapeutic massage sessions in the privacy of your villa or wellness cabana.',
      details: [
        'Choice Option A: Two rounds of golf at PGA Riviera Maya (18-hole championship course)',
        'Choice Option B: Two private in-villa 60-minute massage sessions by certified therapists',
        'Advance tee times or spa appointments coordinated by your dedicated concierge',
        'Interactive selector available below to preview and specify your choice',
      ],
      isChoice: true,
    },
  ];

  return (
    <section id="inclusions" className="py-20 lg:py-28 bg-[#f3efe6] text-[#242924] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ad7800] block mb-3">
            Pure Inclusions • Exactly Specified
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#132219] mb-5">
            The Five Signature Elements of Your Stay
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-5" />
          <p className="text-base text-[#705836] font-light leading-relaxed">
            Curated exclusively for discerning travelers seeking privacy, refined comfort, and seamless coastal adventures in Tulum. Every element is pre-arranged and dedicated to your party.
          </p>
        </div>

        {/* Inclusions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {inclusions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className={`flex flex-col bg-[#faf8f5] rounded-sm border border-[#c7b79e]/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${
                  item.isChoice ? 'md:col-span-2 lg:col-span-1 border-[#ad7800]/50' : ''
                }`}
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden bg-[#132219]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132219]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#132219]/90 backdrop-blur-md text-[#ad7800] text-xs font-serif-luxury font-semibold tracking-wider border border-[#ad7800]/30">
                      {item.number}
                    </span>
                    {item.isChoice && (
                      <span className="px-2 py-0.5 rounded bg-[#ad7800] text-[#f3efe6] text-[10px] font-bold uppercase tracking-wider">
                        Curated Choice
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif-luxury text-xl font-medium text-[#f3efe6] drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#705836] mb-3">
                      <Icon className="w-4 h-4 text-[#ad7800]" />
                      <span>{item.subtitle}</span>
                    </div>

                    <p className="text-sm text-[#4b554b] leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>

                    <div className="border-t border-[#ece5d8] pt-4 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#705836] block mb-2.5">
                        Inclusion Details:
                      </span>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#2e372e] font-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#ad7800] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {item.isChoice && (
                    <div className="pt-3">
                      <button
                        onClick={onGoToSelector}
                        className="w-full py-2.5 px-4 rounded-sm bg-[#132219] hover:bg-[#1c3023] text-[#c7b79e] hover:text-[#ad7800] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#ad7800]/30 text-center"
                      >
                        Compare Golf vs. Massage Details →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Essential Inclusions Transparency Box */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#faf8f5] border-l-4 border-[#ad7800] shadow-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#ad7800] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif-luxury text-lg font-medium text-[#132219] mb-2">
                Clear Dining & Inclusions Transparency
              </h4>
              <p className="text-sm text-[#5a4833] font-light leading-relaxed mb-3">
                This package includes exactly the four nights of luxury villa stay, the half-day private yacht charter, in-villa gourmet breakfast prepared each morning by a private chef, round-trip airport transportation, and your selected golf or massage experience.
              </p>
              <p className="text-xs text-[#705836] font-medium uppercase tracking-wide">
                Important note: Lunch, dinner, alcoholic beverages, and discretionary gratuities are not included in this package. Our private concierge can arrange bespoke in-villa dinners, yacht provisioning, or dining reservations upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
