export interface Product {
  id: string;
  no: string; // catalog number, e.g. "014"
  slug: string;
  name: string;
  category: "Outerwear" | "Knitwear" | "Dresses" | "Denim" | "Accessories";
  price: number;
  colorway: string;
  sizes: string[];
  description: string;
  care: string;
  image: string;
  imageHover: string;
  span?: "tall" | "wide"; // for the homepage asymmetric grid
}

// NOTE: images are deterministic placeholders (picsum.photos) so the app
// renders correctly out of the box. Swap `image` / `imageHover` for real
// product photography before shipping.
export const products: Product[] = [
  {
    id: "1",
    no: "001",
    slug: "wool-overcoat",
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 428,
    colorway: "Grey",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A double-faced wool overcoat cut long, with a rolled collar and horn buttons. Built for the coldest months and the longest wear.",
    care: "Dry clean only. Store on a broad hanger.",
    image: "/images/overcoat.jpg",
    imageHover: "/images/woolovercoathover.jpg",
    span: "tall",
  },
  {
    id: "2",
    no: "002",
    slug: "raw-denim-jacket",
    name: "Raw Denim Jacket",
    category: "Denim",
    price: 198,
    colorway: "Indigo",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Unwashed 14oz selvedge denim that breaks in around the body over time. Chain-stitched hem, copper hardware.",
    care: "Cold wash sparingly. Hang dry.",
    image: "/images/rawdenimjacket.jpg",
    imageHover: "/images/denimhover.jpg",
  },
  {
    id: "3",
    no: "003",
    slug: "silk-slip-dress",
    name: "Pure Silk Wear",
    category: "Dresses",
    price: 265,
    colorway: "Bone",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Bias-cut mulberry silk that falls close to the body. Adjustable straps, a single back seam, nothing extra.",
    care: "Hand wash cold. Line dry away from sun.",
    image: "/images/silk.jpg",
    imageHover: "/images/silkhover.jpg",
    span: "wide",
  },
  {
    id: "4",
    no: "004",
    slug: "merino-crewneck",
    name: "Merino Crewneck",
    category: "Knitwear",
    price: 148,
    colorway: "Moss",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "14-gauge merino knit, fully fashioned shoulders, ribbed cuffs and hem. Breathable enough for layering, warm enough alone.",
    care: "Hand wash cold or dry clean.",
    image: "/images/merinocrewneck.jpg",
    imageHover: "/images/merinohover.jpg",
  },
  {
    id: "5",
    no: "005",
    slug: "tapered-trouser",
    name: "Tapered Trouser",
    category: "Denim",
    price: 168,
    colorway: "Charcoal",
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Mid-rise, tapered through the leg, finished with a clean hem. Cut from a heavyweight cotton twill that holds its shape.",
    care: "Machine wash cold, inside out.",
    image: "/images/taperedtrouser.jpg",
    imageHover: "/images/taperedhover.jpg",
  },
  {
    id: "6",
    no: "006",
    slug: "leather-belt",
    name: "Leather Belt",
    category: "Accessories",
    price: 78,
    colorway: "Chestnut",
    sizes: ["S/M", "L/XL"],
    description:
      "Full-grain vegetable-tanned leather, solid brass buckle. Ages and darkens with wear.",
    care: "Wipe clean. Condition twice a year.",
    image: "/images/leatherbelt.jpg",
    imageHover: "/images/belthover.jpg",
  },
  {
    id: "7",
    no: "007",
    slug: "cotton-poplin-shirt",
    name: "Cotton Poplin Shirt",
    category: "Knitwear",
    price: 128,
    colorway: "Ecru",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A crisp poplin shirt with a slightly relaxed body, mother-of-pearl buttons, and a single chest pocket.",
    care: "Machine wash cold. Iron while damp.",
    image: "/images/poplinshirt.jpg",
    imageHover: "/images/poplinhover.jpg",
  },
  {
    id: "8",
    no: "008",
    slug: "wool-scarf",
    name: "Wool Scarf",
    category: "Accessories",
    price: 64,
    colorway: "Rust",
    sizes: ["One Size"],
    description:
      "An oversized lambswool scarf, woven in a small mill, finished with a hand-knotted fringe.",
    care: "Dry clean only.",
    image: "/images/scarf.jpg",
    imageHover: "/images/scarfhover.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}