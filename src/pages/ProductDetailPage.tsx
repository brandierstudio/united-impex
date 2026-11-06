import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { 
  ShoppingBag, 
  Palette, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Droplet, 
  Printer, 
  Recycle, 
  Minus, 
  Plus, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { 
  ECOMMERCE_PRODUCTS, 
  getProductBySlug, 
  getRelatedProducts, 
  type EcommerceProduct,
  type ProductVariation 
} from '../data/ecommerceProductsData';
import { useCart } from '../context/CartContext';
import { ProductCustomizerModal, type CustomizerCategory } from '../components/customizer/ProductCustomizerModal';

interface ProductDetailPageProps {
  onOpenCustomizer?: (category?: CustomizerCategory) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenCustomizer }) => {
  const [, params] = useRoute('/products/:slug');
  const slug = params?.slug || 'coffee-cups';
  const { addToCart } = useCart();

  const product: EcommerceProduct = getProductBySlug(slug) || ECOMMERCE_PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product.id, 3);

  // Gallery & Purchase State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariation>(product.variations[0]);
  const [quantity, setQuantity] = useState<number>(product.minOrderQuantity);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Keyboard navigation for image zoom lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isZoomOpen]);

  // Reset when slug changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedVariant(product.variations[0]);
    setQuantity(product.minOrderQuantity);
    setOpenAccordionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, product]);

  const unitPrice = product.startingPricePKR * (selectedVariant?.priceModifier || 1.0);
  const estimatedBatchTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      image: product.gallery[activeImageIndex]?.src || product.primaryImage,
      variantId: selectedVariant?.id || 'standard',
      variantName: selectedVariant?.name || 'Standard Specification',
      unitPricePKR: unitPrice,
      priceUnit: product.priceUnit,
      quantity: quantity,
      minOrderQuantity: product.minOrderQuantity,
      material: product.material,
      finish: product.finish
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleOpenCustomizer = () => {
    if (onOpenCustomizer) {
      onOpenCustomizer(product.customizerCategory);
    } else {
      setCustomizerModalOpen(true);
    }
  };

  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. BREADCRUMBS
            ========================================================================= */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#EB1767] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-zinc-500">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </nav>

        {/* =========================================================================
            2. PRODUCT HERO STAGE: 12-COLUMN RESPONSIVE SPLIT
            (Matching 03_product_detail_gallery.png)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-28">
          
          {/* ===================================================================
              LEFT 6 COLS: THUMBNAIL RAIL + LARGE PHOTOGRAPHY CANVAS
              =================================================================== */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start">
            
            {/* Vertical Thumbnail Rail */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[520px] w-full sm:w-20 shrink-0 pb-2 sm:pb-0 scrollbar-none">
              {product.gallery.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-50 border p-2 shrink-0 transition-all duration-200 cursor-pointer overflow-hidden ${
                    activeImageIndex === idx
                      ? 'border-[#EB1767] ring-2 ring-[#EB1767]/20 shadow-xs scale-102'
                      : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${item.label}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main Photography Viewport with Fullscreen Lightbox Trigger */}
            <div 
              onClick={() => setIsZoomOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsZoomOpen(true);
                }
              }}
              aria-label="Click to view full screen high resolution image"
              className="relative aspect-square w-full rounded-3xl bg-radial from-white via-zinc-50 to-zinc-100 border border-zinc-200/90 shadow-md p-6 sm:p-10 flex items-center justify-center overflow-hidden group cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
            >
              
              {/* Top-Left Badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-800 text-xs font-semibold shadow-2xs">
                  <Printer className="w-3.5 h-3.5 text-[#EB1767]" />
                  <span>Custom Printed</span>
                </span>
              </div>

              {/* High-Resolution Active Photo */}
              <img
                src={product.gallery[activeImageIndex]?.src || product.primaryImage}
                alt={product.title}
                className="w-full h-full object-contain select-none group-hover:scale-103 transition-transform duration-500 ease-out pointer-events-none"
              />

              {/* Bottom-Right Zoom Hint */}
              <div className="absolute bottom-4 right-4 z-10 text-zinc-600 group-hover:text-[#EB1767] pointer-events-none transition-colors">
                <div className="w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-zinc-200/80 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>

          {/* ===================================================================
              RIGHT 6 COLS: SPECIFICATIONS, VARIANT PICKER & DUAL ACTION BUTTONS
              =================================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header: Eyebrow + Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider font-mono">
                <span>{product.categoryLabel}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Demo Pricing Context */}
              <div className="flex flex-wrap items-baseline gap-2 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#EB1767] font-['Outfit',sans-serif]">
                  PKR {unitPrice.toFixed(2)}
                </span>
                <span className="text-sm text-zinc-500 font-medium">
                  / {product.priceUnit}
                </span>
                <span className="text-xs text-zinc-400 font-mono ml-2">
                  (Illustrative demo starting rate • Volume tier quotes available)
                </span>
              </div>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif] pt-1">
                {product.description}
              </p>
            </div>

            {/* 4 Feature Badges (Matching reference 03) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#EB1767] mx-auto" />
                <p className="text-[11px] font-bold text-zinc-800 leading-tight">Commercial Grade</p>
                <p className="text-[10px] text-zinc-400">Tested Quality</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-center space-y-1">
                <Droplet className="w-5 h-5 text-[#EB1767] mx-auto" />
                <p className="text-[11px] font-bold text-zinc-800 leading-tight">Leak Resistant</p>
                <p className="text-[10px] text-zinc-400">Sealed Geometry</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-center space-y-1">
                <Printer className="w-5 h-5 text-[#EB1767] mx-auto" />
                <p className="text-[11px] font-bold text-zinc-800 leading-tight">High-Fidelity</p>
                <p className="text-[10px] text-zinc-400">Offset Litho</p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-center space-y-1">
                <Recycle className="w-5 h-5 text-[#EB1767] mx-auto" />
                <p className="text-[11px] font-bold text-zinc-800 leading-tight">Eco-Conscious</p>
                <p className="text-[10px] text-zinc-400">Recyclable Fiber</p>
              </div>
            </div>

            {/* Variant / Dimension Selector */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono block">
                Select Specification / Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variations.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                      selectedVariant?.id === v.id
                        ? 'border-[#EB1767] bg-[#FDF2F6] text-[#EB1767] font-bold shadow-2xs'
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">{v.specNote}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Batch Estimate */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800 uppercase tracking-wider font-mono">
                  Quantity
                </span>
                <span className="text-zinc-500 font-mono">
                  Min order: {product.minOrderQuantity.toLocaleString()} {product.priceUnit}s
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center border border-zinc-300 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(product.minOrderQuantity, q - (q > 2000 ? 500 : 250)))}
                    className="p-3 hover:bg-zinc-100 text-zinc-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQuantity}
                    step={250}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
                    className="w-24 text-center font-bold text-zinc-900 bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + (q >= 2000 ? 500 : 250))}
                    className="p-3 hover:bg-zinc-100 text-zinc-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-zinc-400 block">Estimated Demo Total</span>
                  <span className="text-lg font-bold text-zinc-900 font-mono">
                    PKR {estimatedBatchTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* ===================================================================
                ACTION BUTTONS: WHITE LIQUID GLASS ADD TO CART + SOLID MAGENTA CUSTOMIZE
                =================================================================== */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* White Liquid Glass Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border shadow-sm min-h-[48px] ${
                    isAddedFeedback
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white/90 hover:bg-white text-zinc-900 border-zinc-300 hover:border-zinc-400 backdrop-blur-md hover:shadow-md'
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#EB1767]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Solid Magenta Customize Button */}
                <button
                  type="button"
                  onClick={handleOpenCustomizer}
                  className="w-full btn-primary text-xs sm:text-sm font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Palette className="w-4 h-4" />
                  <span>Customize in 2D Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

              <p className="text-[11px] text-zinc-400 text-center font-['Inter',sans-serif]">
                Instant WhatsApp quote generation available directly from your cart.
              </p>
            </div>

            {/* ===================================================================
                ACCORDIONS (Matching 03_product_detail_gallery.png)
                =================================================================== */}
            <div className="pt-4 border-t border-zinc-200/80 divide-y divide-zinc-100">
              {product.accordions.map((acc, index) => {
                const isOpen = openAccordionIndex === index;
                return (
                  <div key={index} className="py-3">
                    <button
                      type="button"
                      onClick={() => setOpenAccordionIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#EB1767] transition-colors py-1 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{acc.title}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#EB1767]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-xs text-zinc-600 leading-relaxed font-['Inter',sans-serif] animate-in fade-in duration-200">
                        {acc.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* =========================================================================
            3. RELATED PACKAGING PRODUCTS (Matching 03 bottom row)
            ========================================================================= */}
        <section className="pt-12 border-t border-zinc-200/80">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900">
                Related Packaging Products
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Complement your order with matching branded commercial packaging items.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EB1767] hover:underline"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-[#EB1767]/40 hover:shadow-lg transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-white border border-zinc-200 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={rel.primaryImage}
                    alt={rel.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#EB1767]">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="text-sm font-bold font-['Outfit',sans-serif] text-zinc-900 group-hover:text-[#EB1767] transition-colors truncate">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    From PKR {rel.startingPricePKR.toFixed(2)}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#EB1767] text-zinc-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Embedded 2D Product Customizer Modal Fallback */}
      <ProductCustomizerModal
        isOpen={customizerModalOpen}
        onClose={() => setCustomizerModalOpen(false)}
        initialCategory={product.customizerCategory}
      />

      {/* Fullscreen High-Resolution Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Gallery Zoom"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Top Bar: Image Label & Close Button */}
          <div 
            className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium">
              <span className="font-bold text-[#EB1767] mr-2">{activeImageIndex + 1} / {product.gallery.length}</span>
              <span>{product.gallery[activeImageIndex]?.label || product.title}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow Button */}
          {product.gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.gallery.length - 1));
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Center Image Container */}
          <div 
            className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.gallery[activeImageIndex]?.src || product.primaryImage}
              alt={product.gallery[activeImageIndex]?.alt || product.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl filter drop-shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Right Arrow Button */}
          {product.gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev < product.gallery.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 z-20 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Thumbnails */}
          <div 
            className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-center gap-2 z-20 pointer-events-auto px-4 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {product.gallery.map((g, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white/5 cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#EB1767] scale-110' : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <img src={g.src} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;
