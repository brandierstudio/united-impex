/**
 * United Impex — Verified Central Business Identity & Data Reference
 * 
 * Sourced directly from official visiting card (United Impex VC Card(1).pdf)
 * and verified company assets.
 * 
 * Strict Guidelines:
 * - No fabricated factory/mill claims.
 * - Karachi and Multan locations are designated coordination & business offices.
 * - Areeb Ashraf is Director (not CEO).
 * - Exact official contacts: 0371 4799755, unitedimpex.mtn@gmail.com
 */

export interface OfficeLocation {
  city: string;
  address: string;
  type: string;
  note: string;
  phone?: string;
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneRaw: string;
  phoneTel: string;
  whatsappNumber: string;
  whatsappLink: string;
  email: string;
  emailMailto: string;
}

export interface LeadershipMember {
  name: string;
  designation: string;
  role: string;
}

export interface CompanyIdentity {
  name: string;
  tagline: string;
  businessDescription: string;
  natureOfBusiness: string[];
  leadership: LeadershipMember;
  announcementText: string;
  announcementHighlight: string;
  announcementDiscount: string;
}

export interface ProductCategoryRef {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  featuredImage: string;
  customizationAvailable: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const COMPANY_IDENTITY: CompanyIdentity = {
  name: "United Impex",
  tagline: "Quality Offset Printing & Custom Packaging Solutions",
  businessDescription: "Quality Offset Printer, General Order Supplier, Packaging & Advertising Company.",
  natureOfBusiness: [
    "Quality Offset Printing",
    "Custom Packaging Solutions",
    "General Order Supplier",
    "Commercial Advertising & Branding Materials"
  ],
  leadership: {
    name: "Areeb Ashraf",
    designation: "Director",
    role: "Director of Business & Operations"
  },
  announcementText: "Elevate Your Brand with Custom Packaging & Printing Solutions",
  announcementHighlight: "Custom Packaging",
  announcementDiscount: "Get Free Digital Mockups & Instant B2B Volume Quotes Today"
};

export const CONTACT_INFO: ContactInfo = {
  phoneDisplay: "0371 4799755",
  phoneRaw: "+923714799755",
  phoneTel: "tel:+923714799755",
  whatsappNumber: "+92 371 4799755",
  whatsappLink: "https://wa.me/923714799755?text=Hello%20United%20Impex%2C%20I%20would%20like%20to%20inquire%20about%20custom%20packaging%20and%20printing.",
  email: "unitedimpex.mtn@gmail.com",
  emailMailto: "mailto:unitedimpex.mtn@gmail.com?subject=United%20Impex%20Inquiry"
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: "Karachi",
    type: "Karachi Office",
    address: "Office #1, Near TDF Magnifi Science Centre, Meher Son's Estate, Block 1, Talpur Road, Karachi, Pakistan.",
    note: "Client consultation and order coordination office.",
    phone: "0371 4799755"
  },
  {
    city: "Multan",
    type: "Multan Office",
    address: "45-Gulraiz Colony, Street #3, Near Allah Shafi Chowk, MDA Road, Multan, Pakistan.",
    note: "Client support and order coordination office.",
    phone: "0371 4799755"
  }
];

export const CORE_PRODUCT_CATEGORIES: ProductCategoryRef[] = [
  {
    id: "coffee-cups",
    slug: "coffee-cups",
    title: "Custom Printed Coffee & Paper Cups",
    shortDesc: "Single wall, double wall, and ripple cups for cafes and beverage brands.",
    featuredImage: "/src/assets/animation/cup.png",
    customizationAvailable: true
  },
  {
    id: "packaging-boxes",
    slug: "packaging-boxes",
    title: "Custom Packaging & Rigid Folding Boxes",
    shortDesc: "Premium folding cartons, corrugated mailers, and custom retail presentation boxes.",
    featuredImage: "/src/assets/products/boxes/placeholder.png",
    customizationAvailable: true
  },
  {
    id: "paper-bags",
    slug: "paper-bags",
    title: "Luxury Kraft & Art Paper Bags",
    shortDesc: "Eco-friendly retail shopping bags with twisted paper, ribbon, or cotton cord handles.",
    featuredImage: "/src/assets/products/bags/placeholder.png",
    customizationAvailable: true
  },
  {
    id: "diaries-notebooks",
    slug: "diaries-notebooks",
    title: "Corporate Diaries & Executive Notebooks",
    shortDesc: "Hardbound, softcover, and embossed leatherette executive corporate notebooks and planners.",
    featuredImage: "/src/assets/products/diaries/placeholder.png",
    customizationAvailable: true
  }
];
