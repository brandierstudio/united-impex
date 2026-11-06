import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Palette } from 'lucide-react';
import { Link } from 'wouter';
import cupPng from '../../assets/animation/cup.png';
import type { CustomizerCategory } from '../customizer/ProductCustomizerModal';

export interface HeroSlideData {
  id: string;
  name: string;
  svgPath: string;
  ctaRoute: string;
  ctaLabel: string;
  themeName: string;
  accentColor: string;
  kicker: string;
  headlineMain: string;
  headlineHighlight: string;
  subheadline: string;
  bgGradient: string;
  tagline: string;
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'blush-boxes',
    name: 'Packaging Boxes',
    svgPath: '/hero-banners/01-blush-boxes.svg',
    ctaRoute: '/products/boxes',
    ctaLabel: 'Explore Packaging Boxes Collection',
    themeName: 'Blush Pink',
    accentColor: '#E91765',
    kicker: 'THE ART OF PRESENTATION',
    headlineMain: 'Packaging that',
    headlineHighlight: 'feels like a gift.',
    subheadline: 'Signature rigid boxes, folding product cartons, and thoughtful custom finishes.',
    bgGradient: 'from-[#FDF0F4] via-[#FCE4EC] to-[#F8D2DF]',
    tagline: 'UNITED IMPEX / LUXURY CARTONS',
  },
  {
    id: 'sand-bags',
    name: 'Paper Bags',
    svgPath: '/hero-banners/02-sand-bags.svg',
    ctaRoute: '/products/paper-bags',
    ctaLabel: 'Explore Paper Bags Collection',
    themeName: 'Warm Sand',
    accentColor: '#AE663D',
    kicker: 'CARRY YOUR BRAND',
    headlineMain: 'Made to carry.',
    headlineHighlight: 'Made to remember.',
    subheadline: 'Everyday kraft shopping bags and art totes elevated with your brand identity.',
    bgGradient: 'from-[#FDF8EE] via-[#F8F0E1] to-[#EED9BC]',
    tagline: 'UNITED IMPEX / RETAIL CARRYWARE',
  },
  {
    id: 'pearl-stationery',
    name: 'Corporate Stationery',
    svgPath: '/hero-banners/03-pearl-stationery.svg',
    ctaRoute: '/products/diaries',
    ctaLabel: 'Explore Stationery & Diaries Collection',
    themeName: 'Pearl Grey',
    accentColor: '#4F7C83',
    kicker: 'DETAILS THAT STAY',
    headlineMain: 'Make every detail',
    headlineHighlight: 'feel considered.',
    subheadline: 'Executive corporate diaries, debossed planners, and bespoke stationery.',
    bgGradient: 'from-[#F5F8F9] via-[#EBF1F3] to-[#D6E2E5]',
    tagline: 'UNITED IMPEX / CORPORATE PRINT',
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
        if (!isNaN(idx) && idx >= 0 && idx < HERO_SLIDES.length) {
          setCurrentSlideIndex(idx);
          setIsPaused(true);
        }
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay ~5.2s with pause on hover/focus/touch
  useEffect(() => {
    if (isPaused || isReducedMotion) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, isReducedMotion, handleNext]);

  // Touch gesture handlers
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
    if (touchStartXRef.current !== null) {
      const threshold = 40; // 40px swipe threshold
      if (touchDeltaXRef.current < -threshold) {
        handleNext();
      } else if (touchDeltaXRef.current > threshold) {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsPaused(false);
  };

  return (
    <section 
      id="hero" 
      aria-label="United Impex Hero Showcase"
      className="relative w-full bg-white pt-3 sm:pt-6 md:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 overflow-visible selection:bg-[#EB1767] selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================ */}
        {/* DESKTOP HERO PRESENTATION (>= 1024px)                             */}
        {/* 1500x650 Master SVG Slider + Independent Right Overlapping Cup    */}
        {/* ================================================================ */}
        <div className="hidden lg:block relative w-full">
          <div 
            className="relative w-[85%] xl:w-[87%] rounded-[36px] overflow-hidden shadow-[0_16px_50px_-12px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.02)] bg-[#F8F9FA] border border-zinc-200/70 z-10"
          >
            {/* Horizontal Slider Track */}
            <div 
              className={`flex w-full ${isReducedMotion ? '' : 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {HERO_SLIDES.map((slide, idx) => (
                <div 
                  key={slide.id}
                  className="w-full shrink-0 relative aspect-[1500/650] min-h-[460px]"
                  aria-hidden={currentSlideIndex !== idx}
                >
                  {/* Master Vector Artwork SVG */}
                  <img
                    src={slide.svgPath}
                    alt={slide.name}
                    width={1500}
                    height={650}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-contain object-left pointer-events-none select-none"
                  />

                  {/* Accessible Clickable CTA Overlay aligned directly to SVG's "Explore Collection" button */}
                  <Link
                    href={slide.ctaRoute}
                    className="absolute cursor-pointer rounded-full transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767] focus-visible:ring-offset-2 z-20"
                    style={{
                      left: '5.33%',
                      top: '63.85%',
                      width: '17.53%',
                      height: '10.15%',
                      minWidth: '120px',
                      minHeight: '38px',
                    }}
                    aria-label={slide.ctaLabel}
                  >
                    <span className="sr-only">{slide.ctaLabel}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Slider Navigation & Pagination Bar (Desktop) */}
            <div className="absolute bottom-5 left-10 z-20 flex items-center gap-3 pointer-events-auto">
              <div className="flex items-center gap-2 glass-control px-3.5 py-2 rounded-full">
                {HERO_SLIDES.map((slide, sIdx) => (
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

              <div className="flex items-center gap-1 glass-control p-1 rounded-full">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white/90 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white/90 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 glass-control px-3.5 py-2 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Karachi &amp; Multan</span>
              </div>
            </div>
          </div>

          {/* Desktop Independent Overlapping Cup */}
          <div 
            id="hero-scroll-cup-container"
            className="flex absolute right-0 xl:right-1 top-1/2 -translate-y-1/2 w-[340px] xl:w-[380px] items-center justify-center z-20 pointer-events-auto select-none"
          >
            <div 
              className="absolute bottom-3 xl:bottom-5 left-1/2 -translate-x-1/2 w-48 xl:w-56 h-6 bg-zinc-950/16 blur-xl rounded-full -z-10 pointer-events-none"
              aria-hidden="true"
            />
            <img
              id="hero-scroll-cup"
              src={cupPng}
              alt="Custom printed disposable coffee cup by United Impex"
              width={500}
              height={500}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain select-none pointer-events-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500 ease-out drop-shadow-[0_24px_45px_rgba(0,0,0,0.16)] cursor-pointer"
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* MOBILE & TABLET ART-DIRECTED HERO (< 1024px)                     */}
        {/* Deliberate, Touch-First Composition:                             */}
        {/* 1. Large, Crisp Typography Banner with Swipe Gestures             */}
        {/* 2. Dedicated Single Cup Drinkware Showcase (Never Covering Text) */}
        {/* ================================================================ */}
        <div className="block lg:hidden space-y-5">
          
          {/* 1. Touch-Enabled Banner Carousel */}
          <div 
            className="relative w-full rounded-3xl overflow-hidden shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)] border border-zinc-200/80 bg-zinc-50"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track */}
            <div 
              className={`flex w-full ${isReducedMotion ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {HERO_SLIDES.map((slide, sIdx) => (
                <div
                  key={slide.id}
                  className={`w-full shrink-0 min-h-[340px] sm:min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}
                  aria-hidden={currentSlideIndex !== sIdx}
                >
                  {/* Subtle Geometric Ambient Decor */}
                  <div 
                    className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/35 blur-2xl pointer-events-none" 
                    aria-hidden="true" 
                  />
                  <div 
                    className="absolute right-4 bottom-4 w-32 h-32 rounded-full border border-white/40 pointer-events-none" 
                    aria-hidden="true" 
                  />

                  {/* Top Content: Kicker Badge */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-black/10 text-xs font-bold uppercase tracking-wider font-mono shadow-2xs mb-4">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: slide.accentColor }} />
                      <span className="text-[#121216]">{slide.kicker}</span>
                    </div>

                    {/* Prominent High-Contrast Mobile Headline (No tiny scaled SVG text) */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-[1.15]">
                      {slide.headlineMain} <br />
                      <span style={{ color: slide.accentColor }}>{slide.headlineHighlight}</span>
                    </h1>

                    {/* Clear, readable subtext */}
                    <p className="mt-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed font-['Inter',sans-serif] max-w-sm">
                      {slide.subheadline}
                    </p>
                  </div>

                  {/* Bottom Action Area: Touch-Friendly Primary CTA (min-h-[48px]) */}
                  <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <Link
                      href={slide.ctaRoute}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all min-h-[48px] w-full sm:w-auto"
                      style={{ backgroundColor: slide.accentColor }}
                      aria-label={slide.ctaLabel}
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold self-start sm:self-center">
                      {slide.tagline}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Bar (Mobile) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1 glass-control p-1 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-white/60">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white active:scale-90 transition-all cursor-pointer"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 hover:text-[#EB1767] hover:bg-white active:scale-90 transition-all cursor-pointer"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Dots Indicator Bar */}
            <div className="absolute bottom-3 left-6 z-20 flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, sIdx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(sIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlideIndex === sIdx
                      ? 'w-6 bg-[#121216] shadow-xs'
                      : 'w-2 bg-zinc-400/60'
                  }`}
                  aria-label={`Jump to slide ${sIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 2. Dedicated Mobile Coffee Cup Showcase (Never Covering Text or CTA) */}
          <div className="w-full rounded-3xl bg-gradient-to-b from-[#FDF2F6] to-white border border-[#EB1767]/20 p-5 sm:p-6 shadow-sm text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
              <span>01 / Signature Drinkware Showcase</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-[#121216] tracking-tight">
              Precision Disposable Coffee Cups
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto mt-1 leading-relaxed">
              Leak-proof rim curling with food-grade virgin paperboard. Touch to customize or scroll to observe the continuous journey.
            </p>

            {/* Starting Anchor for Mobile GSAP Cup Animation */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto my-3 flex items-center justify-center">
              <div 
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-3.5 bg-black/16 blur-md rounded-full pointer-events-none" 
                aria-hidden="true"
              />
              <img
                id="hero-scroll-cup-mobile"
                src={cupPng}
                alt="Custom printed disposable coffee cup by United Impex"
                width={500}
                height={500}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onOpenCustomizer?.('cups')}
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2 shadow-sm"
              >
                <Palette className="w-4 h-4" />
                <span>Customize in 2D Studio</span>
              </button>

              <Link
                href="/products/coffee-cups"
                className="btn-secondary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-1.5"
              >
                <span>Cup Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
