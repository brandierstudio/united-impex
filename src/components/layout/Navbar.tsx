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
  ShoppingBag
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
 * - Strictly untouched as per approved Milestone 2B specification
 * 
 * Mobile (< 768px) Final Architecture:
 * - The WHITE mobile top navbar is in NORMAL DOCUMENT FLOW (position: relative), NOT sticky/fixed.
 * - Initial Page Load: Displays the full WHITE Liquid Glass mobile top navbar with official logo,
 *   helpline action, and accessible navigation options (Home, Products, About, Contact).
 * - On scroll down: The white navbar scrolls naturally out of the viewport with the page content.
 * - Once out of view: An IntersectionObserver triggers the appearance of the DARK #121216 bottom dock.
 * - On return to top: When the white top navbar re-enters view, the bottom dock hides.
 * - Zero simultaneous duplicates, zero flicker, zero layout shifts.
 */
export const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemsCount } = useCart();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for subtle enhancement on desktop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
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
    };

    if (productsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productsOpen]);

  // Handle keyboard navigation (Escape to close dropdown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (productsOpen) {
          setProductsOpen(false);
          triggerRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productsOpen]);

  return (
    <div 
      id="mobile-top-navbar"
      className="relative md:sticky md:top-3.5 z-40 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300"
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
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-2 rounded-lg transition-transform hover:opacity-90 active:scale-[0.98]"
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
            aria-label="Desktop Main Navigation"
            className="flex items-center gap-1 lg:gap-2 text-sm font-medium font-['Outfit',sans-serif]"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      aria-controls="products-dropdown-menu"
                      onClick={() => setProductsOpen((prev) => !prev)}
                      onMouseEnter={() => setProductsOpen(true)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-1 ${
                        isActive || productsOpen
                          ? 'text-[#EB1767] font-semibold bg-pink-50/60'
                          : 'text-zinc-700 hover:text-[#EB1767] hover:bg-zinc-100/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsOpen ? 'rotate-180 text-[#EB1767]' : 'text-zinc-400'
                        }`} 
                      />
                    </button>

                    {/* Accessible Liquid Glass Dropdown Menu */}
                    {productsOpen && (
                      <div
                        id="products-dropdown-menu"
                        ref={dropdownRef}
                        role="menu"
                        aria-label="Product Categories"
                        onMouseLeave={() => setProductsOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-xl border border-zinc-200/80 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 flex items-center justify-between">
                          <span>Packaging Solutions</span>
                          <Package className="w-3.5 h-3.5 text-[#EB1767]" />
                        </div>

                        <div className="py-1 space-y-0.5">
                          {CORE_PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products/${cat.slug}`}
                              role="menuitem"
                              onClick={() => setProductsOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-pink-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
                            >
                              <div className="w-2 h-2 rounded-full bg-zinc-300 group-hover:bg-[#EB1767] transition-colors mt-1.5 shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-zinc-800 group-hover:text-[#EB1767] transition-colors">
                                  {cat.title}
                                </p>
                                <p className="text-[11px] text-zinc-500 line-clamp-1 leading-snug">
                                  {cat.shortDesc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="pt-1.5 mt-1 border-t border-zinc-100">
                          <Link
                            href="/products"
                            role="menuitem"
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#EB1767] hover:bg-pink-50/70 rounded-xl transition-colors"
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
        {/* 2. MOBILE TOP NAVBAR (< 768px) — Pure WHITE Liquid Glass      */}
        {/* In normal document flow (NOT sticky/fixed). Scrolls with page. */}
        {/* ============================================================== */}
        <header
          role="banner"
          aria-label="Mobile Header"
          className="md:hidden pointer-events-auto mt-2.5 w-full glass-surface rounded-2xl p-2.5 transition-all"
        >
          {/* Mobile Top Row: Logo + Cart + Helpline Action */}
          <div className="flex items-center justify-between px-1.5 pb-2 border-b border-zinc-100">
            <Link 
              href="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] rounded-lg transition-transform hover:opacity-90 active:scale-95"
              aria-label={`${COMPANY_IDENTITY.name} — Home`}
            >
              <img 
                src={logoSvg} 
                alt={COMPANY_IDENTITY.name} 
                className="h-7 w-auto object-contain"
              />
            </Link>

            {/* Quick Helpline Pill + Cart Icon */}
            <div className="flex items-center gap-1.5">
              <a
                href={CONTACT_INFO.phoneTel}
                aria-label={`Call United Impex: ${CONTACT_INFO.phoneDisplay}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100/80 hover:bg-pink-50 text-zinc-700 hover:text-[#EB1767] text-[11px] font-medium font-['Outfit',sans-serif] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
              >
                <Phone className="w-3 h-3 text-[#EB1767]" />
                <span className="font-mono text-[10px]">{CONTACT_INFO.phoneDisplay}</span>
              </a>

              <Link
                href="/cart"
                aria-label={`Cart, ${totalItemsCount} items`}
                className="relative p-1.5 rounded-full bg-zinc-100/80 hover:bg-pink-50 text-zinc-700 hover:text-[#EB1767] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-[#EB1767] text-white text-[9px] font-bold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Options (Full White Liquid Glass Navigation) */}
          <nav
            role="navigation"
            aria-label="Mobile Navigation Menu"
            className="pt-2 px-0.5"
          >
            <ul className="grid grid-cols-4 gap-1 items-center justify-items-stretch list-none p-0 m-0">
              {/* 1. Home */}
              <li className="w-full">
                <Link
                  href="/"
                  aria-current={location === '/' ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] group ${
                    location === '/'
                      ? 'text-[#EB1767] bg-pink-50/80 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium'
                  }`}
                >
                  <Home className={`w-4 h-4 transition-transform duration-150 ${location === '/' ? 'scale-110 text-[#EB1767]' : 'text-zinc-500 group-hover:text-zinc-800'}`} />
                  <span className={`text-[11px] font-['Outfit',sans-serif] mt-0.5 tracking-tight ${location === '/' ? 'text-[#EB1767] font-semibold' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
                    Home
                  </span>
                </Link>
              </li>

              {/* 2. Products */}
              <li className="w-full">
                <Link
                  href="/products"
                  aria-current={location.startsWith('/products') ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] group ${
                    location.startsWith('/products')
                      ? 'text-[#EB1767] bg-pink-50/80 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium'
                  }`}
                >
                  <Package className={`w-4 h-4 transition-transform duration-150 ${location.startsWith('/products') ? 'scale-110 text-[#EB1767]' : 'text-zinc-500 group-hover:text-zinc-800'}`} />
                  <span className={`text-[11px] font-['Outfit',sans-serif] mt-0.5 tracking-tight ${location.startsWith('/products') ? 'text-[#EB1767] font-semibold' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
                    Products
                  </span>
                </Link>
              </li>

              {/* 3. About */}
              <li className="w-full">
                <Link
                  href="/about"
                  aria-current={location === '/about' ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] group ${
                    location === '/about'
                      ? 'text-[#EB1767] bg-pink-50/80 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium'
                  }`}
                >
                  <Info className={`w-4 h-4 transition-transform duration-150 ${location === '/about' ? 'scale-110 text-[#EB1767]' : 'text-zinc-500 group-hover:text-zinc-800'}`} />
                  <span className={`text-[11px] font-['Outfit',sans-serif] mt-0.5 tracking-tight ${location === '/about' ? 'text-[#EB1767] font-semibold' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
                    About
                  </span>
                </Link>
              </li>

              {/* 4. Contact / Quote */}
              <li className="w-full">
                <Link
                  href="/quote"
                  aria-current={location === '/quote' ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] group ${
                    location === '/quote'
                      ? 'text-[#EB1767] bg-pink-50/80 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium'
                  }`}
                >
                  <Mail className={`w-4 h-4 transition-transform duration-150 ${location === '/quote' ? 'scale-110 text-[#EB1767]' : 'text-zinc-500 group-hover:text-zinc-800'}`} />
                  <span className={`text-[11px] font-['Outfit',sans-serif] mt-0.5 tracking-tight ${location === '/quote' ? 'text-[#EB1767] font-semibold' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
                    Quote
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

      </div>
    </div>
  );
};

export default Navbar;
