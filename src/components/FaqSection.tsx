import React, { useState } from 'react';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the package rate and what does it include?',
      answer:
        'The limited-time package rate is $3,950 USD (with an estimated retail value of $8,000 USD). It includes exactly five core components: (1) A four-night private luxury villa stay in Tulum; (2) A half-day (4-hour) private yacht charter along the Riviera Maya; (3) Gourmet breakfast prepared in your villa each morning by a private chef; (4) Round-trip private airport chauffeur transportation between Cancun (CUN) or Tulum (TQO) airport and the villa; and (5) Your choice of either two rounds of golf at PGA Riviera Maya OR two in-villa 60-minute massage sessions.',
    },
    {
      question: 'Are lunch, dinner, or alcoholic beverages included?',
      answer:
        'No. In strict accordance with our transparent hospitality policy, lunch, dinner, alcoholic beverages, and discretionary gratuities are not included in this package. However, our dedicated private concierge can arrange in-villa private dining experiences, yacht catering, refrigerator pre-stocking at cost, or secure VIP reservations at Tulum’s most sought-after restaurants.',
    },
    {
      question: 'How do the golf or massage choice options work?',
      answer:
        'You choose one experience option for your package. If you select Golf, you receive two 18-hole championship green fees with shared golf cart at PGA Riviera Maya (can be used by one golfer playing two separate days, or two golfers playing together). If you select Massages, you receive two 60-minute signature therapeutic massages performed in your villa by certified therapists (can be scheduled simultaneously for a couples session or individually).',
    },
    {
      question: 'Which airports are serviced for the included private transfers?',
      answer:
        'Your round-trip luxury private chauffeur service covers both Cancun International Airport (CUN) and the new Felipe Carrillo Puerto Tulum International Airport (TQO). Upon exiting customs, your private driver will meet you with a personalized name board and escort your party in a premium air-conditioned vehicle directly to your residence.',
    },
    {
      question: 'How is the half-day yacht charter scheduled?',
      answer:
        'The private yacht departure day and morning/afternoon time slot are coordinated with your personal concierge upon arrival to take optimal advantage of weather and sea conditions. The charter departs from the nearby marina and includes certified captain, crew, fuel, and snorkeling equipment.',
    },
    {
      question: 'What is the booking process, cancellation, and deposit policy?',
      answer:
        'Submitting an inquiry does not charge your card. Our reservations team confirms your requested arrival dates within 4 hours. A 50% deposit secures your dates, with the balance due 30 days prior to arrival. Dates may be rescheduled up to 45 days before check-in subject to villa availability.',
    },
  ];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#faf8f5] text-[#242924] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ad7800] block mb-3">
            Clear Answers
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#132219] mb-5">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-5" />
          <p className="text-base text-[#705836] font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the Kachava Lux $3,950 USD package, included services, and travel logistics in Tulum.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-sm border border-[#c7b79e]/60 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#f3efe6]/40 transition-colors"
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-medium text-[#132219]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ad7800] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#ece5d8] text-sm text-[#4b554b] font-light leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transparency note */}
        <div className="p-4 rounded-sm bg-[#f3efe6] border border-[#c7b79e]/60 text-xs text-[#705836] flex items-center justify-between gap-4">
          <span>Need custom villa sizing or have further inquiries?</span>
          <a
            href="https://wa.me/529841234567?text=Hello%20Kachava%20Lux%20Concierge,%20I%20have%20a%20question%20about%20the%20$3,950%20Tulum%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ad7800] font-semibold hover:underline shrink-0 uppercase tracking-wider"
          >
            Ask Concierge on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
