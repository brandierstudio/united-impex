import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, Heart, ShoppingBag, Plus, Check } from 'lucide-react';
import { type EcommerceProduct } from '../../data/ecommerceProductsData';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: EcommerceProduct;
  onQuickView: (product: EcommerceProduct) => void;
  onOpenCustomizer?: (category?: 'cups' | 'boxes' | 'bags' | 'diaries') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onOpenCustomizer: _onOpenCustomizer
}) => {
  const [, setLocation] = useLocation();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [mobileShowLifestyle, setMobileShowLifestyle] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const activeVariant = product.variations[0];
  const unitPrice = product.startingPricePKR * (activeVariant?.priceModifier || 1.0);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    setLocation(`/products/${product.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      if (target.closest('button')) return;
      setLocation(`/products/${product.slug}`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      image: product.primaryImage,
      variantId: activeVariant?.id || 'standard',
      variantName: activeVariant?.name || 'Standard Specification',
      unitPricePKR: unitPrice,
      priceUnit: product.priceUnit,
      quantity: product.minOrderQuantity,
      minOrderQuantity: product.minOrderQuantity,
      material: product.material,
      finish: product.finish
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1800);
  };

  return (
    <div 
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${product.title}`}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-xl hover:border-[#EB1767]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =====================================================================
          1. CARD IMAGE STAGE WITH STUDIO-TO-LIFESTYLE CROSSFADE
          ===================================================================== */}
      <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden flex items-center justify-center p-3 sm:p-5 select-none">
        
        {/* Category Pill Tag (Mobile & Desktop Top-Left) */}
        <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-20">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-zinc-900/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase font-['Outfit',sans-serif] shadow-xs">
            {product.category.toUpperCase()}
          </span>
        </div>

        {/* Top-Right Floating Controls: Wishlist & Quick View */}
        <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20 flex items-center gap-1.5 sm:gap-2">
          {/* Real Client-Side Wishlist Heart */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isFavorited ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer ${
              isFavorited
                ? 'bg-[#EB1767] text-white border-[#EB1767] shadow-xs scale-105'
                : 'bg-white/90 text-zinc-600 hover:text-[#EB1767] border-zinc-200 hover:border-[#EB1767]/40 shadow-xs'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-white stroke-white' : ''}`} />
          </button>

          {/* Quick View Eye Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Quick view specifications for ${product.title}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-zinc-600 hover:text-[#EB1767] hover:border-[#EB1767]/40 border border-zinc-200 flex items-center justify-center backdrop-blur-md shadow-xs transition-all duration-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Primary Studio Photography */}
        <img
          src={product.primaryImage}
          alt={product.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain p-4 sm:p-6 transition-opacity duration-400 ease-in-out ${
            (isHovered || mobileShowLifestyle) ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Lifestyle / Contextual Photography (Crossfades on Hover) */}
        <img
          src={product.lifestyleImage}
          alt={`${product.title} in real-world packaging environment`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
            (isHovered || mobileShowLifestyle) ? 'opacity-100 scale-103' : 'opacity-0'
          }`}
        />

        {/* Mobile View Toggle Pill (Allows touch devices to preview lifestyle view) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMobileShowLifestyle(prev => !prev);
          }}
          className="sm:hidden absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] text-white font-medium border border-white/20"
        >
          {mobileShowLifestyle ? 'Studio' : 'In-Use'}
        </button>

        {/* Card surface click navigates to product details */}
      </div>

      {/* =====================================================================
          2. CARD DETAILS & ACTION BAR
          ===================================================================== */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 gap-2 sm:gap-3 bg-white">
        
        {/* Title & Short Spec */}
        <div className="space-y-1">
          <span
            className="block text-xs sm:text-base font-bold font-['Outfit',sans-serif] text-zinc-900 group-hover:text-[#EB1767] transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {product.title}
          </span>

          <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-1">
            {product.subhead}
          </p>
        </div>

        {/* Demo Price + Add to Quote Action Row */}
        <div className="pt-2 sm:pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          
          {/* Demo Starting Price in PKR */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-[#EB1767] font-['Outfit',sans-serif]">
                PKR {product.startingPricePKR.toFixed(2)}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                /{product.priceUnit}
              </span>
            </div>
            <span className="hidden sm:inline-block text-[9px] text-zinc-400 uppercase tracking-wider font-mono">
              Demo Price
            </span>
          </div>

          {/* Responsive Add to Cart / Add to Quote Button */}
          <div className="flex items-center gap-1.5">
            {/* Desktop Full Button: "+ Add to Quote" */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[36px] ${
                isAddedFeedback
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white hover:bg-[#FDF2F6] text-[#EB1767] border border-[#EB1767]/30 hover:border-[#EB1767] shadow-2xs'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Quote</span>
                </>
              )}
            </button>

            {/* Mobile Icon Button: Pink Circle Shopping Bag */}
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.title} to quote`}
              className={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isAddedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FDF2F6] active:bg-[#EB1767] text-[#EB1767] active:text-white border border-[#EB1767]/30'
              }`}
            >
              {isAddedFeedback ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
