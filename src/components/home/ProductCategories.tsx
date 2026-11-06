import React from 'react';
import { ArrowRight, Box, ShoppingBag, BookOpen, Coffee, Package, Palette } from 'lucide-react';
import { Link } from 'wouter';
import cupPng from '../../assets/animation/cup.png';

import boxImg from '../../assets/products/boxes/Product_commercial_photography_s_470ccf75.jpg';
import bagImg from '../../assets/products/bags/Product_photography_in_studio_5e308475.jpg';
import diaryImg from '../../assets/products/diaries/Product_photograph_in_studio_81f03e4a.jpg';

export interface CategoryCardData {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SUPPORTING_CATEGORIES: CategoryCardData[] = [
  {
    id: 'packaging-boxes',
    name: 'Custom Packaging Boxes',
    badge: 'Cartons & Rigid Boxes',
    description: 'Rigid luxury presentation boxes, folding product cartons, and sturdy corrugated mailers tailored to brand dimensions.',
    image: boxImg,
    alt: 'Precision manufactured custom product packaging boxes and luxury rigid cartons',
    route: '/products/boxes',
    icon: Box,
  },
  {
    id: 'paper-bags',
    name: 'Custom Paper Bags',
    badge: 'Retail Carryware',
    description: 'Durable kraft shopping bags and premium art paper totes with reinforced twisted, ribbon, or cotton cord handles.',
    image: bagImg,
    alt: 'Luxury branded retail paper shopping carry bags with high quality handles',
    route: '/products/paper-bags',
    icon: ShoppingBag,
  },
  {
    id: 'corporate-diaries',
    name: 'Corporate Diaries & Notebooks',
    badge: 'Stationery & Planners',
    description: 'Hardbound executive corporate planners, debossed leatherette notebooks, and bespoke desk stationery.',
    image: diaryImg,
    alt: 'Executive custom bound corporate diaries, planners, and embossed stationery',
    route: '/products/diaries',
    icon: BookOpen,
  },
];

export interface ProductCategoriesProps {
  onOpenCustomizer?: (category?: 'cups' | 'boxes' | 'bags' | 'diaries') => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onOpenCustomizer }) => {
  return (
    <section 
      id="products" 
      aria-labelledby="categories-heading"
      className="relative w-full bg-[#121216] text-white py-16 sm:py-20 lg:py-24 border-b border-zinc-800 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Package className="w-3.5 h-3.5 text-[#EB1767]" />
            <span>Commercial Packaging Portfolio</span>
          </div>

          <h2 
            id="categories-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            Engineered Packaging &amp; Commercial Printing.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-['Inter',sans-serif]">
            From insulated commercial takeaway cups to bespoke rigid cartons, retail kraft bags, and executive stationery — discover our complete manufacturing portfolio.
          </p>
        </div>

        {/* 12-Column Layout: Left 4 cols reserved for Coffee Cup Anchor (LEFT), Right 8 cols for other 3 categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================================================================
              CUP ANCHOR 1: LEFT SIDEWAY POINT (Reserved space for travelling cup)
              =================================================================== */}
          <div 
            id="cup-anchor-1"
            className="lg:col-span-4 rounded-3xl bg-zinc-900/90 border border-zinc-700/60 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg min-h-[380px]"
          >
            {/* Ambient soft glow ring reserving space for the cup */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#EB1767]/10 blur-2xl pointer-events-none" 
              aria-hidden="true"
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-pink-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-4 border border-zinc-700">
                <Coffee className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>01 / Drinkware &amp; Disposables</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight">
                Custom Printed Coffee Cups
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Single wall, double wall, and ripple insulated food-grade cups with tight-snap precision lids. Fully customized with vivid offset graphics.
              </p>
            </div>

            {/* Dedicated Product Graphic (Full-fidelity on desktop & mobile, zero debug placeholders) */}
            <div className="my-3 relative h-40 flex items-center justify-center">
              <div 
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-3.5 bg-black/40 blur-md rounded-full pointer-events-none" 
                aria-hidden="true" 
              />
              <img 
                src={cupPng} 
                alt="United Impex custom printed coffee cup" 
                className="h-36 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] select-none pointer-events-none" 
              />
            </div>

            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              {onOpenCustomizer && (
                <button
                  type="button"
                  onClick={() => onOpenCustomizer('cups')}
                  className="btn-primary w-full text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Customize This Cup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <Link
                href="/products/coffee-cups"
                className="btn-secondary w-full text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center"
              >
                <span>View Cup Specifications</span>
              </Link>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 8 COLS: 3 SUPPORTING PRODUCT CARDS (Boxes, Bags, Diaries)
              =================================================================== */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SUPPORTING_CATEGORIES.map((category) => {
              const Icon = category.icon;

              return (
                <article 
                  key={category.id}
                  className="group/card flex flex-col bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 shadow-md transition-all duration-300"
                >
                  <Link 
                    href={category.route}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 block cursor-pointer"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={category.image}
                      alt={category.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04] opacity-90"
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-xs">
                        <Icon className="w-3 h-3 text-pink-400" />
                        <span>{category.badge}</span>
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-base font-bold text-white group-hover/card:text-[#EB1767] transition-colors leading-snug">
                        <Link href={category.route} className="hover:underline">
                          {category.name}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs text-[#C8C8D0] line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                      <Link
                        href={category.route}
                        className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 group-hover/card:translate-x-0.5 transition-all"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 text-[#EB1767]" />
                      </Link>

                      {onOpenCustomizer && (
                        <button
                          type="button"
                          onClick={() => {
                            const cat = category.id === 'packaging-boxes' ? 'boxes' : category.id === 'paper-bags' ? 'bags' : 'diaries';
                            onOpenCustomizer(cat);
                          }}
                          className="text-[11px] font-semibold text-[#EB1767] hover:underline cursor-pointer"
                        >
                          Customize &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

        {/* Bottom Catalog Deep-link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="btn-dark text-xs sm:text-sm font-semibold"
          >
            <span>Explore All 4 Product Categories in Detail</span>
            <ArrowRight className="w-4 h-4 text-[#EB1767]" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;
