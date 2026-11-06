import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Award, 
  Layers, 
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
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-16 sm:py-20 lg:py-24 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Soft Blush Background) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
            <span>Company Leadership &amp; Story</span>
          </div>

          <h2 
            id="about-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            Commercial Printing &amp; Custom Packaging Partner.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl font-['Inter',sans-serif]">
            United Impex operates as a trusted commercial offset printer, general order supplier, and bespoke packaging company, serving businesses across Pakistan through dedicated coordination offices in Karachi and Multan.
          </p>
        </div>

        {/* 12-Column Layout: Left 8 cols for Narrative & Visiting Cards, Right 4 cols for Cup Anchor 4 (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================================================================
              LEFT 8 COLS: COMPANY SCOPE, DIRECTOR PROFILE, & BUSINESS CARDS
              =================================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Core Capability Pillars */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-[#121216] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EB1767]" />
                <span>Our Core Business Scope</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_IDENTITY.natureOfBusiness.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white text-[#121216] border border-[#EB1767]/15 flex items-start gap-3 shadow-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#EB1767] mt-1.5 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Split: Director Areeb Ashraf Profile + Interactive Visiting Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* Director Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white text-[#121216] border border-[#EB1767]/15 flex items-center gap-4 shadow-xs">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 shadow-2xs">
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
                  <h4 className="text-base font-bold text-zinc-900 font-['Outfit',sans-serif]">
                    {COMPANY_IDENTITY.leadership.name}
                  </h4>
                  <p className="text-xs text-zinc-600 font-medium">
                    {COMPANY_IDENTITY.leadership.designation}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Director of Business &amp; Operations
                  </p>
                </div>
              </div>

              {/* Interactive Card Preview */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white text-[#121216] border border-[#EB1767]/15 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-700 uppercase font-mono">
                    Official Business Card ({activeCardSide})
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCardSide(prev => prev === 'front' ? 'back' : 'front')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3 text-[#EB1767]" />
                    <span>Flip Card</span>
                  </button>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
                  <img
                    src={activeCardSide === 'front' ? cardFrontPng : cardBackPng}
                    alt={`United Impex official visiting card (${activeCardSide} side)`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>

            {/* Dual Coordinated Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICE_LOCATIONS.map((office) => (
                <div 
                  key={office.city}
                  className="p-4 rounded-2xl bg-white text-[#121216] border border-[#EB1767]/15 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 font-['Outfit',sans-serif]">
                      <Building2 className="w-3.5 h-3.5 text-[#EB1767]" />
                      <span>{office.type}</span>
                    </span>
                    <span className="text-[10px] text-[#EB1767] font-semibold bg-[#FDF2F6] px-2 py-0.5 rounded-full border border-[#EB1767]/20">
                      By Prior Appointment
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ===================================================================
              CUP ANCHOR 4: RIGHT SIDEWAY POINT (Reserved space for travelling cup)
              =================================================================== */}
          <div 
            id="cup-anchor-4"
            className="lg:col-span-4 rounded-3xl bg-white border border-[#EB1767]/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-md min-h-[380px] text-[#121216]"
          >
            {/* Ambient magenta glow ring */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#EB1767]/10 blur-2xl pointer-events-none" 
              aria-hidden="true" 
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F6] text-[#EB1767] text-[11px] font-mono font-bold uppercase tracking-wider mb-4 border border-[#EB1767]/20">
                <Award className="w-3.5 h-3.5" />
                <span>Commercial Logistics</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight">
                National Commercial Delivery
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
                Direct order fulfillment from Karachi port to northern industrial hubs. Consistent color standards and certified bulk packaging.
              </p>
            </div>

            {/* Nationwide Metric Badge (Zero debug text, zero dashed rings) */}
            <div className="my-4 p-4 sm:p-5 rounded-2xl bg-[#FDF2F6]/80 border border-[#EB1767]/20 flex items-center gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-white border border-[#EB1767]/20 flex items-center justify-center text-[#EB1767] font-bold text-xs shrink-0 font-mono shadow-2xs">
                PAK
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-[#121216]">Nationwide Industrial Logistics</p>
                <p className="text-[11px] text-zinc-600">Direct freight dispatch from Karachi &amp; Multan</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#EB1767]/15">
              <Link
                href="/about"
                className="btn-primary w-full text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Client Consultations By Appointment</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
