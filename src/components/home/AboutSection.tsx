import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  RotateCw 
} from 'lucide-react';
import { Link } from 'wouter';
import { COMPANY_IDENTITY, OFFICE_LOCATIONS } from '../../data/businessData';

import areebAshrafWebp from '../../assets/about/areeb-ashraf.webp';
import cardFrontPng from '../../assets/about/business-card-front.png';
import cardBackPng from '../../assets/about/business-card-back.png';

export const AboutSection: React.FC = () => {
  const [activeCardSide, setActiveCardSide] = useState<'front' | 'back'>('front');

  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-10 sm:py-14 lg:py-16 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header without redundant eyebrow pill */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 
            id="about-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            Commercial Printing &amp; Custom Packaging Partner.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
            United Impex operates as an offset printer, general order supplier, and packaging company with verified coordination offices in Karachi and Multan.
          </p>
        </div>

        {/* 12-Column Layout: Left 8 cols for Director Profile & Cards, Right 4 cols for Cup Anchor 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT 8 COLS: PROFILE, BUSINESS CARDS & SCOPE */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Split: Director Areeb Ashraf + Interactive Visiting Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              
              {/* Director Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white text-[#121216] border border-[#EB1767]/15 flex items-center gap-3.5 shadow-2xs">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-200 shadow-2xs">
                  <img
                    src={areebAshrafWebp}
                    alt="Areeb Ashraf, Director at United Impex"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EB1767]">
                    Executive Leadership
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 font-['Outfit',sans-serif]">
                    {COMPANY_IDENTITY.leadership.name}
                  </h4>
                  <p className="text-xs text-zinc-600 font-medium">
                    {COMPANY_IDENTITY.leadership.designation}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Director of Business &amp; Operations
                  </p>
                </div>
              </div>

              {/* Interactive Card Preview */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-[#121216] border border-[#EB1767]/15 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-700 uppercase font-mono">
                    Visiting Card ({activeCardSide})
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCardSide(prev => prev === 'front' ? 'back' : 'front')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3 text-[#EB1767]" />
                    <span>Flip</span>
                  </button>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                  <img
                    src={activeCardSide === 'front' ? cardFrontPng : cardBackPng}
                    alt={`United Impex official visiting card (${activeCardSide} side)`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>

            {/* Core Capability Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMPANY_IDENTITY.natureOfBusiness.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-white text-[#121216] border border-[#EB1767]/15 flex items-center gap-2 shadow-2xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EB1767] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-zinc-900 truncate">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Dual Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OFFICE_LOCATIONS.map((office) => (
                <div 
                  key={office.city}
                  className="p-3.5 rounded-xl bg-white text-[#121216] border border-[#EB1767]/15 space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 font-['Outfit',sans-serif]">
                      <Building2 className="w-3.5 h-3.5 text-[#EB1767]" />
                      <span>{office.type}</span>
                    </span>
                    <span className="text-[10px] text-[#EB1767] font-semibold bg-[#FDF2F6] px-2 py-0.5 rounded-full border border-[#EB1767]/20">
                      By Appointment
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed font-['Inter',sans-serif] line-clamp-2">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* CUP ANCHOR 4: RIGHT SIDEWAY POINT */}
          <div 
            id="cup-anchor-4"
            className="lg:col-span-4 rounded-2xl bg-white border border-[#EB1767]/20 p-5 sm:p-6 flex flex-col justify-between shadow-xs min-h-[220px] lg:min-h-[360px] text-[#121216]"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EB1767] block mb-1">
                Logistics &amp; Reach
              </span>
              <h3 className="text-lg font-bold text-[#121216] font-['Outfit',sans-serif]">
                Nationwide Commercial Supply
              </h3>
              <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                Direct order dispatch connecting Karachi port logistics and Punjab industrial hubs for commercial clients.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EB1767]/15 space-y-2 mt-4">
              <Link
                href="/about"
                className="btn-primary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-1 text-[11px] text-zinc-500 justify-center">
                <MapPin className="w-3 h-3 text-[#EB1767]" />
                <span>Consultations By Prior Appointment</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
