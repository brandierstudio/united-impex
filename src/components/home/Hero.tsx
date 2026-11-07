import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Palette } from 'lucide-react';
import { Link } from 'wouter';
import gsap from 'gsap';
import cupPng from '../../assets/animation/cup.png';
import type { CustomizerCategory } from '../customizer/ProductCustomizerModal';

export interface HeroPhotoSlideData {
  id: string;
  name: string;
  desktopPhoto: string;
  mobilePhoto: string;
  ctaRoute: string;
  ctaLabel: string;
  themeName: string;
  accentColor: string;
  kicker: string;
  headlineMain: string;
  headlineHighlight: string;
  subheadline: string;
  tagline: string;
  mobileHeadlineMain: string;
  mobileHeadlineHighlight: string;
  mobileSubheadline: string;
  mobileCtaLabel: string;
}

export const HERO_PHOTO_SLIDES: HeroPhotoSlideData[] = [
  {
    id: 'real-boxes',
    name: 'Packaging Boxes',
    desktopPhoto: '/hero-photo/01-real-boxes-desktop.webp',
    mobilePhoto: '/hero-photo/01-real-boxes-mobile.webp',
    ctaRoute: '/products/boxes',
    ctaLabel: 'Explore Packaging Boxes Collection',
    themeName: 'Blush Packaging',
    accentColor: '#EB1767',
    kicker: 'THE ART OF PRESENTATION',
    headlineMain: 'Packaging that',
    headlineHighlight: 'feels like a gift.',
    subheadline: 'Signature rigid boxes, folding product cartons, and thoughtful custom finishes.',
    tagline: 'UNITED IMPEX / LUXURY CARTONS',
    mobileHeadlineMain: 'Packaging That',
    mobileHeadlineHighlight: 'Stands Apart.',
    mobileSubheadline: 'Distinctive packaging for brands that value presentation.',
    mobileCtaLabel: 'Explore Boxes',
  },
  {
    id: 'real-bags',
    name: 'Paper Bags',
    desktopPhoto: '/hero-photo/02-real-paper-bags-desktop.webp',
    mobilePhoto: '/hero-photo/02-real-paper-bags-mobile.webp',
    ctaRoute: '/products/paper-bags',
    ctaLabel: 'Explore Paper Bags Collection',
    themeName: 'Warm Kraft',
    accentColor: '#EB1767',
    kicker: 'CARRY YOUR BRAND',
    headlineMain: 'Made to carry.',
    headlineHighlight: 'Made to remember.',
    subheadline: 'Everyday kraft shopping bags and retail totes elevated with your brand identity.',
    tagline: 'UNITED IMPEX / RETAIL CARRYWARE',
    mobileHeadlineMain: 'Carry Your',
    mobileHeadlineHighlight: 'Brand Further.',
    mobileSubheadline: 'Beautifully presented bags, made for memorable retail experiences.',
    mobileCtaLabel: 'Explore Bags',
  },
  {
    id: 'real-diaries',
    name: 'Corporate Stationery',
    desktopPhoto: '/hero-photo/03-real-diaries-desktop.webp',
    mobilePhoto: '/hero-photo/03-real-diaries-mobile.webp',
    ctaRoute: '/products/diaries',
    ctaLabel: 'Explore Stationery & Diaries Collection',
    themeName: 'Executive Print',
    accentColor: '#EB1767',
    kicker: 'DETAILS THAT STAY',
    headlineMain: 'Make every detail',
    headlineHighlight: 'feel considered.',
    subheadline: 'Executive corporate diaries, debossed planners, and bespoke stationery.',
    tagline: 'UNITED IMPEX / CORPORATE PRINT',
    mobileHeadlineMain: 'Every Detail',
    mobileHeadlineHighlight: 'Matters.',
    mobileSubheadline: 'Professional stationery with a distinct brand identity.',
    mobileCtaLabel: 'Explore Diaries',
  },
];

export interface HeroProps {
  onOpenCustomizer?: (category?: CustomizerCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch swipe refs for mobile touch interactions
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Support deterministic slide testing via ?hero_slide=0|1|2
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('hero_slide');
      if (param !== null) {
        const idx = parseInt(param, 10);
        if (!isNaN(idx) && idx >= 0 && idx < HERO_PHOTO_SLIDES.length) {
          setCurrentSlideIndex(idx);
          setIsPaused(true);
        }
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_PHOTO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_PHOTO_SLIDES.length) % HERO_PHOTO_SLIDES.length);
  }, []);

  // Autoplay ~5s with pause on hover/focus/touch
  useEffect(() => {
    if (isPaused || isReducedMotion) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, isReducedMotion, handleNext]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current > 45) {
      handlePrev();
    } else if (touchDeltaXRef.current < -45) {
      handleNext();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsPaused(false);
  };

  // Part 4: Subtle Coordinated Hero Text Reveal on Slide Change
  useEffect(() => {
    if (isReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-slide-title',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-slide-desc',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.08, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-slide-cta',
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.14, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [currentSlideIndex, isReducedMotion]);

  return (
    <section
      id="hero"
      aria-label="United Impex Commercial Showcase"
      className="relative w-full overflow-hidden pt-2 pb-6 sm:pb-10 lg:pb-14 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ================================================================ */}
        {/* DESKTOP FULL-BLEED PHOTOGRAPHIC HERO (>= 1024px)                 */}
        {/* Wide Photorealistic Packaging Scene + Independent Right Cup      */}
        {/* ================================================================ */}
        {/* ================================================================ */}
        {/* DESKTOP HERO WITH SUSPENDED HANGING CUP (>= 1024px)              */}
        {/* Balanced 2-Part Composition: Full-Bleed Banner + Suspended Hero  */}
        {/* ================================================================ */}
        <div className="hidden lg:flex items-stretch gap-5 xl:gap-6 relative w-full pt-3">
          
          {/* 1. Main Photographic Portfolio Banner (Left ~76%) */}
          <div 
            className="relative flex-1 rounded-[32px] overflow-hidden shadow-[0_16px_50px_-12px_rgba(0,0,0,0.08)] bg-zinc-100 border border-zinc-200/80 z-10 min-h-[500px]"
          >
            {/* Horizontal Slider Track */}
            <div 
              className={`flex w-full h-full ${isReducedMotion ? '' : 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {HERO_PHOTO_SLIDES.map((slide, idx) => (
                <div 
                  key={slide.id}
                  className="w-full shrink-0 relative h-full min-h-[500px] overflow-hidden"
                  aria-hidden={currentSlideIndex !== idx}
                >
                  {/* Photo-Realistic Packaging Background Image */}
                  <picture>
                    <source media="(min-width: 1024px)" srcSet={slide.desktopPhoto} />
                    <img
                      src={slide.desktopPhoto}
                      alt={slide.name}
                      width={1672}
                      height={560}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                    />
                  </picture>

                  {/* Left-Side Readable Glass Gradient Overlay */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/95 via-white/85 via-50% to-white/20 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Live HTML Typography & Interactive Controls (Left Aligned) */}
                  <div className="relative z-10 h-full flex flex-col justify-center px-10 xl:px-14 max-w-xl py-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-black/10 text-xs font-bold uppercase tracking-wider font-mono shadow-2xs mb-4 w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#EB1767]" />
                      <span className="text-[#121216]">{slide.kicker}</span>
                    </div>

                    <h1 className="hero-slide-title text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
                      {slide.headlineMain} <br />
                      <span className="text-[#EB1767]">{slide.headlineHighlight}</span>
                    </h1>

                    <p className="hero-slide-desc mt-3 text-sm xl:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif] max-w-md">
                      {slide.subheadline}
                    </p>

                    <div className="hero-slide-cta mt-6 flex items-center gap-3">
                      <Link
                        href={slide.ctaRoute}
                        className="btn-primary text-xs tracking-wide px-6 py-3 flex items-center gap-2 group shadow-sm"
                        aria-label={slide.ctaLabel}
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      {onOpenCustomizer && (
                        <button
                          type="button"
                          onClick={() => onOpenCustomizer('cups')}
                          className="px-4 py-2.5 rounded-full text-xs font-semibold text-zinc-700 bg-white/80 hover:bg-white border border-zinc-200/80 shadow-2xs flex items-center gap-1.5 transition-all hover:text-[#EB1767]"
                        >
                          <Palette className="w-3.5 h-3.5" />
                          <span>2D Studio</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation & Pagination Bar (Desktop) */}
            <div className="absolute bottom-5 left-10 xl:left-14 z-20 flex items-center gap-3 pointer-events-auto">
              <div className="flex items-center gap-2 glass-control px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md">
                {HERO_PHOTO_SLIDES.map((slide, sIdx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(sIdx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlideIndex === sIdx
                        ? 'w-7 bg-[#121216] shadow-2xs'
                        : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Go to slide ${sIdx + 1}: ${slide.name}`}
                    aria-current={currentSlideIndex === sIdx ? 'true' : 'false'}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 glass-control p-1 rounded-full bg-white/80 backdrop-blur-md">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white active:scale-95 transition-all cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 glass-control px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Karachi &amp; Multan</span>
              </div>
            </div>
          </div>

          {/* 2. Suspended Hanging Coffee Cup Display Capsule (Right ~24%) */}
          <div 
            id="hero-scroll-cup-container"
            className="relative w-[260px] xl:w-[290px] shrink-0 rounded-[32px] bg-gradient-to-b from-zinc-50/95 via-white to-zinc-100/90 border border-zinc-200/80 shadow-[0_16px_50px_-12px_rgba(0,0,0,0.06)] overflow-visible p-4 pb-5 flex flex-col justify-between items-center z-10 select-none group"
          >
            {/* Realistic 3D Architectural Wall Peg / Pin (Mounted Above Capsule Rim) */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
              aria-hidden="true"
            >
              {/* Wall mounting rosette / flange */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-800 p-0.5 shadow-md flex items-center justify-center border border-white/60">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-600 to-zinc-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-500 shadow-inner" />
                </div>
              </div>

              {/* Cylindrical metal peg pin projecting forward with notched groove */}
              <div className="relative -mt-1.5 w-3.5 h-3 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-600 rounded-b-md shadow-[0_4px_6px_rgba(0,0,0,0.35)] flex items-end justify-center">
                <div className="w-2.5 h-1 bg-zinc-800 rounded-full mb-0.5" />
              </div>
            </div>

            {/* Suspended Sway Assembly: String, Knot & Cup */}
            <div 
              className="relative w-full flex-1 flex flex-col items-center justify-start pt-2 animate-hero-cup-sway"
              style={{ transformOrigin: '50% 0px' }}
            >
              {/* Realistic Braided Artisan Twine / Dori SVG */}
              <svg 
                className="w-full h-[140px] overflow-visible pointer-events-none drop-shadow-[1px_2px_4px_rgba(0,0,0,0.22)]"
                viewBox="0 0 240 140"
                aria-hidden="true"
              >
                <defs>
                  {/* Subtle twine texture pattern */}
                  <pattern id="hero-twine-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#52525B" strokeWidth="1" />
                    <line x1="3" y1="0" x2="3" y2="6" stroke="#27272A" strokeWidth="1.5" />
                  </pattern>

                  {/* Metallic peg & knot gradient */}
                  <linearGradient id="twine-knot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3F3F46" />
                    <stop offset="50%" stopColor="#18181B" />
                    <stop offset="100%" stopColor="#27272A" />
                  </linearGradient>
                </defs>

                {/* 1. Hanging Taut Drop Cord (From Peg Notch y=0 down to Cup Rim y=116) */}
                {/* Cast Shadow Layer */}
                <line 
                  x1="121" y1="1" 
                  x2="121" y2="116" 
                  stroke="rgba(0,0,0,0.22)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                {/* Main Cord Body (Twisted Dori) */}
                <line 
                  x1="120" y1="0" 
                  x2="120" y2="116" 
                  stroke="#242429" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                />
                {/* Interwoven Highlight Fiber Strand */}
                <line 
                  x1="119.3" y1="0" 
                  x2="119.3" y2="116" 
                  stroke="#9CA3AF" 
                  strokeWidth="0.9" 
                  strokeDasharray="4 2" 
                />

                {/* Fine twisted texture overlay */}
                {[10, 22, 34, 46, 58, 70, 82, 94, 106].map((y) => (
                  <line 
                    key={y}
                    x1="118.5" y1={y}
                    x2="121.5" y2={y + 3}
                    stroke="#71717A"
                    strokeWidth="0.8"
                    opacity="0.85"
                  />
                ))}

                {/* 2. Back Collar Loop (Wraps behind the cup neck) */}
                <path 
                  d="M 76,118 A 44,9 0 0,1 164,118" 
                  fill="none" 
                  stroke="#1D1D22" 
                  strokeWidth="2.8" 
                />
              </svg>

              {/* The Coffee Cup Image (Centered at natural hanging height) */}
              <div 
                className="relative -mt-[58px] w-[210px] xl:w-[230px] aspect-square flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                onClick={() => onOpenCustomizer?.('cups')}
                title="Click to customize this coffee cup in 2D Studio"
              >
                <img
                  id="hero-scroll-cup"
                  src={cupPng}
                  alt="United Impex custom printed coffee cup suspended in showcase"
                  width={500}
                  height={500}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain select-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.18)]"
                />

                {/* Front Collar Wrap & Tied Knot SVG (Rendered directly over the cup neck) */}
                <svg 
                  className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 240 240"
                  aria-hidden="true"
                >
                  {/* Front Collar Loop (Hugs the front of the cup neck under the lid rim) */}
                  <path 
                    d="M 74,78 A 46,10 0 0,0 166,78" 
                    fill="none" 
                    stroke="#27272C" 
                    strokeWidth="2.8" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 74,78 A 46,10 0 0,0 166,78" 
                    fill="none" 
                    stroke="#9CA3AF" 
                    strokeWidth="0.9" 
                    strokeDasharray="4 2"
                  />

                  {/* Tied Figure-Eight Knot Assembly at Front-Left Collar */}
                  <g transform="translate(108, 74)">
                    {/* Knot shadow */}
                    <ellipse cx="6" cy="6" rx="9" ry="6" fill="rgba(0,0,0,0.35)" />
                    {/* Knot wrap body */}
                    <rect x="0" y="1" width="12" height="9" rx="4.5" fill="url(#twine-knot-grad)" stroke="#18181B" strokeWidth="0.8" />
                    <line x1="2" y1="4" x2="10" y2="7" stroke="#71717A" strokeWidth="1" />
                    <line x1="2" y1="7" x2="10" y2="4" stroke="#71717A" strokeWidth="1" />

                    {/* Dori Tassel 1 (Longer hanging cord tail with frayed tip) */}
                    <path 
                      d="M 4,9 C 3,18 -1,25 -2,34" 
                      fill="none" 
                      stroke="#27272C" 
                      strokeWidth="2.2" 
                      strokeLinecap="round" 
                    />
                    <path d="M 4,9 C 3,18 -1,25 -2,34" fill="none" stroke="#9CA3AF" strokeWidth="0.7" strokeDasharray="3 1" />
                    {/* Frayed micro-fibers */}
                    <line x1="-2" y1="34" x2="-4" y2="38" stroke="#71717A" strokeWidth="0.8" />
                    <line x1="-2" y1="34" x2="-1" y2="39" stroke="#9CA3AF" strokeWidth="0.7" />
                    <line x1="-2" y1="34" x2="0" y2="37" stroke="#52525B" strokeWidth="0.8" />

                    {/* Dori Tassel 2 (Shorter hanging cord tail) */}
                    <path 
                      d="M 8,9 C 10,17 12,22 11,29" 
                      fill="none" 
                      stroke="#27272C" 
                      strokeWidth="2.2" 
                      strokeLinecap="round" 
                    />
                    <path d="M 8,9 C 10,17 12,22 11,29" fill="none" stroke="#9CA3AF" strokeWidth="0.7" strokeDasharray="3 1" />
                    {/* Frayed micro-fibers */}
                    <line x1="11" y1="29" x2="10" y2="33" stroke="#71717A" strokeWidth="0.8" />
                    <line x1="11" y1="29" x2="13" y2="34" stroke="#9CA3AF" strokeWidth="0.7" />
                  </g>
                </svg>
              </div>

              {/* Ambient Suspended Ground Shadow */}
              <div 
                className="w-32 xl:w-36 h-3 bg-zinc-950/14 blur-md rounded-full mt-1 pointer-events-none animate-hero-cup-shadow" 
                aria-hidden="true"
              />
            </div>

            {/* Showcase Presentation Footer Chip */}
            <div className="w-full pt-3 border-t border-zinc-200/80 flex flex-col items-center gap-1.5 z-20">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-800 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" />
                <span>Signature Drinkware</span>
              </div>

              <div className="flex items-center justify-between w-full px-1">
                <span className="text-[11px] text-zinc-500 font-medium">12oz Custom Offset</span>
                {onOpenCustomizer && (
                  <button
                    type="button"
                    onClick={() => onOpenCustomizer('cups')}
                    className="text-[11px] font-bold text-[#EB1767] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Palette className="w-3 h-3" />
                    <span>Customize &rarr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================ */}
        {/* MOBILE & TABLET EDITORIAL LUXURY HERO (< 1024px)                  */}
        {/* Kinetic & Northen Reference-Aligned: Bold Title, 9:16 Photo, CTA  */}
        {/* ================================================================ */}
        <div className="block lg:hidden w-full">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track with 9:16 Mobile WebP Photos */}
            <div 
              className={`flex w-full min-w-0 ${isReducedMotion ? '' : 'transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {HERO_PHOTO_SLIDES.map((slide, sIdx) => (
                <div
                  key={slide.id}
                  className="w-full min-w-full max-w-full shrink-0 flex flex-col items-center bg-transparent overflow-hidden px-1 sm:px-2"
                  aria-hidden={currentSlideIndex !== sIdx}
                >
                  {/* 1. Compact Centered Headline (Max 5-7 words) */}
                  <h1 className="hero-slide-title text-2xl sm:text-3xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight text-center leading-[1.2] px-2">
                    {slide.mobileHeadlineMain}{' '}
                    <span className="text-[#EB1767]">{slide.mobileHeadlineHighlight}</span>
                  </h1>

                  {/* 2. Short Supporting Line (Max 10-14 words) */}
                  <p className="hero-slide-desc mt-1.5 text-xs sm:text-sm text-zinc-500 font-['Inter',sans-serif] text-center max-w-[310px] mx-auto leading-relaxed px-2">
                    {slide.mobileSubheadline}
                  </p>

                  {/* 3. Prominently Visible 9:16 Photographic Hero Slide (Contained Portrait Panel) */}
                  <div className="relative w-full aspect-[9/13] max-h-[500px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.14)] border border-zinc-200/80 bg-[#F5F2F0] mt-3.5 select-none">
                    <img
                      src={slide.mobilePhoto}
                      alt={slide.name}
                      width={1080}
                      height={1920}
                      loading="eager" fetchPriority={sIdx === 0 ? "high" : "auto"}
                      decoding="async"
                      className="w-full h-full object-cover object-bottom select-none pointer-events-none"
                    />

                    {/* Subtle Base Vignette to Ensure Clean Button Lift */}
                    <div 
                      className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" 
                      aria-hidden="true" 
                    />

                    {/* 4. Single Main CTA (Max 2-3 words, Clean Floating Capsule) */}
                    <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-center z-20 pointer-events-auto">
                      <Link
                        href={slide.ctaRoute}
                        className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white shadow-xl active:scale-95 transition-all min-h-[46px] backdrop-blur-md"
                        aria-label={slide.ctaLabel}
                      >
                        <span>{slide.mobileCtaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* 5. Minimal Slide Indicators */}
                  <div className="mt-3.5 flex items-center justify-center gap-2">
                    {HERO_PHOTO_SLIDES.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setCurrentSlideIndex(dotIdx)}
                        aria-label={`Slide ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlideIndex === dotIdx ? 'w-6 bg-[#121216]' : 'w-1.5 bg-zinc-300'
                        }`}
                      />
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
