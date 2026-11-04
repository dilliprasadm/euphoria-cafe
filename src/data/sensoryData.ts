import { MenuItem } from "./menuData";

export interface SensoryProfile {
  texture: string;
  sweetness: number; // 1 to 5
  richness: number;  // 1 to 5
  pairing: {
    name: string;
    category: string;
    price: number;
    description: string;
  };
  culinaryStory: string;
}

export const INGREDIENT_CHIPS = [
  "Pistachio",
  "Lotus Biscoff",
  "Dark Chocolate",
  "Avocado",
  "Cheesecake",
  "Ferrero Rocher",
  "Sourdough",
  "Gelato",
  "Artisan Pizza",
  "Nutella",
  "Cold Coffee",
];

export interface MoodFilter {
  id: string;
  label: string;
  icon: string;
  subtitle: string;
  categories: string[];
}

export const MOOD_FILTERS: MoodFilter[] = [
  {
    id: "all",
    label: "Full Compendium",
    icon: "✨",
    subtitle: "All 16 artisanal chapters & 90+ creations",
    categories: [],
  },
  {
    id: "morning",
    label: "6 AM Sunrise & Brews",
    icon: "🌅",
    subtitle: "Crusty whole-grain sourdough & roasted arabica",
    categories: ["daily-toast", "coffee-specialties"],
  },
  {
    id: "liege",
    label: "Artisanal Liege Waffles",
    icon: "🧇",
    subtitle: "Caramelized pearl sugar foundations & ganaches",
    categories: ["classic-waffles", "chocolatey-waffles", "chocolatey-overloaded", "premium-royal", "ice-cream-waffles"],
  },
  {
    id: "cheesecake",
    label: "New York Cheesecake Waffles",
    icon: "🍰",
    subtitle: "Philadelphia cheese fluff meets hot rotary iron",
    categories: ["cheesecake-waffles"],
  },
  {
    id: "sundaes-shakes",
    label: "Crystal Coupes & Freakshakes",
    icon: "🍨",
    subtitle: "Large gelato sundaes & marble-flute shakes",
    categories: ["waffle-sundaes", "gourmets-island", "milkshakes-beverages"],
  },
  {
    id: "cakes",
    label: "Celebration Waffle Cakes",
    icon: "🎂",
    subtitle: "Architectural multi-tiered edible monuments",
    categories: ["waffle-cakes"],
  },
  {
    id: "savory",
    label: "Bistro Craft, Pizzas & Coolers",
    icon: "🍕",
    subtitle: "Stone-baked pizzas, brioche burgers & crisp coolers",
    categories: ["pizzas-burgers", "savory-bites", "fresh-salads", "refreshing-mojitos"],
  },
];

export function getSensoryProfile(item: MenuItem): SensoryProfile {
  const cat = item.category;

  if (cat === "daily-toast") {
    return {
      texture: "Crusty Wild Sourdough · Silky Haas Avocado · Sea Salt Crunch",
      sweetness: 1,
      richness: 3,
      pairing: {
        name: "Flat White",
        category: "Artisanal Brew",
        price: 189,
        description: "Double-shot espresso paired with silky microfoam milk for the quintessential breakfast harmony.",
      },
      culinaryStory:
        "Baked fresh daily at 6:00 AM using slow cold-fermented sourdough. Toasted on heavy cast iron with cold-pressed olive oil.",
    };
  }

  if (cat === "cheesecake-waffles") {
    return {
      texture: "Silky Philadelphia Cream Cheese · Golden Pocket Crunch · Graham Dust",
      sweetness: 3,
      richness: 4,
      pairing: {
        name: "Wild Blueberry Mojito",
        category: "Artisanal Cooler",
        price: 169,
        description: "Crushed ice, muddled garden mint, and sparkling effervescence to cut through the rich cheesecake fluff.",
      },
      culinaryStory:
        "The marriage of New York patisserie and Brussels street craft: velvety cream cheese spread piped warm into crisp waffle pockets.",
    };
  }

  if (cat === "premium-royal" || cat === "chocolatey-overloaded") {
    return {
      texture: "Toasted Kataifi Crunch · Molten 54% Callebaut Ganache · Belgian Pearl Sugar",
      sweetness: 4,
      richness: 5,
      pairing: {
        name: "Signature Cold Coffee",
        category: "Cold Brew",
        price: 249,
        description: "Intense espresso pulled over sweetened condensed milk balances the deep cocoa intensity.",
      },
      culinaryStory:
        "High confectionery inspiration featuring Iranian pistachios, Belgian speculoos cookie butter, and rich single-origin chocolates.",
    };
  }

  if (cat === "waffle-sundaes" || cat === "gourmets-island") {
    return {
      texture: "Arctic Gelato Quenelle · Steaming Waffle Cubes · Hot Molten Fudge",
      sweetness: 5,
      richness: 5,
      pairing: {
        name: "Peri-Peri Crinkle Fries",
        category: "Savory Bistro",
        price: 149,
        description: "The timeless Koramangala ritual: hot zesty spiced fries contrasting sweet melting gelato.",
      },
      culinaryStory:
        "Served in oversized crystal coupes, layering warm freshly pressed waffle bites with artisanal gelato scoops and molten cascades.",
    };
  }

  if (cat === "waffle-cakes") {
    return {
      texture: "Multi-Tiered Belgian Waffle Foundation · Whipped Frosting · Cocoa Pearls",
      sweetness: 5,
      richness: 5,
      pairing: {
        name: "Ruby Grenadine Mojito",
        category: "Sparkling Cooler",
        price: 169,
        description: "Vibrant pomegranate effervescence to raise a glass for your table celebration.",
      },
      culinaryStory:
        "Engineered for celebrations. Layers of freshly baked Liege discs bonded with silky buttercream and showered in cocoa treats.",
    };
  }

  if (cat === "coffee-specialties") {
    return {
      texture: "9-Bar Single Origin Arabica Pull · Velvety Microfoam · Rich Crema",
      sweetness: 1,
      richness: 3,
      pairing: {
        name: "Honey Butter Waffle",
        category: "Classic Liege",
        price: 99,
        description: "Warm caramelized Belgian sugar pearls harmonizing with the dark roasted chocolate undertones.",
      },
      culinaryStory:
        "Precision-roasted high-elevation Arabica beans ground on-demand and pulled through calibrated commercial brass portafilters.",
    };
  }

  if (cat === "pizzas-burgers" || cat === "savory-bites") {
    return {
      texture: "Stone-Baked Crust · Bubbling Mozzarella Cheese Pull · Crispy Brioche",
      sweetness: 1,
      richness: 4,
      pairing: {
        name: "Watermelon Splash Mojito",
        category: "Artisanal Cooler",
        price: 169,
        description: "Muddled mint and refreshing watermelon fizz to clean the palate between rich cheesy bites.",
      },
      culinaryStory:
        "Hand-stretched thin pizza crusts baked at 350°C and brioche buns toasted with garlic herb butter for satisfying crunch.",
    };
  }

  if (cat === "fresh-salads") {
    return {
      texture: "Hydroponic Crisp Greens · Shaved Parmesan / Feta · Toasted Seeds",
      sweetness: 1,
      richness: 2,
      pairing: {
        name: "Tart Cranberry Mojito",
        category: "Artisanal Cooler",
        price: 169,
        description: "A bright tart sparkle that accentuates crisp field greens and tangy balsamic dressings.",
      },
      culinaryStory:
        "Locally sourced pesticide-free greens tossed just seconds before serving with house-made emulsions and aged balsamic.",
    };
  }

  if (cat === "refreshing-mojitos") {
    return {
      texture: "Crushed Ice Crystals · Muddled Garden Mint · Sparkling Citrus Fizz",
      sweetness: 3,
      richness: 1,
      pairing: {
        name: "Artisanal Garlic Bread with Melted Mozzarella",
        category: "Savory Bistro",
        price: 169,
        description: "Warm melted mozzarella pull contrasting against frosty, bubbly citrus freshness.",
      },
      culinaryStory:
        "Handcrafted mocktails built over crystal ice using fresh citrus wedges, garden mint, and real fruit compotes.",
    };
  }

  // Default: Classic & Chocolatey Liege Waffles
  return {
    texture: "Caramelized Pearl Sugar Crust · Brioche Dough Core · Warm Ganache",
    sweetness: 4,
    richness: 4,
    pairing: {
      name: "Signature Cold Coffee",
      category: "Artisanal Brew",
      price: 249,
      description: "Our signature dark espresso cold whip balances the warm sweetness of Belgian pearl sugar.",
    },
    culinaryStory:
      "Hand-kneaded yeast dough studded with imported Belgian pearl sugar, pressed in heavy rotary cast-iron irons till golden.",
  };
}

export interface SignatureSpotlight {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  price: number;
  image: string;
  category: string;
  headlineNote: string;
}

export const SIGNATURE_SPOTLIGHTS: SignatureSpotlight[] = [
  {
    id: "ry-1",
    name: "Kunafa Pistachio Waffle",
    tagline: "Golden butter-toasted kataifi pastry ribbons, emerald pistachio cream & crushed nuts over warm Liege waffle.",
    badge: "HOUSE MASTERPIECE",
    price: 249,
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_51_58 PM.png",
    category: "premium-royal",
    headlineNote: "Middle Eastern Royalty",
  },
  {
    id: "dt-1",
    name: "The Chili-Ado Avocado Sourdough",
    tagline: "Ripe Haas avocado fanned over 6 AM whole-grain sourdough with sea salt and cold-pressed extra virgin olive oil.",
    badge: "MORNING 6 AM SIGNATURE",
    price: 249,
    image: "/assets/menu-matched/daily-toast.jpg",
    category: "daily-toast",
    headlineNote: "Cold-Fermented Sourdough",
  },
  {
    id: "ov-1",
    name: "Triple Chocomelt Waffle",
    tagline: "The holy trinity of dark Callebaut ganache, velvety milk chocolate, and Madagascar white cocoa cascades.",
    badge: "CHOCOLATE OBSESSION",
    price: 179,
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_51_42 PM.png",
    category: "chocolatey-overloaded",
    headlineNote: "54% Callebaut Ganache",
  },
  {
    id: "cc-1",
    name: "Blueberry Cheesecake Waffle",
    tagline: "Wild Canadian blueberry compote ribbons over whipped Philadelphia cream cheese swirl and graham crumble.",
    badge: "CHEESECAKE HIT",
    price: 169,
    image: "/assets/menu-matched/cheesecake-slice.jpg",
    category: "cheesecake-waffles",
    headlineNote: "Philadelphia Cream",
  },
  {
    id: "ws-1",
    name: "Death by Chocolate Brownie Sundae",
    tagline: "Warm Liege waffle cubes, fudgy dark brownie chunks, double chocolate gelato, and hot molten fudge cascade.",
    badge: "ICONIC COUPE",
    price: 199,
    image: "/assets/menu-matched/waffle-sundae.jpg",
    category: "waffle-sundaes",
    headlineNote: "Crystal Coupe Monument",
  },
  {
    id: "ms-3",
    name: "Ferrero Rocher Roar Shake",
    tagline: "Hand-spun Nutella gelato, whole Ferrero pralines, hazelnut praline syrup, and Dutch cocoa whipped cloud.",
    badge: "GRAND DECADENCE",
    price: 349,
    image: "/assets/web-assets/Decadent Chocolate Freakshake Splash.png",
    category: "milkshakes-beverages",
    headlineNote: "Double-Tier Freakshake",
  },
  {
    id: "pz-1",
    name: "Indi Veg Special Pizza",
    tagline: "Hand-stretched crust stone-baked with spiced tomato sugo, marinated paneer cubes, and bubbling mozzarella.",
    badge: "BISTRO BESTSELLER",
    price: 269,
    image: "/assets/menu-matched/pizzas-burgers.jpg",
    category: "pizzas-burgers",
    headlineNote: "Stone-Baked Crust",
  },
  {
    id: "cf-1",
    name: "Cappuccino",
    tagline: "Precision-pulled arabica espresso paired with silky steamed milk and velvety microfoam foam art.",
    badge: "BARISTA ESSENTIAL",
    price: 179,
    image: "/assets/live-site/coffee-brew.jpg",
    category: "coffee-specialties",
    headlineNote: "100% Roasted Arabica",
  },
];
