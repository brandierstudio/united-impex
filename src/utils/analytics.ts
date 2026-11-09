/**
 * United Impex Production Analytics Utility
 * Supports Google Analytics 4 (GA4) with zero tracking errors when unconfigured.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || '';

/**
 * Initialize Google Analytics script asynchronously if measurement ID is present.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID) {
    // Graceful fallback: analytics measurement ID not configured
    return;
  }

  // Prevent duplicate script injection
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false // Managed manually via route change hooks
  });
}

/**
 * Track route / page view changes.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href
  });
}

/**
 * Track WhatsApp business inquiry click.
 */
export function trackWhatsAppInquiry(source: string, details?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'contact_whatsapp', {
    event_category: 'Conversion',
    event_label: source,
    inquiry_details: details || 'general'
  });
}

/**
 * Track adding a product to cart.
 */
export function trackAddToCart(productId: string, productName: string, quantity: number, pricePKR?: number): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'add_to_cart', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        quantity: quantity,
        price: pricePKR
      }
    ]
  });
}

/**
 * Track quote wizard milestone completions.
 */
export function trackQuoteStep(stepNumber: number, category: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'quote_wizard_step', {
    step: stepNumber,
    category: category
  });
}

/**
 * Track opening 3D/Interactive Customizer.
 */
export function trackCustomizerOpen(category: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'open_customizer', {
    category: category
  });
}
