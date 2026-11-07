import React from 'react';
import { MARQUEE_BANNERS } from '../../data/marqueeBanners';
import { Package } from 'lucide-react';

/**
 * ProductMarquee Component — Milestone 4B
 * 
 * Continuous, smoothly looping packaging photography marquee immediately below the Hero.
 * Displays curated packaging design banners across United Impex core product categories:
 * - Coffee cups & drinkware
 * - Rigid & folding boxes
 * - Luxury paper bags
 * - Executive diaries & notebooks
 * 
 * Powered by pure GPU-composited CSS translation (translate3d) with seamless infinite reset,
 * edge gradient feather masks, hover/focus pause, and full WCAG reduced-motion compliance.
 */
export const ProductMarquee: React.FC = () => {
  // Duplicate array once for a mathematically seamless, continuous infinite loop (8 * 2 = 16 cards)
  const displayBanners = [...MARQUEE_BANNERS, ...MARQUEE_BANNERS];

  return (
    <section 
      id="packaging-showcase" 
      aria-labelledby="marquee-section-heading"
      className="w-full bg-white py-8 sm:py-10 lg:py-12 border-b border-zinc-100 overflow-hidden"
    >
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Subtle Pill Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
          <Package className="w-3.5 h-3.5 text-[#EB1767]" />
          <span>Packaging Showcase</span>
        </div>

        {/* Outfit Display Heading */}
        <h2 
          id="marquee-section-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B] font-['Outfit',sans-serif] tracking-tight"
        >
          End-to-End Packaging &amp; Print Excellence
        </h2>

        {/* Clean 1-sentence value subhead */}
        <p className="mt-2.5 max-w-2xl mx-auto text-sm sm:text-base text-[#52525B] leading-relaxed">
          Explore structural carton boxes, specialty hot beverage cups, luxury retail carry bags, and executive bound stationery.
        </p>
      </div>

      {/* Marquee Wrapper with Symmetrical Left & Right Gradient Masks */}
      <div 
        className="w-full relative marquee-container mask-marquee-edges overflow-hidden py-3"
        tabIndex={0}
        role="region"
        aria-label="Continuously scrolling product packaging showcase. Hover or focus to pause."
      >
        <div className="animate-marquee-track flex gap-4 sm:gap-5 lg:gap-6 items-center px-4">
          {displayBanners.map((banner, index) => {
            const isClone = index >= MARQUEE_BANNERS.length;
            const uniqueKey = `${banner.id}-${isClone ? 'clone' : 'orig'}-${index}`;

            return (
              <article
                key={uniqueKey}
                aria-hidden={isClone}
                className="group/card shrink-0 w-[260px] sm:w-[280px] lg:w-[320px] h-[195px] sm:h-[210px] lg:h-[240px] relative rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.14)] hover:border-zinc-300 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Imagery */}
                <img
                  src={banner.image}
                  alt={banner.alt}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                />

                {/* Top-Left Category Tag Glass Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
                    <span>{banner.tag}</span>
                  </span>
                </div>

                {/* Bottom Scrim & Caption */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 pt-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 drop-shadow-xs">
                    {banner.category}
                  </span>
                  <h3 className="text-white text-xs sm:text-sm font-semibold truncate leading-tight drop-shadow-xs mt-0.5">
                    {banner.title}
                  </h3>
                </div>

                {/* Subtle Interactive Focus Ring */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-[#EB1767] ring-offset-2 opacity-0 group-focus-within/card:opacity-100 transition-opacity pointer-events-none" />
              </article>
            );
          })}
        </div>
      </div>

      {/* Subtle Caption & Custom Inquiry Note */}
      <div className="mt-6 text-center px-4">
        <p className="text-xs text-zinc-400 font-normal">
          Hover or touch to pause &bull; Bespoke dimensions, embossing, and custom finishes available for all formats
        </p>
      </div>
    </section>
  );
};
