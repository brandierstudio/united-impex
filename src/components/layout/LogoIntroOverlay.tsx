import React, { useState, useEffect, useRef } from 'react';
import logoDissolvePng from '../../assets/logo/logo-dissolve.png';
import frame0Png from '../../assets/logo/dissolve-f0.png';
import frame48Png from '../../assets/logo/dissolve-f48.png';
import frame72Png from '../../assets/logo/dissolve-f72.png';

interface LogoIntroOverlayProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'ui_intro_played';
const ANIMATION_EXACT_DURATION_MS = 6000; // Exact duration of 96 frames of now_make_it_9_16

/**
 * LogoIntroOverlay Component — Final Milestone
 * 
 * - Asset: now_make_it_9_16_b4e141da transparent APNG derivative (logo-dissolve.png).
 * - 100% true alpha transparency with zero rectangular box or border.
 * - Non-looping (loop=1) with 100% transparent final frame to prevent ghost logos.
 * - Single-session persistence (sessionStorage), reduced-motion bypass.
 * - CRITICAL: Instant Website Reveal with ZERO additional fade delay or blank wait.
 * - Logs: Intro start, Media loaded, Animation completed, Homepage revealed.
 */
export const LogoIntroOverlay: React.FC<LogoIntroOverlayProps> = ({ onComplete }) => {
  const [shouldDisplay] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    const params = new URLSearchParams(window.location.search);
    const testStage = params.get('intro_stage');
    if (testStage === 'homepage') return false;
    if (params.has('intro_frame')) return true;

    // Explicit review parameters
    if (params.has('replay_intro') || params.has('intro')) {
      return true;
    }

    // Check prefers-reduced-motion
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
    } catch {
      // Ignore media query error
    }

    // Check sessionStorage
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return false;
      }
    } catch {
      // Storage access blocked or restricted
    }

    return true;
  });

  const [phase, setPhase] = useState<'playing' | 'done'>(() => {
    if (typeof window !== 'undefined') {
      const stage = new URLSearchParams(window.location.search).get('intro_stage');
      if (stage === 'homepage') return 'done';
    }
    return shouldDisplay ? 'playing' : 'done';
  });

  const startTimeRef = useRef<number>(0);

  // Select active image source (supports deterministic frame audit via ?intro_frame=0|48|72)
  const activeImageSrc = (() => {
    if (typeof window !== 'undefined') {
      const frameParam = new URLSearchParams(window.location.search).get('intro_frame');
      if (frameParam === '0') return frame0Png;
      if (frameParam === '48') return frame48Png;
      if (frameParam === '72') return frame72Png;
    }
    return logoDissolvePng;
  })();

  const handleFinish = () => {
    console.log('[Intro] Animation completed at', Date.now());
    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    document.body.style.overflow = '';
    setPhase('done');
    console.log('[Intro] Homepage revealed at', Date.now());
    onComplete?.();
  };

  useEffect(() => {
    if (!shouldDisplay || phase === 'done') {
      onComplete?.();
      return;
    }

    // Deterministic frame testing pause
    if (window.location.search.includes('intro_frame=')) {
      return;
    }

    startTimeRef.current = Date.now();
    console.log('[Intro] Intro start at', startTimeRef.current);

    // Lock background scroll during playback
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Exact animation duration timer -> INSTANT REVEAL (0ms delay)
    const timer = setTimeout(() => {
      handleFinish();
    }, ANIMATION_EXACT_DURATION_MS);

    // Handle tab visibility changes safely
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const elapsed = Date.now() - startTimeRef.current;
        if (elapsed >= ANIMATION_EXACT_DURATION_MS) {
          handleFinish();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timer);
    };
  }, [shouldDisplay, phase]);

  // If intro has already played or finished, completely unmount from DOM
  if (!shouldDisplay || phase === 'done') {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="United Impex opening animation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white select-none pointer-events-auto"
    >
      <div className="relative flex items-center justify-center w-full h-full p-4 pointer-events-none">
        {/* Transparent Dissolve Animation Container */}
        <div className="relative flex items-center justify-center max-w-[85vw] sm:max-w-md max-h-[75vh]">
          <img
            src={activeImageSrc}
            alt="United Impex Logo Dissolve Animation"
            className="w-auto h-auto max-h-[70vh] max-w-full object-contain pointer-events-none select-none bg-transparent"
            onLoad={() => console.log('[Intro] Media loaded at', Date.now())}
            onError={handleFinish} // Safe fallback if asset fails to load
          />
        </div>
      </div>
    </div>
  );
};

export default LogoIntroOverlay;
