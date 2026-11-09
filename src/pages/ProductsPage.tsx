import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Package, 
  Info
} from 'lucide-react';
import { Link } from 'wouter';
import { ECOMMERCE_PRODUCTS, type EcommerceProduct } from '../data/ecommerceProductsData';
import { ProductCard } from '../components/ecommerce/ProductCard';
import { QuickViewModal } from '../components/ecommerce/QuickViewModal';
import { ProductCustomizerModal, type CustomizerCategory } from '../components/customizer/ProductCustomizerModal';
import { SEOHead } from '../components/seo/SEOHead';

interface ProductsPageProps {
  onOpenCustomizer?: (category?: CustomizerCategory) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = () => {
  // 1. Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 2. Modals State
  const [quickViewProduct, setQuickViewProduct] = useState<EcommerceProduct | null>(() => {
    if (typeof window !== 'undefined') {
      const qvParam = new URLSearchParams(window.location.search).get('quickview');
      if (qvParam) {
        return ECOMMERCE_PRODUCTS.find(p => p.id === qvParam || p.slug === qvParam) || null;
      }
    }
    return null;
  });
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [activeCustomizerCat, setActiveCustomizerCat] = useState<CustomizerCategory>('cups');

  // Support direct URL query parameter for deterministic Quick View testing (?quickview=coffee-cups)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const qvParam = new URLSearchParams(window.location.search).get('quickview');
      if (qvParam) {
        const found = ECOMMERCE_PRODUCTS.find(p => p.id === qvParam || p.slug === qvParam);
        if (found) setQuickViewProduct(found);
      }
    }
  }, []);

  // 3. Filter Options Metadata
  const categoriesList = [
    { id: 'all', label: 'All Packaging' },
    { id: 'cups', label: 'Disposable Cups' },
    { id: 'boxes', label: 'Packaging Boxes' },
    { id: 'bags', label: 'Paper Bags' },
    { id: 'diaries', label: 'Diaries & Notebooks' },
  ];

  const materialsList = [
    'Paperboard',
    'Kraft Paper',
    'Corrugated Board',
    'Rigid Board'
  ];

  const finishesList = [
    'Offset Lithography',
    'Matte Lamination',
    'Gloss Finish',
    'Foil'
  ];

  // 4. Filter Handlers
  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleFinish = (fin: string) => {
    setSelectedFinishes(prev => 
      prev.includes(fin) ? prev.filter(f => f !== fin) : [...prev, fin]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMaterials([]);
    setSelectedFinishes([]);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'all' || 
    selectedMaterials.length > 0 || 
    selectedFinishes.length > 0;

  // 5. Filter and Sort Execution
  const filteredProducts = useMemo(() => {
    return ECOMMERCE_PRODUCTS.filter(product => {
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.categoryLabel.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Materials match
      if (selectedMaterials.length > 0) {
        const matchesAnyMaterial = selectedMaterials.some(mat => 
          product.material.toLowerCase().includes(mat.toLowerCase())
        );
        if (!matchesAnyMaterial) return false;
      }

      // Finish match
      if (selectedFinishes.length > 0) {
        const matchesAnyFinish = selectedFinishes.some(fin => 
          product.finish.toLowerCase().includes(fin.toLowerCase())
        );
        if (!matchesAnyFinish) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.startingPricePKR - b.startingPricePKR;
      }
      if (sortBy === 'price-high') {
        return b.startingPricePKR - a.startingPricePKR;
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0; // featured default order
    });
  }, [searchQuery, selectedCategory, selectedMaterials, selectedFinishes, sortBy]);

  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-20">
      <SEOHead
        title="Custom Packaging & Commercial Printing Catalog | United Impex"
        description="Explore our full collection of custom paper cups, rigid boxes, corrugated cartons, shopping bags, and diaries manufactured with precision."
        canonicalPath="/products"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "United Impex Packaging Catalog",
          "description": "Commercial custom packaging and printing collections.",
          "url": "https://united-impex-app.vercel.app/products"
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. BREADCRUMB & EDITORIAL CATALOG HEADER (Matching 01_shop_desktop_4x2)
            ========================================================================= */}
        <div className="mb-8 sm:mb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">Packaging Products</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
                <Package className="w-3.5 h-3.5" />
                <span>Our Products</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight">
                Shop Packaging Products
              </h1>

              <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                A complete commercial range of custom printed packaging and box fabrication for your business.
              </p>
            </div>

            {/* Demo Pricing Notice Banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-800 text-xs font-medium shrink-0 self-start md:self-auto shadow-2xs">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>All prices shown are illustrative demo baselines in PKR</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. TOP CONTROLS BAR: SEARCH, SORT & MOBILE FILTER TOGGLE
            ========================================================================= */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Input with Clear Button */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packaging products by name or material..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EB1767] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Filter Drawer Toggle (Mobile) + Sort Dropdown */}
          <div className="flex items-center gap-3 justify-between sm:justify-end">
            
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs cursor-pointer hover:border-zinc-300"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#EB1767]" />
              <span>Filters</span>
              {(selectedCategory !== 'all' || selectedMaterials.length > 0 || selectedFinishes.length > 0) && (
                <span className="w-2 h-2 rounded-full bg-[#EB1767]" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <span className="hidden sm:inline font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#EB1767] cursor-pointer shadow-2xs"
                >
                  <option value="featured">Featured / Most Popular</option>
                  <option value="price-low">Demo Price: Low to High</option>
                  <option value="price-high">Demo Price: High to Low</option>
                  <option value="name">Product Name (A – Z)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Item Counter */}
            <span className="text-xs text-zinc-500 font-mono hidden md:inline">
              Showing {filteredProducts.length} of {ECOMMERCE_PRODUCTS.length}
            </span>

          </div>
        </div>

        {/* =========================================================================
            3. MAIN CONTENT LAYOUT: LEFT SIDEBAR FILTERS + PRODUCT GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================
              DESKTOP LEFT FILTER RAIL (Matching 01_shop_desktop_4x2)
              =================================================================== */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-['Outfit',sans-serif]">
                <SlidersHorizontal className="w-4 h-4 text-[#EB1767]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#EB1767] font-semibold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter Group */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Category
              </h3>
              <div className="space-y-1.5">
                {categoriesList.map(cat => {
                  const isChecked = selectedCategory === cat.id;
                  const count = cat.id === 'all'
                    ? ECOMMERCE_PRODUCTS.length
                    : ECOMMERCE_PRODUCTS.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isChecked 
                          ? 'bg-[#FDF2F6] text-[#EB1767] font-bold border border-[#EB1767]/30 shadow-2xs' 
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="font-mono text-[11px] text-zinc-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Filter Group */}
            <div className="space-y-3 pt-3 border-t border-zinc-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Material
              </h3>
              <div className="space-y-1.5">
                {materialsList.map(mat => {
                  const isChecked = selectedMaterials.includes(mat);
                  return (
                    <label 
                      key={mat}
                      className="flex items-center justify-between px-2 py-1 text-xs text-zinc-700 hover:text-zinc-900 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleMaterial(mat)}
                          className="w-4 h-4 rounded text-[#EB1767] focus:ring-[#EB1767] border-zinc-300"
                        />
                        <span>{mat}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Print & Finish Filter Group */}
            <div className="space-y-3 pt-3 border-t border-zinc-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Print &amp; Finish
              </h3>
              <div className="space-y-1.5">
                {finishesList.map(fin => {
                  const isChecked = selectedFinishes.includes(fin);
                  return (
                    <label 
                      key={fin}
                      className="flex items-center justify-between px-2 py-1 text-xs text-zinc-700 hover:text-zinc-900 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFinish(fin)}
                          className="w-4 h-4 rounded text-[#EB1767] focus:ring-[#EB1767] border-zinc-300"
                        />
                        <span>{fin}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* ===================================================================
              PRODUCT GRID (Desktop: 4×2 Grid; Mobile: Genuine Two-Column Grid)
              =================================================================== */}
          <main className="lg:col-span-9 w-full">
            
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="p-12 text-center rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 text-[#EB1767] flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                  No Packaging Products Found
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
                  We could not find any products matching your active filters. Try adjusting your search query or reset the filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn-primary text-xs py-2 px-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Responsive Product Grid: 
                 - Desktop (>= 1024px): 3 columns in 9-col container (or 4 columns when wide)
                 - Mobile (< 640px): Genuine 2 columns side by side!
              */
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onOpenCustomizer={(cat) => {
                      if (cat) setActiveCustomizerCat(cat);
                      setCustomizerOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Bottom Disclaimer */}
            <div className="mt-12 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 text-center text-xs text-zinc-500 leading-relaxed">
              <p>
                <strong>Commercial Quotation Policy:</strong> All per-unit rates shown are illustrative demo baselines in Pakistani Rupees (PKR) and are subject to paperboard stock market variations, print run quantities, and custom dieline tooling. Connect with our desk for a binding quotation.
              </p>
            </div>

          </main>

        </div>

      </div>

      {/* =========================================================================
          4. MOBILE FILTER BOTTOM SHEET / DRAWER (< 1024px)
          ========================================================================= */}
      {mobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-base font-bold font-['Outfit',sans-serif] text-zinc-900">
                Filter Packaging Products
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Radio Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-700 font-mono uppercase">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categoriesList.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center border cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#FDF2F6] border-[#EB1767] text-[#EB1767]'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <h4 className="text-xs font-bold text-zinc-700 font-mono uppercase">Material</h4>
              <div className="grid grid-cols-2 gap-2">
                {materialsList.map(mat => (
                  <label key={mat} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 text-xs text-zinc-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded text-[#EB1767] focus:ring-[#EB1767]"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-zinc-200 flex items-center gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="btn-secondary flex-1 text-xs py-2.5"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="btn-primary flex-1 text-xs py-2.5"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. INTERACTIVE QUICK VIEW MODAL
          ========================================================================= */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenCustomizer={(cat) => {
          setActiveCustomizerCat(cat);
          setCustomizerOpen(true);
        }}
      />

      {/* =========================================================================
          6. 2D PRODUCT CUSTOMIZER MODAL HANDOFF
          ========================================================================= */}
      <ProductCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        initialCategory={activeCustomizerCat}
      />

    </div>
  );
};

export default ProductsPage;
