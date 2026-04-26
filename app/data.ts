export type Category = {
  title: string;
  image: string;
  alt: string;
  active: boolean;
};

export type Rate = {
  name: string;
  price: string;
  time: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const navItems = [
  { label: "Rates", href: "/rates" },
  { label: "Brands", href: "/brands" },
  { label: "Upload", href: "/authenticate" },
] as const;

export const categories: Category[] = [
  {
    title: "Handbags",
    image: "/landing/category-handbag.png",
    alt: "Luxury handbag example for authentication",
    active: true,
  },
  {
    title: "Shoes",
    image: "/landing/category-shoe.png",
    alt: "Luxury sneaker example for authentication",
    active: false,
  },
  {
    title: "Clothing",
    image: "/landing/category-clothing.png",
    alt: "Luxury clothing example for authentication",
    active: false,
  },
  {
    title: "Watches",
    image: "/landing/category-watch.png",
    alt: "Luxury watch example for authentication",
    active: false,
  },
  {
    title: "Jewelry",
    image: "/landing/category-jewelry.png",
    alt: "Luxury jewelry example for authentication",
    active: false,
  },
];

export const rates: Rate[] = [
  {
    name: "Essential Bag Check",
    price: "$19.9",
    time: "Result from 40 min",
    description: "Single expert review for everyday resale and buyer confidence.",
    image: "/landing/category-handbag.png",
  },
  {
    name: "Priority Bag Check",
    price: "$29.9",
    time: "Priority queue",
    description: "Two-reviewer confirmation with a certificate-ready result.",
    image: "/landing/hero-bag.png",
    featured: true,
  },
  {
    name: "Brand Deep Check",
    price: "$39.9",
    time: "Detailed notes",
    description: "Extra close review for high-value bags, serial marks, and hardware.",
    image: "/landing/service-bag.png",
  },
];

export const brands = [
  "Louis Vuitton",
  "Chanel",
  "Hermes",
  "Dior",
  "Gucci",
  "Prada",
  "Celine",
  "Loewe",
  "Bottega Veneta",
  "Balenciaga",
  "Fendi",
  "YSL",
  "Goyard",
  "Burberry",
  "Coach",
  "Miu Miu",
  "Givenchy",
  "Valentino",
  "Jacquemus",
  "Mulberry",
  "Marc Jacobs",
  "Tory Burch",
  "Longchamp",
  "Other bags",
] as const;

export const uploadRequirements = [
  {
    title: "Front view",
    description: "Full bag shape, handles, and front logo area.",
    image: "/landing/category-handbag.png",
  },
  {
    title: "Back view",
    description: "Back stitching and structure in clear light.",
    image: "/landing/step-1.png",
  },
  {
    title: "Brand mark",
    description: "Logo, stamp, or heat embossing in focus.",
    image: "/landing/service-bag.png",
  },
  {
    title: "Hardware",
    description: "Zippers, clasps, chain, lock, and metal finishing.",
    image: "/landing/category-jewelry.png",
  },
  {
    title: "Interior",
    description: "Inside lining, pockets, date code, and serial marks.",
    image: "/landing/cta-bag.png",
  },
  {
    title: "Receipt or box",
    description: "Optional supporting packaging or purchase documents.",
    image: "/landing/service-collage.png",
  },
] as const;

export const steps = [
  { label: "Rates", href: "/rates" },
  { label: "Brand", href: "/brands" },
  { label: "Photos", href: "/authenticate" },
  { label: "Payment", href: "/payment" },
  { label: "Upload", href: "/upload" },
] as const;

export const footerColumns = [
  {
    title: "Authentication",
    links: ["Bag check", "Business service", "Certificate"],
  },
  {
    title: "Categories",
    links: ["Handbags", "Shoes soon", "Watches soon", "Jewelry soon"],
  },
  {
    title: "Learn",
    links: ["Real vs fake", "Reviews", "Help Center"],
  },
] as const;
