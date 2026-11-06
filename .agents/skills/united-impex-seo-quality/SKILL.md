---
name: united-impex-seo-quality
description: Comprehensive Technical SEO, Core Web Vitals performance, WCAG 2.1 AA accessibility, and content quality assurance skill for United Impex. Enforces official Google Search Central, web.dev, and W3C standards without fabricated claims.
license: Proprietary - United Impex
---

# United Impex — SEO, Performance, Accessibility & Quality Assurance Skill

This skill governs all Technical SEO, on-page content strategy, Core Web Vitals performance engineering, and WCAG accessibility compliance for the United Impex multi-page custom packaging and printing website.

---

## 1. Official Standards & Authoritative References

All guidelines in this skill derive directly from official documentation:

* **Google Search Central:**
  * [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
  * [Google JavaScript SEO Basics & Prerendering](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
  * [Google Ecommerce SEO Best Practices](https://developers.google.com/search/docs/specialty/ecommerce)
  * [Google Structured Data General Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
* **Web Performance (web.dev):**
  * [Core Web Vitals Guide (LCP, INP, CLS)](https://web.dev/explore/learn-core-web-vitals)
  * [Optimize Largest Contentful Paint (LCP)](https://web.dev/articles/optimize-lcp)
  * [Optimize Cumulative Layout Shift (CLS)](https://web.dev/articles/optimize-cls)
  * [Optimize Interaction to Next Paint (INP)](https://web.dev/articles/optimize-inp)
* **Accessibility Standards:**
  * [W3C Web Content Accessibility Guidelines (WCAG 2.1 AA)](https://www.w3.org/WAI/WCAG21/quickref/)
  * [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)

> [!IMPORTANT]
> **Zero-Fabrication Policy:** Never invent customer reviews, rating aggregations, bogus certifications, fake delivery timelines, or imaginary pricing in metadata, content, or structured data. Search engines penalize fabricated schema via manual actions.

---

## 2. Technical SEO Architecture (React / Vite)

### Crawlability & Prerendering
1. **Rendering Strategy:** Standard Single Page Applications (SPAs) that render exclusively via client-side JavaScript face crawl budget delays in Google's render queue and fail with crawlers that do not execute JavaScript (e.g. social media crawlers, WhatsApp preview bots).
2. **Static Prerendering:** For production, all public routes (`/`, `/products/*`, `/about`, `/contact`, `/quote`) must be statically prerendered or export static HTML with complete `<head>` metadata, primary headings, semantic text, and image markup pre-baked.
3. **Canonical Tags:** Every route must declare a self-referential canonical URL:
   ```html
   <link rel="canonical" href="https://unitedimpex.com/products/coffee-cups" />
   ```
4. **Metadata Standards:**
   * **Title Tag:** 50–60 characters, brand-appended (`[Page/Product Keyword] — United Impex`).
   * **Meta Description:** 140–160 characters, conversion-oriented without keyword stuffing.
   * **Open Graph / Twitter Cards:** Include `og:title`, `og:description`, `og:image`, `og:url`, `og:type="website"`, `twitter:card="summary_large_image"`.
5. **Crawl Directives:**
   * `robots.txt` must clearly permit crawling of public assets and reference the XML sitemap:
     ```text
     User-agent: *
     Allow: /
     Sitemap: https://unitedimpex.com/sitemap.xml
     ```
   * `sitemap.xml` listing all canonical page routes with accurate `<lastmod>` timestamps.

---

## 3. Semantic Document Hierarchy & On-Page Structure

Every page must strictly follow semantic HTML5 structure:
* **Single `<h1>` Rule:** Exactly one clear, keyword-aligned `<h1>` per page (e.g., `Custom Disposable Coffee Cups in Karachi & Multan — United Impex`).
* **Logical Heading Cascade:** Subsections must cascade logically (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3`). Never skip heading levels for styling purposes.
* **Semantic Landmark Elements:** Wrap layout regions in `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
* **Descriptive Image Alt Text:** Every product image must feature an informative, factual `alt` attribute describing the product and material (e.g., `alt="Double-wall kraft paper coffee cup with matte surface by United Impex"`). Decorative background elements must have `alt=""` and `aria-hidden="true"`.
* **Descriptive Anchor Links:** Never use generic labels like "Click Here" or "Read More". Use meaningful anchor text: `"Request a Quote for Custom Paper Bags"` or `"View Coffee Cup Sizes"`.

---

## 4. Structured Data (JSON-LD) Implementation

Embed valid, non-fabricated `schema.org` markup using `<script type="application/ld+json">`:

### A. Organization & LocalBusiness Schema (Site-wide / Contact Page)
Accurately reflect United Impex's presence in Pakistan:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "United Impex",
  "legalName": "United Impex Packaging & Printing",
  "url": "https://unitedimpex.com",
  "logo": "https://unitedimpex.com/logo.svg",
  "description": "Custom packaging and commercial printing solutions based in Karachi and Multan, Pakistan.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "addressCountry": "PK"
  },
  "areaServed": ["Karachi", "Multan", "Pakistan"],
  "priceRange": "$$"
}
```

### B. Product Schema (Category & Detail Pages)
* Use `@type: "Product"` for verified product offerings (Disposable Cups, Packaging Boxes, Paper Bags, Diaries).
* **Strict Rule on Offers:** Because United Impex operates on a custom quote basis, do NOT invent a fixed `price`. Instead, link to the quote inquiry URL or omit the price field.
* **Strict Rule on Ratings:** Do NOT include `aggregateRating` until genuine, third-party verified customer reviews are gathered.

---

## 5. Content SEO & Search Intent Mapping

Structure content around authentic B2B search intent across primary routes:

| Route / Page | Primary Search Intent | Target Factual Keywords (No Stuffing) | Core Content Focus |
| :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | Brand authority & custom packaging overview | Custom packaging Karachi, commercial printing Pakistan, United Impex | Comprehensive overview, 4 categories, scroll cup animation, quote CTA |
| **`/products/coffee-cups`** | Disposable & ripple cup manufacturing | Custom disposable coffee cups Karachi, branded paper cups Pakistan | Single/double wall specs, food-grade paperboard, custom printing |
| **`/products/packaging-boxes`** | Custom product & mailer box production | Custom packaging boxes Karachi, corrugated mailers Pakistan, rigid boxes | Box structural styles (mailer, tuck-end), paper grades, dieline options |
| **`/products/paper-bags`** | Kraft & shopping bag printing | Custom paper bags Karachi, branded kraft bags Pakistan | Twisted handle, flat bottom, eco-kraft paper specs, custom dimensions |
| **`/products/diaries-notebooks`** | Corporate stationery & executive diaries | Custom corporate diaries Karachi, branded notebooks Pakistan | Hardcover, embossed logos, custom inner ruling, executive gifting |
| **`/about`** | Company background & credibility | United Impex packaging facility, printing manufacturer Karachi | Karachi heritage, craftsmanship, facility values, CEO Areeb statement |
| **`/contact`** | Direct communication & office locations | United Impex contact, packaging factory Karachi, Multan office | Phone, WhatsApp direct link, factory location, contact inquiry form |
| **`/quote`** | High-intent B2B quote inquiry | Request packaging quote, custom box price inquiry Karachi | Interactive multi-step specification selector leading to WhatsApp/Email |

---

## 6. Performance Standards & Core Web Vitals (web.dev)

Target these measurable thresholds:

* **Largest Contentful Paint (LCP) $\le$ 2.5s:**
  * Preload critical hero assets (`<link rel="preload" as="image" href="..." fetchpriority="high" />`).
  * Modern WebP/AVIF formats with responsive `<picture>` or `srcset` attributes.
  * Use CSS `font-display: swap` for web fonts to eliminate render-blocking text flashes.
* **Cumulative Layout Shift (CLS) $\le$ 0.1:**
  * Always provide explicit `width` and `height` (or aspect-ratio) on all `<img>` and video elements.
  * Reserve space for dynamic elements (e.g. quote drawer, marquee) to prevent content jumps.
  * Keep the scroll-driven coffee cup in a fixed/sticky container that does not push adjacent document flow.
* **Interaction to Next Paint (INP) $\le$ 200ms:**
  * Break up long JavaScript tasks. Keep event handlers lean.
  * Debounce scroll and resize listeners when driving GSAP or CSS calculations.
* **Animation & Compositing:**
  * Only animate `transform` (`x`, `y`, `scale`) and `opacity`. Never animate `top`, `left`, `width`, or `margin`.
  * Ensure GSAP ScrollTrigger utilizes passive event listeners and avoids layout thrashing.

---

## 7. Accessibility Engineering (WCAG 2.1 AA)

1. **Color Contrast:**
   * Text vs Background: Minimum $4.5:1$ for normal body text, $3:1$ for large display headings.
   * Magenta accent (`#D92662` or darker) must pass $4.5:1$ contrast against pure white `#FFFFFF` for readable text.
2. **Keyboard Navigation:**
   * Full keyboard accessibility (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
   * Never remove browser focus outlines without providing an equivalent high-visibility custom indicator (`focus-visible:ring-2 focus-visible:ring-[#D92662] focus-visible:outline-none`).
3. **Accessible Dialogs & Modals (APG Compliant):**
   * Modals (Product details, Before/After viewer, Quote drawer) must trap keyboard focus while open.
   * Pressing `Escape` must close the active modal and return focus to the triggering element.
   * Must include `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
4. **Accessible Forms (Quote / Contact):**
   * Every input, select, and textarea must possess an explicitly associated `<label>` or `aria-label`.
   * Form validation errors must be announced with `aria-live="polite"` and linked via `aria-describedby`.
5. **Reduced Motion:**
   * Respect user system preferences via CSS and GSAP:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, ::before, ::after {
         animation-duration: 0.01ms !important;
         transition-duration: 0.01ms !important;
       }
     }
     ```
   * For the scroll-controlled cup animation, provide a clean, static, non-disorienting fallback when reduced motion is requested.
6. **Touch Targets:**
   * All clickable buttons, pills, and navigation links must meet minimum touch target dimensions of at least $44 \times 44\text{px}$ on mobile viewports.

---

## 8. Mandatory 10-Step Quality Verification Workflow

For **EVERY** section and page implementation, execute this verification loop before requesting user approval:

1. **User Intent & Goal:** Verify the functional requirement and conversion intent.
2. **Reference Cross-Check:** Coordinate with `united-impex-reference-design` to match visual screenshots.
3. **SEO Requirements:** Validate semantic tag choice, heading hierarchy, and meta descriptors.
4. **Accessibility Check:** Verify contrast, keyboard accessibility, focus rings, and screen-reader labels.
5. **Performance Audit:** Verify image dimensions, lazy loading attributes, and transform-only animations.
6. **Code Cleanliness:** Ensure zero console errors, zero memory leaks, and proper cleanup.
7. **Responsive Testing:** Verify rendering on Mobile (375px), Tablet (768px), and Desktop (1440px).
8. **Anti-Fabrication Check:** Confirm no invented claims, ratings, or misleading business details exist.
9. **Defect Report & Self-Correction:** Document any identified issues and resolve them.
10. **Present for Approval:** Submit the finished section for user review.
