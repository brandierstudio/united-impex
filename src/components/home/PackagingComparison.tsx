import React, { useState, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Layers,
  Box as BoxIcon,
  ChevronsLeftRight,
  Palette,
  CheckCircle2
} from 'lucide-react';

import beforeCupWebp from '../../assets/comparison/comparison-before-cup.webp';
import afterCupWebp from '../../assets/comparison/comparison-after-cup.webp';
import beforeBoxWebp from '../../assets/comparison/comparison-before-box.webp';
import afterBoxWebp from '../../assets/comparison/comparison-after-box.webp';

export interface PackagingComparisonProps {
  onOpenCustomizer?: (category?: 'cups' | 'boxes' | 'bags' | 'diaries') => void;
  initialPosition?: number;
}

export type ComparisonProduct = 'cup' | 'box';

export const PackagingComparison: React.FC<PackagingComparisonProps> = ({ 
  onOpenCustomizer,
  initialPosition = 50 
}) => {
  const [sliderPos, setSliderPos] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('comparison_pos');
      if (param && !isNaN(Number(param))) {
        return Math.max(0, Math.min(100, Number(param)));
      }
    }
    return initialPosition;
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ComparisonProduct>('cup');

  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImage = selectedProduct === 'cup' ? beforeCupWebp : beforeBoxWebp;
  const afterImage = selectedProduct === 'cup' ? afterCupWebp : afterBoxWebp;
  const productName = selectedProduct === 'cup' ? 'Takeaway Coffee Cup' : 'Luxury Packaging Box';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  // Pointer & Touch Events for robust multi-device scrubbing
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <section 
      id="comparison" 
      aria-labelledby="comparison-heading"
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-16 sm:py-20 lg:py-24 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
            <span>Packaging Transformation</span>
          </div>

          <h2 
            id="comparison-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            See the Difference Custom Printing Makes.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl font-['Inter',sans-serif]">
            Drag the slider to reveal how high-precision offset printing and bespoke dielines elevate blank, unbranded packaging into shelf-defining commercial products.
          </p>

          {/* Product Switcher Pills with Liquid Glass */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full glass-surface shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedProduct('cup')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedProduct === 'cup'
                  ? 'bg-[#EB1767] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-[#121216]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Coffee Cup</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProduct('box')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedProduct === 'box'
                  ? 'bg-[#EB1767] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-[#121216]'
              }`}
            >
              <BoxIcon className="w-3.5 h-3.5" />
              <span>Packaging Box</span>
            </button>
          </div>
        </div>

        {/* 12-Column Grid: Left 8 cols for Slider, Right 4 cols for Cup Anchor 2 (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================================================================
              LEFT 8 COLS: INTERACTIVE COMPARISON VIEWPORT
              =================================================================== */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="relative w-full aspect-square sm:aspect-[4/3] max-h-[560px] rounded-3xl bg-white border border-[#EB1767]/20 shadow-[0_12px_40px_-10px_rgba(235,23,103,0.08)] overflow-hidden cursor-ew-resize touch-none select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              role="slider"
              aria-valuenow={sliderPos}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Interactive before and after comparison slider for ${productName}`}
              onKeyDown={handleKeyDown}
            >
              {/* 1. AFTER LAYER (Custom Printed Branded Mockup — Underneath) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={afterImage}
                  alt={`${productName} — After custom printing and branding`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#121216] text-white shadow-xs border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#EB1767]" aria-hidden="true" />
                    <span>AFTER: Custom Printed</span>
                  </span>
                </div>
              </div>

              {/* 2. BEFORE LAYER (Unbranded Blank Mockup — Top Clipped Layer) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <img
                  src={beforeImage}
                  alt={`${productName} — Before branding, blank unprinted`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain pointer-events-none bg-white"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-zinc-700/90 text-white shadow-xs border border-white/10">
                    <span>BEFORE: Plain Blank</span>
                  </span>
                </div>
              </div>

              {/* 3. VERTICAL DIVIDER HANDLE BAR */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)] pointer-events-none z-20 will-change-[left]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#EB1767] shadow-lg flex items-center justify-center text-[#EB1767] pointer-events-auto cursor-ew-resize">
                  <ChevronsLeftRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              CUP ANCHOR 2: RIGHT SIDEWAY POINT (Reserved space for travelling cup)
              =================================================================== */}
          <div 
            id="cup-anchor-2"
            className="lg:col-span-4 rounded-3xl bg-white border border-[#EB1767]/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-md min-h-[380px]"
          >
            {/* Ambient soft glow ring */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#EB1767]/10 blur-2xl pointer-events-none" 
              aria-hidden="true"
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F6] text-[#EB1767] text-[11px] font-mono font-bold uppercase tracking-wider mb-4 border border-[#EB1767]/20">
                <Palette className="w-3.5 h-3.5" />
                <span>Print Fidelity Standard</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight">
                Precision Litho Registration
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                Deep ink saturation, crisp dielines, and smooth protective finishes tailored to your brand artwork.
              </p>
            </div>

            {/* Feature Callout Panel (Zero empty dashed debug placeholders) */}
            <div className="my-4 p-4 sm:p-5 rounded-2xl bg-[#FDF2F6]/80 border border-[#EB1767]/20 flex items-center gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-white border border-[#EB1767]/20 flex items-center justify-center text-[#EB1767] font-bold text-xs shrink-0 font-mono shadow-2xs">
                CMYK
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-[#121216]">Commercial Press Calibration</p>
                <p className="text-[11px] text-zinc-600">Sharp vector line reproduction &amp; rich contrast</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#EB1767]/15">
              {onOpenCustomizer && (
                <button
                  type="button"
                  onClick={() => onOpenCustomizer(selectedProduct === 'cup' ? 'cups' : 'boxes')}
                  className="btn-primary w-full text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Customize in 2D Studio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

              <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" />
                <span>Drag slider to compare anytime</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PackagingComparison;
