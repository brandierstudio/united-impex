import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal Hook
 * 
 * Provides coordinated, luxury-tier scroll entrance animations across sections:
 * - .reveal-heading: Smooth upward drift (y: 20 -> 0, opacity: 0 -> 1, duration: 0.7s)
 * - .reveal-subheading: Follows heading with slight delay (y: 12 -> 0, opacity: 0 -> 1, delay: 0.1s)
 * - .reveal-card: Staggered entrance for product cards & feature blocks (y: 18 -> 0, opacity: 0 -> 1, stagger: 0.08s)
 * - .reveal-media: Subtle scale settle for imagery & comparison views (scale: 1.025 -> 1.0, opacity: 0 -> 1)
 * 
 * Accessibility:
 * - Checks `prefers-reduced-motion`. If true, elements are displayed at 100% opacity with zero translation.
 * - Cleans up ScrollTrigger instances with `gsap.context()`.
 */
export function useScrollReveal(dependencies: React.DependencyList = []) {
  useEffect(() => {
    // Accessibility check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Force all reveal elements visible immediately
      document.querySelectorAll('.reveal-heading, .reveal-subheading, .reveal-card, .reveal-media').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Section Headings
      gsap.utils.toArray<HTMLElement>('.reveal-heading').forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // 2. Subheadings & Supporting Paragraphs
      gsap.utils.toArray<HTMLElement>('.reveal-subheading').forEach((subheading) => {
        gsap.fromTo(
          subheading,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: subheading,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // 3. Staggered Card Groups (.reveal-stagger-group > .reveal-card)
      gsap.utils.toArray<HTMLElement>('.reveal-stagger-group').forEach((group) => {
        const cards = group.querySelectorAll<HTMLElement>('.reveal-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      });

      // Standalone Cards not inside a group
      gsap.utils.toArray<HTMLElement>('.reveal-card:not(.reveal-stagger-group .reveal-card)').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // 4. Large Media & Comparison Imagery
      gsap.utils.toArray<HTMLElement>('.reveal-media').forEach((media) => {
        gsap.fromTo(
          media,
          { opacity: 0, scale: 1.025 },
          {
            opacity: 1,
            scale: 1.0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: media,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    });

    // Refresh after DOM layout completes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
