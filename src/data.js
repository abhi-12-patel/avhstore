// data.js

export const products = [
  {
    id: 2,
    name: "Luna Pearl Pendant2",
    SKU_id: "LPP-201",
    price: 890,
    description:
      "Inspired by the gentle glow of moonlight, this pendant showcases a lustrous South Sea pearl suspended from a delicate 18k gold chain. The pearl's natural iridescence captures light beautifully, creating an ethereal, feminine elegance.",
    images: [
      "https://drive.google.com/file/d/19LvtmMDhguK-uZdGDbEX28xnsBLwzGKk/view?usp=sharing",
    ],
    category: "earrings",
    material: "Brass",
    stone: "none",
    isBestseller: true,
    inStock: true,
    isNew: false,
  },



];

export const categories = [
  {
    id: "earrings",
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: "jewelleryset",
    name: "Jewellery Sets",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
];

export const collectionCategoryLinks = [
  { to: "/collections?category=earrings", label: "Ear Rings" },
  { to: "/collections?category=jewelleryset", label: "Jewellery Sets" },
  // { to: '/collections?category=newly-launched', label: 'Newly Launched' },
  // { to: '/collections?category=bracelets', label: 'Bracelets' },
  // { to: '/collections?category=bangle-bracelets', label: 'Bangle Bracelets' },
  // { to: '/collections?category=rings', label: 'Rings' },
  // { to: '/collections?category=scrunchies', label: 'Scrunchies' },
  // { to: '/collections?category=handpicked', label: 'Handpicked' },
  // { to: '/collections?category=hair-pins', label: 'Hair Pins/Slides' },
  // { to: '/collections?category=hair-bows', label: 'Hair Bows' },
  // { to: '/collections?category=stud-earrings', label: 'Stud Earrings' },
  // { to: '/collections?category=keychains', label: 'Keychains' },
  // { to: '/collections?category=layered-necklaces', label: 'Layered Necklaces' },
  // { to: '/collections?category=combo-sets', label: 'Combo Sets' },
  // { to: '/collections?category=hampers', label: 'Hampers' },
  // { to: '/collections?category=unisex-necklaces', label: 'Unisex Necklaces' },
  // { to: '/collections?category=unisex-bracelets', label: 'Unisex Bracelets' },
  // { to: '/collections?category=anklets', label: 'Anklets' },
];

export const materials = [
  { id: "gold", name: "18K Gold" },
  { id: "silver", name: "Sterling Silver" },
  { id: "platinum", name: "Platinum" },
  { id: "rose-gold", name: "Rose Gold" },
];

export const stones = [
  { id: "diamond", name: "Diamond" },
  { id: "sapphire", name: "Sapphire" },
  { id: "emerald", name: "Emerald" },
  { id: "ruby", name: "Ruby" },
  { id: "pearl", name: "Pearl" },
  { id: "none", name: "No Stone" },
];


export const FREE_SHIPPING_MIN = 2999;

export const OFFER_RULES = [
  { min: 8999, discount: 7 },
  { min: 5999, discount: 5 },
  { min: 2999, discount: 3 },
];

  const STORE_INFO = {
    name: "AVH STORE",
    address: "RAJOT",
    gstin: "RTOUFGV56790",
    phone: "9016457163",
    email: "avhstore@example.com",
  };