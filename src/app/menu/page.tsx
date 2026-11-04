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
  Plus,
  Minus,
  ShoppingBag,
  X,
  Trash2,
  MessageCircle,
  MapPin,
  Check,
} from "lucide-react";

interface CartEntry {
  item: MenuItem;
  quantity: number;
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Customer order checkout fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"dine-in" | "takeaway" | "delivery">("takeaway");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [item.id]: { item, quantity },
      };
    });
  };

  const decrementCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return {
        ...prev,
        [itemId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
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
    () => cartEntries.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0),
    [cartEntries]
  );

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

  // Submit Order to WhatsApp
  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide your Name and WhatsApp phone number.");
      return;
    }

    if (fulfillment === "delivery" && !deliveryAddress.trim()) {
      alert("Please enter your Delivery Address.");
      return;
    }

    const itemsText = cartEntries
      .map(
        (entry, index) =>
          `${index + 1}. ${entry.item.name} × ${entry.quantity} = ₹${entry.item.price * entry.quantity}`
      )
      .join("\n");

    const message = `*NEW ONLINE ORDER — EUPHORIA CAFÉ*
----------------------------------------
*Customer Name:* ${customerName}
*Phone:* ${customerPhone}
*Fulfillment:* ${fulfillment.toUpperCase()}
${fulfillment === "delivery" ? `*Delivery Address:* ${deliveryAddress}\n` : ""}
*ORDER SUMMARY:*
${itemsText}

----------------------------------------
*Subtotal:* ₹${cartSubtotal}
*Taxes:* Included
${instructions ? `*Special Instructions:* ${instructions}\n` : ""}----------------------------------------
_Please confirm my order and estimated prep time!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919611966969?text=${encoded}`, "_blank");
    setOrderSent(true);
  };

  return (
    <div className="w-full bg-surface text-on-surface min-h-screen pt-28 pb-32">
      {/* 1. HERO HEADER */}
      <section className="w-full px-6 lg:px-12 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(255,245,233,0.1)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
              <span>ROOFTOP CAFÉ &amp; DESSERT CODEX</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-[#FFF5E9] leading-none uppercase">
              A WORLD OF<br />SWEETNESS &amp; BISTRO.
            </h1>
            <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 max-w-xl leading-relaxed">
              Every creation is prepared fresh to order. Artisanal Belgian Liege waffles, morning sourdough toasts, stone-baked pizzas, Philadelphia cheesecakes, and signature thick shakes. Order directly via WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="tel:+919611966969"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-brand-wine bg-[#30201F] text-[#FFF5E9] hover:bg-brand-wine hover:border-brand-pink transition-all font-mono text-xs tracking-wider"
            >
              <Phone className="w-4 h-4 text-brand-caramel" />
              <span>Call Desk: +91 96119 66969</span>
            </a>

            <Link
              href="/find-us#reserve"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              <span>Reserve a Table</span>
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
              placeholder="Search waffles, sourdough toast, pizza, burger, shakes..."
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

          <div className="flex items-center gap-3 text-xs font-mono text-outline">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border border-emerald-500 flex items-center justify-center p-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>100% Vegetarian Available</span>
            </div>
            <span>· Verified Prices (All Taxes Incl.)</span>
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY JUMP BAR */}
      <div className="sticky top-20 z-30 bg-[#17130c]/95 backdrop-blur-xl border-y border-[rgba(255,245,233,0.1)] py-3 px-6 lg:px-12 mb-16">
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
            <p className="font-display text-3xl text-[#FFF5E9]">NO SPECIMENS FOUND</p>
            <p className="font-mono text-xs text-outline mt-2">
              Try searching for something else like &quot;Kunafa&quot;, &quot;Toast&quot;, &quot;Pizza&quot; or &quot;Shake&quot;.
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
              {/* Category Header Card */}
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

                <div className="relative w-full lg:w-72 h-44 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10 group">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-caramel uppercase border border-white/10">
                    {cat.items.length} CREATIONS
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => {
                  const inCartQty = cart[item.id]?.quantity || 0;

                  return (
                    <article
                      key={item.id}
                      className="bg-[#1f1b14] border border-[rgba(255,245,233,0.08)] hover:border-brand-caramel/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 group relative"
                    >
                      <div>
                        {/* Top Row: Dietary Icon & Tag & Price */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {/* FSSAI Veg Marker */}
                            <span
                              className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 ${
                                item.isVeg !== false
                                  ? "border-emerald-500"
                                  : "border-red-500"
                              }`}
                              title={item.isVeg !== false ? "Vegetarian" : "Non-Vegetarian"}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.isVeg !== false ? "bg-emerald-500" : "bg-red-500"
                                }`}
                              />
                            </span>

                            {item.tag ? (
                              <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-wine/80 text-brand-pink font-bold border border-brand-pink/20">
                                {item.tag}
                              </span>
                            ) : null}
                          </div>

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

                      {/* Bottom Cart Action Row */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-outline">
                          MADE FRESH TO ORDER
                        </span>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-2 bg-[#2a1c17] border border-brand-caramel/50 rounded-full px-2 py-1">
                            <button
                              onClick={() => decrementCart(item.id)}
                              className="w-6 h-6 rounded-full bg-[#1b1510] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-brand-caramel px-1.5">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-6 h-6 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
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
        )}
      </div>

      {/* 4. FLOATING STICKY CART BAR (Appears when cart has items) */}
      {cartTotalCount > 0 && (
        <aside 
          aria-label="Cart summary bar"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-[#1b1510]/95 backdrop-blur-2xl border border-brand-pink/40 rounded-full p-2.5 sm:p-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4 animate-in slide-in-from-bottom-6 duration-300"
        >
          <div className="flex items-center gap-3 pl-3">
            <div className="relative w-10 h-10 rounded-full bg-brand-wine flex items-center justify-center text-brand-cream">
              <ShoppingBag className="w-5 h-5 text-brand-caramel" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-pink text-brand-chocolate font-mono text-[10px] font-bold flex items-center justify-center">
                {cartTotalCount}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#FFF5E9] font-bold">
                {cartTotalCount} {cartTotalCount === 1 ? "Item" : "Items"} in Bag
              </span>
              <span className="font-display text-lg text-brand-caramel font-mono leading-none">
                ₹{cartSubtotal}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xl transition-all"
            >
              <span>Review &amp; Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* 5. CART & CHECKOUT SLIDE-OVER DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#17130c] h-full border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-right duration-300"
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
                      YOUR SELECTION
                    </h2>
                    <span className="font-mono text-[11px] text-brand-caramel">
                      {cartTotalCount} {cartTotalCount === 1 ? "Item" : "Items"} · Direct WhatsApp Order
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#231f18] text-[#FFF5E9] hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {orderSent ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                    ORDER DISPATCHED
                  </h3>
                  <p className="font-body text-sm text-[#D9C1C4] max-w-xs">
                    Your order details have opened in WhatsApp. Our kitchen will review and start preparing your fresh delicacies.
                  </p>
                  <button
                    onClick={() => {
                      setOrderSent(false);
                      setIsDrawerOpen(false);
                      clearCart();
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-brand-caramel text-brand-chocolate font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-pink transition-all"
                  >
                    Done &amp; Clear Cart
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/5 py-4 max-h-[35vh] overflow-y-auto no-scrollbar pr-1">
                  {cartEntries.length === 0 ? (
                    <div className="py-12 text-center text-outline font-mono text-xs">
                      Your bag is currently empty.
                    </div>
                  ) : (
                    cartEntries.map(({ item, quantity }) => (
                      <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-display text-lg text-[#FFF5E9] tracking-wide">
                            {item.name}
                          </h4>
                          <span className="font-mono text-xs text-brand-caramel">
                            ₹{item.price} each · ₹{item.price * quantity}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementCart(item.id)}
                            className="w-7 h-7 rounded-full bg-[#231f18] text-[#FFF5E9] hover:bg-brand-wine flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#FFF5E9] w-5 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-full bg-brand-caramel text-brand-chocolate hover:bg-brand-pink flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-full text-outline hover:text-red-400 flex items-center justify-center transition-colors ml-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
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
                    How would you like to receive your order?
                  </label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {(["takeaway", "dine-in", "delivery"] as const).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFulfillment(type)}
                        className={`py-2 px-1 rounded-xl border text-center uppercase tracking-wider transition-all text-[11px] ${
                          fulfillment === type
                            ? "bg-brand-caramel text-brand-chocolate font-bold border-brand-caramel"
                            : "bg-[#231f18] border-white/10 text-outline hover:text-white"
                        }`}
                      >
                        {type}
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
                      placeholder="Your name"
                      className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase text-[#D9C1C4]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 Phone"
                      className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                    />
                  </div>
                </div>

                {/* Delivery Address (if delivery selected) */}
                {fulfillment === "delivery" && (
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase text-brand-pink flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-caramel" />
                      <span>Delivery Address (Koramangala &amp; Nearby) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Building, street, landmark, area"
                      className="bg-[#110e07] border border-brand-pink/40 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink"
                    />
                  </div>
                )}

                {/* Instructions */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase text-[#D9C1C4]">
                    Special Kitchen Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Less sweet, extra crisp waffle"
                    className="bg-[#110e07] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel"
                  />
                </div>

                {/* Subtotal & Action */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#D9C1C4]">Subtotal (Taxes included):</span>
                    <span className="font-display text-2xl text-brand-caramel font-mono">
                      ₹{cartSubtotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-mono text-xs font-bold uppercase tracking-widest shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Send Order to WhatsApp ↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full text-center font-mono text-[10px] text-outline hover:text-white uppercase tracking-wider py-1"
                  >
                    Empty Bag
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
