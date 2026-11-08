import React, { useState, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Layers,
  Box as BoxIcon,
  ChevronsLeftRight,
  Palette
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
  const productName = selectedProduct === 'cup' ? 'Takeaway Coffee Cup' : 'Packaging Box';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

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

  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchIntentRef = useRef<'horizontal' | 'vertical' | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchIntentRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchIntentRef.current === 'vertical') {
      // Natural vertical page scrolling, do not capture
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - touchStartXRef.current);
    const deltaY = Math.abs(currentY - touchStartYRef.current);

    if (touchIntentRef.current === null) {
      if (deltaY > 7 && deltaY > deltaX) {
        touchIntentRef.current = 'vertical';
        setIsDragging(false);
        return;
      } else if (deltaX > 7 && deltaX > deltaY) {
        touchIntentRef.current = 'horizontal';
        setIsDragging(true);
      }
    }

    if (touchIntentRef.current === 'horizontal') {
      handleMove(currentX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchIntentRef.current = null;
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
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-10 sm:py-14 lg:py-16 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="reveal-subheading inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
              <span>Interactive Comparison</span>
            </div>

            <h2 
              id="comparison-heading"
              className="reveal-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight"
            >
              See the Difference Custom Printing Makes.
            </h2>
          </div>

          {/* Product Switcher Pills */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/90 border border-[#EB1767]/20 shadow-2xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedProduct('cup')}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedProduct === 'cup'
                  ? 'bg-[#EB1767] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-[#121216]'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Coffee Cup</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProduct('box')}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedProduct === 'box'
                  ? 'bg-[#EB1767] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-[#121216]'
              }`}
            >
              <BoxIcon className="w-3 h-3" />
              <span>Packaging Box</span>
            </button>
          </div>
        </div>

        {/* Clean Layout: Main Comparison Slider + Right Reserved Cup Anchor on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Interactive Comparison Viewport (Centred Focus, Full-width Touch Slider on Mobile) */}
          <div className="reveal-media col-span-12 lg:col-span-9">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[500px] rounded-2xl bg-[#D6D6D6] border border-[#EB1767]/20 shadow-[0_8px_30px_-10px_rgba(235,23,103,0.1)] overflow-hidden cursor-ew-resize touch-pan-y select-none"
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
              {/* AFTER LAYER (Branded Mockup) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={afterImage}
                  alt={`${productName} — After custom printing`}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#121216] text-white shadow-xs border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
                    <span>AFTER: Printed</span>
                  </span>
                </div>
              </div>

              {/* BEFORE LAYER (Plain Mockup) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <img
                  src={beforeImage}
                  alt={`${productName} — Before branding`}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover object-center pointer-events-none bg-[#D6D6D6]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-zinc-700/90 text-white shadow-xs border border-white/10">
                    <span>BEFORE: Plain</span>
                  </span>
                </div>
              </div>

              {/* Vertical Scrub Divider */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)] pointer-events-none z-20 will-change-[left]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#EB1767] shadow-md flex items-center justify-center text-[#EB1767] pointer-events-auto cursor-ew-resize">
                  <ChevronsLeftRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* CUP ANCHOR 2: RIGHT SIDEWAY POINT (Preserved strictly on Desktop for Cup Waypoint) */}
          <div 
            id="cup-anchor-2"
            className="hidden lg:flex lg:col-span-3 rounded-2xl bg-white/90 border border-[#EB1767]/20 p-5 flex-col justify-between shadow-xs min-h-[380px]"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EB1767] block mb-1">
                Precision Print
              </span>
              <h3 className="text-base font-bold text-[#121216] font-['Outfit',sans-serif]">
                High Fidelity Registration
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                Slide across to verify color saturation, razor-sharp dielines, and smooth protective finishes.
              </p>
            </div>

            <div className="pt-3 border-t border-[#EB1767]/15 mt-3">
              {onOpenCustomizer && (
                <button
                  type="button"
                  onClick={() => onOpenCustomizer(selectedProduct === 'cup' ? 'cups' : 'boxes')}
                  className="btn-primary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Customize in 2D</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PackagingComparison;
