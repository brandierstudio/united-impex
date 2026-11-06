import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cupPng from '../../assets/animation/cup.png';

gsap.registerPlugin(ScrollTrigger);

export const CinematicScrollCup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const trailSvgRef = useRef<SVGSVGElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // 1. Accessibility Check: Prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // 2. Elements Identification & Precision Waypoints Setup
    let ctx: gsap.Context | null = null;
    let fadeTimeout: ReturnType<typeof setTimeout> | null = null;

    const initAnimation = () => {
      if (ctx) ctx.revert();

      const isMobile = window.innerWidth < 1024;
      const heroCupEl = isMobile
        ? document.getElementById('hero-scroll-cup-mobile') || document.getElementById('hero-scroll-cup')
        : document.getElementById('hero-scroll-cup');
      const targetEl = document.getElementById('cup-table-landing-target');
      const heroSection = document.getElementById('hero');
      const tableStaticCup = document.getElementById('table-static-cup');

      if (!heroCupEl || !targetEl || !heroSection || !cupWrapperRef.current) {
        return;
      }

      setIsReady(true);

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Start: center and dimensions of the hero cup
      const heroRect = heroCupEl.getBoundingClientRect();
      const heroX = heroRect.left + heroRect.width / 2;
      const heroY = heroRect.top + heroRect.height / 2;
      const heroWidth = Math.max(heroRect.width, 100);
      const heroHeight = Math.max(heroRect.height, 100);

      // End: center and dimensions of the pedestal landing target
      const targetRect = targetEl.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = vh * 0.50; // ScrollTrigger pin/end arrives with target center at exactly 50% viewport
      const targetWidth = Math.max(targetRect.width, 40);
      
      // Strict perspective scale ratio (Hero -> Pedestal)
      const rawScaleRatio = targetWidth / heroWidth;

      // Waypoint coordinate calculations:
      // Desktop: Dynamic horizontal centers of actual anchor cards
      // Mobile: Calibrated right-side margin travel (never covering text, no overflow, smooth landing)
      const a1 = document.getElementById('cup-anchor-1');
      const a2 = document.getElementById('cup-anchor-2');
      const a3 = document.getElementById('cup-anchor-3');
      const a4 = document.getElementById('cup-anchor-4');

      const a1X = a1 ? (a1.getBoundingClientRect().left + a1.offsetWidth / 2) : (vw * 0.22);
      const a2X = a2 ? (a2.getBoundingClientRect().left + a2.offsetWidth / 2) : (vw * 0.80);
      const a3X = a3 ? (a3.getBoundingClientRect().left + a3.offsetWidth / 2) : (vw * 0.22);
      const a4X = a4 ? (a4.getBoundingClientRect().left + a4.offsetWidth / 2) : (vw * 0.78);

      const step1X = isMobile ? vw * 0.80 : a1X;
      const step2X = isMobile ? vw * 0.84 : a2X;
      const step3X = isMobile ? vw * 0.80 : a3X;
      const step4X = isMobile ? vw * 0.84 : a4X;

      const step1Scale = isMobile ? 0.92 : 0.88;
      const step2Scale = isMobile ? 0.86 : 0.79;
      const step3Scale = isMobile ? 0.81 : 0.71;
      const step4Scale = isMobile ? 0.76 : 0.65;

      // Monotonically decreasing scale guarantee: landing cup cannot suddenly become larger
      const scaleRatio = Math.min(step4Scale, Math.max(0.40, rawScaleRatio));

      const step1Rot = isMobile ? 1.5 : 3;
      const step2Rot = isMobile ? -1.5 : -3;
      const step3Rot = isMobile ? 1 : 2;
      const step4Rot = isMobile ? -1 : -2;

      // Set initial dimensions and position on the wrapper (centered on heroX, heroY)
      gsap.set(cupWrapperRef.current, {
        width: heroWidth,
        height: heroHeight,
        xPercent: -50,
        yPercent: -50,
        x: heroX,
        y: heroY,
        scale: 1,
        rotation: -3,
        transformOrigin: 'center center',
        opacity: 0
      });

      // Initially hide the static table cup so it never duplicates
      if (tableStaticCup) {
        tableStaticCup.style.opacity = '0';
      }

      // Create GSAP Scrubbed Timeline
      ctx = gsap.context(() => {
        const testParam = new URLSearchParams(window.location.search).get('cup_progress');
        const isTestingProgress = testParam !== null;

        const updateVisibilityAndTrail = (p: number, velocity: number = 0, direction: number = 1) => {
          const wrapper = cupWrapperRef.current;
          const heroDesktop = document.getElementById('hero-scroll-cup');
          const heroMobile = document.getElementById('hero-scroll-cup-mobile');
          const tCup = document.getElementById('table-static-cup');
          const speed = Math.abs(velocity);

          // 1. Subtle Motion Trail (Velocity & Direction-Aware)
          if (trailRef.current) {
            const inFlight = p > 0.04 && p < 0.96;
            if (inFlight && speed > 50) {
              const trailOpacity = Math.min(0.65, (speed / 1100) * 0.65);
              trailRef.current.style.opacity = trailOpacity.toFixed(2);
              
              if (trailSvgRef.current) {
                // Reverse scrolling: trail points downwards; Forward scrolling: points upwards
                if (direction === -1) {
                  trailSvgRef.current.style.transform = 'scaleY(-1) translateY(24px)';
                } else {
                  trailSvgRef.current.style.transform = 'scaleY(1) translateY(0px)';
                }
              }
            } else {
              trailRef.current.style.opacity = '0';
            }

            // Smooth fade out when scroll motion decelerates / halts
            if (fadeTimeout) clearTimeout(fadeTimeout);
            fadeTimeout = setTimeout(() => {
              if (trailRef.current) trailRef.current.style.opacity = '0';
            }, 70);
          }

          // 2. Strict Mutually Exclusive Visibility: ONE CUP ONLY, Seamless Handoff
          if (p <= 0.02) {
            if (wrapper) wrapper.style.opacity = '0';
            if (heroDesktop) heroDesktop.style.opacity = '1';
            if (heroMobile) heroMobile.style.opacity = '1';
            if (tCup) tCup.style.opacity = '0';
          } else if (p < 0.98) {
            if (wrapper) wrapper.style.opacity = '1';
            if (heroDesktop) heroDesktop.style.opacity = '0';
            if (heroMobile) heroMobile.style.opacity = '0';
            if (tCup) tCup.style.opacity = '0';
          } else {
            // Touchdown onto reserved landing space
            if (isTestingProgress) {
              // In deterministic test mode (?cup_progress=1.0), keep wrapper visible at final coordinates
              if (wrapper) wrapper.style.opacity = '1';
              if (heroDesktop) heroDesktop.style.opacity = '0';
              if (heroMobile) heroMobile.style.opacity = '0';
              if (tCup) tCup.style.opacity = '1';
            } else {
              // In live scroll journey: seamless static handoff with identical coordinates
              if (wrapper) wrapper.style.opacity = '0';
              if (heroDesktop) heroDesktop.style.opacity = '0';
              if (heroMobile) heroMobile.style.opacity = '0';
              if (tCup) tCup.style.opacity = '1';
            }
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: isTestingProgress ? undefined : {
            trigger: heroSection,
            start: 'top top',
            endTrigger: targetEl,
            end: 'center 50%',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              updateVisibilityAndTrail(self.progress, self.getVelocity(), self.direction);
            }
          }
        });

        // =====================================================================
        // CHOREOGRAPHED 5-STAGE ZIGZAG FLIGHT PATH
        // Monotonically smooth perspective descent: 1.00 -> scaleRatio (natural proportion)
        // =====================================================================
        
        // Stage 1: Hero -> Section 1 (Charcoal) Anchor (p: 0.00 -> 0.20)
        tl.to(cupWrapperRef.current, {
          x: step1X,
          y: vh * 0.44,
          scale: step1Scale,
          rotation: step1Rot,
          ease: 'power1.inOut',
          duration: 0.20
        });

        // Stage 2: Section 1 -> Section 2 (Soft Blush) Anchor (p: 0.20 -> 0.40)
        tl.to(cupWrapperRef.current, {
          x: step2X,
          y: vh * 0.46,
          scale: step2Scale,
          rotation: step2Rot,
          ease: 'sine.inOut',
          duration: 0.20
        });

        // Stage 3: Section 2 -> Section 3 (Manufacturing) Anchor (p: 0.40 -> 0.60)
        tl.to(cupWrapperRef.current, {
          x: step3X,
          y: vh * 0.48,
          scale: step3Scale,
          rotation: step3Rot,
          ease: 'sine.inOut',
          duration: 0.20
        });

        // Stage 4: Section 3 -> Section 4 (About) Anchor (p: 0.60 -> 0.80)
        tl.to(cupWrapperRef.current, {
          x: step4X,
          y: vh * 0.46,
          scale: step4Scale,
          rotation: step4Rot,
          ease: 'sine.inOut',
          duration: 0.20
        });

        // Stage 5: Section 4 -> Final Pedestal Landing Touchdown (p: 0.80 -> 1.00)
        tl.to(cupWrapperRef.current, {
          x: targetX,
          y: targetY,
          scale: scaleRatio,
          rotation: 0,
          ease: 'power2.out',
          duration: 0.20
        });

        // Contact shadow deepens smoothly as cup approaches pedestal surface
        if (shadowRef.current) {
          tl.fromTo(shadowRef.current, 
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, ease: 'power1.out', duration: 0.15 },
            0.85
          );
        }

        // Deterministic progress preview hook via ?cup_progress=...
        if (isTestingProgress) {
          const val = Math.max(0, Math.min(1, parseFloat(testParam!)));
          tl.pause();
          tl.progress(val);
          updateVisibilityAndTrail(val, 0, 1);
        }
      }, containerRef);
    };

    // Allow DOM layout to settle, then initialize
    const timer = setTimeout(initAnimation, 160);

    const handleResize = () => {
      initAnimation();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      clearTimeout(timer);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      mediaQuery.removeEventListener('change', handleMediaChange);

      if (ctx) ctx.revert();

      // Restore static cups on unmount
      const heroDesktop = document.getElementById('hero-scroll-cup');
      const heroMobile = document.getElementById('hero-scroll-cup-mobile');
      const tCup = document.getElementById('table-static-cup');
      if (heroDesktop) heroDesktop.style.opacity = '1';
      if (heroMobile) heroMobile.style.opacity = '1';
      if (tCup) tCup.style.opacity = '1';
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="cinematic-cup-flight-root"
      className="fixed inset-0 pointer-events-none z-30 overflow-visible"
      aria-hidden="true"
    >
      <div
        ref={cupWrapperRef}
        id="cinematic-travelling-cup"
        className="absolute top-0 left-0 will-change-transform transform-gpu select-none pointer-events-none"
        style={{
          opacity: 0,
          visibility: isReady ? 'visible' : 'hidden'
        }}
      >
        {/* Subtle Cinematic Motion Trail (Rendered strictly behind cup) */}
        <div
          ref={trailRef}
          className="absolute inset-0 pointer-events-none -z-10 will-change-transform transition-opacity duration-150"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <svg
            ref={trailSvgRef}
            viewBox="0 0 240 240"
            className="absolute -top-12 -left-6 w-[125%] h-[125%] overflow-visible pointer-events-none select-none transition-transform duration-200 ease-out"
          >
            <defs>
              {/* Streak 1: Magenta brand accent fading out */}
              <linearGradient id="streakMagenta" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#EB1767" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#FF659A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FF659A" stopOpacity="0" />
              </linearGradient>

              {/* Streak 2: Soft White / Cream accent fading out */}
              <linearGradient id="streakWhite" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.60" />
                <stop offset="50%" stopColor="#FDF2F6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Streak 3: Whispering hairline accent */}
              <linearGradient id="streakHairline" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#EB1767" stopOpacity="0.30" />
                <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#EB1767" stopOpacity="0" />
              </linearGradient>

              {/* Soft blur filter for organic stream aesthetic */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 3 Soft Curved Motion Streaks */}
            <g filter="url(#softGlow)">
              {/* Left curve */}
              <path
                d="M 108 120 C 92 75, 78 35, 62 8"
                stroke="url(#streakMagenta)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right curve */}
              <path
                d="M 132 120 C 148 70, 162 30, 174 12"
                stroke="url(#streakWhite)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Center spine */}
              <path
                d="M 120 110 C 118 65, 122 30, 116 4"
                stroke="url(#streakHairline)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* 7 Subtle Motion Particles in wake */}
            <circle cx="82" cy="48" r="2.2" fill="#EB1767" opacity="0.40" />
            <circle cx="156" cy="54" r="1.8" fill="#FFFFFF" opacity="0.55" />
            <circle cx="70" cy="24" r="2.8" fill="#FF8BB5" opacity="0.25" />
            <circle cx="168" cy="32" r="2.0" fill="#EB1767" opacity="0.35" />
            <circle cx="114" cy="18" r="1.6" fill="#FFFFFF" opacity="0.45" />
            <circle cx="98" cy="72" r="1.4" fill="#EB1767" opacity="0.30" />
            <circle cx="140" cy="80" r="1.6" fill="#FFFFFF" opacity="0.40" />
          </svg>
        </div>

        {/* Cup Image and Precision Contact Shadow */}
        <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
          <img
            src={cupPng}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
          />
          {/* Dynamic contact shadow positioned exactly at visible cup base (y = 83.8%) */}
          <div
            ref={shadowRef}
            className="absolute top-[83.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-3.5 bg-black/28 rounded-full blur-[3px] pointer-events-none opacity-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default CinematicScrollCup;
