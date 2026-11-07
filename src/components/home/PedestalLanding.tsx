import React from 'react';
import { 
  Palette,
  ArrowRight
} from 'lucide-react';
import cupPng from '../../assets/animation/cup.png';
import type { CustomizerCategory } from '../customizer/ProductCustomizerModal';

export interface PedestalLandingProps {
  onOpenCustomizer?: (category?: CustomizerCategory) => void;
}

export const PedestalLanding: React.FC<PedestalLandingProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      id="table-showcase"
      aria-labelledby="landing-heading"
      className="hidden md:block relative w-full bg-[#121216] text-white py-10 sm:py-14 lg:py-16 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 12-Column Responsive Grid: Left Editorial Narrative, Right Reserved Pure White Resting Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ===================================================================
              LEFT 7 COLS: CALM, RESTRAINED EDITORIAL NARRATIVE
              =================================================================== */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="reveal-subheading inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EB1767]/15 border border-[#EB1767]/30 text-[#EB1767] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
              <span>Signature Drinkware Presentation</span>
            </div>

            <h2
              id="landing-heading"
              className="reveal-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight leading-tight"
            >
              The Single Cup. Restfully Placed.
            </h2>

            <p className="reveal-subheading text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-['Inter',sans-serif]">
              Precision-formed virgin paperboard, leak-proof rim geometry, and vivid offset ink density. The continuous flight concludes here in a calm, dedicated resting space ready for your brand imprint.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => onOpenCustomizer?.('cups')}
                className="btn-primary text-xs sm:text-sm font-semibold py-3 px-6 min-h-[44px] inline-flex items-center gap-2"
              >
                <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Customize in 2D Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 5 COLS: CLEAN RESERVED EMPTY LANDING SPACE AT FINAL CORNER
              Pure white square resting zone with ambient depth on dark charcoal background.
              =================================================================== */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-3xl bg-white border border-[#EB1767]/25 shadow-[0_20px_60px_-15px_rgba(235,23,103,0.25)] flex items-center justify-center p-6 sm:p-8">
              
              {/* Subtle ambient spotlight glow inside the reserved space */}
              <div 
                className="absolute inset-0 rounded-3xl bg-radial from-white via-white/80 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Cup Landing Target — Exact DOM Hook for GSAP Flight */}
              <div
                id="cup-table-landing-target"
                data-landing-target="hero-scroll-cup"
                onClick={() => onOpenCustomizer?.('cups')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenCustomizer?.('cups');
                  }
                }}
                aria-label="Click to customize this coffee cup in 2D Studio"
                className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 aspect-square flex items-center justify-center z-20 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-4 rounded-3xl"
              >
                {/* Static Cup that appears when the travelling cup settles */}
                <img
                  id="table-static-cup"
                  src={cupPng}
                  alt="United Impex custom printed coffee cup resting in reserved landing space"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.16)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-102"
                />

                {/* Ground Contact Shadow directly at visible cup base (y = 83.8% of container) */}
                <div 
                  className="absolute top-[83.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-3.5 bg-black/28 rounded-full blur-[3px] pointer-events-none transition-transform duration-300 group-hover:scale-105" 
                  aria-hidden="true" 
                />

                {/* Diffuse ambient floor shadow beneath cup */}
                <div 
                  className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-44 h-6 bg-black/8 rounded-full blur-xl pointer-events-none" 
                  aria-hidden="true" 
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PedestalLanding;
