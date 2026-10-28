"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  X,
  Phone,
  MapPin,
  Heart,
  Camera,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "waffles" | "beverages" | "ambiance" | "savory";
  categoryLabel: string;
  tag: string;
  tastingNote: string;
  image: string;
  span?: string; // Tailwind grid span
}

const GALLERY_EXHIBITS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Pure Golden Liege & Salted Butter",
    category: "waffles",
    categoryLabel: "CLASSIC LIEGE",
    tag: "185°C ROTARY",
    tastingNote: "Caramelized pearl sugar crust with melting French salted butter.",
    image: "/assets/gallery/DSC06472.JPG",
    span: "lg:col-span-6 lg:row-span-2",
  },
  {
    id: "g-2",
    title: "Espresso Swirl Iced Latte",
    category: "beverages",
    categoryLabel: "COLD COFFEE",
    tag: "SINGLE ORIGIN",
    tastingNote: "Velvety whole milk marbling with freshly pulled double espresso.",
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_52_47 PM.png",
    span: "lg:col-span-3",
  },
  {
    id: "g-3",
    title: "Molten Ganache Cascade",
    category: "waffles",
    categoryLabel: "54% CALLEBAUT",
    tag: "COCOA FLOW",
    tastingNote: "Viscous bittersweet chocolate stream pooling into crisp grid pockets.",
    image: "/assets/web-assets/Decadent Chocolate Strawberry Waffle.png",
    span: "lg:col-span-3",
  },
  {
    id: "g-4",
    title: "Berry Coulis Cheesecake",
    category: "waffles",
    categoryLabel: "CHEESECAKE COUTURE",
    tag: "PHILADELPHIA FLUFF",
    tastingNote: "Tangy blueberry and strawberry compote over rich cream cheese fluff.",
    image: "/assets/web-assets/Glossy Berry Cheesecake Slice.png",
    span: "lg:col-span-3",
  },
  {
    id: "g-5",
    title: "Velvet Booths & Dusk",
    category: "ambiance",
    categoryLabel: "SANCTUARY",
    tag: "KORAMANGALA 5TH BLK",
    tastingNote: "Warm 2200K amber lighting, mahogany tables, and velvet banquette seating.",
    image: "/assets/gallery/DSC06476.JPG",
    span: "lg:col-span-3",
  },
  {
    id: "g-6",
    title: "Royal Kunafa Pistachio",
    category: "waffles",
    categoryLabel: "HOUSE MASTERPIECE",
    tag: "CRISP KATAIFI",
    tastingNote: "Toasted pastry ribbons with Iranian pistachio ganache and rose mist.",
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_51_58 PM.png",
    span: "lg:col-span-4",
  },
  {
    id: "g-7",
    title: "Ferrero Dual-Layer Stack",
    category: "waffles",
    categoryLabel: "CELEBRATION TIER",
    tag: "ROCHER PRALINE",
    tastingNote: "Whole Ferrero pralines, hazelnut cream, and chocolate ganache drips.",
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_52_26 PM.png",
    span: "lg:col-span-4",
  },
  {
    id: "g-8",
    title: "Midnight Conversations",
    category: "ambiance",
    categoryLabel: "COMMUNITY",
    tag: "UNTIL 01:00 AM",
    tastingNote: "Laughter, clinking glasses, and shared plates across late Bangalore hours.",
    image: "/assets/gallery/DSC06490.JPG",
    span: "lg:col-span-4",
  },
  {
    id: "g-9",
    title: "Crystal Coupe Sundae",
    category: "waffles",
    categoryLabel: "GELATO SUNDAE",
    tag: "MUDSLIDE FANTASY",
    tastingNote: "Brownie cubes, vanilla bean quenelle, waffle bites, and warm fudge.",
    image: "/assets/web-assets/Decadent Chocolate Strawberry Sundae.png",
    span: "lg:col-span-4",
  },
  {
    id: "g-10",
    title: "Chocolate Freakshake Splash",
    category: "beverages",
    categoryLabel: "HAND-SPUN",
    tag: "HEAVY CREAM",
    tastingNote: "Tall fountain glass loaded with fudge ganache and chantilly peak.",
    image: "/assets/web-assets/Decadent Chocolate Freakshake Splash.png",
    span: "lg:col-span-4",
  },
  {
    id: "g-11",
    title: "Rose Velvet Corner",
    category: "ambiance",
    categoryLabel: "INTERIOR DETAIL",
    tag: "WARM BRASS",
    tastingNote: "Quiet wooden corner nook with dusty rose cushions and soft lighting.",
    image: "/assets/gallery/DSC06478.JPG",
    span: "lg:col-span-4",
  },
  {
    id: "g-12",
    title: "Savory Garlic Bread & Fries",
    category: "savory",
    categoryLabel: "BISTRO CRUNCH",
    tag: "CHEESE PULL",
    tastingNote: "Toasted garlic baguette with melted mozzarella pull and golden fries.",
    image: "/assets/menu/ChatGPT Image May 12, 2026, 01_52_54 PM.png",
    span: "lg:col-span-6",
  },
  {
    id: "g-13",
    title: "Sweet Moments, Shared Daily",
    category: "ambiance",
    categoryLabel: "MEMORIES",
    tag: "EUPHORIA LOVES YOU",
    tastingNote: "Dessert plates cleared with wide smiles in the heart of Bengaluru.",
    image: "/assets/gallery/DSC06493.JPG",
    span: "lg:col-span-6",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredExhibits = GALLERY_EXHIBITS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <div className="w-full bg-surface text-on-surface min-h-screen pt-28 pb-24">
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(255,245,233,0.1)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
              <Camera className="w-3.5 h-3.5 text-brand-caramel" />
              <span>VISUAL ARCHIVE // KORAMANGALA</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-[#FFF5E9] leading-none uppercase">
              TOO GOOD NOT<br />TO SHARE.
            </h1>
            <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 max-w-xl leading-relaxed">
              An editorial photographic index of freshly pressed Belgian Liege creations, rich cacao drizzles, handcrafted sips, and warm café moments in Koramangala 5th Block.
            </p>
          </div>

          <a
            href="https://www.instagram.com/euphoria_cafe_koramangala/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-wine text-[#FFF5E9] border border-brand-pink/30 hover:border-brand-pink hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs uppercase tracking-wider group shadow-xl"
          >
            <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white" />
            <span>@EUPHORIA_CAFE_KORAMANGALA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {[
            { id: "all", label: "ALL EXHIBITS" },
            { id: "waffles", label: "WAFFLES & DESSERT" },
            { id: "beverages", label: "BEVERAGES & SHAKES" },
            { id: "ambiance", label: "AMBIANCE & MEMORIES" },
            { id: "savory", label: "SAVORY DELIGHTS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md shadow-brand-caramel/20 scale-105"
                  : "bg-[#231f18] text-[#D9C1C4] hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. ASYMMETRIC EDITORIAL PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px]">
          {filteredExhibits.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative rounded-3xl overflow-hidden bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-brand-caramel/50 ${
                item.span || "lg:col-span-4"
              }`}
            >
              {/* Photo Background */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#110e07] via-[#110e07]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Top Meta Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#17130c]/80 backdrop-blur-md text-brand-pink border border-white/10">
                  {item.categoryLabel}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#17130c]/80 backdrop-blur-md text-brand-caramel border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Caption & Tasting Note */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#17130c]/90 backdrop-blur-md border border-white/10 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl sm:text-2xl text-[#FFF5E9] tracking-wider uppercase group-hover:text-brand-pink transition-colors">
                    {item.title}
                  </h3>
                  <Maximize2 className="w-4 h-4 text-brand-caramel flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-body text-xs text-[#D9C1C4] mt-1 line-clamp-2">
                  {item.tastingNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-6 sm:p-12 flex items-center justify-center animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1b1510] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-brand-wine transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full md:w-3/5 h-80 md:h-[500px]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8 md:w-2/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-brand-caramel uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedImage.categoryLabel} // {selectedImage.tag}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-[#FFF5E9] tracking-wider uppercase mt-1">
                  {selectedImage.title}
                </h3>

                <p className="font-body text-sm text-[#D9C1C4] mt-4 leading-relaxed">
                  {selectedImage.tastingNote}
                </p>

                <div className="mt-6 p-4 rounded-xl bg-surface-container border border-white/5 font-mono text-xs text-outline space-y-2">
                  <div className="flex justify-between">
                    <span>SERVED AT:</span>
                    <span className="text-[#FFF5E9]">KORAMANGALA 5TH BLK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>OVEN TEMPER:</span>
                    <span className="text-brand-caramel">185°C ROTARY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TIMING:</span>
                    <span className="text-brand-pink">TILL 01:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-3">
                <Link
                  href="/menu"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-cream text-brand-chocolate font-mono text-xs font-bold uppercase tracking-widest hover:bg-brand-caramel hover:text-white transition-all"
                >
                  <span>Order from Menu</span>
                </Link>

                <a
                  href="https://www.instagram.com/euphoria_cafe_koramangala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 text-xs font-mono text-[#D9C1C4] hover:text-white hover:border-brand-pink transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-brand-pink" />
                  <span>Tag #EuphoriaKoramangala</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLOSING INSTAGRAM & VISIT CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-28">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#24030c] via-[#360815] to-[#1c0209] border border-brand-pink/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              SHARE YOUR SWEET MOMENT
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#FFF5E9] tracking-wider leading-none">
              READY FOR YOUR OWN SWEET MOMENT?
            </h2>
            <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 leading-relaxed">
              Drop by our Koramangala café tonight. Snap your waffle pull, tag @euphoria_cafe_koramangala, and let the sweetness linger.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              href="/find-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              <MapPin className="w-4 h-4 text-brand-wine" />
              <span>Visit Us Tonight</span>
            </Link>

            <a
              href="tel:+919611966969"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/70 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-brand-caramel" />
              <span>Call +91 96119 66969</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
