import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  RotateCcw, 
  Send, 
  Layers, 
  Box, 
  ShoppingBag, 
  BookOpen, 
  Palette, 
  Check, 
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Move
} from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { CONTACT_INFO } from '../../data/businessData';

// Import optimized blank mockups prepared in Milestone 5B
import blankCupWebp from '../../assets/customizer/blank-cup.webp';
import blankBoxWebp from '../../assets/customizer/blank-box.webp';
import blankBagWebp from '../../assets/customizer/blank-bag.webp';
import blankDiaryWebp from '../../assets/customizer/blank-diary.webp';

export type CustomizerCategory = 'cups' | 'boxes' | 'bags' | 'diaries';

export interface ProductConfig {
  id: CustomizerCategory;
  name: string;
  badge: string;
  mockup: string;
  icon: React.ComponentType<{ className?: string }>;
  sizes: string[];
  finishes: string[];
  quantities: string[];
  /** Printable zone definition relative to 1200x1200 mockup (in percentages 0-100) */
  printZone: {
    top: number;    // % from top
    left: number;   // % from left
    width: number;  // % width
    height: number; // % height
    label: string;
  };
}

export const PRODUCT_CONFIGS: Record<CustomizerCategory, ProductConfig> = {
  cups: {
    id: 'cups',
    name: 'Custom Coffee Cups',
    badge: 'Drinkware',
    mockup: blankCupWebp,
    icon: Layers,
    sizes: ['8 oz Single Wall', '12 oz Double Wall', '16 oz Insulated Ripple'],
    finishes: ['Matte Paper Surface', 'Gloss Coating', 'Natural Kraft Exterior'],
    quantities: ['500 units', '1,000 units', '2,500 units', '5,000+ units'],
    printZone: {
      top: 38,
      left: 32,
      width: 36,
      height: 30,
      label: 'Cup Front Elevation (36% × 30%)'
    }
  },
  boxes: {
    id: 'boxes',
    name: 'Custom Packaging Boxes',
    badge: 'Cartons & Rigid Boxes',
    mockup: blankBoxWebp,
    icon: Box,
    sizes: ['Small (15 × 15 × 5 cm)', 'Medium (25 × 20 × 8 cm)', 'Large (35 × 25 × 10 cm)'],
    finishes: ['Matte Soft-Touch', 'Gloss Rigid SBS', 'Natural Kraft Folding'],
    quantities: ['500 units', '1,000 units', '2,500 units', '5,000+ units'],
    printZone: {
      top: 34,
      left: 28,
      width: 44,
      height: 36,
      label: 'Box Lid Primary Face (44% × 36%)'
    }
  },
  bags: {
    id: 'bags',
    name: 'Custom Paper Bags',
    badge: 'Retail Shopping Bags',
    mockup: blankBagWebp,
    icon: ShoppingBag,
    sizes: ['Standard Boutique (20 × 25 × 10 cm)', 'Large Retail (32 × 40 × 12 cm)'],
    finishes: ['Natural Kraft (Twisted Handle)', 'Bleached White (Cotton Cord)'],
    quantities: ['500 units', '1,000 units', '2,500 units', '5,000+ units'],
    printZone: {
      top: 36,
      left: 24,
      width: 52,
      height: 44,
      label: 'Bag Center Panel (52% × 44%)'
    }
  },
  diaries: {
    id: 'diaries',
    name: 'Corporate Diaries & Notebooks',
    badge: 'Executive Stationery',
    mockup: blankDiaryWebp,
    icon: BookOpen,
    sizes: ['A5 Executive (148 × 210 mm)', 'B5 Meeting Planner (176 × 250 mm)'],
    finishes: ['PU Leatherette Hardcover', 'Cloth Bound Textured', 'Foil Stamping Surface'],
    quantities: ['500 units', '1,000 units', '2,500 units', '5,000+ units'],
    printZone: {
      top: 30,
      left: 30,
      width: 40,
      height: 42,
      label: 'Front Cover Center (40% × 42%)'
    }
  }
};

export interface ProductCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: CustomizerCategory;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'cups'
}) => {
  // Active Category State
  const [activeCategory, setActiveCategory] = useState<CustomizerCategory>(initialCategory);
  const activeProduct = PRODUCT_CONFIGS[activeCategory];

  // Specifications State
  const [selectedSize, setSelectedSize] = useState<string>(activeProduct.sizes[0]);
  const [selectedFinish, setSelectedFinish] = useState<string>(activeProduct.finishes[0]);
  const [selectedQty, setSelectedQty] = useState<string>(activeProduct.quantities[1]); // Default 1,000 units

  // Custom Text State
  const [customText, setCustomText] = useState<string>('YOUR BRAND NAME');
  const [fontFamily, setFontFamily] = useState<'Outfit' | 'Inter' | 'serif'>('Outfit');
  const [textColor, setTextColor] = useState<string>('#18181B');
  const [textSize, setTextSize] = useState<number>(20);
  const [textOffset, setTextOffset] = useState<{ x: number; y: number }>({ x: 0, y: -25 });

  // Custom Logo State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState<number>(1.0);
  const [logoOffset, setLogoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 15 });
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Guide overlay toggle
  const [showGuides, setShowGuides] = useState<boolean>(true);

  // Dragging interaction state
  const [activeDrag, setActiveDrag] = useState<'logo' | 'text' | null>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; initX: number; initY: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLDivElement>(null);

  // Update selected specs when category changes
  useEffect(() => {
    const config = PRODUCT_CONFIGS[activeCategory];
    setSelectedSize(config.sizes[0]);
    setSelectedFinish(config.finishes[0]);
  }, [activeCategory]);

  // Sync initialCategory prop if passed
  useEffect(() => {
    if (initialCategory && PRODUCT_CONFIGS[initialCategory]) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cleanup object URLs on unmount or logo change to prevent memory leaks
  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  // Handle Logo Upload with rigorous MIME & file size validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid PNG, JPG, or WebP image.');
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setLogoUrl(objectUrl);
    setLogoFileName(file.name);
    setLogoScale(1.0);
    setLogoOffset({ x: 0, y: 15 });
  };

  // Clear logo handler
  const handleRemoveLogo = () => {
    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }
    setLogoUrl(null);
    setLogoFileName(null);
    setUploadError(null);
  };

  // Reset all customizer controls
  const handleReset = () => {
    setCustomText('YOUR BRAND NAME');
    setFontFamily('Outfit');
    setTextColor('#18181B');
    setTextSize(20);
    setTextOffset({ x: 0, y: -25 });
    handleRemoveLogo();
    setLogoScale(1.0);
    setLogoOffset({ x: 0, y: 15 });
  };

  // Pointer drag events for realistic repositioning
  const handlePointerDown = (e: React.PointerEvent, target: 'logo' | 'text') => {
    e.stopPropagation();
    setActiveDrag(target);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const initPos = target === 'logo' ? logoOffset : textOffset;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initX: initPos.x,
      initY: initPos.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDrag || !dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;

    // Scale pixel movement relative to preview container
    const clampDist = 45; // Maximum percentage offset from center within safe zone
    const newX = Math.max(-clampDist, Math.min(clampDist, dragStartRef.current.initX + dx * 0.35));
    const newY = Math.max(-clampDist, Math.min(clampDist, dragStartRef.current.initY + dy * 0.35));

    if (activeDrag === 'logo') {
      setLogoOffset({ x: Math.round(newX), y: Math.round(newY) });
    } else {
      setTextOffset({ x: Math.round(newX), y: Math.round(newY) });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDrag) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
      setActiveDrag(null);
      dragStartRef.current = null;
    }
  };

  // Build WhatsApp Quotation Link with structured parameters
  const getWhatsAppQuoteUrl = () => {
    const lines = [
      `*Custom Packaging Concept Inquiry — United Impex*`,
      ``,
      `• *Product Category:* ${activeProduct.name} (${activeProduct.badge})`,
      `• *Selected Size / Spec:* ${selectedSize}`,
      `• *Material & Finish:* ${selectedFinish}`,
      `• *Estimated Quantity Tier:* ${selectedQty}`,
      `• *Custom Branding Text:* "${customText}" (${fontFamily} font)`,
      `• *Logo Uploaded in Preview:* ${logoUrl ? `Yes ("${logoFileName}")` : 'None / Text Only'}`,
      ``,
      `Please provide an official wholesale quotation and lead time for our company.`,
      `[Note: Attaching our logo file directly in this WhatsApp chat]`
    ];

    const message = lines.join('\n');
    return `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-modal-title"
      ref={modalRef}
    >
      {/* Modal Card Shell */}
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-200 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden text-[#18181B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Dismissal (Always accessible) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200/80 shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
            aria-label="Close Customization Popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================================
            LEFT COLUMN / TOP REGION (MOBILE): LIVE PRODUCT STAGING & INTERACTIVE PREVIEW
            ========================================================================= */}
        <div className="w-full lg:w-[56%] bg-gradient-to-b from-[#F9FAFB] to-[#F1F3F5] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200 select-none">
          {/* Top Bar: Product Category Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                1. Select Product Model
              </span>

              {/* Guide Overlay Toggle */}
              <button
                type="button"
                onClick={() => setShowGuides(!showGuides)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showGuides 
                    ? 'bg-pink-50 border-[#EB1767]/40 text-[#EB1767]' 
                    : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800'
                }`}
                title="Toggle printable boundary guide on product mockup"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{showGuides ? 'Guides Active' : 'Show Guides'}</span>
              </button>
            </div>

            {/* Product Switcher Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {(Object.keys(PRODUCT_CONFIGS) as CustomizerCategory[]).map((catKey) => {
                const item = PRODUCT_CONFIGS[catKey];
                const Icon = item.icon;
                const isSelected = activeCategory === catKey;

                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setActiveCategory(catKey)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#EB1767] text-[#EB1767] shadow-sm ring-1 ring-[#EB1767]'
                        : 'bg-white/70 hover:bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#EB1767]' : 'text-zinc-400'}`} />
                    <span className="truncate">{item.name.replace('Custom ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Staging Canvas */}
          <div 
            ref={previewCanvasRef}
            className="relative aspect-square w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[460px] mx-auto bg-white rounded-2xl shadow-inner border border-zinc-200/80 overflow-hidden my-2 flex items-center justify-center touch-none"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Blank Photographic Mockup Base Layer */}
            <img 
              src={activeProduct.mockup}
              alt={`Blank ${activeProduct.name} mockup template`}
              width={1200}
              height={1200}
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Approximate Printable Safe Region Container */}
            <div 
              style={{
                top: `${activeProduct.printZone.top}%`,
                left: `${activeProduct.printZone.left}%`,
                width: `${activeProduct.printZone.width}%`,
                height: `${activeProduct.printZone.height}%`,
              }}
              className={`absolute flex flex-col items-center justify-center pointer-events-none transition-all ${
                showGuides 
                  ? 'border-2 border-dashed border-[#EB1767]/60 rounded-xl bg-pink-500/5' 
                  : 'border-transparent'
              }`}
            >
              {/* Subtle Safe Margin Tag */}
              {showGuides && (
                <span className="absolute top-1 left-2 text-[9px] font-bold uppercase tracking-wider text-[#EB1767]/70 bg-white/80 px-1.5 py-0.5 rounded shadow-2xs">
                  Print Zone
                </span>
              )}

              {/* Dynamic Branding Text Layer */}
              {customText.trim() && (
                <div
                  style={{
                    transform: `translate(${textOffset.x}%, ${textOffset.y}%)`,
                    fontFamily: fontFamily === 'serif' ? 'serif' : fontFamily,
                    fontSize: `${textSize}px`,
                    color: textColor,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, 'text')}
                  className={`pointer-events-auto cursor-grab active:cursor-grabbing font-bold tracking-tight text-center max-w-[90%] break-words px-2 py-0.5 rounded transition-shadow ${
                    activeDrag === 'text' 
                      ? 'ring-2 ring-[#EB1767] bg-white/70 shadow-md' 
                      : 'hover:ring-1 hover:ring-zinc-400'
                  }`}
                  style-blend="multiply"
                >
                  <span className="mix-blend-multiply drop-shadow-2xs select-none">
                    {customText}
                  </span>
                </div>
              )}

              {/* Dynamic Logo Upload Layer with Multiply Ink Simulation */}
              {logoUrl && (
                <div
                  style={{
                    transform: `translate(${logoOffset.x}%, ${logoOffset.y}%) scale(${logoScale})`,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, 'logo')}
                  className={`pointer-events-auto cursor-grab active:cursor-grabbing inline-block p-1 rounded transition-shadow ${
                    activeDrag === 'logo' 
                      ? 'ring-2 ring-[#EB1767] bg-white/70 shadow-md' 
                      : 'hover:ring-1 hover:ring-zinc-400'
                  }`}
                >
                  <img 
                    src={logoUrl}
                    alt="Custom customer uploaded logo"
                    className="max-h-20 sm:max-h-24 max-w-[140px] sm:max-w-[170px] object-contain mix-blend-multiply pointer-events-none select-none drop-shadow-2xs"
                  />
                </div>
              )}

              {/* Interactive Helper Hint if empty */}
              {!logoUrl && !customText.trim() && (
                <div className="text-center px-4 py-2 pointer-events-none">
                  <p className="text-xs text-zinc-400 font-medium">
                    Type brand text or upload a logo to preview design
                  </p>
                </div>
              )}
            </div>

            {/* Interaction Indicator Pill (Bottom Overlay) */}
            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none text-[11px] text-zinc-600 glass-control px-3 py-1.5 rounded-lg border border-white/80 shadow-2xs">
              <span className="flex items-center gap-1 font-medium">
                <Move className="w-3 h-3 text-[#EB1767]" />
                <span className="hidden sm:inline">Drag text or logo to adjust position</span>
                <span className="sm:hidden">Drag elements on canvas</span>
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-semibold">
                {activeProduct.printZone.label.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Staging Footer Notice */}
          <div className="mt-2 text-center sm:text-left">
            <p className="text-[11px] text-zinc-400 leading-normal flex items-start sm:items-center gap-1.5 justify-center sm:justify-start">
              <Info className="w-3.5 h-3.5 shrink-0 text-zinc-400 mt-0.5 sm:mt-0" />
              <span>
                Simulated 2D concept. Final color accuracy and machine dies are verified during formal quoting.
              </span>
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: MODULAR CUSTOMIZATION CONTROLS & SPECIFICATION DRAWER
            ========================================================================= */}
        <div className="w-full lg:w-[44%] p-5 sm:p-6 lg:p-8 flex flex-col justify-between lg:overflow-y-auto space-y-6">
          <div>
            {/* Modal Heading & Badge */}
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDF2F6] text-[#EB1767] border border-[#EB1767]/20 mb-1.5">
                <Palette className="w-3 h-3" />
                <span>Interactive Concept Builder</span>
              </div>
              <h2 id="customizer-modal-title" className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                {activeProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Customize size, branding text, and logo placement for an instant wholesale estimate.
              </p>
            </div>

            {/* SECTION 2: BRANDING TEXT INPUT */}
            <div className="space-y-3 pb-5 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <label htmlFor="custom-brand-text" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  2. Brand / Cafe Name Text
                </label>
                {customText && (
                  <button
                    type="button"
                    onClick={() => setCustomText('')}
                    className="text-[11px] text-zinc-400 hover:text-zinc-600 underline cursor-pointer"
                  >
                    Clear text
                  </button>
                )}
              </div>

              <input
                id="custom-brand-text"
                type="text"
                maxLength={32}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your brand or cafe name..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EB1767] focus:border-transparent transition-all min-h-[44px]"
              />

              {/* Text Styling Controls (Font, Color, Size Slider) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Font Selector */}
                <div>
                  <span className="text-[11px] text-zinc-400 font-semibold block mb-1">Font Typography</span>
                  <div className="flex gap-1.5">
                    {(['Outfit', 'Inter', 'serif'] as const).map((font) => (
                      <button
                        key={font}
                        type="button"
                        onClick={() => setFontFamily(font)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          fontFamily === font
                            ? 'bg-zinc-900 border-zinc-900 text-white'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {font === 'serif' ? 'Serif' : font}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <span className="text-[11px] text-zinc-400 font-semibold block mb-1">Text Ink Color</span>
                  <div className="flex gap-2 items-center">
                    {[
                      { hex: '#18181B', label: 'Dark Charcoal' },
                      { hex: '#EB1767', label: 'Brand Magenta' },
                      { hex: '#FFFFFF', label: 'Pure White', border: true },
                      { hex: '#854D0E', label: 'Kraft Brown' },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setTextColor(col.hex)}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          col.border ? 'border border-zinc-300' : ''
                        } ${textColor === col.hex ? 'scale-125 ring-2 ring-[#EB1767] ring-offset-2' : 'hover:scale-110'}`}
                        style={{ backgroundColor: col.hex }}
                        aria-label={`Select ${col.label}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Size Slider */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>Text Size</span>
                  <span className="font-mono text-zinc-700 font-semibold">{textSize}px</span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={34}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full accent-[#EB1767] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* SECTION 3: COMPANY LOGO UPLOAD & SCALE */}
            <div className="space-y-3 py-5 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  3. Company Logo Upload (PNG/JPG)
                </label>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {!logoUrl ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    aria-label="Upload packaging logo image"
                  />
                  <div className="p-4 rounded-xl border-2 border-dashed border-zinc-200 hover:border-[#EB1767] bg-zinc-50 hover:bg-pink-50/30 text-center transition-colors">
                    <Upload className="w-5 h-5 mx-auto text-zinc-400 mb-1" />
                    <p className="text-xs font-semibold text-zinc-700">
                      Click to upload logo or drag & drop
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Transparent PNG or JPG (Max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate mr-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-zinc-800 truncate">{logoFileName}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      Loaded
                    </span>
                  </div>

                  {/* Logo Scale Controls */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Logo Scale</span>
                      <span className="font-mono text-zinc-700 font-semibold">{Math.round(logoScale * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setLogoScale((s) => Math.max(0.5, s - 0.1))}
                        className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                        title="Reduce logo size"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="range"
                        min={0.5}
                        max={1.6}
                        step={0.05}
                        value={logoScale}
                        onChange={(e) => setLogoScale(Number(e.target.value))}
                        className="flex-1 accent-[#EB1767] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoScale((s) => Math.min(1.6, s + 0.1))}
                        className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                        title="Enlarge logo size"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-rose-600 font-semibold">{uploadError}</p>
              )}
            </div>

            {/* SECTION 4: PRODUCT SPECIFICATIONS & QUANTITY */}
            <div className="space-y-4 py-5 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                4. Production Specifications
              </span>

              {/* Variant / Size Selection */}
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1.5">Size / Dimension</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {activeProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Finish Selection */}
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1.5">Paperboard & Finish</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.finishes.map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => setSelectedFinish(fn)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedFinish === fn
                          ? 'bg-[#EB1767] border-[#EB1767] text-white shadow-2xs'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Tier Selection */}
              <div>
                <span className="text-[11px] text-zinc-400 font-semibold block mb-1.5">Quantity Tier</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {activeProduct.quantities.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setSelectedQty(q)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        selectedQty === q
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              STICKY DRAWER FOOTER: RESET & PRIMARY WHATSAPP INQUIRY ACTION
              ========================================================================= */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1 font-semibold text-zinc-800">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Concept Ready for Quotation</span>
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-700 underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Design</span>
              </button>
            </div>

            {/* Primary Action Button: WhatsApp Quotation Link */}
            <a
              href={getWhatsAppQuoteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2.5"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current text-white" />
              <span>Request Quote with this Concept</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Explicit customer note regarding logo attachment */}
            <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-[11px] text-zinc-500 leading-normal">
              <strong>Customer note:</strong> WhatsApp will open with your packaging specifications pre-filled. Please attach your uploaded logo file directly in the chat when sending your message.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizerModal;
