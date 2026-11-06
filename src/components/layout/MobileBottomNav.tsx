import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Package, ShoppingBag, FileText } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { CONTACT_INFO } from '../../data/businessData';
import { useTopNavObserver } from '../../hooks/useTopNavObserver';
import { useCart } from '../../context/CartContext';

export interface MobileNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  isExternal?: boolean;
}

/**
 * MobileBottomNav Component
 * 
 * Dark Liquid Glass Dynamic Floating Dock for mobile (< 768px).
 * 
 * Behavior:
 * - When top navbar is visible in document flow: HIDDEN (translate-y-32 opacity-0)
 * - When user scrolls and top navbar leaves viewport: REVEALED via IntersectionObserver (translate-y-0 opacity-100)
 * - When returning to top: SMOOTHLY HIDDEN as top navbar enters view
 * - Desktop (>= 768px): STRICTLY HIDDEN (md:hidden)
 * 
 * Design Tokens & Appearance:
 * - Background: Deep charcoal #121216 (92% opacity)
 * - Surface: Dark translucent Liquid Glass (bg-[#121216]/92 backdrop-blur-lg)
 * - Icons: Pure white #FFFFFF (emerald accent on WhatsApp hover)
 * - Navigation labels: Pure white #FFFFFF (Outfit font)
 * - Active item: Brand pink/magenta accent (#FF2E7E, bg-white/10)
 * - Border: Fine translucent white border (border-white/12)
 * - Shadow: Soft natural shadow (shadow-[0_12px_36px_rgba(0,0,0,0.36),0_2px_8px_rgba(0,0,0,0.2)])
 * - Shape: Floating rounded pill (rounded-full)
 */
export const MobileBottomNav: React.FC = () => {
  const [location] = useLocation();
  const isDocked = useTopNavObserver('mobile-top-navbar');
  const { totalItemsCount } = useCart();

  const navItems: MobileNavItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      id: 'products',
      label: 'Products',
      href: '/products',
      icon: Package,
    },
    {
      id: 'cart',
      label: 'Cart',
      href: '/cart',
      icon: ShoppingBag,
    },
    {
      id: 'quote',
      label: 'Quote',
      href: '/quote',
      icon: FileText,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: CONTACT_INFO.whatsappLink,
      icon: WhatsAppIcon,
      isExternal: true,
    },
  ];

  return (
    <div 
      aria-hidden={!isDocked}
      className={`md:hidden fixed bottom-3 inset-x-0 z-50 px-3 pointer-events-none transition-all duration-300 ease-out motion-reduce:transition-none ${
        isDocked 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-32 opacity-0'
      }`}
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <nav
        role="navigation"
        aria-label="Mobile Bottom Navigation Dock"
        className="max-w-[400px] w-full mx-auto pointer-events-auto glass-surface-dark rounded-full px-2 py-1.5 transition-all"
      >
        <ul className="grid grid-cols-5 gap-0.5 items-center justify-items-stretch list-none p-0 m-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isExternal && (
              location === item.href || (item.href !== '/' && location.startsWith(item.href))
            );

            if (item.isExternal) {
              return (
                <li key={item.id} className="w-full">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isDocked ? 0 : -1}
                    aria-label={`Open WhatsApp chat with United Impex (${CONTACT_INFO.whatsappNumber})`}
                    className="flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-full text-white/85 hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121216] group"
                  >
                    <Icon className="w-5 h-5 text-white/90 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-150" />
                    <span className="text-[10px] font-medium font-['Outfit',sans-serif] mt-0.5 tracking-tight text-white/90 group-hover:text-emerald-300">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            }

            return (
              <li key={item.id} className="w-full">
                <Link
                  href={item.href}
                  tabIndex={isDocked ? 0 : -1}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-full active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121216] group ${
                    isActive
                      ? 'text-[#FF2E7E] bg-white/10 font-semibold'
                      : 'text-white/85 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform duration-150 ${
                      isActive ? 'scale-110 text-[#FF2E7E]' : 'text-white/85 group-hover:text-white'
                    }`} />
                    {item.id === 'cart' && totalItemsCount > 0 && (
                      <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#EB1767] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                        {totalItemsCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-['Outfit',sans-serif] mt-0.5 tracking-tight ${
                    isActive ? 'text-[#FF2E7E] font-semibold' : 'text-white/85 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileBottomNav;
