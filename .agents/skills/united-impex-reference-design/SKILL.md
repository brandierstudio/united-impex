---
name: united-impex-reference-design
description: Project-specific design planning, visual reference analysis, and quality assurance skill for United Impex. Enforces a strict reference-first workflow, pure white minimalist packaging ecommerce aesthetics, restrained liquid glass navigation, single scroll-controlled cup animation, and a comprehensive 10-point visual QA checklist.
license: Proprietary - United Impex
---

# United Impex — Reference-Driven Design & Quality Assurance Skill

This skill governs all design planning, visual reference inspection, UI architecture, and quality assurance for the United Impex custom packaging and commercial printing website.

## 1. Core Design Philosophy: Reference-First

Never jump directly from a section title or prompt to code generation. Every layout, UI component, spacing decision, and interactive state must be directly anchored in approved visual references.

### Mandatory 10-Step Section Workflow

For **EVERY** website section, follow this sequential protocol:

- **STEP A — Purpose & Conversion Goal:** Identify the section's exact functional role and conversion objective (e.g., product discovery, credibility, instant quote intake).
- **STEP B — Locate User References:** Inspect relevant user-provided screenshots located in `new wbsite assests/website refrences/`.
- **STEP C — External Design Research:** When existing screenshots need supplementation, research premier packaging and luxury ecommerce websites (PakFactory, Packhelp, Arka, Awwwards, Behance, Dribbble).
- **STEP D — Comparative Pattern Analysis:** Compare reference options and isolate the strongest, most cohesive visual patterns suitable for United Impex.
- **STEP E — Section Visual Specification:** Author a granular design blueprint detailing:
  - Exact layout, grid, and alignment
  - Typography hierarchy (font size, weight, line-height, letter-spacing)
  - Color palette (hex codes for backgrounds, borders, text, accents)
  - Interactive states (hover, focus, active, transition timings)
- **STEP F — Asset Mapping:** Specify the exact image/SVG asset paths from the project folder.
- **STEP G — Responsive Behavior:** Detail explicit breakpoint treatments (Mobile < 640px, Tablet < 1024px, Desktop >= 1024px).
- **STEP H — Present & Await Approval:** Present the specification to the user and **STOP**. Do not write code without explicit user sign-off.
- **STEP I — Precision Implementation:** Implement only the approved section cleanly using React, Tailwind CSS, and approved Agent Skills.
- **STEP J — Visual & Functional Verification:** Compare the rendered output against approved screenshots. Verify responsiveness, spacing, and interaction states.

---

## 2. Curated Reference Inventory & Extracted Design Patterns

All section implementations must reference these verified design patterns extracted from `new wbsite assests/website refrences/`:

### A. Premium White Ecommerce Layouts (`premium white ecommerce design/`)
* **Reference Assets:** `d0cdcd72805cddca0f87c26e4d7b53e1.jpg`, `e2b479107c6ee529687665a68e7ee1c5.jpg`
* **Visual Characteristics:**
  * Background: Pure white `#FFFFFF` paired with soft off-white card fills (`#F9FAFB` to `#F4F4F5`).
  * Layout: Expansive breathing room, 80px–120px desktop section padding, asymmetrical balance.
  * Typography: High-contrast editorial display serif/sans headlines with understated sans-serif body copy.
  * Product Treatment: Studio packaging photography isolated with natural, ultra-soft ground contact shadows.

### B. Restrained Liquid Glass Navigation (`liquid glass naviagation/`)
* **Reference Assets:** `832e7ce5778234b8961af87e6a962aaa.jpg`, `b122cfe04a763ee1bb30edf7521ef3ba.jpg`
* **Visual Characteristics:**
  * Floating island / pill geometry (`rounded-full` or `rounded-2xl`).
  * Translucent glass styling: `background: rgba(255, 255, 255, 0.75)`, `backdrop-filter: blur(16px) saturate(180%)`.
  * Subtle 1px boundary: `border: 1px solid rgba(255, 255, 255, 0.4)` with faint perimeter drop shadow (`rgba(0, 0, 0, 0.05)`).
  * Navigation Links: Clean typographic links with subtle color shift to brand magenta on hover.

### C. Continuous Horizontal Product-Photo Marquee (`horizontal animated product banners/`)
* **Reference Assets:** `b23f8853b5969944ae709a7bb99d5b6c.jpg`, `15305d19a628b519a739e256cae219cb.jpg`
* **Visual Characteristics:**
  * Seamless horizontal infinite scroll displaying real packaging photos (cups, boxes, bags, diaries).
  * High-aspect ratio strip format, linear infinite CSS animation (hover-to-pause).
  * Edge masking: Subtle linear gradient feathering on left and right edges (`from-white to-transparent`).

### D. Product Customization & Spec Drawers (`product customization popup/`)
* **Reference Assets:** `045eb1710ecd1c6ad6cfb9de620dc670.jpg`, `22b6b075d27f46abd9d99dc9f40e46c7.jpg`, `4f05e87af0186f042b0da136b57cbeaf.jpg`, `5cda143e79b46e8f64417a6c9f3d3a28.jpg`, `dcccb4f6a9a9e7663dcbc5ac89016cc2.jpg`
* **Visual Characteristics:**
  * Split modal layout: High-res interactive product preview on one side, modular configurator on the other.
  * Pill selectors for material finishes (Kraft, White SBS, Matte Lamination, Gloss UV).
  * Dimension input grids and quantity break badges.
  * Drag-and-drop artwork upload area with clear file format hints (AI, PDF, EPS).
  * Direct "Request Custom Quote" primary action.

### E. Print Quality & Precision Demonstration (`before-after comparizon popup/`)
* **Reference Assets:** `06f704a805fa4d903599f700d241c38a.jpg`
* **Visual Characteristics:**
  * Interactive vertical split-line slider comparing standard vs high-precision print registration / finishes.
  * Clean drag handle with intuitive left/right indicator arrows.
  * Minimalist labeling: "Standard Digital" vs "United Impex Precision Offset".

### F. Customer Reviews & Inquiries Grid (`customer reviews/`)
* **Reference Assets:** `7830f296275d983d2efbc5a2c5b6ded5.jpg`, `868246be5c0703b78364ed3658c10a5a.jpg`, `8f6e3ed0aac3df5ca508ea54a1ad5f39.jpg`, `9e0e2a8be395cbebe80fe4296dcb4a0e.jpg`, `a4272fd7d588a317b6eb0134942e2cfb.jpg`
* **Visual Characteristics:**
  * Clean, multi-column card grid with generous internal card padding (24px–32px).
  * Star rating indicators, verified buyer typography, date/location tags.
  * Note: Use structural layouts only; **never invent fake customer reviews or testimonials**.

### G. Vertical Video Testimonial Cards (`vertical vidoe testemonials/`)
* **Reference Assets:** `f002ba4415e4c0518062fb4be87e04c1.jpg`
* **Visual Characteristics:**
  * 9:16 mobile-friendly portrait card ratio.
  * Soft rounded corners (`rounded-2xl`), frosted glass play button badge, client brand tag overlay.

---

## 3. External Research Guidelines

When a section requires external reference benchmarking:
1. Search industry leaders: **PakFactory**, **Packhelp**, **Arka**, or design directories like **Awwwards**, **Behance**, and **Dribbble**.
2. Prefer real, production packaging websites over purely theoretical dribbble concepts to ensure UX viability.
3. Record exact reference URLs, explain specific patterns identified, and adapt them to United Impex without copying copyrighted artwork.

---

## 4. Missing Reference Protocol

If existing reference screenshots do not sufficiently cover a proposed section:
1. **Do not improvise a generic AI layout.**
2. Pause and formulate an explicit reference request for the user specifying:
   - Recommended Pinterest/Google search query terms (e.g., `"luxury packaging packaging quote builder ui desktop"`, `"minimalist b2b product card whitespace"`).
   - Expected component layout (Desktop or Mobile).
   - Key visual traits needed (e.g., selector pills, pricing tier layout, tabbed specs).

---

## 5. Strict United Impex Design Constraints

- **Primary Background:** `#FFFFFF` (Pure White). No dark mode switches, no grey backgrounds.
- **Typography:** Editorial typography (Outfit / Cormorant Garamond display pairing with clean sans-serif body). Strict hierarchy, line lengths < 80 characters.
- **Accents:** Restrained brand magenta/pink (`#D92662` / `#C026D3`) applied strictly to primary CTAs, active indicators, and focus rings. Deep charcoal body text (`#18181B`).
- **Motion Rule:** The scroll-driven coffee cup (`removable bg cup.png` $\rightarrow$ `table scence.jpg`) is the **ONLY major animation**. All other animations must be subtle micro-interactions (opacity fades, button hovers, marquee translation).
- **Integrity Rule:** Zero fabricated customer testimonials, zero fake statistics, zero unverified client partner logos.

---

## 6. 10-Point Visual Quality Assurance Checklist

Before any section is submitted for user review, it must pass this 10-point audit:

1. **Reference Fidelity:** Does the visual output reflect the approved screenshot patterns?
2. **Visual Hierarchy:** Does the eye naturally move from primary headline to supporting content to CTA?
3. **Alignment & Spacing:** Is vertical and horizontal rhythm mathematically consistent (4px/8px grid system)?
4. **Typography Quality:** Are font sizes, weights, and line heights legible, elegant, and non-cluttered?
5. **Image Quality & Proportions:** Are product images un-distorted with natural aspect ratios and proper object-fit?
6. **Branding Consistency:** Does the section adhere to pure white, charcoal, and restrained magenta accents?
7. **Responsive Adaptability:** Does the section gracefully scale across mobile (375px), tablet (768px), and desktop (1280px+)?
8. **Interactive States:** Do buttons, links, inputs, and modals have clear hover, focus, and active states?
9. **Accessibility (a11y):** Are contrast ratios compliant (WCAG AA)? Are focus rings visible and semantic elements used?
10. **Performance:** Are transforms GPU-composited (`x, y, opacity`), avoiding layout thrashing?
