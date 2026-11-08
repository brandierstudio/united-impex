import React from 'react';
import { ArrowRight, Box, ShoppingBag, BookOpen, Coffee, Package, Palette } from 'lucide-react';
import { Link } from 'wouter';

import cupPng from '../../assets/animation/cup.png';
import boxImg from '../../assets/products/boxes/Product_commercial_photography_s_470ccf75.jpg';
import bagImg from '../../assets/products/bags/Product_photography_in_studio_5e308475.jpg';
import diaryImg from '../../assets/products/diaries/Product_photograph_in_studio_81f03e4a.jpg';

export interface FeaturedProduct {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
  route: string;
  priceSample: string;
  icon: React.ComponentType<{ className?: string }>;
  isCupAnchor?: boolean;
  customizerCat: 'cups' | 'boxes' | 'bags' | 'diaries';
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'coffee-cups',
    name: 'Custom Coffee Cups',
    badge: 'Drinkware',
    description: 'Single, double-wall & ripple insulated cups with snap lids.',
    image: cupPng,
    alt: 'Custom printed takeaway paper coffee cup with vibrant branding',
    route: '/products/coffee-cups',
    priceSample: 'From ₨12 / cup (Sample)',
    icon: Coffee,
    isCupAnchor: true,
    customizerCat: 'cups',
  },
  {
    id: 'packaging-boxes',
    name: 'Packaging Boxes',
    badge: 'Cartons & Rigid',
    description: 'Rigid luxury gift boxes, folding cartons & mailers.',
    image: boxImg,
    alt: 'Precision manufactured custom product packaging boxes and luxury rigid cartons',
    route: '/products/boxes',
    priceSample: 'From ₨45 / box (Sample)',
    icon: Box,
    customizerCat: 'boxes',
  },
  {
    id: 'paper-bags',
    name: 'Custom Paper Bags',
    badge: 'Retail Carryware',
    description: 'Durable kraft shopping bags with twisted or ribbon handles.',
    image: bagImg,
    alt: 'Luxury branded retail paper shopping carry bags with high quality handles',
    route: '/products/paper-bags',
    priceSample: 'From ₨28 / bag (Sample)',
    icon: ShoppingBag,
    customizerCat: 'bags',
  },
  {
    id: 'corporate-diaries',
    name: 'Corporate Diaries',
    badge: 'Stationery',
    description: 'Hardbound executive planners & debossed notebooks.',
    image: diaryImg,
    alt: 'Executive custom bound corporate diaries, planners, and embossed stationery',
    route: '/products/diaries',
    priceSample: 'From ₨350 / pc (Sample)',
    icon: BookOpen,
    customizerCat: 'diaries',
  },
];

export interface ProductCategoriesProps {
  onOpenCustomizer?: (category?: 'cups' | 'boxes' | 'bags' | 'diaries') => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onOpenCustomizer }) => {
  return (
    <>
      {/* ========================================================================= */}
      {/* APPROVED MOBILE EXPERIENCE (< 1024px)                                     */}
      {/* Faithful implementation of Owner-Approved Mobile Visual Reference         */}
      {/* ========================================================================= */}
      <section 
        id="mobile-categories-strip" 
        aria-label="Product Categories"
        className="block lg:hidden w-full bg-[#FAF8F5] px-3 sm:px-4 pt-3 pb-5"
      >
        {/* 1. Four Category Tiles: Single Row, 4 Columns */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* Tile 1: Coffee Cups */}
          <Link 
            href="/products/coffee-cups"
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-2xl"
          >
            <div className="w-full aspect-square rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#F5EFEA] border border-zinc-200/60 p-1.5 sm:p-2 shadow-2xs group-hover:scale-[1.03] active:scale-95 transition-all">
              <img
                src="/mobile-ref/cat-coffee-cups.webp"
                alt="Custom Coffee Cups"
                width={240}
                height={240}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-zinc-800 text-center tracking-tight leading-tight group-hover:text-[#EB1767] transition-colors">
              Coffee Cups
            </span>
          </Link>

          {/* Tile 2: Cartons */}
          <Link 
            href="/products/boxes"
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-2xl"
          >
            <div className="w-full aspect-square rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#F5EFEA] border border-zinc-200/60 p-1.5 sm:p-2 shadow-2xs group-hover:scale-[1.03] active:scale-95 transition-all">
              <img
                src="/mobile-ref/cat-cartons.webp"
                alt="Custom Packaging Cartons"
                width={240}
                height={240}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-zinc-800 text-center tracking-tight leading-tight group-hover:text-[#EB1767] transition-colors">
              Cartons
            </span>
          </Link>

          {/* Tile 3: Paper Bags */}
          <Link 
            href="/products/paper-bags"
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-2xl"
          >
            <div className="w-full aspect-square rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#F5EFEA] border border-zinc-200/60 p-1.5 sm:p-2 shadow-2xs group-hover:scale-[1.03] active:scale-95 transition-all">
              <img
                src="/mobile-ref/cat-paper-bags.webp"
                alt="Custom Paper Bags"
                width={240}
                height={240}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-zinc-800 text-center tracking-tight leading-tight group-hover:text-[#EB1767] transition-colors">
              Paper Bags
            </span>
          </Link>

          {/* Tile 4: Diaries */}
          <Link 
            href="/products/diaries"
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-2xl"
          >
            <div className="w-full aspect-square rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#F5EFEA] border border-zinc-200/60 p-1.5 sm:p-2 shadow-2xs group-hover:scale-[1.03] active:scale-95 transition-all">
              <img
                src="/mobile-ref/cat-diaries.webp"
                alt="Custom Corporate Diaries"
                width={240}
                height={240}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-zinc-800 text-center tracking-tight leading-tight group-hover:text-[#EB1767] transition-colors">
              Diaries
            </span>
          </Link>
        </div>

        {/* 2. Feature Banner: "Premium Custom Boxes" with Circular Arrow Button */}
        <Link
          href="/products/boxes"
          className="group relative block mt-3.5 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-sm border border-zinc-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] active:scale-[0.99] transition-all"
          aria-label="Explore Premium Custom Boxes Collection"
        >
          <div className="relative aspect-[524/152] w-full overflow-hidden bg-[#453632]">
            <img
              src="/mobile-ref/feature-banner-boxes.webp"
              alt="Premium Custom Boxes — Luxury rigid cartons with debossed metallic branding"
              width={1048}
              height={304}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </Link>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP EXPERIENCE (>= 1024px)                                            */}
      {/* Preserved Milestone 3 / GSAP Cup Landing Anchor Grid                      */}
      {/* ========================================================================= */}
      <section 
        id="products" 
        aria-labelledby="categories-heading"
        className="hidden lg:block relative w-full bg-[#121216] text-white py-10 sm:py-14 lg:py-16 border-b border-zinc-800 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Compact, Elegant */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="reveal-subheading inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-[#EB1767] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Package className="w-3 h-3 text-[#EB1767]" />
              <span>Commercial Packaging Portfolio</span>
            </div>

            <h2 
              id="categories-heading"
              className="reveal-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight"
            >
              Featured Product Capabilities.
            </h2>
          </div>

          <Link
            href="/products"
            className="reveal-subheading inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-[#EB1767] transition-colors self-start sm:self-auto"
          >
            <span>View All 8 Categories</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EB1767]" />
          </Link>
        </div>

        {/* Compact 4-Product Grid: Desktop 4×1, Mobile 2×2 */}
        <div className="reveal-stagger-group grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {FEATURE_PRODUCTS_CARDS(FEATURED_PRODUCTS, onOpenCustomizer)}
        </div>

      </div>
    </section>
    </>
  );
};

function FEATURE_PRODUCTS_CARDS(
  products: FeaturedProduct[], 
  onOpenCustomizer?: (category?: 'cups' | 'boxes' | 'bags' | 'diaries') => void
) {
  return products.map((item) => {
    const Icon = item.icon;
    const isCup = item.isCupAnchor;

    return (
      <article
        key={item.id}
        id={isCup ? 'cup-anchor-1' : undefined}
        className={`reveal-card group flex flex-col bg-zinc-900/85 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-md ${
          isCup ? 'relative' : ''
        }`}
      >
        {/* Image Container with Badge */}
        <Link 
          href={item.route}
          className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 block cursor-pointer"
          tabIndex={-1}
          aria-hidden="true"
        >
          {isCup ? (
            <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-500 select-none"
              />
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.alt}
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
            />
          )}

          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-black/70 backdrop-blur-md text-white border border-white/10">
              <Icon className="w-2.5 h-2.5 text-[#EB1767]" />
              <span>{item.badge}</span>
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            <h3 className="font-['Outfit',sans-serif] text-sm sm:text-base font-bold text-white group-hover:text-[#EB1767] transition-colors leading-snug">
              <Link href={item.route} className="hover:underline">
                {item.name}
              </Link>
            </h3>

            <p className="mt-1 text-[11px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <p className="mt-1.5 text-[10px] sm:text-[11px] font-mono text-[#EB1767]/90 font-medium">
              {item.priceSample}
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <Link
              href={item.route}
              className="text-[11px] sm:text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 text-[#EB1767]" />
            </Link>

            {onOpenCustomizer && (
              <button
                type="button"
                onClick={() => onOpenCustomizer(item.customizerCat)}
                className="text-[10px] sm:text-[11px] font-semibold text-[#EB1767] hover:underline cursor-pointer inline-flex items-center gap-1"
                title={`Customize ${item.name}`}
              >
                <Palette className="w-2.5 h-2.5" />
                <span>Customize</span>
              </button>
            )}
          </div>
        </div>
      </article>
    );
  });
}

export default ProductCategories;
