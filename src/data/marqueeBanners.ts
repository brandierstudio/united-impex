/**
 * TEMPORARY PACKAGING SHOWCASE BANNERS
 * 
 * Milestone 4B / Polish: Refined, strictly commercial packaging photography
 * for the continuous homepage marquee showcase.
 * 
 * Features authentic commercial packaging:
 * - Branded disposable paper takeaway cups
 * - Rigid presentation gift boxes & corrugated mailer cartons
 * - Luxury cord-handle shopping bags & eco-friendly kraft bags
 * - Hardcover corporate diaries & executive planners
 * 
 * Free for commercial and personal use under Pexels License.
 */

import cup1 from '../assets/marquee/marquee-cup-1.webp';
import box1 from '../assets/marquee/marquee-box-1.webp';
import bag1 from '../assets/marquee/marquee-bag-1.webp';
import diary1 from '../assets/marquee/marquee-diary-1.webp';
import cup2 from '../assets/marquee/marquee-cup-2.webp';
import box2 from '../assets/marquee/marquee-box-2.webp';
import bag2 from '../assets/marquee/marquee-bag-2.webp';
import diary2 from '../assets/marquee/marquee-diary-2.webp';

export interface MarqueeBannerItem {
  id: string;
  image: string;
  title: string;
  category: string;
  tag: string;
  alt: string;
  author: string;
  sourceUrl: string;
  license: string;
}

export const MARQUEE_BANNERS: MarqueeBannerItem[] = [
  {
    id: 'marquee-cup-1',
    image: cup1,
    title: 'Single-Wall & Ripple Paper Cups',
    category: 'Paper Cups & Drinkware',
    tag: 'Drinkware',
    alt: 'Commercial disposable paper coffee cups with lids for cafe takeaway service',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/27589853/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-box-1',
    image: box1,
    title: 'Rigid Presentation & Gift Boxes',
    category: 'Rigid & Folding Boxes',
    tag: 'Rigid Boxes',
    alt: 'Luxury rigid gift presentation box packaging with textured lid',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/6087540/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-bag-1',
    image: bag1,
    title: 'Luxury Cord-Handle Retail Bags',
    category: 'Custom Paper Bags',
    tag: 'Retail Bags',
    alt: 'Luxury retail paper shopping bag with reinforced twisted cord handles',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/5926443/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-diary-1',
    image: diary1,
    title: 'Executive Hardcover Notebooks',
    category: 'Stationery & Diaries',
    tag: 'Diaries',
    alt: 'Hardcover corporate executive notebook with bound spine and bespoke paper',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/921716/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-cup-2',
    image: cup2,
    title: 'Takeaway Paper Beverage Cups',
    category: 'Paper Cups & Drinkware',
    tag: 'Paper Cups',
    alt: 'Branded disposable paper cups designed for hot and cold beverages',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/10719700/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-box-2',
    image: box2,
    title: 'Corrugated Cartons & Shipping Boxes',
    category: 'Rigid & Folding Boxes',
    tag: 'Mailer Boxes',
    alt: 'Custom corrugated cardboard packaging box with precision folding edges',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/11781094/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-bag-2',
    image: bag2,
    title: 'Eco-Friendly Kraft Shopping Bags',
    category: 'Custom Paper Bags',
    tag: 'Kraft Bags',
    alt: 'Eco-friendly brown kraft paper shopping bag for retail and boutique branding',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/6969892/',
    license: 'Free commercial & editorial use under Pexels License',
  },
  {
    id: 'marquee-diary-2',
    image: diary2,
    title: 'Custom Bound Corporate Planners',
    category: 'Stationery & Diaries',
    tag: 'Planners',
    alt: 'Executive custom bound desk planner and corporate diary with premium finish',
    author: 'Pexels Contributor',
    sourceUrl: 'https://www.pexels.com/photo/16472571/',
    license: 'Free commercial & editorial use under Pexels License',
  },
];
