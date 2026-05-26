export type AddOn = {
  id: string;
  label: string;
  price: number;
  desc: string;
  badge: string;
};

export type StemOption = {
  id: string;
  label: string;
  stems: number;
  price: number;
  note?: string;
};

export type ColorOption = {
  id: string;
  label: string;
  hex: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  scarcity: string | null;
  stemOptions: StemOption[];
  colors: ColorOption[];
  addOns: AddOn[];
  bgColor: string;
};

export type CartItem = {
  id: number;
  productId: string;
  productName: string;
  stemId: string;
  stemLabel: string;
  colorId: string;
  colorLabel: string;
  colorHex: string;
  addOns: string[];
  initialLetter: string;
  calligraphyNote: string;
  unitPrice: number;
  qty: number;
};

export const ADDONS: AddOn[] = [
  {
    id: 'babiesbreath',
    label: "Baby's Breath Initial",
    price: 15,
    desc: "Baby's breath shaped into an initial",
    badge: '🌿 Initial',
  },
  {
    id: 'calligraphy',
    label: 'Custom Calligraphy Note',
    price: 18,
    desc: 'Handwritten note, up to 500 characters',
    badge: '✍️ Note',
  },
  {
    id: 'flowerbox',
    label: 'Flower Box',
    price: 30,
    desc: 'Premium flower box packaging',
    badge: '📦 Box',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'classic_roses',
    name: 'Classic Roses',
    emoji: '🌹',
    tagline: 'Fresh. Hand-wrapped. Built for the moment.',
    description:
      'Our Classic Rose Bouquet is sourced directly through Potomac Floral Wholesale and assembled by hand — full-headed, long-stemmed, and exactly what a rose should be.',
    scarcity: null,
    stemOptions: [
      { id: '12', label: '12 Stems', stems: 12, price: 35 },
      { id: '25', label: '25 Stems', stems: 25, price: 65 },
      { id: '50', label: '50 Stems', stems: 50, price: 95 },
      { id: '75', label: '75 Stems', stems: 75, price: 125 },
      { id: '100', label: '100 Stems', stems: 100, price: 155 },
    ],
    colors: [
      { id: 'red', label: 'Classic Red', hex: '#C0392B', emoji: '🌹' },
      { id: 'white', label: 'Pure White', hex: '#F5F0EB', emoji: '🤍' },
      { id: 'pink', label: 'Blush Pink', hex: '#D4748A', emoji: '🌸' },
      { id: 'peach', label: 'Soft Peach', hex: '#E8A87C', emoji: '🍑' },
      { id: 'lavender', label: 'Lavender', hex: '#C9A7D4', emoji: '💜' },
      {
        id: 'mixed',
        label: 'Mixed',
        hex: 'linear-gradient(135deg,#C0392B 0%,#D4748A 40%,#F5F0EB 70%,#E8C94F 100%)',
        emoji: '💐',
      },
    ],
    addOns: ADDONS,
    bgColor: 'rgba(192,57,43,0.2)',
  },
  {
    id: 'sweetheart_roses',
    name: 'Sweetheart Roses',
    emoji: '🩷',
    tagline: 'Small stem. Big feeling.',
    description:
      'Sweetheart roses are the most delicate member of the rose family — petite, tightly budded, and endlessly elegant. They carry the same richness as a classic rose in a softer, more refined form.',
    scarcity: null,
    stemOptions: [
      { id: '12', label: '12 Stems', stems: 12, price: 45 },
      { id: '25', label: '25 Stems', stems: 25, price: 85 },
      { id: '50', label: '50 Stems', stems: 50, price: 125 },
      { id: '75', label: '75 Stems', stems: 75, price: 165 },
      { id: '100', label: '100 Stems', stems: 100, price: 230 },
    ],
    colors: [
      { id: 'red', label: 'Classic Red', hex: '#C0392B', emoji: '🌹' },
      { id: 'white', label: 'Pure White', hex: '#F5F0EB', emoji: '🤍' },
      { id: 'pink', label: 'Soft Pink', hex: '#F4A7B9', emoji: '🩷' },
      { id: 'lavender', label: 'Lavender', hex: '#C9A7D4', emoji: '💜' },
      { id: 'peach', label: 'Soft Peach', hex: '#E8A87C', emoji: '🍑' },
      {
        id: 'mixed',
        label: 'Mixed',
        hex: 'linear-gradient(135deg,#C0392B 0%,#F4A7B9 40%,#F5F0EB 70%,#C9A7D4 100%)',
        emoji: '💐',
      },
    ],
    addOns: ADDONS,
    bgColor: 'rgba(244,167,185,0.2)',
  },
  {
    id: 'spray_roses',
    name: 'Spray Roses',
    emoji: '🌸',
    tagline: 'One stem. Three blooms. Maximum impact.',
    description:
      'Spray roses are the secret weapon of the flower world — smaller than a classic rose, but clustered in a way that makes every bouquet look full, lush, and intentional. Each stem carries approximately 3 blooms.',
    scarcity: null,
    stemOptions: [
      { id: '10', label: '10 Stems', stems: 10, price: 65 },
      { id: '20', label: '20 Stems', stems: 20, price: 110 },
      { id: '30', label: '30 Stems', stems: 30, price: 160 },
      { id: '40', label: '40 Stems', stems: 40, price: 210 },
      { id: '50', label: '50 Stems', stems: 50, price: 265 },
    ],
    colors: [
      { id: 'white', label: 'Pure White', hex: '#F5F0EB', emoji: '🤍' },
      { id: 'pink', label: 'Blush Pink', hex: '#D4748A', emoji: '🌸' },
      { id: 'peach', label: 'Soft Peach', hex: '#E8A87C', emoji: '🍑' },
      { id: 'yellow', label: 'Soft Yellow', hex: '#E8C94F', emoji: '🌼' },
      { id: 'lavender', label: 'Lavender', hex: '#C9A7D4', emoji: '💜' },
      {
        id: 'mixed',
        label: 'Mixed',
        hex: 'linear-gradient(135deg,#F5F0EB 0%,#D4748A 35%,#E8A87C 65%,#E8C94F 100%)',
        emoji: '💐',
      },
    ],
    addOns: ADDONS,
    bgColor: 'rgba(212,116,138,0.2)',
  },
  {
    id: 'garden_roses',
    name: 'Garden Roses',
    emoji: '🌺',
    tagline: 'The most luxurious rose we carry. Full stop.',
    description:
      'Garden roses are in a category of their own — larger blooms, more petals, a richer fragrance, and a presence that commands attention. Sourced fresh through Potomac Floral Wholesale and hand-wrapped to order.',
    scarcity:
      'Garden roses are a premium, limited-availability bloom. Pre-order strongly recommended.',
    stemOptions: [
      { id: '12', label: '12 Stems', stems: 12, price: 165 },
      { id: '24', label: '24 Stems', stems: 24, price: 320 },
      { id: '36', label: '36 Stems', stems: 36, price: 475 },
      { id: '48', label: '48 Stems', stems: 48, price: 625 },
      { id: '60', label: '60 Stems', stems: 60, price: 775 },
    ],
    colors: [
      { id: 'red', label: 'Deep Red', hex: '#8B1A1A', emoji: '🌺' },
      { id: 'white', label: 'Cream White', hex: '#F5F0EB', emoji: '🤍' },
      { id: 'pink', label: 'Dusty Pink', hex: '#C9788A', emoji: '🌸' },
      { id: 'peach', label: 'Soft Peach', hex: '#E8A87C', emoji: '🍑' },
      {
        id: 'mixed',
        label: 'Mixed',
        hex: 'linear-gradient(135deg,#8B1A1A 0%,#C9788A 40%,#F5F0EB 70%,#E8A87C 100%)',
        emoji: '💐',
      },
    ],
    addOns: ADDONS,
    bgColor: 'rgba(139,26,26,0.25)',
  },
];
