import React from 'react';
import { Shield, ExternalLink, Mail, Phone, MapPin, Compass } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#0f1b14] text-[#c7b79e] pt-16 pb-24 lg:pb-16 border-t border-[#264332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <img
              src="/assets/aistudio/Composition_5_7a06f10c.png"
              alt="Kachava Lux"
              className="h-12 w-auto mb-4 filter drop-shadow-md brightness-110"
            />
            <p className="text-sm font-light text-[#c7b79e]/80 max-w-md leading-relaxed mb-6">
              Kachava Lux offers elevated private residences and bespoke concierge services in Tulum and the Mexican Caribbean. Where timeless Mayan architecture meets pristine turquoise shores.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://www.kachavalux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f3efe6] hover:text-[#ad7800] transition-colors inline-flex items-center gap-1.5"
              >
                <span>www.kachavalux.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#264332]">•</span>
              <a
                href="https://www.kachavacaribe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f3efe6] hover:text-[#ad7800] transition-colors inline-flex items-center gap-1.5"
              >
                <span>www.kachavacaribe.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#f3efe6] mb-4">
              The $3,950 Package
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#inclusions" className="hover:text-[#ad7800] transition-colors">
                  Four-Night Villa Stay
                </a>
              </li>
              <li>
                <a href="#inclusions" className="hover:text-[#ad7800] transition-colors">
                  Private Yacht Charter
                </a>
              </li>
              <li>
                <a href="#inclusions" className="hover:text-[#ad7800] transition-colors">
                  Gourmet Chef Breakfast
                </a>
              </li>
              <li>
                <a href="#inclusions" className="hover:text-[#ad7800] transition-colors">
                  VIP Airport Chauffeur
                </a>
              </li>
              <li>
                <a href="#experience-choice" className="hover:text-[#ad7800] transition-colors">
                  PGA Golf or Massage Choice
                </a>
              </li>
              <li>
                <a href="#value" className="hover:text-[#ad7800] transition-colors">
                  $8,000 Retail Breakdown
                </a>
              </li>
            </ul>
          </div>

          {/* Concierge & Inquiries */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#f3efe6] mb-4">
              Private Concierge
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ad7800] shrink-0" />
                <span>Tulum, Quintana Roo, Mexico</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ad7800] shrink-0" />
                <a
                  href="https://wa.me/529841234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ad7800] transition-colors"
                >
                  WhatsApp: +52 (984) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ad7800] shrink-0" />
                <a href="mailto:reservations@kachavalux.com" className="hover:text-[#ad7800] transition-colors">
                  reservations@kachavalux.com
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c3023] hover:bg-[#264332] text-[#c7b79e] hover:text-[#ad7800] text-[11px] font-medium border border-[#264332] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin & Firestore Inquiries</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#264332] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#705836]">
          <p>© {new Date().getFullYear()} Kachava Lux • Private Residences & Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#faqs" className="hover:text-[#c7b79e]">Terms & Conditions</a>
            <a href="#faqs" className="hover:text-[#c7b79e]">Privacy Policy</a>
            <button onClick={onOpenAdmin} className="hover:text-[#ad7800] flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
