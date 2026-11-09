import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  ChevronDown, 
  ArrowRight, 
  Package, 
  Phone,
  Home,
  Info,
  Mail,
  ShoppingBag,
  Menu,
  X,
  FileText
} from 'lucide-react';
import logoSvg from '../../assets/logo/logo.svg';
import { useCart } from '../../context/CartContext';
import { 
  COMPANY_IDENTITY, 
  CORE_PRODUCT_CATEGORIES, 
  MAIN_NAV_ITEMS,
  CONTACT_INFO
} from '../../data/businessData';

/**
 * LiquidGlassNavbar Component
 * 
 * Desktop (>= 768px):
 * - Sticky floating pill geometry (rounded-full, max-w-[1080px])
 * - Pure white translucent liquid glass (bg-white/85 -> bg-white/92, backdrop-blur-md)
 * - Navigation links: Home, Products (accessible dropdown), About, Contact
 * - Right-side magenta CTA: "Request a Quote"
 * - Strictly preserved as per approved Milestone 2B specification
 * 
 * Mobile (< 768px) Single-Row Header:
 * - Combined into ONE compact header bar in natural document flow.
 * - Left: Official vector logo.
 * - Right: Single-row icon cluster (Phone icon-only, Products, Cart with badge, Menu toggle).
 * - Accessible: Icon-only phone button triggers tel:+923714799755 without covering hero banner.
 * - Menu drawer: Smooth collapsible drawer with full navigation when needed.
 */
export interface NavbarProps {
  introActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ introActive = false }) => {
  const [location] = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemsCount } = useCart();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle enhancement on desktop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false);
      }
      if (
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(event.target as Node)
      ) {
        // click outside drawer
      }
    };

    if (productsOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productsOpen, mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [location]);

  // Handle keyboard navigation (Escape to close dropdown / drawer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (productsOpen) {
          setProductsOpen(false);
          triggerRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productsOpen, mobileMenuOpen]);

  return (
    <div 
      id="mobile-top-navbar"
      className="sticky top-2.5 md:top-3.5 z-40 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300 pt-2.5 md:pt-0"
    >
      <div className="w-full max-w-[1080px] mx-auto">
        
        {/* ============================================================== */}
        {/* 1. DESKTOP NAVBAR (>= 768px) — Strictly Preserved Milestone 2B */}
        {/* ============================================================== */}
        <header
          role="banner"
          className={`hidden md:flex items-center justify-between h-16 px-6 pointer-events-auto rounded-full transition-all duration-300 glass-surface ${
            isScrolled 
              ? 'shadow-[0_12px_36px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]' 
              : 'shadow-[0_8px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)]'
          }`}
        >
          {/* Desktop Left: Official Vector Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-lg transition-transform hover:opacity-90 active:scale-95"
            aria-label={`${COMPANY_IDENTITY.name} — Home`}
          >
            <img 
              src={logoSvg} 
              alt={COMPANY_IDENTITY.name} 
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Center: Navigation Links */}
          <nav 
            role="navigation" 
            aria-label="Main Navigation"
            className="flex items-center gap-1 text-sm font-medium"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = location === item.href;

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      ref={triggerRef}
                      type="button"
                      onClick={() => setProductsOpen(!productsOpen)}
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-1 ${
                        isActive || location.startsWith('/products')
                          ? 'text-[#EB1767] font-semibold bg-pink-50/60'
                          : 'text-zinc-700 hover:text-[#EB1767] hover:bg-zinc-100/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-[#EB1767]' : 'text-zinc-400'}`} 
                      />
                    </button>

                    {/* Products Dropdown Panel */}
                    {productsOpen && (
                      <div 
                        role="menu"
                        aria-label="Product Categories Menu"
                        className="absolute top-full left-0 mt-3 w-72 p-2 rounded-2xl glass-surface border border-zinc-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2 duration-150 z-50 pointer-events-auto"
                      >
                        <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase font-mono">
                          Product Categories
                        </div>

                        <div className="space-y-0.5 mt-1">
                          {CORE_PRODUCT_CATEGORIES.map((category) => (
                            <Link
                              key={category.id}
                              href={`/products/${category.slug}`}
                              role="menuitem"
                              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50/80 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="p-1.5 rounded-lg bg-zinc-100 group-hover:bg-[#EB1767] text-zinc-600 group-hover:text-white transition-colors">
                                  <Package className="w-3.5 h-3.5" />
                                </span>
                                <div>
                                  <div className="text-xs font-semibold text-zinc-900 group-hover:text-[#EB1767]">
                                    {category.title}
                                  </div>
                                  <div className="text-[10px] text-zinc-600">
                                    {category.shortDesc}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#EB1767]" />
                            </Link>
                          ))}
                        </div>

                        <div className="mt-2 pt-2 border-t border-zinc-100 px-1">
                          <Link
                            href="/products"
                            role="menuitem"
                            className="flex items-center justify-between w-full p-2 rounded-xl text-xs font-semibold text-[#EB1767] hover:bg-pink-50/60 transition-colors"
                          >
                            <span>Browse All Products Catalog</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-1 ${
                    isActive
                      ? 'text-[#EB1767] font-semibold bg-pink-50/60'
                      : 'text-zinc-700 hover:text-[#EB1767] hover:bg-zinc-100/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Cart + Quote CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full text-zinc-700 hover:text-[#EB1767] hover:bg-pink-50/80 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
              aria-label={`Shopping Cart, ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#EB1767] text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-150">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            <Link
              href="/quote"
              className="btn-primary text-xs tracking-wide"
            >
              <span>Request a Quote</span>
            </Link>
          </div>
        </header>

        {/* ============================================================== */}
        {/* 2. MOBILE FLOATING LIQUID GLASS PILL (< 768px)                 */}
        {/* Compact, rounded-full capsule. Official logo + Call, Cart, Menu*/}
        {/* ============================================================== */}
        <header
          role="banner"
          aria-label="Mobile Navigation Bar"
          className={`md:hidden pointer-events-auto w-full rounded-full px-3.5 py-1.5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 border border-white/60 bg-white/80 backdrop-blur-xl ${
            introActive ? 'opacity-0 pointer-events-none -translate-y-3' : 'opacity-100 pointer-events-auto translate-y-0'
          }`}
        >
          {/* Mobile Left: Official Vector Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2 min-h-[44px] px-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-lg transition-transform hover:opacity-90 active:scale-95"
            aria-label={`${COMPANY_IDENTITY.name} — Home`}
          >
            <img 
              src={logoSvg} 
              alt={COMPANY_IDENTITY.name} 
              className="h-6 w-auto object-contain"
            />
            <div className="flex flex-col leading-[1.05]">
              <span className="font-extrabold text-[12px] tracking-wider text-zinc-900 font-['Outfit',sans-serif]">UNITED</span>
              <span className="font-bold text-[10px] tracking-widest text-zinc-600 font-['Outfit',sans-serif]">IMPEX</span>
            </div>
          </Link>

          {/* Mobile Right: 3-Control Translucent Circular Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Call Action */}
            <a
              href={CONTACT_INFO.phoneTel}
              aria-label={`Call United Impex: ${CONTACT_INFO.phoneDisplay}`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-zinc-100/90 hover:bg-zinc-200/80 active:bg-zinc-300/80 text-[#121216] border border-black/5 shadow-2xs active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
            >
              <Phone className="w-4 h-4 text-[#121216]" />
            </a>

            {/* Shopping Cart Icon with Badge */}
            <Link
              href="/cart"
              aria-label={`Cart, ${totalItemsCount} items`}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-zinc-100/90 hover:bg-zinc-200/80 active:bg-zinc-300/80 text-[#121216] border border-black/5 shadow-2xs active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
            >
              <ShoppingBag className="w-4 h-4 text-[#121216]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-4 px-0.5 rounded-full bg-[#EB1767] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Menu Toggle Drawer Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-zinc-100/90 hover:bg-zinc-200/80 active:bg-zinc-300/80 text-[#121216] border border-black/5 shadow-2xs active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-[#EB1767]" />
              ) : (
                <Menu className="w-4 h-4 text-[#121216]" />
              )}
            </button>
          </div>
        </header>

        {/* Collapsible Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div 
            ref={mobileDrawerRef}
            className="md:hidden pointer-events-auto mt-2 w-full glass-surface rounded-3xl p-4 shadow-xl border border-zinc-200/90 bg-white/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav aria-label="Mobile Drawer Navigation" className="space-y-1">
              <Link
                href="/"
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors min-h-[44px] ${
                  location === '/' ? 'bg-pink-50 text-[#EB1767]' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              <Link
                href="/products"
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors min-h-[44px] ${
                  location.startsWith('/products') ? 'bg-pink-50 text-[#EB1767]' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </Link>

              <div className="pl-10 pr-2 py-1 space-y-1">
                {CORE_PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.slug}`}
                    className="block text-xs font-medium text-zinc-600 hover:text-[#EB1767] py-1.5 min-h-[36px] flex items-center"
                  >
                    &bull; {cat.title}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors min-h-[44px] ${
                  location === '/about' ? 'bg-pink-50 text-[#EB1767]' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>About United Impex</span>
              </Link>

              <Link
                href="/contact"
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors min-h-[44px] ${
                  location === '/contact' ? 'bg-pink-50 text-[#EB1767]' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Contact &amp; Offices</span>
              </Link>

              <div className="pt-2 mt-2 border-t border-zinc-100">
                <Link
                  href="/quote"
                  className="btn-primary w-full text-xs font-semibold py-3 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Custom Quote</span>
                </Link>
              </div>
            </nav>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
