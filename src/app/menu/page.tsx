"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MENU_CATEGORIES, MenuItem, MenuCategory } from "@/data/menuData";
import {
  Search,
  Phone,
  Sparkles,
  Flame,
  ArrowRight,
  Filter,
  Check,
  ChevronDown,
} from "lucide-react";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filtered categories and items based on search and selected category
  const filteredCategories = useMemo(() => {
    return MENU_CATEGORIES.map((category) => {
      const matchingItems = category.items.filter((item) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
      });

      return {
        ...category,
        items: matchingItems,
      };
    }).filter((category) => {
      if (activeCategory !== "all" && category.id !== activeCategory) {
        return false;
      }
      return category.items.length > 0;
    });
  }, [searchQuery, activeCategory]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-surface text-on-surface min-h-screen pt-28 pb-24">
      {/* 1. HERO HEADER */}
      <section className="w-full px-6 lg:px-12 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(255,245,233,0.1)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
              <span>KORAMANGALA DEGUSTATION CODEX</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-[#FFF5E9] leading-none uppercase">
              A WORLD OF<br />SWEETNESS.
            </h1>
            <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 max-w-xl leading-relaxed">
              Every creation is made to order. Authentic Belgian Liege pearls, melted Callebaut ganache, Philadelphia cheesecake frostings, and signature shakes. Served hot till 1:00 AM every night.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="tel:+919611966969"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-brand-wine bg-[#30201F] text-[#FFF5E9] hover:bg-brand-wine hover:border-brand-pink transition-all font-mono text-xs tracking-wider"
            >
              <Phone className="w-4 h-4 text-brand-caramel" />
              <span>Order Desk: +91 96119 66969</span>
            </a>

            <Link
              href="/find-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              <span>Visit Atelier</span>
            </Link>
          </div>
        </div>

        {/* Search & Quick Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search waffle, sundae, shake, cheesecake..."
              className="w-full bg-[#231f18] border border-[rgba(255,245,233,0.12)] rounded-full pl-11 pr-4 py-3 font-mono text-xs text-[#FFF5E9] placeholder:text-[#D9C1C4]/50 focus:outline-none focus:border-brand-caramel transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-outline hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>Showing verified prices · All taxes included</span>
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY JUMP BAR */}
      <div className="sticky top-20 z-40 bg-[#17130c]/95 backdrop-blur-xl border-y border-[rgba(255,245,233,0.1)] py-3 px-6 lg:px-12 mb-16">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                : "bg-[#231f18] text-[#D9C1C4] hover:bg-white/10"
            }`}
          >
            All Items
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                  : "bg-[#231f18] text-[#D9C1C4] hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY MATRICES */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-24 bg-[#1f1b14] rounded-2xl border border-white/5">
            <p className="font-display text-3xl text-[#FFF5E9]">NO CONFECTIONS FOUND</p>
            <p className="font-mono text-xs text-outline mt-2">
              Try searching for something else like &quot;Kunafa&quot;, &quot;Nutella&quot;, or &quot;Shake&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-brand-wine text-[#FFF5E9] font-mono text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-36 pt-6 flex flex-col"
            >
              {/* Category Header Card with High Impact Visual */}
              <div className="relative w-full rounded-2xl overflow-hidden mb-10 bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono text-brand-caramel uppercase tracking-widest">
                    <Flame className="w-4 h-4 text-brand-caramel" />
                    <span>{cat.headline}</span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-none uppercase">
                    {cat.name}
                  </h2>
                  <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="relative w-full lg:w-72 h-44 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-caramel uppercase">
                    {cat.items.length} CREATIONS
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <article
                    key={item.id}
                    className="bg-[#1f1b14] border border-[rgba(255,245,233,0.08)] hover:border-brand-caramel/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 group"
                  >
                    <div>
                      {/* Top Tag & Price */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        {item.tag ? (
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-wine/80 text-brand-pink font-bold border border-brand-pink/20">
                            {item.tag}
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-outline">
                            ORIGINAL RECIPE
                          </span>
                        )}

                        {/* Price Display */}
                        {item.priceVariants ? (
                          <div className="flex flex-col items-end">
                            <span className="font-display text-xl text-brand-caramel font-mono leading-none">
                              ₹{item.priceVariants[0].price} / ₹{item.priceVariants[1]?.price}
                            </span>
                            <span className="font-mono text-[9px] text-outline mt-0.5">
                              {item.priceVariants[0].size} / {item.priceVariants[1]?.size}
                            </span>
                          </div>
                        ) : (
                          <span className="font-display text-2xl text-brand-caramel font-mono leading-none">
                            ₹{item.price}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider mt-2 group-hover:text-brand-pink transition-colors">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="font-body text-xs text-[#D9C1C4] mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata & Call Action */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-outline">
                      <span className="text-[10px] tracking-wider uppercase">
                        FRESH PRESS // LIVE
                      </span>
                      <a
                        href="tel:+919611966969"
                        className="inline-flex items-center gap-1 text-secondary hover:text-white transition-colors"
                      >
                        <span>ORDER</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* 4. BOTTOM RESERVATION CTA */}
      <section className="mt-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#24030c] via-[#360815] to-[#1c0209] border border-brand-pink/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              KORAMANGALA LATE NIGHT SERVICE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#FFF5E9] tracking-wider leading-none">
              SOMETHING SWEET IS CALLING.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 leading-relaxed">
              Drop by with friends or give our order desk a call for quick pick-up. Fresh batter, hot waffle irons, and unforgettable dessert moments await.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <a
              href="tel:+919611966969"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              <Phone className="w-4 h-4 text-brand-wine" />
              <span>Call +91 96119 66969</span>
            </a>

            <Link
              href="/find-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/70 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
            >
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
