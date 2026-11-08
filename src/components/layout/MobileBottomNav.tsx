import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export interface MobileNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface MobileBottomNavProps {
  isHidden?: boolean;
}

/**
 * MobileBottomNav Component
 * 
 * Floating Translucent Liquid Glass Dock for mobile (< 768px).
 * Faithful reproduction of the Owner-Approved Mobile Reference.
 * 
 * 4 Iconic Destinations:
 * 1. Home (Active: Solid circular indicator)
 * 2. Categories (4-Grid Icon) -> /products
 * 3. Shopping Bag (with live cart count badge) -> /cart
 * 4. Profile / Contact -> /contact
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ isHidden = false }) => {
  const [location] = useLocation();
  const { totalItemsCount } = useCart();

  const navItems: MobileNavItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      id: 'categories',
      label: 'Catalog',
      href: '/products',
      icon: LayoutGrid,
    },
    {
      id: 'cart',
      label: 'Cart',
      href: '/cart',
      icon: ShoppingBag,
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      icon: User,
    },
  ];

  return (
    <div 
      aria-hidden={isHidden}
      className={`md:hidden fixed bottom-3 sm:bottom-4 inset-x-0 z-40 px-4 pointer-events-none transition-all duration-300 ${
        isHidden 
          ? 'translate-y-32 opacity-0' 
          : 'translate-y-0 opacity-100'
      }`}
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <nav
        role="navigation"
        aria-label="Mobile Navigation Dock"
        className="max-w-[320px] sm:max-w-[340px] w-full mx-auto pointer-events-auto rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.18)] px-3 py-1.5 flex items-center justify-between"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] ${
                isActive
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/40'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {item.id === 'cart' && totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-[#EB1767] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {totalItemsCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
