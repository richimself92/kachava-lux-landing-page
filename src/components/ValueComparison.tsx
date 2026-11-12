import React from 'react';
import { Check, ShieldCheck, ArrowRight, DollarSign, Sparkles } from 'lucide-react';

interface ValueComparisonProps {
  onInquire: () => void;
}

export const ValueComparison: React.FC<ValueComparisonProps> = ({ onInquire }) => {
  const lineItems = [
    {
      item: 'Four-Night Luxury Villa Stay',
      description: 'Private Tulum architectural villa, private pool, secluded grounds, daily housekeeping ($1,200/night)',
      retail: 4800,
      included: true,
    },
    {
      item: 'Half-Day Private Yacht Charter',
      description: '4-hour private Caribbean sea charter, certified captain, deck crew, fuel, and snorkel gear',
      retail: 1800,
      included: true,
    },
    {
      item: 'Gourmet In-Villa Breakfast (4 mornings)',
      description: 'Private chef morning service, organic fruits, artisan baked goods, fresh juice, bespoke entrees',
      retail: 600,
      included: true,
    },
    {
      item: 'Round-Trip Private Airport Chauffeur',
      description: 'Dedicated private luxury SUV transfer to/from Cancun (CUN) or Tulum (TQO) International Airport',
      retail: 400,
      included: true,
    },
    {
      item: 'Golf or Massage Experience Choice',
      description: 'Either two rounds at PGA Riviera Maya OR two 60-minute in-villa therapeutic massage sessions',
      retail: 400,
      included: true,
    },
  ];

  const totalRetail = lineItems.reduce((acc, curr) => acc + curr.retail, 0); // 8000
  const packagePrice = 3950;
  const savings = totalRetail - packagePrice; // 4050

  return (
    <section id="value" className="py-20 lg:py-28 bg-[#132219] text-[#f3efe6] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#ad7800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#705836]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ad7800] block mb-3">
            Financial Transparency
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#f3efe6] mb-5">
            Stated Retail Value vs. Package Privilege
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-5" />
          <p className="text-base text-[#c7b79e] font-light leading-relaxed">
            By bundling direct owner-managed villa residences with our in-house private yacht fleet and trusted wellness partners, Kachava Lux delivers extraordinary value without third-party markups.
          </p>
        </div>

        {/* Comparison Table / Card Container */}
        <div className="bg-[#1c3023]/90 rounded-sm border border-[#ad7800]/40 overflow-hidden shadow-2xl backdrop-blur-md mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#14241b] border-b border-[#264332] text-xs uppercase tracking-wider text-[#c7b79e] font-semibold">
            <div className="col-span-8 sm:col-span-7">Experience Element</div>
            <div className="col-span-4 sm:col-span-2 text-right">Standard Retail</div>
            <div className="hidden sm:block sm:col-span-3 text-right text-[#ad7800]">In Luxury Package</div>
          </div>

          {/* Line items */}
          <div className="divide-y divide-[#264332]/60">
            {lineItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#23382b]/50 transition-colors"
              >
                <div className="col-span-8 sm:col-span-7">
                  <h4 className="font-serif-luxury text-base sm:text-lg text-[#f3efe6] font-normal mb-1">
                    {item.item}
                  </h4>
                  <p className="text-xs text-[#c7b79e]/80 font-light leading-normal">
                    {item.description}
                  </p>
                </div>
                <div className="col-span-4 sm:col-span-2 text-right">
                  <span className="text-sm sm:text-base font-light text-[#c7b79e] line-through">
                    ${item.retail.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-[#c7b79e]/60 uppercase tracking-widest sm:hidden">
                    Retail
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-3 sm:text-right pt-2 sm:pt-0 border-t sm:border-0 border-[#264332]/40 flex items-center justify-between sm:justify-end gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#ad7800] sm:hidden">Package Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ad7800]/15 text-[#ad7800] border border-[#ad7800]/30 text-xs font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Included</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="bg-[#14241b] px-6 py-8 border-t border-[#ad7800]/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c7b79e] block mb-1">
                  Total Estimated Retail Value
                </span>
                <span className="text-2xl sm:text-3xl font-serif-luxury text-[#c7b79e]/70 line-through">
                  ${totalRetail.toLocaleString()} USD
                </span>
              </div>

              <div className="text-center md:text-right">
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#ad7800] text-[#132219]">
                    Exclusive Direct Rate
                  </span>
                  <span className="text-xs font-semibold text-[#ad7800]">
                    Save ${savings.toLocaleString()} USD (51%)
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury text-[#f3efe6] font-medium tracking-tight">
                  ${packagePrice.toLocaleString()} <span className="text-sm font-sans font-light text-[#c7b79e]">USD Total</span>
                </div>
                <span className="text-xs text-[#c7b79e]/80 block mt-1 font-light">
                  For your party • Exactly 5 Core Elements Included • No Hidden Resort Surcharges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assurance Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-sm bg-[#1c3023]/60 border border-[#264332] text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#ad7800] shrink-0" />
            <p className="text-xs sm:text-sm text-[#c7b79e] font-light">
              Limited inventory per season. Package requires arrival date confirmation with our concierge.
            </p>
          </div>
          <button
            onClick={onInquire}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#ad7800] hover:bg-[#8a5f00] text-[#f3efe6] text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
          >
            <span>Lock In $3,950 Rate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
