import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Phone, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onSelectInquire: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onSelectInquire }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Package', href: '#inclusions' },
    { name: 'Value Breakdown', href: '#value' },
    { name: 'Golf or Massage', href: '#experience-choice' },
    { name: 'The Experience', href: '#gallery' },
    { name: 'FAQs & Terms', href: '#faqs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#132219]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#ad7800]/20'
            : 'bg-gradient-to-b from-[#132219]/90 via-[#132219]/60 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/assets/aistudio/Composition_5_7a06f10c.png"
                alt="Kachava Lux - Private Residences & Spa"
                className="h-9 sm:h-11 md:h-13 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] brightness-105 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#f3efe6]/90 hover:text-[#ad7800] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              {/* Admin Button */}
              <button
                onClick={onOpenAdmin}
                className="p-2 text-[#c7b79e] hover:text-[#ad7800] hover:bg-[#1c3023] rounded-full transition-colors border border-transparent hover:border-[#ad7800]/30"
                title="Concierge & Inquiries Admin"
                aria-label="Admin Portal"
              >
                <Shield className="w-4 h-4" />
              </button>

              {/* Price Tag & CTA */}
              <div className="hidden xl:flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#c7b79e]">Retail $8,000</span>
                <span className="text-xs font-semibold text-[#ad7800]">$3,950 USD Package</span>
              </div>

              <button
                onClick={onSelectInquire}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#ad7800] to-[#8d6200] hover:from-[#c28702] hover:to-[#a16f00] text-[#f3efe6] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#ad7800]/20 hover:shadow-lg hover:shadow-[#ad7800]/30 hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquire Availability</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenAdmin}
                className="p-2 text-[#c7b79e] hover:text-[#ad7800]"
                title="Admin Portal"
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#f3efe6] hover:text-[#ad7800] focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#132219]/98 border-b border-[#ad7800]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              <div className="pb-3 border-b border-[#264332] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#c7b79e]">Limited 4-Night Escape</span>
                  <p className="text-sm font-semibold text-[#ad7800]">$3,950 USD <span className="text-xs text-[#c7b79e] font-normal line-through ml-1">$8,000 Retail</span></p>
                </div>
                <a
                  href="https://wa.me/529841234567?text=Hello%20Kachava%20Lux%20Concierge,%20I%20am%20inquiring%20about%20the%20$3,950%20Tulum%20Villa%20Package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#c7b79e] hover:text-[#ad7800]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Concierge</span>
                </a>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.18em] text-[#f3efe6]/90 hover:text-[#ad7800] py-1.5 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectInquire();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#ad7800] hover:bg-[#8d6200] text-[#f3efe6] text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Package — $3,950 USD</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
