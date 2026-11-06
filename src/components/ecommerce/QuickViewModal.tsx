import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShoppingBag, 
  Palette, 
  Check, 
  Minus, 
  Plus,
  ExternalLink 
} from 'lucide-react';
import { Link } from 'wouter';
import { type EcommerceProduct, type ProductVariation } from '../../data/ecommerceProductsData';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: EcommerceProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomizer?: (category: 'cups' | 'boxes' | 'bags' | 'diaries') => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenCustomizer
}) => {
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState<string>(product?.primaryImage || '');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariation | null>(product?.variations[0] || null);
  const [quantity, setQuantity] = useState<number>(product?.minOrderQuantity || 1000);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.primaryImage);
      setSelectedVariant(product.variations[0] || null);
      setQuantity(product.minOrderQuantity || 1000);
      setIsAddedFeedback(false);
    }
  }, [product]);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentUnitPrice = product.startingPricePKR * (selectedVariant?.priceModifier || 1.0);
  const calculatedTotal = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      image: activeImage || product.primaryImage,
      variantId: selectedVariant?.id || 'standard',
      variantName: selectedVariant?.name || 'Standard Specification',
      unitPricePKR: currentUnitPrice,
      priceUnit: product.priceUnit,
      quantity: quantity,
      minOrderQuantity: product.minOrderQuantity,
      material: product.material,
      finish: product.finish
    });

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===================================================================
            LEFT COLUMN: GALLERY STAGE & MULTI-ANGLE THUMBNAIL RAIL
            =================================================================== */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 bg-zinc-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-100">
          
          {/* Main Selected Image Stage */}
          <div className="relative aspect-square w-full rounded-2xl bg-white border border-zinc-200/80 p-6 flex items-center justify-center overflow-hidden shadow-2xs">
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FDF2F6] text-[#EB1767] border border-[#EB1767]/20 text-[10px] font-bold uppercase tracking-wider font-mono">
              {product.categoryLabel}
            </span>

            <img
              src={activeImage || product.primaryImage}
              alt={product.title}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>

          {/* Clickable Multi-Angle Thumbnail Rail */}
          <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img.src)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border p-1.5 shrink-0 overflow-hidden transition-all duration-200 cursor-pointer ${
                  activeImage === img.src
                    ? 'border-[#EB1767] ring-2 ring-[#EB1767]/20 shadow-xs scale-103'
                    : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View ${img.label}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Quick Specs Pill Box */}
          <div className="mt-4 p-3 rounded-xl bg-white border border-zinc-200/60 text-xs text-zinc-600 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400">Material:</span>
              <span className="font-semibold text-zinc-800">{product.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Lead Time:</span>
              <span className="font-semibold text-zinc-800">{product.leadTime}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: DETAILS, VARIATION PICKER & ACTION BUTTONS
            =================================================================== */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Header: Title & Subhead */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EB1767] font-mono">
                Commercial Specification
              </span>
              <h2 id="quick-view-title" className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 mt-0.5">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Demo Pricing Context */}
            <div className="p-3.5 rounded-2xl bg-[#FDF2F6] border border-[#EB1767]/20 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">
                  Illustrative Rate (Demo)
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-extrabold text-[#EB1767] font-['Outfit',sans-serif]">
                    PKR {currentUnitPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    / {product.priceUnit}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-500 block">Est. Batch Total</span>
                <span className="text-sm font-bold text-zinc-900 font-mono">
                  PKR {calculatedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Variation / Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono block">
                Select Variation / Size
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.variations.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      selectedVariant?.id === v.id
                        ? 'border-[#EB1767] bg-[#FDF2F6] text-[#EB1767] font-semibold shadow-2xs'
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="font-mono text-[11px] text-zinc-400">
                      {v.specNote || ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800 uppercase tracking-wider font-mono">
                  Order Quantity
                </span>
                <span className="text-zinc-400">
                  Min Order: {product.minOrderQuantity.toLocaleString()} {product.priceUnit}s
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(product.minOrderQuantity, q - (q > 2000 ? 500 : 250)))}
                    className="p-2.5 hover:bg-zinc-200 text-zinc-600 transition-colors"
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
                    className="p-2.5 hover:bg-zinc-200 text-zinc-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-zinc-500 font-medium">
                  {quantity.toLocaleString()} {product.priceUnit}s
                </span>
              </div>
            </div>

          </div>

          {/* Action Row: White Liquid Glass Add to Cart + Solid Magenta Customize */}
          <div className="pt-4 border-t border-zinc-100 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* White Liquid Glass Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3 px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border shadow-sm min-h-[44px] ${
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
                onClick={() => {
                  onClose();
                  onOpenCustomizer?.(product.customizerCategory);
                }}
                className="w-full btn-primary text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Palette className="w-4 h-4" />
                <span>Customize in 2D</span>
              </button>
            </div>

            {/* View Full Product Details Link */}
            <div className="text-center pt-1">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-[#EB1767] transition-colors"
              >
                <span>View Full Specifications &amp; Gallery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
