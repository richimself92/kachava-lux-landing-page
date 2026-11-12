import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MobileStickyCTAProps {
  onInquire: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onInquire }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past 300px, hide if near bottom where form is already visible
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollPos + winHeight >= docHeight - 600;

      setIsVisible(scrollPos > 300 && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#132219]/95 backdrop-blur-md border-t border-[#ad7800]/40 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#c7b79e] block leading-none mb-1">
            Limited Package
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-serif-luxury font-medium text-[#f3efe6]">
              $3,950 <span className="text-[10px] font-sans text-[#c7b79e]">USD</span>
            </span>
            <span className="text-[10px] text-[#c7b79e]/60 line-through">$8,000</span>
          </div>
        </div>

        <button
          onClick={onInquire}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-sm bg-gradient-to-r from-[#ad7800] to-[#8d6200] text-[#f3efe6] text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inquire Dates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
