import React from 'react';
import { ShieldAlert, ExternalLink, Globe } from 'lucide-react';

export const TermsDisclaimer: React.FC = () => {
  return (
    <section className="py-14 bg-[#14241b] text-[#c7b79e] text-xs font-light border-t border-[#264332]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4 mb-6">
          <ShieldAlert className="w-5 h-5 text-[#ad7800] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f3efe6] mb-2">
              Package Terms & Availability Conditions
            </h4>
            <p className="leading-relaxed text-[#c7b79e]/90 mb-3">
              The $3,950 USD promotional package rate reflects an estimated retail value of $8,000 USD based on independent seasonal rack rates for a four-night private villa residence, a four-hour private yacht charter, in-villa gourmet chef breakfast service, round-trip private airport transfers, and two PGA golf green fees or two 60-minute in-villa massage sessions.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#c7b79e]/80">
              <li>
                <strong>Dining Inclusions:</strong> Package includes gourmet breakfasts prepared daily inside your villa. Lunch, dinner, alcoholic beverages, snack provisioning, and personal gratuities are excluded unless arranged separately with concierge.
              </li>
              <li>
                <strong>Availability:</strong> Package is valid for travel within specified seasons and is strictly subject to villa and yacht calendar confirmation at time of reservation inquiry. Peak holiday blackout periods (e.g. Christmas through New Year’s week) may carry supplementary holiday rates or minimum night adjustments.
              </li>
              <li>
                <strong>Yacht Charter Operations:</strong> Maritime departures are subject to port authority maritime safety clearances and weather conditions. In the event of adverse sea conditions, charter times may be rescheduled or alternate luxury experiences substituted by mutual agreement.
              </li>
              <li>
                <strong>Official Properties:</strong> Learn more about our portfolio of luxury Caribbean properties and residences at our primary domains{' '}
                <a
                  href="https://www.kachavalux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ad7800] hover:underline inline-flex items-center gap-1"
                >
                  www.kachavalux.com <ExternalLink className="w-3 h-3" />
                </a>{' '}
                and{' '}
                <a
                  href="https://www.kachavacaribe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ad7800] hover:underline inline-flex items-center gap-1"
                >
                  www.kachavacaribe.com <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
