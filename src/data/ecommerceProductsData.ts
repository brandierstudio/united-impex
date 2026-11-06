/**
 * United Impex Ecommerce Catalog & Centralized Pricing Dataset
 * 
 * Strict Anti-Fabrication Law:
 * - Pricing is in Pakistani Rupees (PKR / Rs.)
 * - All numerical price values are DEMO / illustrative baseline estimates
 * - Disclaimers explicitly state pricing depends on custom specifications, quantity, paperboard grades, and finishing
 * - Zero unverified certification claims (no unverified FSC/ISO claims; neutral commercial print descriptions used)
 */

// Image Assets Imports
import cupPrimaryJpg from '../assets/products/cups/Product_photograph_for_United_Impex_00ad6975.jpg';
import cupLifestyleJpg from '../assets/products/cups/Cup_commercial_photography_143d208e.jpg';
import cupMacroJpg from '../assets/products/cups/Macro_product_photography_printi_66788af5.jpg';
import cupIsolatedPng from '../assets/animation/cup.png';
import cupBlankWebp from '../assets/customizer/blank-cup.webp';

import boxPrimaryJpg from '../assets/products/boxes/Product_commercial_photography_s_470ccf75.jpg';
import boxLifestyleJpg from '../assets/products/boxes/Commercial_product_photography_o_87838bb6.jpg';
import boxMacroJpg from '../assets/products/boxes/Commercial_product_photography_s_9f12d32b.jpg';
import boxComparisonWebp from '../assets/comparison/comparison-after-box.webp';
import boxBlankWebp from '../assets/customizer/blank-box.webp';

import bagPrimaryJpg from '../assets/products/bags/Product_photography_in_studio_5e308475.jpg';
import bagLifestyleJpg from '../assets/products/bags/Commercial_product_photography_o_e3a0b08e.jpg';
import bagMacroJpg from '../assets/products/bags/Macro_commercial_product_photogr_49f30bd6.jpg';
import bagBlankWebp from '../assets/customizer/blank-bag.webp';

import diaryPrimaryJpg from '../assets/products/diaries/Product_photograph_in_studio_81f03e4a.jpg';
import diaryLifestyleJpg from '../assets/products/diaries/Commercial_product_photography_c_39f3489c.jpg';
import diaryMacroJpg from '../assets/products/diaries/Commercial_packaging_product_pho_109b4e91.jpg';
import diaryBlankWebp from '../assets/customizer/blank-diary.webp';

import marqueeBox1Webp from '../assets/marquee/marquee-box-1.webp';
import marqueeBox2Webp from '../assets/marquee/marquee-box-2.webp';
import marqueeCup1Webp from '../assets/marquee/marquee-cup-1.webp';
import marqueeCup2Webp from '../assets/marquee/marquee-cup-2.webp';

export type ProductCategory = 'cups' | 'boxes' | 'bags' | 'diaries';

export interface ProductVariation {
  id: string;
  name: string;
  priceModifier: number; // multiplier against starting price
  specNote?: string;
}

export interface ProductAccordionItem {
  title: string;
  content: string;
}

export interface EcommerceProduct {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  subhead: string;
  description: string;
  primaryImage: string;
  lifestyleImage: string;
  gallery: Array<{
    src: string;
    label: string;
    alt: string;
  }>;
  startingPricePKR: number; // Demo price in PKR
  priceUnit: string;        // 'cup' | 'box' | 'bag' | 'piece'
  isDemoPrice: true;
  minOrderQuantity: number;
  leadTime: string;
  material: string;
  finish: string;
  dimensions: string;
  variations: ProductVariation[];
  features: string[];
  specs: {
    boardGrade: string;
    printingMethod: string;
    finishingOptions: string;
    coating: string;
    ecoProfile: string;
  };
  accordions: ProductAccordionItem[];
  customizerCategory: 'cups' | 'boxes' | 'bags' | 'diaries';
}

export const ECOMMERCE_PRODUCTS: EcommerceProduct[] = [
  // 1. Custom Printed Coffee Cups
  {
    id: 'prod-coffee-cups',
    slug: 'coffee-cups',
    title: 'Custom Printed Coffee Cups',
    category: 'cups',
    categoryLabel: 'Drinkware & Disposables',
    subhead: 'Single & Double Wall Insulated Beverage Cups',
    description: 'Precision-formed food-grade paperboard drinkware with leak-proof rim geometry and high-density commercial offset color calibration.',
    primaryImage: cupPrimaryJpg,
    lifestyleImage: cupLifestyleJpg,
    gallery: [
      { src: cupPrimaryJpg, label: 'Studio Front Angle', alt: 'Custom printed paper coffee cup studio photography' },
      { src: cupLifestyleJpg, label: 'Lifestyle In-Hand', alt: 'Branded coffee cup held in barista cafe environment' },
      { src: cupMacroJpg, label: 'Macro Seam Detail', alt: 'Macro detail of cup rim and seamless edge bonding' },
      { src: marqueeCup1Webp, label: 'Dual Cup Presentation', alt: 'Two customized coffee cups side by side' },
      { src: cupIsolatedPng, label: 'Isolated Vector Model', alt: 'Clean white background isolated coffee cup' },
      { src: cupBlankWebp, label: 'Customizer Blank', alt: 'Blank model ready for logo application' }
    ],
    startingPricePKR: 7.50,
    priceUnit: 'cup',
    isDemoPrice: true,
    minOrderQuantity: 1000,
    leadTime: '4 – 7 business days',
    material: 'Virgin Food-Grade Paperboard',
    finish: 'Offset Lithography & Matte Varnish',
    dimensions: '4 oz, 8 oz, 12 oz, 16 oz standard',
    variations: [
      { id: '8oz-single', name: '8 oz (240ml) — Single Wall', priceModifier: 1.0, specNote: 'Compact espresso and flat white format' },
      { id: '12oz-single', name: '12 oz (350ml) — Single Wall', priceModifier: 1.15, specNote: 'Standard takeaway cafe size' },
      { id: '12oz-double', name: '12 oz (350ml) — Double Wall Insulated', priceModifier: 1.35, specNote: 'Enhanced heat barrier without separate sleeve' },
      { id: '16oz-double', name: '16 oz (480ml) — Double Wall Insulated', priceModifier: 1.55, specNote: 'Large hot or iced beverage capacity' }
    ],
    features: [
      'Commercial-grade virgin paperboard with poly-coating',
      'Engineered leak-resistant bottom seam indentation',
      'High-fidelity 4-color CMYK offset print calibration',
      'Snug-fit lid snap curl rim preventing beverage spills'
    ],
    specs: {
      boardGrade: '280 – 350 GSM Virgin Paperboard',
      printingMethod: 'High-Density Offset Lithography (Food-Safe Inks)',
      finishingOptions: 'Matte Varnish, Gloss UV, Blind Embossing',
      coating: 'Single PE / Double PE Moisture Barrier',
      ecoProfile: 'Recyclable Commercial Paperboard'
    },
    accordions: [
      {
        title: 'Product Details & Build Quality',
        content: 'Crafted from virgin cupstock board engineered specifically for hot and cold liquids. The curled lip provides structural rigidity and ensures positive lid retention under transport.'
      },
      {
        title: 'Materials, Seams & Heat Retention',
        content: 'Double-wall configurations include a trapped air pocket between inner and outer paper layers, keeping beverages warm while allowing comfortable hand-holding without burn risk.'
      },
      {
        title: 'Printing Fidelity & Color Consistency',
        content: 'Offset press calibration guarantees accurate CMYK brand color reproduction across volume runs from 1,000 to 100,000+ units.'
      },
      {
        title: 'Ordering, Dielines & Proofing',
        content: 'Vector dieline templates (PDF/AI) are supplied immediately upon quote request. Physical digital press proofs can be dispatched prior to production runs.'
      }
    ],
    customizerCategory: 'cups'
  },

  // 2. Custom Packaging Boxes
  {
    id: 'prod-custom-boxes',
    slug: 'boxes',
    title: 'Custom Packaging Boxes',
    category: 'boxes',
    categoryLabel: 'Cartons & Folding Boxes',
    subhead: 'Retail Cartons, Product Boxes & Tuck-End Packaging',
    description: 'Custom dieline folding cartons engineered for retail product presentation, cosmetic jars, bakery goods, and promotional packaging.',
    primaryImage: boxPrimaryJpg,
    lifestyleImage: boxLifestyleJpg,
    gallery: [
      { src: boxPrimaryJpg, label: 'Studio Front Angle', alt: 'Custom printed folding carton box in studio lighting' },
      { src: boxLifestyleJpg, label: 'Retail Context', alt: 'Finished custom packaging boxes in retail display' },
      { src: boxMacroJpg, label: 'Crease & Fold Detail', alt: 'Precision die-cut crease and tuck flap detail' },
      { src: boxComparisonWebp, label: 'Lidded Carton View', alt: 'Premium offset printed lidded presentation box' },
      { src: boxBlankWebp, label: 'Customizer Blank', alt: 'Clean white folding box model ready for custom dieline' }
    ],
    startingPricePKR: 24.00,
    priceUnit: 'box',
    isDemoPrice: true,
    minOrderQuantity: 500,
    leadTime: '5 – 8 business days',
    material: 'SBS / Bleached Kraft Paperboard',
    finish: 'Matte Lamination, Spot UV & Foil',
    dimensions: 'Custom bespoke dieline dimensions',
    variations: [
      { id: 'box-sm', name: 'Small Retail Box (4 × 4 × 2 in)', priceModifier: 1.0, specNote: 'Ideal for cosmetics and artisanal jars' },
      { id: 'box-md', name: 'Medium Retail Box (6 × 6 × 3 in)', priceModifier: 1.35, specNote: 'Standard retail goods and bakery items' },
      { id: 'box-lg', name: 'Large Product Box (9 × 6 × 4 in)', priceModifier: 1.75, specNote: 'Apparel accessories and electronics' }
    ],
    features: [
      'Crisp die-cut score lines for clean 90-degree corners',
      'Durable SBS board resists scuffing and crushing',
      'Tuck-end and auto-lock bottom closure choices',
      'Optional tactile Spot UV and metallic foil stamping'
    ],
    specs: {
      boardGrade: '300 – 450 GSM Solid Bleached Sulfate (SBS)',
      printingMethod: 'Heidelberg Speedmaster Multi-Color Offset',
      finishingOptions: 'Soft-Touch Matte, Gloss Lamination, Spot UV, Foil',
      coating: 'Anti-Scuff Protective Barrier',
      ecoProfile: 'Bio-degradable & Recyclable Fiber'
    },
    accordions: [
      {
        title: 'Box Geometry & Closure Styles',
        content: 'Available in Straight Tuck End (STE), Reverse Tuck End (RTE), Crash-Lock Auto Bottom, and Sleeve & Tray constructions.'
      },
      {
        title: 'Surface Embellishments',
        content: 'Enhance key logo marks with tactile raised Spot UV, metallic foil deboss in gold/silver/copper, or velvet soft-touch laminate.'
      },
      {
        title: 'Sample Turnaround & Delivery',
        content: 'Unprinted structural white mockups can be fabricated in 24–48 hours to test fit your physical product.'
      }
    ],
    customizerCategory: 'boxes'
  },

  // 3. Custom Paper Bags
  {
    id: 'prod-paper-bags',
    slug: 'paper-bags',
    title: 'Custom Paper Bags',
    category: 'bags',
    categoryLabel: 'Retail Carryware',
    subhead: 'Luxury Retail Totes & Heavy-Duty Kraft Bags',
    description: 'Reinforced boutique shopping bags and eco-friendly brown kraft totes featuring reinforced top turnover folds and sturdy handle options.',
    primaryImage: bagPrimaryJpg,
    lifestyleImage: bagLifestyleJpg,
    gallery: [
      { src: bagPrimaryJpg, label: 'Studio Front Angle', alt: 'Custom branded kraft shopping bag in studio' },
      { src: bagLifestyleJpg, label: 'Lifestyle Retail Carry', alt: 'Branded paper shopping bag with rope handles' },
      { src: bagMacroJpg, label: 'Handle & Fold Detail', alt: 'Reinforced paper handle attachment and gusset crease' },
      { src: bagBlankWebp, label: 'Customizer Blank', alt: 'Clean shopping bag model ready for artwork' }
    ],
    startingPricePKR: 18.00,
    priceUnit: 'bag',
    isDemoPrice: true,
    minOrderQuantity: 500,
    leadTime: '5 – 8 business days',
    material: 'Natural Kraft / White Art Paper',
    finish: 'Offset Lithography & Twisted Handles',
    dimensions: 'Small, Medium, Large & Wine sizes',
    variations: [
      { id: 'bag-kraft-sm', name: 'Small Kraft (8 × 4 × 10 in) — Twisted Handle', priceModifier: 1.0, specNote: 'Pharmacies, cafes, and jewelry' },
      { id: 'bag-kraft-md', name: 'Medium Kraft (10 × 5 × 13 in) — Twisted Handle', priceModifier: 1.3, specNote: 'Standard retail boutique carryware' },
      { id: 'bag-art-lg', name: 'Large White Art Paper (16 × 6 × 14 in) — Cotton Rope', priceModifier: 1.8, specNote: 'Luxury apparel and corporate gifts' }
    ],
    features: [
      'Heavy-duty paperboard bottom card insert for weight support',
      'Reinforced top turnover collar preventing handle tear-out',
      'Natural unbleached kraft or brilliant white art paper options',
      'Clean side-gusset expansion folding flat for storage'
    ],
    specs: {
      boardGrade: '120 – 250 GSM Kraft or Coated Art Paper',
      printingMethod: 'Full Color Sheet-Fed Offset Lithography',
      finishingOptions: 'Twisted Paper, Cotton Rope, Die-Cut Ribbon Handles',
      coating: 'Optional Matte Poly Lamination',
      ecoProfile: 'Natural Biodegradable Virgin Fiber'
    },
    accordions: [
      {
        title: 'Handle Configurations',
        content: 'Choose from twisted paper cords, soft braided cotton rope, grosgrain ribbon ties, or die-cut punch handles.'
      },
      {
        title: 'Load-Bearing Engineering',
        content: 'Reinforced with 350 GSM bottom cardboards and folded collar gussets, supporting up to 6–8 kg securely.'
      }
    ],
    customizerCategory: 'bags'
  },

  // 4. Corporate Diaries & Notebooks
  {
    id: 'prod-diaries',
    slug: 'diaries',
    title: 'Corporate Diaries & Notebooks',
    category: 'diaries',
    categoryLabel: 'Stationery & Executive Gifts',
    subhead: 'Hardbound Executive Planners & Bound Notebooks',
    description: 'Thread-sewn section bound corporate notebooks engineered to lay completely flat at 180°, complete with heat-debossed covers and satin ribbon markers.',
    primaryImage: diaryPrimaryJpg,
    lifestyleImage: diaryLifestyleJpg,
    gallery: [
      { src: diaryPrimaryJpg, label: 'Studio Front Angle', alt: 'Hardbound corporate diary on neutral studio surface' },
      { src: diaryLifestyleJpg, label: 'Executive Desk Scene', alt: 'Open planner with fountain pen on executive desk' },
      { src: diaryMacroJpg, label: 'Spine & Deboss Detail', alt: 'Close-up of spine binding and heat-debossed logo mark' },
      { src: diaryBlankWebp, label: 'Customizer Blank', alt: 'Clean notebook canvas ready for custom branding' }
    ],
    startingPricePKR: 149.00,
    priceUnit: 'piece',
    isDemoPrice: true,
    minOrderQuantity: 250,
    leadTime: '7 – 10 business days',
    material: 'Thermo-PU Leatherette & 80 GSM Cream Paper',
    finish: 'Heat Deboss, Gold Foil & Edge Gilding',
    dimensions: 'A5 (148 × 210 mm) Standard',
    variations: [
      { id: 'diary-a5-classic', name: 'A5 Hardcover — Classic Deboss (192 pgs)', priceModifier: 1.0, specNote: 'Standard executive conference journal' },
      { id: 'diary-a5-deluxe', name: 'A5 Deluxe — Foil Edge & Pen Loop (224 pgs)', priceModifier: 1.25, specNote: 'Gift box packed with satin ribbon' },
      { id: 'diary-b5-desk', name: 'B5 Desk Planner — Weekly Spread (240 pgs)', priceModifier: 1.45, specNote: 'Full desk management layout' }
    ],
    features: [
      'Thread-sewn section binding allows book to lay 180° flat',
      'Smooth 80 GSM cream paper resists fountain pen ink bleed',
      'Custom tip-in corporate history and leadership pages',
      'Color-matched elastic closure band and satin bookmark'
    ],
    specs: {
      boardGrade: '2.5mm Rigid Kappa Board + Thermo-PU',
      printingMethod: 'Cover Deboss / Interior Offset Ruling',
      finishingOptions: 'Foil Gilding, Rounded Corners, Elastic Band',
      coating: 'Water-Resistant PU Finish',
      ecoProfile: 'Acid-Free Archival Paper'
    },
    accordions: [
      {
        title: 'Binding Architecture',
        content: 'Section-sewn book blocks ensure individual signatures remain secure throughout years of daily use without loose pages.'
      },
      {
        title: 'Corporate Tip-In Insert Pages',
        content: 'Include 4 to 16 full-color printed company profile pages in the front with mission statements, team directories, and product portfolios.'
      }
    ],
    customizerCategory: 'diaries'
  },

  // 5. Corrugated Shipping Boxes
  {
    id: 'prod-shipping-boxes',
    slug: 'shipping-boxes',
    title: 'Corrugated Shipping Boxes',
    category: 'boxes',
    categoryLabel: 'E-Commerce & Transit',
    subhead: 'Fluted Cardboard Postal & Mailer Boxes',
    description: 'Heavy-duty corrugated cardboard cartons engineered to protect products during courier transit, postal delivery, and warehouse stacking.',
    primaryImage: marqueeBox1Webp,
    lifestyleImage: boxLifestyleJpg,
    gallery: [
      { src: marqueeBox1Webp, label: 'Mailer Box Studio', alt: 'Corrugated postal mailer box closed and secure' },
      { src: boxLifestyleJpg, label: 'Warehouse Dispatch', alt: 'Stacked shipping boxes prepared for dispatch' },
      { src: boxMacroJpg, label: 'Flute Structure Detail', alt: 'Close-up of corrugated B-flute board thickness' }
    ],
    startingPricePKR: 42.00,
    priceUnit: 'box',
    isDemoPrice: true,
    minOrderQuantity: 500,
    leadTime: '5 – 8 business days',
    material: 'Single / Double Wall B-Flute Corrugated',
    finish: 'Flexographic Ink & Die-Cut Tabs',
    dimensions: '10 × 7 × 3 in, 12 × 9 × 4 in, 14 × 10 × 5 in',
    variations: [
      { id: 'ship-mailer-md', name: 'Mailer Box (10 × 7 × 3 in) — B-Flute', priceModifier: 1.0, specNote: 'E-commerce subscription & clothing' },
      { id: 'ship-mailer-lg', name: 'Mailer Box (12 × 9 × 4 in) — B-Flute', priceModifier: 1.25, specNote: 'Shoe cartons and electronics' },
      { id: 'ship-rsc-xl', name: 'Heavy Shipper (16 × 12 × 10 in) — C-Flute', priceModifier: 1.6, specNote: 'Master bulk shipping carton' }
    ],
    features: [
      'Self-locking fold-over flaps require no tape for assembly',
      'High crush-test fluted core resists stacking deformation',
      'Crisp flexo branding prints company logos clearly on kraft or white',
      'Shipped completely flat for space-efficient storage'
    ],
    specs: {
      boardGrade: '150 – 200 GSM Kraft Liners with 120 GSM Fluting',
      printingMethod: 'Direct-to-Board Flexography / Litho-Lamination',
      finishingOptions: 'Kraft Brown, Bleached White, Internal Color Floods',
      coating: 'Water-Resistant Starch Adhesives',
      ecoProfile: '100% Recyclable Corrugated Board'
    },
    accordions: [
      {
        title: 'Crush Strength & Transit Standards',
        content: 'Manufactured with calibrated edge crush test ratings suitable for regional courier networks and pallet stacking.'
      }
    ],
    customizerCategory: 'boxes'
  },

  // 6. Rigid Gift Boxes
  {
    id: 'prod-rigid-boxes',
    slug: 'rigid-gift-boxes',
    title: 'Rigid Gift Boxes',
    category: 'boxes',
    categoryLabel: 'Luxury Presentation Packaging',
    subhead: 'Magnetic Clasp & Shoulder Presentation Boxes',
    description: 'Thick unbending chipboard core wrapped in artisan specialty paperboards, designed for luxury perfumes, corporate hampers, and ceremonial gifts.',
    primaryImage: boxComparisonWebp,
    lifestyleImage: marqueeBox2Webp,
    gallery: [
      { src: boxComparisonWebp, label: 'Lid & Base Studio', alt: 'Rigid luxury gift box with clean 90-degree edges' },
      { src: marqueeBox2Webp, label: 'Magnetic Clasp Format', alt: 'Premium rigid presentation box with magnetic flap' },
      { src: boxPrimaryJpg, label: 'Angle View', alt: 'Alternative view of rigid gift packaging' }
    ],
    startingPricePKR: 95.00,
    priceUnit: 'box',
    isDemoPrice: true,
    minOrderQuantity: 300,
    leadTime: '8 – 12 business days',
    material: '1200 – 1800 GSM Dense Greyboard',
    finish: 'Specialty Wrap Paper & Gold Foil',
    dimensions: 'Custom bespoke sizes',
    variations: [
      { id: 'rigid-lid-sm', name: 'Lid & Base Box (6 × 6 × 2.5 in)', priceModifier: 1.0, specNote: 'Jewelry, watches, and confections' },
      { id: 'rigid-magnetic-md', name: 'Book-Style Magnetic (9 × 7 × 3 in)', priceModifier: 1.45, specNote: 'Corporate welcome kits and perfume sets' },
      { id: 'rigid-hamper-lg', name: 'Hamper Chest (12 × 10 × 4.5 in)', priceModifier: 1.95, specNote: 'Festive executive corporate gift sets' }
    ],
    features: [
      'Indestructible solid chipboard frame that never collapses',
      'Concealed neodymium magnetic closures with audible click',
      'Precision wrapped paper exterior with zero air bubbles',
      'Custom die-cut EVA foam or velvet interior inserts'
    ],
    specs: {
      boardGrade: '1200 – 1800 GSM Greyboard + 157 GSM Coated Wrap',
      printingMethod: 'Multi-Color Offset with Anti-Scuff Soft Touch',
      finishingOptions: 'Hot Foil Deboss, Spot Gloss, Ribbon Pull Tab',
      coating: 'Scratch-Proof Matte Velvet Film',
      ecoProfile: 'Durable Keepsake Packaging'
    },
    accordions: [
      {
        title: 'Interior Foam & Velvet Fitments',
        content: 'Every rigid box can be fitted with custom laser-routed EVA foam, silk-lined card trays, or cardboard dividers shaped to your exact products.'
      }
    ],
    customizerCategory: 'boxes'
  },

  // 7. Custom Takeaway Boxes
  {
    id: 'prod-takeaway-boxes',
    slug: 'takeaway-boxes',
    title: 'Custom Takeaway Boxes',
    category: 'boxes',
    categoryLabel: 'Food Service Packaging',
    subhead: 'Grease-Resistant Clamshell & Meal Containers',
    description: 'Food-safe virgin paperboard takeaway containers engineered with grease barriers, steam vents, and locking tabs for restaurants and fast-casual eateries.',
    primaryImage: boxBlankWebp,
    lifestyleImage: boxLifestyleJpg,
    gallery: [
      { src: boxBlankWebp, label: 'Clamshell Studio', alt: 'Food-grade takeaway packaging box in studio' },
      { src: boxLifestyleJpg, label: 'Meal Service Context', alt: 'Custom branded restaurant food boxes' },
      { src: boxPrimaryJpg, label: 'Assembled Container', alt: 'Takeaway food box with locking tab closed' }
    ],
    startingPricePKR: 16.50,
    priceUnit: 'box',
    isDemoPrice: true,
    minOrderQuantity: 1000,
    leadTime: '5 – 7 business days',
    material: 'PE-Coated Virgin Food Board',
    finish: 'Water-Based Food-Safe Inks',
    dimensions: 'Burger, Lunch Box, Noodle Pail sizes',
    variations: [
      { id: 'food-burger', name: 'Burger Clamshell (4.5 × 4.5 × 3 in)', priceModifier: 1.0, specNote: 'Snack and single sandwich box' },
      { id: 'food-lunch', name: 'Meal Lunch Box (8 × 5 × 2.5 in)', priceModifier: 1.3, specNote: 'Full meal combo with secure lock' },
      { id: 'food-family', name: 'Family Platter Box (10 × 7 × 3 in)', priceModifier: 1.65, specNote: 'Large sharing meal container' }
    ],
    features: [
      'Internal water and grease barrier prevents oil seepage',
      'Fold-over locking tab keeps food securely contained in transit',
      'Microwavable and hot-holding paperboard formulation',
      'Food-safe water-based inks compliant with commercial dining standards'
    ],
    specs: {
      boardGrade: '280 – 350 GSM Virgin Food-Grade Paperboard',
      printingMethod: 'Direct Offset Lithography with Low-Migration Inks',
      finishingOptions: 'Matte Barrier Varnish, Steam Vent Punches',
      coating: 'Grease-Resistant Barrier',
      ecoProfile: 'Compostable & Recyclable Options'
    },
    accordions: [
      {
        title: 'Thermal & Grease Testing',
        content: 'Engineered specifically for hot foods up to 90°C without softening, delamination, or flavor transfer.'
      }
    ],
    customizerCategory: 'boxes'
  },

  // 8. Custom Printed Cup Sleeves
  {
    id: 'prod-cup-sleeves',
    slug: 'cup-sleeves',
    title: 'Custom Printed Cup Sleeves',
    category: 'cups',
    categoryLabel: 'Drinkware Accessories',
    subhead: 'Heat-Insulating Kraft Coffee Sleeves',
    description: 'Corrugated kraft paper sleeves tailored to wrap securely around hot beverage cups, shielding hands while providing dedicated logo real estate.',
    primaryImage: marqueeCup2Webp,
    lifestyleImage: cupLifestyleJpg,
    gallery: [
      { src: marqueeCup2Webp, label: 'Sleeve Fitted on Cup', alt: 'Custom printed kraft sleeve fitted to a hot coffee cup' },
      { src: cupLifestyleJpg, label: 'Cafe Serving Context', alt: 'Hot beverage served with custom branded sleeve' },
      { src: cupMacroJpg, label: 'Embossed Paper Detail', alt: 'Embossed texture and fluting of coffee sleeve' }
    ],
    startingPricePKR: 3.50,
    priceUnit: 'piece',
    isDemoPrice: true,
    minOrderQuantity: 1000,
    leadTime: '4 – 6 business days',
    material: 'Embossed / Corrugated Kraft Paper',
    finish: 'Offset / Flexo Printing & Debossing',
    dimensions: 'Fits standard 8 oz, 12 oz, 16 oz cups',
    variations: [
      { id: 'sleeve-kraft-std', name: 'Natural Kraft — Single Color Print', priceModifier: 1.0, specNote: 'Minimalist cafe aesthetic' },
      { id: 'sleeve-kraft-multi', name: 'Natural Kraft — Multi-Color Print', priceModifier: 1.25, specNote: 'Full brand logo and social handles' },
      { id: 'sleeve-white-deboss', name: 'White Embossed Paperboard — Debossed', priceModifier: 1.5, specNote: 'Luxury boutique coffee presentation' }
    ],
    features: [
      'Fluted internal air pockets provide maximum thermal insulation',
      'Pre-glued and packed flat for instant snap-open placement on cups',
      'Tapered arc profile fits all standard paper beverage cup brands',
      'Eco-friendly natural kraft paper appeal'
    ],
    specs: {
      boardGrade: '200 GSM Kraft Liner + 110 GSM Fluting',
      printingMethod: 'Flexo Spot Color / Offset Printing',
      finishingOptions: 'Blind Debossing, Textured Embossing',
      coating: 'Uncoated Tactile Kraft Paper',
      ecoProfile: '100% Recycled & Compostable'
    },
    accordions: [
      {
        title: 'Universal Cup Fitment',
        content: 'Precision die-cut curvature fits 8 oz, 10 oz, 12 oz, 16 oz, and 20 oz standard paper cups securely without slipping.'
      }
    ],
    customizerCategory: 'cups'
  }
];

// Helper functions for easy querying and filtering
export const getProductBySlug = (slug: string): EcommerceProduct | undefined => {
  const normalized = slug.toLowerCase().trim();
  const aliasMap: Record<string, string> = {
    'boxes': 'packaging-boxes',
    'bags': 'paper-bags',
    'diaries': 'corporate-diaries',
    'cups': 'coffee-cups',
    'cup': 'coffee-cups',
    'box': 'packaging-boxes',
    'bag': 'paper-bags',
    'diary': 'corporate-diaries'
  };
  const resolvedSlug = aliasMap[normalized] || normalized;
  return ECOMMERCE_PRODUCTS.find(p => p.slug === resolvedSlug || p.id === resolvedSlug);
};

export const getProductsByCategory = (category: ProductCategory): EcommerceProduct[] => {
  return ECOMMERCE_PRODUCTS.filter(p => p.category === category);
};

export const getRelatedProducts = (currentId: string, limit = 3): EcommerceProduct[] => {
  return ECOMMERCE_PRODUCTS.filter(p => p.id !== currentId).slice(0, limit);
};
