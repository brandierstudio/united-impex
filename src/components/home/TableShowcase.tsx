import React, { useState, useRef, useCallback } from 'react';
import { 
  Coffee, 
  Package, 
  ShoppingBag, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  RotateCw, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import tableSceneJpg from '../../assets/animation/table-scene.jpg';
import cupPng from '../../assets/animation/cup.png';
import blankCupWebp from '../../assets/customizer/blank-cup.webp';
import blankBoxWebp from '../../assets/customizer/blank-box.webp';
import blankBagWebp from '../../assets/customizer/blank-bag.webp';
import blankDiaryWebp from '../../assets/customizer/blank-diary.webp';
import type { CustomizerCategory } from '../customizer/ProductCustomizerModal';

export interface TableShowcaseProduct {
  id: string;
  category: CustomizerCategory;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  coords: { x: number; y: number }; // Percentage position on the table image
  specs: {
    material: string;
    finishes: string;
    moq: string;
    leadTime: string;
  };
  mockupImage: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TABLE_PRODUCTS: TableShowcaseProduct[] = [
  {
    id: 'cups',
    category: 'cups',
    name: 'Disposable Coffee Cup',
    badge: '01 / Signature Drinkware',
    tagline: 'High-density insulated food-grade cup with tight-snap lid',
    description: 'Engineered for specialty cafes and corporate events. Features double-wall thermal insulation, leak-resistant rim seals, and vivid food-safe offset branding.',
    coords: { x: 31, y: 64 },
    specs: {
      material: 'Food-grade Virgin Paperboard (PE/PLA Lined)',
      finishes: 'Matte Soft-Touch, Gloss, Spot Gold Foil',
      moq: '1,000 units',
      leadTime: '5 – 7 business days'
    },
    mockupImage: blankCupWebp,
    icon: Coffee
  },
  {
    id: 'bags',
    category: 'bags',
    name: 'Kraft Paper Shopping Bag',
    badge: '02 / Eco Carryware',
    tagline: 'Heavy-duty virgin kraft paper with reinforced twisted handles',
    description: 'Eco-conscious retail bags manufactured from high-tensile virgin kraft. Reinforced bottom gusset handles high weight capacities with crisp flexo and offset prints.',
    coords: { x: 50, y: 42 },
    specs: {
      material: '120–180 GSM Pure Virgin Kraft Paper',
      finishes: 'Natural Raw Texture, Screen Print, Metallic Foil',
      moq: '500 units',
      leadTime: '6 – 8 business days'
    },
    mockupImage: blankBagWebp,
    icon: ShoppingBag
  },
  {
    id: 'boxes',
    category: 'boxes',
    name: 'Premium Packaging Box',
    badge: '03 / Luxury Cartons',
    tagline: 'Precision rigid folding box with razor-sharp die-cut edges',
    description: 'Designed for cosmetics, tech retail, apparel, and corporate presentation. Custom dieline geometry with magnetic closure options and debossed foil embossing.',
    coords: { x: 66, y: 48 },
    specs: {
      material: '350–450 GSM Bleached SBS Board / Rigid Greyboard',
      finishes: 'Matte Lamination, UV Spot Varnish, Gold/Silver Foil',
      moq: '500 units',
      leadTime: '7 – 10 business days'
    },
    mockupImage: blankBoxWebp,
    icon: Package
  },
  {
    id: 'diaries',
    category: 'diaries',
    name: 'Executive Hardcover Diary',
    badge: '04 / Corporate Stationery',
    tagline: 'Thread-sewn notebook with debossed cover and bookmark ribbon',
    description: 'Handcrafted corporate planners and stationery notebooks. Features premium 80 GSM acid-free cream paper, ribbon marker, and customized cover debossing.',
    coords: { x: 76, y: 64 },
    specs: {
      material: 'Hardbound Vegan Leatherette / Linen Bookcloth',
      finishes: 'Blind Debossing, Gold Foil Stamp, Gilded Edges',
      moq: '250 units',
      leadTime: '5 – 8 business days'
    },
    mockupImage: blankDiaryWebp,
    icon: BookOpen
  }
];

interface TableShowcaseProps {
  onOpenCustomizer?: (category: CustomizerCategory) => void;
}

export const TableShowcase: React.FC<TableShowcaseProps> = ({ onOpenCustomizer }) => {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const p = new URLSearchParams(window.location.search).get('prod');
    if (p) {
      const idx = TABLE_PRODUCTS.findIndex(tp => tp.id === p);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [viewMode, setViewMode] = useState<'focused' | 'overview'>(() => {
    if (typeof window === 'undefined') return 'focused';
    const vm = new URLSearchParams(window.location.search).get('view');
    return vm === 'overview' ? 'overview' : 'focused';
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProduct = TABLE_PRODUCTS[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TABLE_PRODUCTS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < TABLE_PRODUCTS.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  }, [handlePrev, handleNext]);

  // Touch and pointer swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = e.clientX - dragStartXRef.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
  };

  return (
    <section 
      id="table-showcase" 
      aria-labelledby="table-showcase-heading"
      className="relative w-full bg-white py-16 sm:py-24 lg:py-28 border-b border-zinc-100 overflow-hidden select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Interactive Tabletop Exploration</span>
            </div>

            <h2 
              id="table-showcase-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B] font-['Outfit',sans-serif] tracking-tight leading-tight"
            >
              The United Impex Tabletop Showcase.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Experience our four signature commercial packaging standards in a photorealistic studio setting. Rotate the tabletop arrangement, inspect verified physical specifications, or launch the 2D customizer to apply your brand artwork.
            </p>
          </div>

          {/* Quick Mode Toggle & Counter */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('focused')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'focused'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
                aria-pressed={viewMode === 'focused'}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Focus View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('overview')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'overview'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
                aria-pressed={viewMode === 'overview'}
              >
                <Layers className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>All 4 Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. PRODUCT SELECTOR DIALS / PILLS (Turntable Selector)
            ========================================================================= */}
        <div className="flex items-center justify-between gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {TABLE_PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon;
              const isActive = activeIndex === idx;
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setViewMode('focused');
                  }}
                  className={`group px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs ring-2 ring-[#EB1767]/30'
                      : 'bg-white text-zinc-600 border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Select ${prod.name}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#EB1767]' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                  <span>{prod.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next controls */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold text-zinc-400 px-1">
              {activeIndex + 1} / {TABLE_PRODUCTS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer"
              aria-label="Next product"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. MAIN VISUAL SHOWCASE STAGE
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT 7-8 COLS: STUDIO TABLETOP CANVAS */}
          <div className="lg:col-span-8">
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              className="relative w-full aspect-16/10 rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-50 shadow-md group cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ touchAction: 'pan-y' }}
            >
              {/* Studio table photographic asset */}
              <img 
                src={tableSceneJpg} 
                alt="United Impex circular white studio table displaying custom packaging products"
                className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500"
              />

              {/* Soft studio ambient vignette */}
              <div 
                className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/10" 
                aria-hidden="true" 
              />

              {/* ===================================================================
                  HERO CUP PRESERVED LANDING TARGET (Milestone 11 Deliverable)
                  Stable Target ID: #cup-table-landing-target
                  Coords: x=31%, y=64%
                  =================================================================== */}
              <div
                id="cup-table-landing-target"
                data-landing-target="hero-scroll-cup"
                aria-label="Coffee cup tabletop landing target"
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300"
                style={{
                  left: '31%',
                  top: '64%',
                  width: '18%',
                  aspectRatio: '3/4'
                }}
              >
                {/* Render natural photographic coffee cup standing on table */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    id="table-static-cup"
                    src={cupPng}
                    alt="Custom printed coffee cup on white pedestal table"
                    className={`w-full h-full object-contain filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.22)] transition-all duration-300 ${
                      activeProduct.id === 'cups'
                        ? 'scale-105 drop-shadow-[0_16px_22px_rgba(235,23,103,0.3)]'
                        : 'hover:scale-102'
                    }`}
                  />
                  {/* Active highlight ground contact shadow */}
                  <div 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/35 rounded-full blur-xs pointer-events-none" 
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* ===================================================================
                  HOTSPOT MARKERS OVER THE 4 PRODUCTS
                  =================================================================== */}
              {TABLE_PRODUCTS.map((prod, idx) => {
                const isActive = activeIndex === idx;
                const Icon = prod.icon;
                const shouldShow = viewMode === 'overview' || isActive;

                return (
                  <div
                    key={prod.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
                    style={{
                      left: `${prod.coords.x}%`,
                      top: `${prod.coords.y}%`
                    }}
                  >
                    {/* Hotspot Pulse Ring & Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                        setViewMode('focused');
                      }}
                      className={`relative flex items-center justify-center rounded-full transition-transform duration-300 cursor-pointer ${
                        isActive
                          ? 'w-10 h-10 bg-[#EB1767] text-white shadow-[0_0_20px_rgba(235,23,103,0.6)] scale-110'
                          : 'w-7 h-7 bg-white/90 text-zinc-800 shadow-md hover:scale-110 border border-zinc-200'
                      }`}
                      aria-label={`Focus ${prod.name}`}
                      aria-pressed={isActive}
                    >
                      {/* Animated ping ring */}
                      {isActive && (
                        <span 
                          className="absolute inset-0 rounded-full bg-[#EB1767] animate-ping opacity-40 pointer-events-none" 
                          aria-hidden="true"
                        />
                      )}
                      
                      <Icon className={isActive ? 'w-4 h-4' : 'w-3 h-3 text-zinc-600'} />
                    </button>

                    {/* Floating pill badge when focused or overview */}
                    {shouldShow && (
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none transition-all duration-200 whitespace-nowrap ${
                          isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-85 translate-y-0 scale-90'
                        }`}
                      >
                        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 ${
                          isActive 
                            ? 'bg-zinc-950 text-white border border-[#EB1767]/50 ring-2 ring-[#EB1767]/20' 
                            : 'bg-white/95 text-zinc-800 border border-zinc-200 backdrop-blur-xs'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EB1767]' : 'bg-zinc-400'}`} />
                          <span>{prod.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom hint overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-600 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/60 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <RotateCw className="w-3 h-3 text-[#EB1767]" />
                  <span>Drag or click markers to inspect tabletop arrangement</span>
                </span>
                <span className="hidden sm:inline font-mono text-zinc-500">
                  Studio Lighting &bull; 100% Photographic Scene
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 4-5 COLS: ACTIVE PRODUCT SPECIFICATION CARD */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-6">
              
              {/* Product header & Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#EB1767] bg-[#FDF2F6] px-2.5 py-1 rounded-full border border-[#EB1767]/20">
                    {activeProduct.badge}
                  </span>

                  <span className="text-xs font-semibold text-zinc-500">
                    In Stock Dielines
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 leading-tight">
                  {activeProduct.name}
                </h3>

                <p className="text-xs font-medium text-[#EB1767]">
                  {activeProduct.tagline}
                </p>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              {/* Blank Mockup Preview Thumbnail */}
              <div className="relative p-3 bg-zinc-50 rounded-2xl border border-zinc-200/70 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white p-1 border border-zinc-200 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
                  <img 
                    src={activeProduct.mockupImage} 
                    alt={`Blank ${activeProduct.name} mockup template`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-zinc-900">Customizer Ready Template</p>
                  <p className="text-zinc-500 text-[11px]">
                    Front-facing printable canvas calibrated for instant 2D vector preview.
                  </p>
                </div>
              </div>

              {/* Key Technical Specifications Table */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <div className="flex items-start justify-between text-xs py-1 border-b border-zinc-100/70">
                  <span className="text-zinc-500">Primary Board</span>
                  <span className="font-semibold text-zinc-800 text-right max-w-[60%]">
                    {activeProduct.specs.material}
                  </span>
                </div>

                <div className="flex items-start justify-between text-xs py-1 border-b border-zinc-100/70">
                  <span className="text-zinc-500">Finishing Options</span>
                  <span className="font-semibold text-zinc-800 text-right max-w-[60%]">
                    {activeProduct.specs.finishes}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-zinc-100/70">
                  <span className="text-zinc-500">Minimum Order (MOQ)</span>
                  <span className="font-mono font-bold text-zinc-900">
                    {activeProduct.specs.moq}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-zinc-500">Standard Lead Time</span>
                  <span className="font-mono font-semibold text-emerald-700">
                    {activeProduct.specs.leadTime}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* 1. Launch 2D Customizer */}
                <button
                  type="button"
                  onClick={() => onOpenCustomizer?.(activeProduct.category)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#EB1767] hover:bg-[#C90E54] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Customize {activeProduct.name}</span>
                  <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                </button>

                {/* 2. Jump to Quote Estimator */}
                <a
                  href="#quote-wizard"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-semibold text-xs border border-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Quote for {activeProduct.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Quality Guarantee Mini-Strip */}
            <div className="p-3.5 rounded-2xl bg-[#FDF2F6]/50 border border-[#EB1767]/15 flex items-center gap-2.5 text-xs text-zinc-700">
              <Check className="w-4 h-4 text-[#EB1767] shrink-0" />
              <p className="leading-snug">
                <strong>Free Digital Proof:</strong> We verify dielines and color profiles before full offset printing.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
