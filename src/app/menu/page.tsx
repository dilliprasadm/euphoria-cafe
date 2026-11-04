"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MENU_CATEGORIES, MenuItem, MenuCategory } from "@/data/menuData";
import {
  SensoryProfile,
  getSensoryProfile,
  MOOD_FILTERS,
  SIGNATURE_SPOTLIGHTS,
  INGREDIENT_CHIPS,
  SignatureSpotlight,
} from "@/data/sensoryData";
import {
  Search,
  Phone,
  Sparkles,
  Flame,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBag,
  X,
  Trash2,
  MessageCircle,
  MapPin,
  Check,
  LayoutGrid,
  ListFilter,
  SlidersHorizontal,
  Clock,
  Heart,
  Info,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sun,
  Moon,
  Compass,
  UtensilsCrossed,
  Layers,
  Award,
  Zap,
} from "lucide-react";

interface CartEntry {
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  unitPrice: number;
}

type ViewMode = "atelier" | "codex";
type PriceFilter = "all" | "under-180" | "180-280" | "luxe";

export default function MenuPage() {
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMood, setActiveMood] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("atelier");

  // Selected item variant state for cards (itemId -> selected size)
  const [itemSizeSelections, setItemSizeSelections] = useState<Record<string, string>>({});

  // Tasting Notes Modal State
  const [inspectedItem, setInspectedItem] = useState<MenuItem | null>(null);
  const [modalSelectedSize, setModalSelectedSize] = useState<string | null>(null);

  // Cart & Order State
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Customer order checkout fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"dine-in" | "takeaway" | "delivery">("takeaway");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Keyboard accessibility: ESC closes modal & drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectedItem(null);
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Spotlight carousel ref & scroll helper
  const spotlightRef = useRef<HTMLDivElement>(null);
  const scrollSpotlight = (direction: "left" | "right") => {
    if (spotlightRef.current) {
      const scrollAmount = spotlightRef.current.clientWidth * 0.75;
      spotlightRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Synchronize modal selected size when inspected item changes
  useEffect(() => {
    if (inspectedItem) {
      if (inspectedItem.priceVariants && inspectedItem.priceVariants.length > 0) {
        setModalSelectedSize(inspectedItem.priceVariants[0].size);
      } else {
        setModalSelectedSize(null);
      }
    }
  }, [inspectedItem]);

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Helper to determine item effective price & size
  const getItemSizeAndPrice = (item: MenuItem, requestedSize?: string) => {
    if (item.priceVariants && item.priceVariants.length > 0) {
      const chosenSize = requestedSize || itemSizeSelections[item.id] || item.priceVariants[0].size;
      const matched = item.priceVariants.find((v) => v.size === chosenSize) || item.priceVariants[0];
      return { size: matched.size, price: matched.price };
    }
    return { size: undefined, price: item.price };
  };

  // Cart operations
  const addToCart = (item: MenuItem, specificSize?: string) => {
    const { size, price } = getItemSizeAndPrice(item, specificSize);
    const cartKey = size ? `${item.id}-${size}` : item.id;

    setCart((prev) => {
      const existing = prev[cartKey];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [cartKey]: {
          item,
          quantity,
          selectedSize: size,
          unitPrice: price,
        },
      };
    });

    const sizeLabel = size ? ` (${size})` : "";
    triggerToast(`Added ${item.name}${sizeLabel} to your tasting bag`);
  };

  const decrementCart = (cartKey: string) => {
    setCart((prev) => {
      const existing = prev[cartKey];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const copy = { ...prev };
        delete copy[cartKey];
        return copy;
      }
      return {
        ...prev,
        [cartKey]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[cartKey];
      return copy;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Cart Totals
  const cartEntries = useMemo(() => Object.values(cart), [cart]);
  const cartTotalCount = useMemo(
    () => cartEntries.reduce((acc, curr) => acc + curr.quantity, 0),
    [cartEntries]
  );
  const cartSubtotal = useMemo(
    () => cartEntries.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0),
    [cartEntries]
  );

  // Complimentary Gift Threshold: ₹599
  const GIFT_THRESHOLD = 599;
  const giftProgress = Math.min(100, Math.round((cartSubtotal / GIFT_THRESHOLD) * 100));
  const giftRemaining = Math.max(0, GIFT_THRESHOLD - cartSubtotal);

  // Quick Mood Filter mapping
  const activeMoodObj = useMemo(
    () => MOOD_FILTERS.find((m) => m.id === activeMood) || MOOD_FILTERS[0],
    [activeMood]
  );

  // Filtered categories and items based on search, mood, veg, price & category
  const filteredCategories = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    const terms = rawQuery.split(/\s+/).filter(Boolean);

    return MENU_CATEGORIES.map((category) => {
      // Check if category belongs to active mood
      if (activeMoodObj.categories.length > 0 && !activeMoodObj.categories.includes(category.id)) {
        return { ...category, items: [] };
      }

      const matchingItems = category.items.filter((item) => {
        // Veg only filter
        if (isVegOnly && item.isVeg === false) {
          return false;
        }

        // Price filter
        if (priceFilter === "under-180" && item.price >= 180) return false;
        if (priceFilter === "180-280" && (item.price < 180 || item.price > 280)) return false;
        if (priceFilter === "luxe" && item.price <= 280) return false;

        // Search text matching
        if (terms.length === 0) return true;

        const nameText = item.name.toLowerCase();
        const descText = item.description ? item.description.toLowerCase() : "";
        const tagText = item.tag ? item.tag.toLowerCase() : "";
        const catText = `${category.name} ${category.headline || ""} ${category.subtitle || ""}`.toLowerCase();

        return terms.every(
          (term) =>
            nameText.includes(term) ||
            descText.includes(term) ||
            tagText.includes(term) ||
            catText.includes(term)
        );
      });

      return {
        ...category,
        items: matchingItems,
      };
    }).filter((category) => category.items.length > 0);
  }, [searchQuery, activeMoodObj, isVegOnly, priceFilter]);

  // Total matching item count
  const totalMatchingItems = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0),
    [filteredCategories]
  );

  // Category smooth scroll jump
  const scrollToCategory = (id: string) => {
    // If active mood filter excludes this category, reset mood to all so category is visible
    if (activeMoodObj.categories.length > 0 && !activeMoodObj.categories.includes(id)) {
      setActiveMood("all");
    }
    setActiveCategory(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        const yOffset = isDesktop ? -170 : -145;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 60);
  };

  // Submit Order directly to WhatsApp
  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!customerName.trim() || cleanPhone.length < 10) {
      alert("Please provide your full Name and a valid 10-digit WhatsApp phone number.");
      return;
    }

    if (fulfillment === "dine-in" && !tableNumber.trim()) {
      alert("Please enter your Table Number for rooftop dine-in.");
      return;
    }

    if (fulfillment === "delivery" && !deliveryAddress.trim()) {
      alert("Please enter your Delivery Address in Koramangala or Bengaluru.");
      return;
    }

    const itemsText = cartEntries
      .map((entry, index) => {
        const sizeTag = entry.selectedSize ? ` (${entry.selectedSize})` : "";
        return `${index + 1}. *${entry.item.name}*${sizeTag} × ${entry.quantity} = ₹${
          entry.unitPrice * entry.quantity
        }`;
      })
      .join("\n");

    const giftUnlocked = cartSubtotal >= GIFT_THRESHOLD;

    const message = `✨ *NEW ORDER — EUPHORIA CAFÉ KORAMANGALA* ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${customerName}
📱 *Phone:* ${customerPhone}
📍 *Fulfillment:* ${fulfillment.toUpperCase()}
${fulfillment === "dine-in" ? `🪑 *Table Number:* ${tableNumber}\n` : ""}${
      fulfillment === "delivery" ? `🏠 *Delivery Address:* ${deliveryAddress}\n` : ""
    }
━━━━━━━━━━━━━━━━━━━━━━━━━━
🍽️ *TASTING SELECTION:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* ₹${cartSubtotal}
🔖 *Taxes:* All Applicable Taxes Included
${giftUnlocked ? `🎁 *COMPLIMENTARY:* Artisanal Belgian Chocolate Dip Unlocked!\n` : ""}${
      instructions ? `📝 *Kitchen Notes:* ${instructions}\n` : ""
    }━━━━━━━━━━━━━━━━━━━━━━━━━━
_Please confirm my order and approximate preparation time!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919611966969?text=${encoded}`, "_blank");
    setOrderSent(true);
  };

  // Robust Item Resolver by ID or Name
  const findItem = (id?: string, name?: string): MenuItem | undefined => {
    if (id) {
      for (const cat of MENU_CATEGORIES) {
        const found = cat.items.find((i) => i.id === id);
        if (found) return found;
      }
    }
    if (name) {
      const lower = name.toLowerCase().trim();
      for (const cat of MENU_CATEGORIES) {
        const found = cat.items.find((i) => i.name.toLowerCase().trim() === lower);
        if (found) return found;
      }
      for (const cat of MENU_CATEGORIES) {
        const found = cat.items.find(
          (i) => i.name.toLowerCase().includes(lower) || lower.includes(i.name.toLowerCase())
        );
        if (found) return found;
      }
    }
    return undefined;
  };

  return (
    <div className="w-full bg-[#14100b] text-[#ebe1d5] min-h-screen pt-28 pb-36 relative selection:bg-brand-pink selection:text-brand-burgundy">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-brand-burgundy/15 rounded-full blur-[140px]" />
        <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-brand-caramel/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-40 left-10 w-[600px] h-[600px] bg-brand-wine/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* 1. EDITORIAL MASTHEAD & LIVE CAFÉ STATUS                                   */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-12">
          {/* Top Live Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-[#1b1510]/80 border border-white/5 backdrop-blur-md mb-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9C1C4]">
                Koramangala 6th Block Rooftop · <span className="text-emerald-400 font-bold">Kitchen Active</span>
              </span>
            </div>

            <div className="flex items-center gap-5 font-mono text-xs text-[#D9C1C4]/80">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-brand-caramel" />
                <span>6 AM Sunrise Sourdough</span>
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-brand-pink" />
                <span>1 AM Midnight Sanctuary</span>
              </span>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[rgba(255,245,233,0.08)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-brand-wine/40 border border-brand-pink/30 text-brand-pink font-mono text-[11px] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
                <span>EUPHORIA TASTING CODEX · MMXXIV</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-[#FFF5E9] leading-[0.92] uppercase">
                A WORLD OF<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-caramel via-[#ffb77e] to-brand-pink">
                  SWEETNESS &amp; BISTRO
                </span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#ffdede]/90 mt-5 max-w-2xl leading-relaxed">
                &ldquo;Where Belgian pearl sugar crackles on heavy rotary irons, 6 AM cold-fermented sourdoughs meet ripe Haas avocados, and 54% Callebaut chocolate cascades into crystal coupes.&rdquo;
              </p>
            </div>

            {/* Quick Concierge CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px]">
              <a
                href="https://wa.me/919611966969?text=Hi%20Euphoria%20Caf%C3%A9!%20I'm%20exploring%20your%20menu%20and%20would%20like%20to%20order."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Direct WhatsApp Desk</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+919611966969"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#1f1b14] border border-white/10 hover:border-brand-caramel text-[#FFF5E9] font-mono text-xs tracking-wider transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>+91 96119 66969</span>
                </a>
                <Link
                  href="/find-us#reserve"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Reserve</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Micro Culinary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-[#1b1510]/50 border border-white/5">
              <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block mb-1">
                Curations
              </span>
              <span className="font-display text-2xl text-brand-caramel">16 CHAPTERS</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1b1510]/50 border border-white/5">
              <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block mb-1">
                Signature Recipes
              </span>
              <span className="font-display text-2xl text-[#FFF5E9]">90+ SPECIMENS</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1b1510]/50 border border-white/5">
              <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block mb-1">
                Liege Foundation
              </span>
              <span className="font-display text-2xl text-[#ffb77e]">PEARL SUGAR</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1b1510]/50 border border-white/5">
              <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block mb-1">
                Dietary Assurance
              </span>
              <span className="font-display text-2xl text-emerald-400">100% PURE VEG</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. "THE CHEF'S CANVAS" — SIGNATURE SPOTLIGHT SHOWCASE                     */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-16">
{/* Spotlight Showcase Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-caramel font-mono text-xs uppercase tracking-widest mb-1">
                <Award className="w-4 h-4 text-brand-caramel" />
                <span>THE CHEF&apos;S CANVAS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#FFF5E9] tracking-wider uppercase">
                ICONIC HOUSE CREATIONS
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#D9C1C4]/70 hidden md:inline">
                8 Masterpiece Curations
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollSpotlight("left")}
                  aria-label="Previous signature creations"
                  className="w-9 h-9 rounded-full bg-[#1b1510] border border-white/10 hover:border-brand-caramel text-[#FFF5E9] hover:text-brand-caramel flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSpotlight("right")}
                  aria-label="Next signature creations"
                  className="w-9 h-9 rounded-full bg-[#1b1510] border border-white/10 hover:border-brand-caramel text-[#FFF5E9] hover:text-brand-caramel flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Spotlight Horizontal Scroll Track */}
          <div
            ref={spotlightRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 scroll-smooth"
          >
            {SIGNATURE_SPOTLIGHTS.map((spotlight) => {
              // Find full item from menu
              const fullItem = findItem(spotlight.id, spotlight.name);
              const inCartQty = fullItem ? (cart[fullItem.id]?.quantity || 0) : 0;

              return (
                <div
                  key={spotlight.id}
                  className="group relative rounded-2xl bg-[#1b1510] border border-white/10 hover:border-brand-caramel/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-brand-caramel/10 flex-shrink-0 w-[290px] sm:w-[310px] snap-start"
                >
                  <div className="relative w-full h-48 overflow-hidden bg-black/40">
                    <Image
                      src={spotlight.image}
                      alt={spotlight.name}
                      fill
                      sizes="(max-width: 640px) 290px, 310px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1510] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-burgundy/90 border border-brand-pink/30 font-mono text-[9px] uppercase tracking-wider text-brand-pink font-bold">
                      {spotlight.badge}
                    </div>
                    <div className="absolute bottom-2.5 right-3 font-mono text-xs text-brand-caramel bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                      {spotlight.headlineNote}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-xl text-[#FFF5E9] tracking-wide group-hover:text-brand-pink transition-colors">
                          {spotlight.name}
                        </h3>
                        <span className="font-mono font-bold text-lg text-brand-caramel whitespace-nowrap">
                          ₹{spotlight.price}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#D9C1C4] leading-relaxed line-clamp-2">
                        {spotlight.tagline}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const target = fullItem || {
                            id: spotlight.id,
                            name: spotlight.name,
                            price: spotlight.price,
                            description: spotlight.tagline,
                            category: spotlight.category,
                            isVeg: true,
                          };
                          setInspectedItem(target);
                        }}
                        className="font-mono text-[10px] uppercase text-[#D9C1C4] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Info className="w-3.5 h-3.5 text-brand-caramel" />
                        <span>Tasting Notes</span>
                      </button>

                      {inCartQty > 0 && fullItem ? (
                        <div className="flex items-center gap-1.5 bg-[#2a1c17] border border-brand-caramel/50 rounded-full px-2 py-1">
                          <button
                            onClick={() => decrementCart(fullItem.id)}
                            className="w-5 h-5 rounded-full bg-[#1b1510] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-brand-caramel px-1">
                            {inCartQty}
                          </span>
                          <button
                            onClick={() => addToCart(fullItem)}
                            className="w-5 h-5 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const target = fullItem || {
                              id: spotlight.id,
                              name: spotlight.name,
                              price: spotlight.price,
                              description: spotlight.tagline,
                              category: spotlight.category,
                              isVeg: true,
                            };
                            addToCart(target);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-chocolate border border-brand-caramel/50 text-brand-caramel hover:bg-brand-caramel hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE SEARCH & MOOD CRAVING MATRIX                               */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-10">
          {/* Main Controls Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1b1510] border border-[rgba(255,245,233,0.1)] shadow-2xl space-y-6">
            {/* Row 1: Search Field + View Mode Switch */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-caramel" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ingredient (e.g. Pistachio, Sourdough, Nutella, Avocado, Espresso)..."
                  className="w-full bg-[#120e0a] border border-white/10 rounded-full pl-11 pr-24 py-3.5 font-mono text-xs text-[#FFF5E9] placeholder:text-[#D9C1C4]/40 focus:outline-none focus:border-brand-caramel transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#D9C1C4] hover:text-white bg-white/5 px-2 py-1 rounded"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* View Mode Switcher: Atelier vs Bistro Codex */}
              <div className="flex items-center gap-2 self-start md:self-auto bg-[#120e0a] p-1.5 rounded-full border border-white/10">
                <button
                  onClick={() => setViewMode("atelier")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                    viewMode === "atelier"
                      ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                      : "text-[#D9C1C4] hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Visual Atelier</span>
                </button>

                <button
                  onClick={() => setViewMode("codex")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                    viewMode === "codex"
                      ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                      : "text-[#D9C1C4] hover:text-white"
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Bistro Codex</span>
                </button>
              </div>
            </div>

            {/* Row 2: Ingredient Shortcut Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 whitespace-nowrap mr-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-brand-caramel" />
                <span>Explore Notes:</span>
              </span>
              {INGREDIENT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setSearchQuery(chip);
                    setActiveCategory("all");
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] whitespace-nowrap border transition-all ${
                    searchQuery.toLowerCase() === chip.toLowerCase()
                      ? "bg-brand-wine border-brand-pink text-[#FFF5E9]"
                      : "bg-[#120e0a] border-white/10 text-[#D9C1C4] hover:border-brand-caramel/50"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Row 3: Curate by Mood / Time of Day */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#D9C1C4]/70 mb-3 flex items-center justify-between">
                <span>Select Taste Mood &amp; Experience:</span>
                <span>{activeMoodObj.subtitle}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                {MOOD_FILTERS.map((mood) => {
                  const isActive = activeMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => {
                        setActiveMood(mood.id);
                        setActiveCategory("all");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isActive
                          ? "bg-gradient-to-br from-brand-wine/80 to-[#231518] border-brand-pink text-[#FFF5E9] shadow-lg shadow-brand-burgundy/30"
                          : "bg-[#120e0a] border-white/5 text-[#D9C1C4] hover:border-white/20"
                      }`}
                    >
                      <span className="text-xl mb-1">{mood.icon}</span>
                      <span className="font-display text-sm tracking-wider uppercase leading-snug">
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Secondary Filters (Veg Only & Price Brackets) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
              {/* Veg Only Toggle */}
              <button
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-xs uppercase tracking-wider transition-all ${
                  isVegOnly
                    ? "bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold"
                    : "bg-[#120e0a] border-white/10 text-[#D9C1C4] hover:text-white"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-sm border border-emerald-500 flex items-center justify-center p-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isVegOnly ? "bg-emerald-400" : "bg-emerald-600"}`} />
                </span>
                <span>100% Pure Veg Specimen</span>
                {isVegOnly && <Check className="w-3.5 h-3.5 ml-1 text-emerald-400" />}
              </button>

              {/* Price Tier Segment */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-[#D9C1C4]/60 mr-1 hidden sm:inline">Price:</span>
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "under-180", label: "Under ₹180" },
                    { id: "180-280", label: "₹180–₹280" },
                    { id: "luxe", label: "Luxe ₹280+" },
                  ] as const
                ).map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceFilter(tier.id)}
                    className={`px-3 py-1 rounded-full border transition-all text-[11px] ${
                      priceFilter === tier.id
                        ? "bg-brand-caramel text-brand-chocolate font-bold border-brand-caramel"
                        : "bg-[#120e0a] border-white/10 text-[#D9C1C4] hover:text-white"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Filter feedback */}
              <div className="font-mono text-xs text-brand-caramel">
                {totalMatchingItems} {totalMatchingItems === 1 ? "Creation" : "Creations"} Available
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. STICKY CATEGORY JUMP BAR                                              */}
        {/* ========================================================================= */}
        <div className="sticky top-20 md:top-[104px] z-30 bg-[#14100b]/95 backdrop-blur-xl border-y border-[rgba(255,245,233,0.08)] py-3 px-5 sm:px-8 lg:px-12 mb-12 shadow-xl">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                  : "bg-[#1f1b14] text-[#D9C1C4] hover:bg-white/10"
              }`}
            >
              All Categories
            </button>
            {MENU_CATEGORIES.map((cat) => {
              const count = cat.items.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md"
                      : "bg-[#1f1b14] text-[#D9C1C4] hover:bg-white/10"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. MENU SECTIONS: VISUAL ATELIER VS BISTRO CODEX                          */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-24">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-24 bg-[#1b1510] rounded-2xl border border-white/5">
              <p className="font-display text-4xl text-[#FFF5E9]">NO SPECIMENS FOUND</p>
              <p className="font-mono text-xs text-[#D9C1C4] mt-3 max-w-md mx-auto">
                No creations match your current criteria. Try resetting filters or searching for &quot;Pistachio&quot;, &quot;Toast&quot;, &quot;Nutella&quot; or &quot;Shake&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveMood("all");
                  setActiveCategory("all");
                  setIsVegOnly(false);
                  setPriceFilter("all");
                }}
                className="mt-6 px-7 py-3 rounded-full bg-brand-wine hover:bg-brand-burgundy border border-brand-pink/30 text-[#FFF5E9] font-mono text-xs uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "atelier" ? (
            /* ----------------------------------------------------------------------- */
            /* MODE A: VISUAL ATELIER (Sensory Card Grids)                              */
            /* ----------------------------------------------------------------------- */
            filteredCategories.map((cat, catIdx) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-36 pt-6 flex flex-col">
                {/* Category Header Card */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-[#1f1b14] via-[#1b1510] to-[#14100b] border border-[rgba(255,245,233,0.1)] p-8 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl">
                  <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono text-brand-caramel uppercase tracking-widest">
                      <Flame className="w-4 h-4 text-brand-caramel" />
                      <span>
                        CHAPTER {catIdx + 1} · {cat.headline}
                      </span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-none uppercase">
                      {cat.name}
                    </h2>
                    <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="relative w-full lg:w-72 h-44 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10 group">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 288px"
                      className="object-cover brightness-[1.05] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-caramel uppercase border border-white/10">
                      {cat.items.length} CREATIONS
                    </div>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item) => {
                    const sensory = getSensoryProfile(item);
                    const selectedSize = itemSizeSelections[item.id];
                    const { size, price } = getItemSizeAndPrice(item, selectedSize);
                    const cartKey = size ? `${item.id}-${size}` : item.id;
                    const inCartQty = cart[cartKey]?.quantity || 0;

                    return (
                      <article
                        key={item.id}
                        className="bg-[#1b1510] border border-[rgba(255,245,233,0.08)] hover:border-brand-caramel/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 group relative"
                      >
                        <div>
                          {/* Top Row: FSSAI Dietary Badge + Tag + Price */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              {/* Veg Indicator */}
                              <span
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 ${
                                  item.isVeg !== false ? "border-emerald-500" : "border-red-500"
                                }`}
                                title={item.isVeg !== false ? "100% Vegetarian" : "Non-Vegetarian"}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    item.isVeg !== false ? "bg-emerald-500" : "bg-red-500"
                                  }`}
                                />
                              </span>

                              {item.tag && (
                                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-wine/80 text-brand-pink font-bold border border-brand-pink/20">
                                  {item.tag}
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="font-display text-2xl text-brand-caramel font-mono leading-none">
                                ₹{price}
                              </span>
                              {item.priceVariants && item.priceVariants.length > 0 && (
                                <span className="font-mono text-[9px] text-[#D9C1C4]/60 block mt-0.5">
                                  {size}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Item Title (Clickable for Tasting Notes) */}
                          <button
                            onClick={() => setInspectedItem(item)}
                            className="text-left font-display text-2xl text-[#FFF5E9] tracking-wider group-hover:text-brand-pink transition-colors block w-full"
                          >
                            {item.name}
                          </button>

                          {/* Description */}
                          {item.description && (
                            <p className="font-body text-xs text-[#D9C1C4] mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {/* Sensory Texture Tag */}
                          <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-[#14100b] border border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#D9C1C4]/80">
                            <Zap className="w-3 h-3 text-brand-caramel flex-shrink-0" />
                            <span className="truncate">{sensory.texture}</span>
                          </div>

                          {/* Size Variant Selector (If item has variants) */}
                          {item.priceVariants && item.priceVariants.length > 0 && (
                            <div className="mt-3 flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-[#D9C1C4]/60 uppercase mr-1">
                                Size:
                              </span>
                              <div className="flex items-center gap-1 bg-[#14100b] p-1 rounded-lg border border-white/5">
                                {item.priceVariants.map((v) => (
                                  <button
                                    key={v.size}
                                    type="button"
                                    onClick={() =>
                                      setItemSizeSelections((prev) => ({
                                        ...prev,
                                        [item.id]: v.size,
                                      }))
                                    }
                                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                                      (selectedSize || item.priceVariants![0].size) === v.size
                                        ? "bg-brand-caramel text-brand-chocolate font-bold"
                                        : "text-[#D9C1C4] hover:text-white"
                                    }`}
                                  >
                                    {v.size} · ₹{v.price}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sommelier Pairing Hint */}
                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#ffb77e]">
                            <Coffee className="w-3 h-3 text-brand-caramel flex-shrink-0" />
                            <span>Pairs with: {sensory.pairing.name}</span>
                          </div>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <button
                            onClick={() => setInspectedItem(item)}
                            className="font-mono text-[10px] tracking-wider uppercase text-[#D9C1C4] hover:text-brand-pink flex items-center gap-1 transition-colors"
                          >
                            <Info className="w-3.5 h-3.5 text-brand-caramel" />
                            <span>Sommelier Notes</span>
                          </button>

                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-2 bg-[#2a1c17] border border-brand-caramel/50 rounded-full px-2 py-1">
                              <button
                                onClick={() => decrementCart(cartKey)}
                                className="w-6 h-6 rounded-full bg-[#1b1510] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold text-brand-caramel px-1.5">
                                {inCartQty}
                              </span>
                              <button
                                onClick={() => addToCart(item, size)}
                                className="w-6 h-6 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item, size)}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-chocolate border border-brand-caramel/50 text-brand-caramel hover:bg-brand-caramel hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            /* ----------------------------------------------------------------------- */
            /* MODE B: BISTRO CODEX (Typographic Editorial Menu)                       */
            /* ----------------------------------------------------------------------- */
            filteredCategories.map((cat, catIdx) => (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-36 pt-6 bg-[#1b1510] rounded-3xl border border-[rgba(255,245,233,0.08)] p-6 sm:p-12 shadow-2xl"
              >
                {/* Codex Category Header */}
                <div className="text-center pb-8 border-b border-white/10 mb-8 max-w-2xl mx-auto">
                  <span className="font-mono text-xs text-brand-caramel uppercase tracking-widest block mb-1">
                    CHAPTER {catIdx + 1}
                  </span>
                  <h2 className="font-display text-4xl sm:text-5xl text-[#FFF5E9] tracking-wider uppercase">
                    {cat.name}
                  </h2>
                  <p className="font-serif italic text-sm text-[#ffdede]/80 mt-2">
                    &ldquo;{cat.subtitle}&rdquo;
                  </p>
                </div>

                {/* Typographic Item Rows with Dotted Leaders */}
                <div className="divide-y divide-white/5 space-y-4">
                  {cat.items.map((item) => {
                    const selectedSize = itemSizeSelections[item.id];
                    const { size, price } = getItemSizeAndPrice(item, selectedSize);
                    const cartKey = size ? `${item.id}-${size}` : item.id;
                    const inCartQty = cart[cartKey]?.quantity || 0;

                    return (
                      <div
                        key={item.id}
                        className="pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group"
                      >
                        {/* Left Column: Veg Dot + Name + Dotted Leader */}
                        <div className="flex-1 pr-4">
                          <div className="flex items-baseline gap-2">
                            {/* Veg indicator dot */}
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 self-center ${
                                item.isVeg !== false ? "bg-emerald-400" : "bg-red-400"
                              }`}
                            />

                            <button
                              onClick={() => setInspectedItem(item)}
                              className="font-display text-xl sm:text-2xl text-[#FFF5E9] tracking-wide text-left group-hover:text-brand-pink transition-colors"
                            >
                              {item.name}
                            </button>

                            {item.tag && (
                              <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-brand-wine/80 text-brand-pink border border-brand-pink/20 font-bold self-center">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          {item.description && (
                            <p className="font-body text-xs text-[#D9C1C4] mt-1 pl-4 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Right Column: Size Variants + Price + Stepper */}
                        <div className="flex items-center gap-4 self-end sm:self-auto pl-4">
                          {/* Variant switcher */}
                          {item.priceVariants && item.priceVariants.length > 0 && (
                            <div className="flex items-center gap-1 bg-[#120e0a] p-1 rounded-lg border border-white/5">
                              {item.priceVariants.map((v) => (
                                <button
                                  key={v.size}
                                  type="button"
                                  onClick={() =>
                                    setItemSizeSelections((prev) => ({
                                      ...prev,
                                      [item.id]: v.size,
                                    }))
                                  }
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                                    (selectedSize || item.priceVariants![0].size) === v.size
                                      ? "bg-brand-caramel text-brand-chocolate font-bold"
                                      : "text-[#D9C1C4] hover:text-white"
                                  }`}
                                >
                                  {v.size}
                                </button>
                              ))}
                            </div>
                          )}

                          <span className="font-mono font-bold text-lg text-brand-caramel min-w-[70px] text-right">
                            ₹{price}
                          </span>

                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-2 bg-[#2a1c17] border border-brand-caramel/50 rounded-full px-2 py-1">
                              <button
                                onClick={() => decrementCart(cartKey)}
                                className="w-6 h-6 rounded-full bg-[#1b1510] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold text-brand-caramel px-1">
                                {inCartQty}
                              </span>
                              <button
                                onClick={() => addToCart(item, size)}
                                className="w-6 h-6 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item, size)}
                              className="px-3.5 py-1 rounded-full bg-brand-chocolate border border-brand-caramel/50 text-brand-caramel hover:bg-brand-caramel hover:text-white font-mono text-xs uppercase font-bold transition-all shadow active:scale-95"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        {/* ========================================================================= */}
        {/* 6. SOMMELIER TASTING NOTES MODAL                                          */}
        {/* ========================================================================= */}
        {inspectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setInspectedItem(null);
            }}
          >
            <div
              className="relative w-full max-w-xl bg-[#1b1510] border border-brand-pink/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectedItem(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#2a1f1b] hover:bg-white/10 text-[#FFF5E9] flex items-center justify-center transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div>
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-brand-wine/50 text-brand-pink font-mono text-[10px] uppercase tracking-widest border border-brand-pink/20">
                  <Sparkles className="w-3 h-3 text-brand-caramel" />
                  <span>SOMMELIER TASTING NOTES</span>
                </div>

                <div className="flex items-start justify-between gap-4 mt-2">
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl text-[#FFF5E9] uppercase tracking-wider">
                      {inspectedItem.name}
                    </h3>
                    <span className="font-mono text-xs text-brand-caramel mt-1 block">
                      {inspectedItem.category.replace("-", " ").toUpperCase()}
                    </span>
                  </div>

                  {/* FSSAI Veg Badge */}
                  <span
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center p-0.5 mt-1 ${
                      inspectedItem.isVeg !== false ? "border-emerald-500" : "border-red-500"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        inspectedItem.isVeg !== false ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                  </span>
                </div>

                {/* Culinary Story */}
                <div className="mt-5 p-4 rounded-xl bg-[#14100b] border border-white/5 space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block">
                    Culinary Heritage &amp; Craft
                  </span>
                  <p className="font-body text-xs text-[#FFF5E9] leading-relaxed">
                    {getSensoryProfile(inspectedItem).culinaryStory}
                  </p>
                  {inspectedItem.description && (
                    <p className="font-serif italic text-xs text-brand-pink/90 pt-1">
                      &ldquo;{inspectedItem.description}&rdquo;
                    </p>
                  )}
                </div>

                {/* Texture Profile */}
                <div className="mt-4 p-4 rounded-xl bg-[#14100b] border border-white/5">
                  <span className="font-mono text-[10px] uppercase text-[#D9C1C4]/60 block mb-1">
                    Texture &amp; Sensations
                  </span>
                  <span className="font-mono text-xs text-brand-caramel">
                    {getSensoryProfile(inspectedItem).texture}
                  </span>
                </div>

                {/* Sensory Scales (Sweetness & Richness) */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-[#14100b] border border-white/5">
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#D9C1C4]">Sweetness Index</span>
                      <span className="text-brand-caramel">
                        {getSensoryProfile(inspectedItem).sweetness}/5
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-caramel to-brand-pink rounded-full"
                        style={{
                          width: `${(getSensoryProfile(inspectedItem).sweetness / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#14100b] border border-white/5">
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#D9C1C4]">Richness Gauge</span>
                      <span className="text-brand-pink">
                        {getSensoryProfile(inspectedItem).richness}/5
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-burgundy to-brand-pink rounded-full"
                        style={{
                          width: `${(getSensoryProfile(inspectedItem).richness / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sommelier Beverage Pairing */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-brand-wine/40 to-[#1e1315] border border-brand-pink/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-pink block mb-0.5">
                      ✦ Recommended House Pairing
                    </span>
                    <span className="font-display text-lg text-[#FFF5E9]">
                      {getSensoryProfile(inspectedItem).pairing.name} (₹
                      {getSensoryProfile(inspectedItem).pairing.price})
                    </span>
                    <p className="font-body text-[11px] text-[#D9C1C4] mt-0.5 max-w-sm">
                      {getSensoryProfile(inspectedItem).pairing.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const pairing = getSensoryProfile(inspectedItem).pairing;
                      const pairingItem = findItem(undefined, pairing.name) || {
                        id: `pairing-${pairing.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                        name: pairing.name,
                        description: pairing.description,
                        price: pairing.price,
                        category: "pairings",
                        isVeg: true,
                      };
                      addToCart(pairingItem);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-md self-end sm:self-auto flex-shrink-0"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Pairing</span>
                  </button>
                </div>

                {/* Modal Size Selector (If applicable) */}
                {inspectedItem.priceVariants && inspectedItem.priceVariants.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="font-mono text-xs uppercase text-[#D9C1C4] block mb-2">
                      Choose Layer / Size Option:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {inspectedItem.priceVariants.map((v) => (
                        <button
                          key={v.size}
                          onClick={() => setModalSelectedSize(v.size)}
                          className={`p-3 rounded-xl border text-center font-mono text-xs uppercase transition-all ${
                            modalSelectedSize === v.size
                              ? "bg-brand-caramel text-brand-chocolate font-bold border-brand-caramel shadow-md"
                              : "bg-[#14100b] border-white/10 text-[#D9C1C4] hover:text-white"
                          }`}
                        >
                          <span className="block font-bold">{v.size}</span>
                          <span className="text-[11px]">₹{v.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer / Add to Bag Button */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#D9C1C4]/60 uppercase block">
                      Price
                    </span>
                    <span className="font-display text-3xl text-brand-caramel">
                      ₹
                      {modalSelectedSize && inspectedItem.priceVariants
                        ? inspectedItem.priceVariants.find((v) => v.size === modalSelectedSize)
                            ?.price || inspectedItem.price
                        : inspectedItem.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(inspectedItem, modalSelectedSize || undefined);
                      setInspectedItem(null);
                    }}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-brand-caramel to-[#e48399] text-brand-chocolate hover:opacity-95 font-mono text-xs font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Tasting Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. FLOATING STICKY TASTING BAG BAR (Appears when cart has items)          */}
        {/* ========================================================================= */}
        {cartTotalCount > 0 && (
          <aside
            aria-label="Tasting bag summary"
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-[#1b1510]/95 backdrop-blur-2xl border border-brand-pink/40 rounded-full p-2 sm:p-3 shadow-[0_10px_45px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2 sm:gap-4 animate-in slide-in-from-bottom-6 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-wine flex items-center justify-center text-brand-cream flex-shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-caramel" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-pink text-brand-chocolate font-mono text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow">
                  {cartTotalCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] sm:text-xs text-[#FFF5E9] font-bold whitespace-nowrap">
                  {cartTotalCount} {cartTotalCount === 1 ? "Specimen" : "Specimens"}
                </span>
                <span className="font-display text-base sm:text-lg text-brand-caramel font-mono leading-none">
                  ₹{cartSubtotal}
                </span>
              </div>
            </div>

            {/* Threshold progress indicator pill */}
            <div className="hidden md:flex flex-col items-center flex-1 max-w-[180px]">
              <span className="font-mono text-[9px] text-[#ffb77e] uppercase tracking-wider text-center truncate w-full">
                {giftRemaining > 0
                  ? `+₹${giftRemaining} for Free Belgian Dip`
                  : `🎁 Free Belgian Dip Unlocked!`}
              </span>
              <div className="w-full h-1 rounded-full bg-white/10 mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-caramel to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${giftProgress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xl transition-all flex-shrink-0"
            >
              <span>Review &amp; Order</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </aside>
        )}

        {/* ========================================================================= */}
        {/* 8. CART & WHATSAPP CHECKOUT SLIDE-OVER DRAWER                             */}
        {/* ========================================================================= */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsDrawerOpen(false);
            }}
          >
            <div
              className="w-full max-w-lg bg-[#14100b] h-full border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-right duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-wine/50 border border-brand-pink/30 flex items-center justify-center text-brand-caramel">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl text-[#FFF5E9] uppercase tracking-wider">
                        YOUR TASTING BAG
                      </h2>
                      <span className="font-mono text-[11px] text-brand-caramel">
                        {cartTotalCount} {cartTotalCount === 1 ? "Specimen" : "Specimens"} · Direct WhatsApp Kitchen Order
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 rounded-full bg-[#1f1b14] text-[#FFF5E9] hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Treat Banner */}
                <div className="mt-4 p-3 rounded-xl bg-[#1b1510] border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#D9C1C4]">
                      {giftRemaining > 0
                        ? `Add ₹${giftRemaining} more for Complimentary Dip`
                        : `🎉 Complimentary Belgian Chocolate Dip Unlocked!`}
                    </span>
                    <span className="text-brand-caramel font-bold">{giftProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-caramel to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${giftProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List or Dispatched Confirmation */}
                {orderSent ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                      ORDER DISPATCHED
                    </h3>
                    <p className="font-body text-sm text-[#D9C1C4] max-w-xs">
                      Your tasting order has opened in WhatsApp! Our kitchen will confirm preparation and start pressing your fresh waffles immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button
                        onClick={() => {
                          setOrderSent(false);
                          setIsDrawerOpen(false);
                          clearCart();
                        }}
                        className="px-6 py-2.5 rounded-full bg-brand-caramel text-brand-chocolate font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-pink transition-all"
                      >
                        Done &amp; Clear Bag
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderSent(false)}
                        className="px-5 py-2.5 rounded-full bg-[#1f1b14] border border-white/10 text-[#D9C1C4] hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
                      >
                        Keep &amp; Modify
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5 py-4 max-h-[35vh] overflow-y-auto no-scrollbar pr-1">
                    {cartEntries.length === 0 ? (
                      <div className="py-12 text-center text-[#D9C1C4]/50 font-mono text-xs">
                        Your tasting bag is currently empty.
                      </div>
                    ) : (
                      cartEntries.map(({ item, quantity, selectedSize, unitPrice }) => {
                        const cartKey = selectedSize ? `${item.id}-${selectedSize}` : item.id;
                        return (
                          <div key={cartKey} className="py-3.5 flex items-center justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-display text-lg text-[#FFF5E9] tracking-wide">
                                {item.name}
                              </h4>
                              <span className="font-mono text-xs text-brand-caramel">
                                {selectedSize ? `[${selectedSize}] · ` : ""}₹{unitPrice} each · ₹
                                {unitPrice * quantity}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrementCart(cartKey)}
                                className="w-7 h-7 rounded-full bg-[#1f1b14] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold text-[#FFF5E9] w-5 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() => addToCart(item, selectedSize)}
                                className="w-7 h-7 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(cartKey)}
                                className="w-7 h-7 rounded-full text-[#D9C1C4]/60 hover:text-red-400 flex items-center justify-center transition-colors ml-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Checkout Form & WhatsApp Button */}
              {!orderSent && cartEntries.length > 0 && (
                <form onSubmit={handleCheckoutWhatsApp} className="pt-6 border-t border-white/10 space-y-4">
                  {/* Fulfillment Selector */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#D9C1C4] block mb-2">
                      Fulfillment Method:
                    </label>
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      {(
                        [
                          { id: "takeaway", label: "Takeaway" },
                          { id: "dine-in", label: "Dine-In" },
                          { id: "delivery", label: "Delivery" },
                        ] as const
                      ).map(({ id, label }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => setFulfillment(id)}
                          className={`py-2 px-1 rounded-xl border text-center uppercase tracking-wider transition-all text-[11px] ${
                            fulfillment === id
                              ? "bg-brand-caramel text-brand-chocolate font-bold border-brand-caramel"
                              : "bg-[#1f1b14] border-white/10 text-[#D9C1C4] hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase text-[#D9C1C4]">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase text-[#D9C1C4]">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 Mobile number"
                        className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                      />
                    </div>
                  </div>

                  {/* Dine-in Table Number */}
                  {fulfillment === "dine-in" && (
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase text-brand-caramel flex items-center gap-1">
                        <UtensilsCrossed className="w-3 h-3 text-brand-caramel" />
                        <span>Rooftop Table Number *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 4 / Rooftop Deck"
                        className="bg-[#110e07] border border-brand-caramel/40 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                      />
                    </div>
                  )}

                  {/* Delivery Address */}
                  {fulfillment === "delivery" && (
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase text-brand-pink flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-caramel" />
                        <span>Delivery Address (Koramangala &amp; Bengaluru) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Building, street, flat, Koramangala area"
                        className="bg-[#110e07] border border-brand-pink/40 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                  )}

                  {/* Kitchen Special Instructions */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase text-[#D9C1C4]">
                      Special Kitchen Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="e.g. Extra crisp Liege pocket, less sweet"
                      className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                    />
                  </div>

                  {/* Subtotal & WhatsApp CTA */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#D9C1C4]">Subtotal (Taxes included):</span>
                      <span className="font-display text-2xl text-brand-caramel font-mono">
                        ₹{cartSubtotal}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-mono text-xs font-bold uppercase tracking-widest shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white/20" />
                      <span>Dispatch Order via WhatsApp ↗</span>
                    </button>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full text-center font-mono text-[10px] text-[#D9C1C4]/60 hover:text-white uppercase tracking-wider py-1"
                    >
                      Empty Bag
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 9. MICRO TOAST CONFIRMATION POPUP                                         */}
        {/* ========================================================================= */}
        {toastMessage && (
          <div className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:right-auto sm:left-6 z-50 bg-[#1b1510] border border-brand-pink/50 text-[#FFF5E9] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-mono text-xs animate-in slide-in-from-bottom-4 duration-200 max-w-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
