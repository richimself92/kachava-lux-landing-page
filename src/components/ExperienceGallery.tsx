import React, { useState } from 'react';
import { Camera, Maximize2, X, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

export const ExperienceGallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      title: 'Private Villa & Plunge Pool',
      category: 'Villa Stay',
      caption: 'Secluded architectural villa surrounded by lush Mayan flora and tranquil water features.',
    },
    {
      url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=85',
      title: 'Caribbean Private Yacht Charter',
      category: 'Half-Day Yacht',
      caption: 'Cruising the turquoise waters of the Riviera Maya with private captain and dedicated crew.',
    },
    {
      url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=85',
      title: 'Chef-Prepared Morning Breakfast',
      category: 'In-Villa Culinary',
      caption: 'Fresh tropical fruits, artisan breads, and bespoke egg entrees prepared each morning in your villa.',
    },
    {
      url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=85',
      title: 'PGA Riviera Maya Fairways',
      category: 'Golf Experience',
      caption: 'World-class 18-hole championship golf course designed by Robert Trent Jones II.',
    },
    {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      title: 'In-Villa Signature Massage',
      category: 'Spa Experience',
      caption: 'Therapeutic bodywork with indigenous botanical essences on your private terrace.',
    },
    {
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      title: 'VIP Airport Chauffeur',
      category: 'Arrival Service',
      caption: 'Round-trip private luxury SUV transfers between Cancun or Tulum airport and your residence.',
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#132219] text-[#f3efe6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ad7800] block mb-3">
            Visual Storytelling
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#f3efe6] mb-5">
            The Kachava Lux Experience
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-5" />
          <p className="text-base text-[#c7b79e] font-light leading-relaxed">
            From sunrise breakfasts prepared in your residence to cruising turquoise coastal waters and serene moments of rest, glimpse the texture of your upcoming escape.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative h-80 rounded-sm overflow-hidden cursor-pointer bg-[#1c3023] border border-[#264332]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132219]/90 via-[#132219]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded bg-[#132219]/80 backdrop-blur-md text-[10px] font-semibold tracking-wider text-[#ad7800] uppercase border border-[#ad7800]/30">
                  {item.category}
                </span>
              </div>

              {/* Hover maximize icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="p-2 rounded-full bg-[#132219]/80 text-[#f3efe6]">
                  <Maximize2 className="w-4 h-4 text-[#ad7800]" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#f3efe6] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#c7b79e]/90 font-light line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-3 text-[#f3efe6] hover:text-[#ad7800] z-50 rounded-full bg-black/50"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#f3efe6] hover:text-[#ad7800] z-50 rounded-full bg-black/50"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#f3efe6] hover:text-[#ad7800] z-50 rounded-full bg-black/50"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#132219] rounded-sm overflow-hidden border border-[#ad7800]/40 shadow-2xl"
          >
            <img
              src={images[activeImageIndex].url}
              alt={images[activeImageIndex].title}
              className="max-h-[65vh] w-auto object-contain"
            />
            <div className="p-6 text-center w-full bg-[#1c3023]">
              <span className="text-[11px] font-semibold text-[#ad7800] uppercase tracking-widest block mb-1">
                {images[activeImageIndex].category}
              </span>
              <h4 className="font-serif-luxury text-2xl text-[#f3efe6] mb-1">
                {images[activeImageIndex].title}
              </h4>
              <p className="text-sm text-[#c7b79e] font-light max-w-xl mx-auto">
                {images[activeImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
