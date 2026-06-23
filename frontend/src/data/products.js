// ============================================================
// src/data/products.js — Deep nested product data structures
// ============================================================

export const CATEGORIES = ['All', 'Suits', 'Shirts', 'Outerwear', 'Accessories', 'Bespoke'];

export const TAGS = ['New Season', 'Bestseller', 'Bespoke Only', 'Limited', 'Archive'];

export const products = [
  {
    id: 'ks-001',
    name: 'The Windsor Double-Breasted Suit',
    shortName: 'Windsor Suit',
    category: 'Suits',
    tags: ['Bestseller', 'New Season'],
    price: 3850,
    comparePrice: 4200,
    currency: 'GBP',
    sku: 'KS-SU-001-NV',
    rating: 4.9,
    reviewCount: 142,
    isBespokeOnly: false,
    isNew: true,
    inStock: true,
    description: `The Windsor Double-Breasted Suit represents the pinnacle of British tailoring tradition. 
Crafted from a 14oz Super 150s wool sourced exclusively from the Loro Piana mills of Biella, 
each suit undergoes over 80 hours of hand-finishing at our Savile Row atelier.`,
    longDescription: `Every stitch tells a story of British heritage. The Windsor features a structured 
chest canvas hand-padded over three days, peak lapels cut at a precise 45-degree angle, 
and a silhouette that nods to the golden age of Mayfair elegance while meeting the demands 
of the modern statesman. The lining — a bespoke Kingsman house print in midnight navy and gold — 
is visible only to those who know to look.`,
    images: {
      front: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
      ],
    },
    availableSizes: ['36R', '38R', '38L', '40R', '40L', '42R', '42L', '44R', '44L', '46R'],
    colorVariants: [
      { name: 'Midnight Navy', hex: '#1a1f3c', available: true },
      { name: 'Charcoal Melange', hex: '#3d3d3d', available: true },
      { name: 'Slate Grey', hex: '#6b7280', available: false },
      { name: 'Midnight Black', hex: '#0f0f0f', available: true },
    ],
    fabricComposition: {
      'Outer Shell': '100% Super 150s Merino Wool',
      'Lining': '95% Cupro, 5% Silk',
      'Canvas': 'Hand-padded horsehair and cotton',
      'Origin': 'Biella, Italy (woven) — London, UK (tailored)',
      'Weight': '14oz per linear yard',
    },
    careInstructions: ['Dry clean only', 'Steam press at medium heat', 'Store on shaped hanger'],
    deliveryInfo: { standard: '5–7 working days', express: '2–3 working days', bespoke: '8–12 weeks' },
    luxurySurchargeRate: 0.12,
  },
  {
    id: 'ks-002',
    name: 'The Mayfair Herringbone Overcoat',
    shortName: 'Mayfair Coat',
    category: 'Outerwear',
    tags: ['New Season', 'Limited'],
    price: 2650,
    comparePrice: null,
    currency: 'GBP',
    sku: 'KS-OC-002-CA',
    rating: 4.8,
    reviewCount: 87,
    isBespokeOnly: false,
    isNew: true,
    inStock: true,
    description: `A masterwork in British outerwear. The Mayfair is woven from a dense herringbone tweed 
sourced from Harris, Scotland — each bolt hand-woven by a single weaver over the course of a week.`,
    longDescription: `The Mayfair Herringbone Overcoat embodies the raw beauty of the Scottish Highlands 
channelled through Savile Row refinement. Its silhouette — a precise single-breasted cut with a 
half-belt at the back — speaks to military heritage. The signature brass Kingsman crest buttons are 
individually cast and hand-polished in Birmingham.`,
    images: {
      front: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      ],
    },
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      { name: 'Natural Camel', hex: '#c19a6b', available: true },
      { name: 'Houndstooth Black', hex: '#2d2d2d', available: true },
      { name: 'Hunting Green', hex: '#2d4a2d', available: true },
    ],
    fabricComposition: {
      'Outer Shell': '100% Harris Tweed',
      'Lining': '100% Silk — Kingsman Archive Print',
      'Origin': 'Outer Hebrides, Scotland (woven) — London, UK (tailored)',
      'Weight': '22oz per linear yard',
    },
    careInstructions: ['Dry clean only', 'Brush regularly with a natural bristle brush'],
    deliveryInfo: { standard: '5–7 working days', express: '2–3 working days', bespoke: '10–14 weeks' },
    luxurySurchargeRate: 0.12,
  },
  {
    id: 'ks-003',
    name: 'The Balmoral Bespoke Morning Coat',
    shortName: 'Balmoral Morning Coat',
    category: 'Suits',
    tags: ['Bespoke Only', 'Archive'],
    price: 8500,
    comparePrice: null,
    currency: 'GBP',
    sku: 'KS-BS-003-BK',
    rating: 5.0,
    reviewCount: 31,
    isBespokeOnly: true,
    isNew: false,
    inStock: true,
    description: `Our most storied garment. The Balmoral Morning Coat is available exclusively through our 
Savile Row bespoke consultation service. A minimum of three fittings is required.`,
    longDescription: `The Balmoral represents our highest expression of tailoring. Created for those who 
understand that true luxury is not worn but inhabited. Each coat requires a minimum of three fittings 
at our Savile Row atelier and over 120 hours of hand-work by our Master Cutter.`,
    images: {
      front: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80',
      ],
    },
    availableSizes: ['Fully Bespoke — Made to Measure'],
    colorVariants: [
      { name: 'Jet Black', hex: '#0a0a0a', available: true },
      { name: 'Midnight Navy', hex: '#1a1f3c', available: true },
    ],
    fabricComposition: {
      'Outer Shell': '100% Super 200s Cashmere-Wool Blend',
      'Lining': '100% Hand-painted Silk',
      'Buttons': 'Hand-carved horn from sustainable sources',
      'Origin': 'Florence, Italy (fabric) — London, UK (tailored)',
    },
    careInstructions: ['Kingsman valet service only', 'Return to atelier for seasonal care'],
    deliveryInfo: { bespoke: '16–20 weeks from final fitting' },
    luxurySurchargeRate: 0.15,
  },
  {
    id: 'ks-004',
    name: 'The Knightsbridge Egyptian Cotton Shirt',
    shortName: 'Knightsbridge Shirt',
    category: 'Shirts',
    tags: ['Bestseller'],
    price: 285,
    comparePrice: 320,
    currency: 'GBP',
    sku: 'KS-SH-004-WH',
    rating: 4.7,
    reviewCount: 324,
    isBespokeOnly: false,
    isNew: false,
    inStock: true,
    description: `Woven from 200-thread-count Egyptian Giza cotton, the Knightsbridge shirt is our most 
enduring classic. Machine-washable luxury without compromise.`,
    longDescription: `The Knightsbridge is proof that everyday luxury need not be sacrificed. Constructed 
with a 7-fold collar and single-needle stitching throughout, this shirt features our signature 
mother-of-pearl buttons and a discrete crown embroidery on the inside left cuff.`,
    images: {
      front: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80',
      ],
    },
    availableSizes: ['14.5"', '15"', '15.5"', '16"', '16.5"', '17"', '17.5"', '18"'],
    colorVariants: [
      { name: 'Crisp White', hex: '#f8f8f8', available: true },
      { name: 'Sky Blue', hex: '#a8c5da', available: true },
      { name: 'Pale Pink', hex: '#f0c8c0', available: true },
      { name: 'Lavender Grey', hex: '#b8b0c8', available: false },
    ],
    fabricComposition: {
      'Fabric': '100% Egyptian Giza 45 Cotton',
      'Thread Count': '200 threads per inch',
      'Buttons': 'Mother-of-pearl, hand-sewn',
      'Origin': 'Egypt (grown) — Italy (woven) — London, UK (made)',
    },
    careInstructions: ['Machine wash at 30°C', 'Iron on medium heat', 'Do not tumble dry'],
    deliveryInfo: { standard: '3–5 working days', express: '1–2 working days' },
    luxurySurchargeRate: 0.08,
  },
  {
    id: 'ks-005',
    name: 'The Oxford Cashmere Scarf',
    shortName: 'Oxford Scarf',
    category: 'Accessories',
    tags: ['New Season', 'Bestseller'],
    price: 420,
    comparePrice: null,
    currency: 'GBP',
    sku: 'KS-AC-005-CR',
    rating: 4.9,
    reviewCount: 198,
    isBespokeOnly: false,
    isNew: true,
    inStock: true,
    description: `Crafted from Grade-A Inner Mongolian cashmere, the Oxford Scarf is an essential 
companion to any Kingsman ensemble. Feather-light yet supremely warm.`,
    longDescription: `The Oxford Cashmere Scarf is woven on vintage shuttled looms in Scotland, 
a process that creates a looser, more breathable weave than modern techniques allow.
At 30cm wide and 180cm long, it is generously proportioned for both the classic drape and the full wrap.`,
    images: {
      front: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
      ],
    },
    availableSizes: ['One Size'],
    colorVariants: [
      { name: 'Ivory Cream', hex: '#f5f0e8', available: true },
      { name: 'Camel', hex: '#c19a6b', available: true },
      { name: 'Navy Stripe', hex: '#1a2744', available: true },
      { name: 'Charcoal', hex: '#3d3d3d', available: true },
      { name: 'Kingsman Red', hex: '#8b1a1a', available: false },
    ],
    fabricComposition: {
      'Material': '100% Grade-A Mongolian Cashmere',
      'Ply': '2-ply woven',
      'Dimensions': '30cm × 180cm',
      'Origin': 'Inner Mongolia (fibre) — Scotland (woven)',
    },
    careInstructions: ['Hand wash in cold water', 'Dry flat', 'Do not wring'],
    deliveryInfo: { standard: '3–5 working days', express: '1–2 working days' },
    luxurySurchargeRate: 0.08,
  },
  {
    id: 'ks-006',
    name: 'The Belgravia Silk Tie',
    shortName: 'Belgravia Tie',
    category: 'Accessories',
    tags: ['Archive', 'Limited'],
    price: 195,
    comparePrice: null,
    currency: 'GBP',
    sku: 'KS-AC-006-NV',
    rating: 4.8,
    reviewCount: 267,
    isBespokeOnly: false,
    isNew: false,
    inStock: true,
    description: `Woven from seven-fold pure silk on Como looms in Northern Italy. The Belgravia Tie 
is the definitive expression of understated British elegance.`,
    longDescription: `The seven-fold construction — in which a single piece of silk is folded seven times 
with no interlining — produces an unrivalled drape and a knot of unparalleled density. 
Each tie is printed with exclusive Kingsman archive patterns and finished by hand in our London studio.`,
    images: {
      front: 'https://images.unsplash.com/photo-1590798876053-8832aa0fb849?w=600&q=80',
      back: 'https://images.unsplash.com/photo-1590798876053-8832aa0fb849?w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1590798876053-8832aa0fb849?w=800&q=80',
      ],
    },
    availableSizes: ['One Size — 147cm'],
    colorVariants: [
      { name: 'Navy Regimental', hex: '#1a2744', available: true },
      { name: 'Burgundy Paisley', hex: '#5c1a2a', available: true },
      { name: 'Forest Green', hex: '#1a3a1a', available: true },
      { name: 'Champagne', hex: '#d4b483', available: false },
    ],
    fabricComposition: {
      'Material': '100% Pure Silk — Seven Fold',
      'Construction': 'No interlining — self-tipped',
      'Width': '8.5cm blade width',
      'Origin': 'Como, Italy (woven) — London, UK (finished)',
    },
    careInstructions: ['Dry clean only', 'Roll, do not fold', 'Untie after each wear'],
    deliveryInfo: { standard: '3–5 working days', express: '1–2 working days' },
    luxurySurchargeRate: 0.08,
  },
];

export const testimonials = [
  {
    id: 't-001',
    name: 'The Rt. Hon. James Blackwood',
    title: 'Former Secretary of State',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    rating: 5,
    text: `Kingsman has dressed me for every significant occasion of my career. The Windsor suit I wore at the State Opening — impeccable in every regard. True Savile Row quality without the Savile Row wait.`,
    product: 'Windsor Double-Breasted Suit',
  },
  {
    id: 't-002',
    name: 'Sir Alistair Pemberton',
    title: 'Chairman, Pemberton Capital',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    rating: 5,
    text: `I have worn Kingsman for fifteen years. The Balmoral Morning Coat I commissioned for my son's wedding was, without question, the finest garment I have ever owned. Extraordinary craftsmanship.`,
    product: 'Balmoral Bespoke Morning Coat',
  },
  {
    id: 't-003',
    name: 'Dr. Helena Ashworth',
    title: 'Diplomat & Cultural Attaché',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=120&q=80',
    rating: 5,
    text: `The Oxford Cashmere Scarf is the most luxurious accessory I own. It travels with me everywhere. Kingsman understands that true luxury is about feel, not just appearance.`,
    product: 'Oxford Cashmere Scarf',
  },
];

export const lookbookEntries = [
  {
    id: 'lb-001',
    title: 'The Autumn Statesman',
    season: 'Autumn / Winter 2025',
    image: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=800&q=80',
    description: 'Power dressing reimagined for the modern era. The Windsor suit paired with the Mayfair overcoat — a combination that commands every room.',
    tags: ['Suits', 'Outerwear'],
  },
  {
    id: 'lb-002',
    title: 'The Country Estate',
    season: 'Autumn / Winter 2025',
    image: 'https://images.unsplash.com/photo-1610047803562-7260ebe516cd?w=800&q=80',
    description: 'British countryside elegance. Harris Tweed, cashmere, and the quiet confidence of a man entirely at ease with his surroundings.',
    tags: ['Outerwear', 'Accessories'],
  },
  {
    id: 'lb-003',
    title: 'Mayfair Evening',
    season: 'Resort 2025',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    description: 'The after-dark wardrobe. Where precision tailoring meets the languid pace of a Mayfair evening, and every gesture is a statement.',
    tags: ['Suits', 'Bespoke'],
  },
];
