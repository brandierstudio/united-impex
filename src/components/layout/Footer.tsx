import React from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Palette
} from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { Link } from 'wouter';
import logoSvg from '../../assets/logo/logo.svg';
import { 
  COMPANY_IDENTITY, 
  CONTACT_INFO, 
  OFFICE_LOCATIONS, 
  CORE_PRODUCT_CATEGORIES 
} from '../../data/businessData';

interface FooterProps {
  onOpenCustomizer?: (category?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomizer }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#121216] text-white pt-16 sm:pt-20 pb-24 sm:pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP FOOTER: BRAND IDENTITY + WHATSAPP CTA CALLOUT
            ========================================================================= */}
        <div className="pb-12 border-b border-zinc-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto flex items-center justify-center bg-white p-1.5 rounded-xl">
                <img 
                  src={logoSvg} 
                  alt={COMPANY_IDENTITY.name} 
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-bold font-['Outfit',sans-serif] tracking-tight text-white">
                {COMPANY_IDENTITY.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {COMPANY_IDENTITY.businessDescription} Dedicated to precision offset lithography, custom carton fabrication, and commercial brand packaging across Pakistan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            {onOpenCustomizer && (
              <button
                onClick={() => onOpenCustomizer()}
                className="btn-dark text-xs sm:text-sm font-semibold py-3 px-5 min-h-[44px] justify-center w-full sm:w-auto"
              >
                <Palette className="w-4 h-4 text-[#EB1767]" />
                <span>Open 2D Customizer</span>
              </button>
            )}

            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs sm:text-sm font-semibold py-3 px-6 min-h-[44px] justify-center w-full sm:w-auto shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>WhatsApp Coordination</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            2. MIDDLE FOOTER: 4-COLUMN COMPREHENSIVE SITEMAP & ADDRESSES
            ========================================================================= */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 border-b border-zinc-800/80">
          
          {/* Column 1: Core Packaging Products (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Core Products
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {CORE_PRODUCT_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link 
                    href={`/products/${cat.slug}`}
                    className="hover:text-[#EB1767] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span>{cat.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/products" 
                  className="hover:text-[#EB1767] transition-colors flex items-center gap-1.5 text-zinc-400 font-semibold"
                >
                  <span className="w-1 h-1 rounded-full bg-[#EB1767]" />
                  <span>All Products Catalog &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links & Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li>
                <Link href="/" className="hover:text-[#EB1767] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#EB1767] transition-colors">
                  About Leadership
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#EB1767] transition-colors">
                  Products Overview
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#EB1767] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#EB1767] transition-colors font-semibold text-[#EB1767]">
                  Request a Quote &rarr;
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EB1767] transition-colors">
                  Contact &amp; Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Karachi Office (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Karachi Office
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="flex items-start gap-2 leading-relaxed text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#EB1767] shrink-0 mt-0.5" />
                <span>{OFFICE_LOCATIONS[0].address}</span>
              </p>
              <p className="text-[11px] text-zinc-500 pl-5.5">
                Note: {OFFICE_LOCATIONS[0].note}
              </p>
              <p className="pl-5.5">
                <a 
                  href={CONTACT_INFO.phoneTel}
                  className="text-white hover:text-[#EB1767] font-semibold"
                >
                  Direct: {CONTACT_INFO.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Multan Office & Desk (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Multan Office
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="flex items-start gap-2 leading-relaxed text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#EB1767] shrink-0 mt-0.5" />
                <span>{OFFICE_LOCATIONS[1].address}</span>
              </p>
              <p className="text-[11px] text-zinc-500 pl-5.5">
                Note: {OFFICE_LOCATIONS[1].note}
              </p>
              <p className="pl-5.5">
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-zinc-300 hover:text-[#EB1767] text-[11px] truncate block"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM FOOTER: COPYRIGHT & HONEST PRESENTATION NOTICE
            ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {currentYear} {COMPANY_IDENTITY.name}. All rights reserved.
          </p>

          <p className="text-[11px] text-zinc-600 max-w-xl text-left sm:text-right">
            Director: Areeb Ashraf &bull; Client coordination offices in Karachi &amp; Multan. Packaging prototypes, mockups, and illustrative visuals are tailored to individual project quotations.
          </p>
        </div>
      </div>
    </footer>
  );
};
