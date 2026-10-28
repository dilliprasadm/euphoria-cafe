"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import GoogleReviews from "@/components/GoogleReviews";
import InstagramFeed from "@/components/InstagramFeed";
import { MENU_CATEGORIES } from "@/data/menuData";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Flame,
  Droplets,
  Heart,
  Instagram,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterCategories = [
    { id: "all", label: "ALL SPECIMENS" },
    { id: "signature", label: "SIGNATURE WAFFLES" },
    { id: "cheesecake", label: "CHEESECAKE & CAKES" },
    { id: "sundae", label: "SUNDAES & GELATO" },
    { id: "shakes", label: "HIGH-DENSITY SHAKES" },
  ];

  return (
    <div className="w-full bg-surface text-on-surface">
      {/* 1. CINEMATIC SCROLL-CONTROLLED HERO STAGE */}
      <ScrollVideoCanvas totalFrames={120} scrollDistance="320vh" />

      {/* 2. MENU REALM — A WORLD OF SWEETNESS */}
      <section
        id="menu-realm"
        className="relative w-full bg-[#1b1510] text-[#EBE1D5] py-24 px-6 lg:px-12 border-t border-[rgba(255,245,233,0.1)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
                KORAMANGALA DEGUSTATION INDEX
              </span>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider text-[#FFF5E9] leading-none uppercase">
                A WORLD OF<br />SWEETNESS.
              </h2>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4">
              <p className="font-body text-sm sm:text-base text-[#D9C1C4] max-w-md lg:text-right leading-relaxed">
                Every Liege waffle is pressed live at 185°C on custom European rotary matrices. Layered with artisanal Belgian ganache, French purées, and freshly roasted nuts.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-wine text-[#FFF5E9] font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow-xl hover:bg-brand-caramel hover:text-white transition-all group"
              >
                <span>VIEW COMPLETE MENU CODEX</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5 pb-12 font-mono text-xs uppercase">
            {filterCategories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-2 rounded-full transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md shadow-brand-caramel/20 scale-105"
                    : "bg-[#231f18] text-[#D9C1C4] hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Asymmetric Editorial Grid / Specimen Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
            {/* Large Hero Card: Kunafa Pistachio (Cols 1-7) */}
            {(selectedFilter === "all" || selectedFilter === "signature") && (
              <article className="lg:col-span-7 bg-[#110e07] border border-[rgba(255,245,233,0.1)] rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="flex items-start justify-between z-10">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-brand-caramel uppercase tracking-widest">
                      HOUSE MASTERPIECE // SPECIMEN 01
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl text-[#FFF5E9] tracking-wider mt-1">
                      KUNAFA PISTACHIO WAFFLE
                    </h3>
                  </div>
                  <span className="font-display text-3xl sm:text-4xl text-brand-caramel font-mono">
                    ₹249
                  </span>
                </div>

                <div className="relative w-full h-80 my-6 rounded-xl overflow-hidden bg-surface-container">
                  <Image
                    src="/assets/menu/ChatGPT Image May 12, 2026, 01_51_58 PM.png"
                    alt="Kunafa Pistachio Waffle with toasted kataifi ribbons and emerald pistachio cream"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2 font-mono text-[11px] uppercase z-10">
                    <span className="bg-[#17130c]/90 text-brand-pink px-3 py-1 rounded backdrop-blur-md">
                      Crisp Kataifi
                    </span>
                    <span className="bg-[#17130c]/90 text-brand-caramel px-3 py-1 rounded backdrop-blur-md">
                      Pistachio Ganache
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 z-10">
                  <p className="font-body text-sm text-[#D9C1C4] max-w-md leading-relaxed">
                    Buttery golden kataifi strands crisped to perfection, layered with rich Iranian pistachio ganache and finished with rose-scented syrup mist.
                  </p>
                  <Link
                    href="/find-us"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-brand-caramel hover:text-brand-pink transition-colors font-bold flex-shrink-0"
                  >
                    <span>TASTE AT CAFÉ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            )}

            {/* Specimen 2: Lotus Biscoff Cheesecake (Cols 8-12) */}
            {(selectedFilter === "all" || selectedFilter === "cheesecake") && (
              <article className="lg:col-span-5 bg-[#231f18] border border-[rgba(255,245,233,0.1)] rounded-2xl p-8 flex flex-col justify-between shadow-xl group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-brand-pink uppercase tracking-widest">
                      CHEESECAKE COUTURE // 02
                    </span>
                    <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider mt-1">
                      LOTUS BISCOFF CHEESECAKE
                    </h3>
                  </div>
                  <span className="font-display text-3xl text-brand-pink font-mono">
                    ₹169
                  </span>
                </div>

                <div className="relative w-full h-52 my-6 rounded-xl overflow-hidden bg-surface-container">
                  <Image
                    src="/assets/web-assets/Glossy Berry Cheesecake Slice.png"
                    alt="Lotus Biscoff Cheesecake Waffle with speculoos cream cheese and biscuit crumbs"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-brand-wine text-brand-pink font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                    BESTSELLER
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <p className="font-body text-sm text-[#D9C1C4] leading-relaxed">
                    Decadent whipped cream cheese center, melted speculoos cookie butter cascade, and crumbled spiced caramel biscuits.
                  </p>
                  <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-outline border-t border-white/10 pt-4">
                    <span>SPECULOOS MATRIX // 185°C</span>
                    <span className="text-brand-caramel">PHILADELPHIA CORE</span>
                  </div>
                </div>
              </article>
            )}

            {/* Specimen 3: Decadent Strawberry Chocolate Waffle (Cols 1-4) */}
            {(selectedFilter === "all" || selectedFilter === "signature") && (
              <article className="lg:col-span-4 bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] rounded-2xl p-6 flex flex-col justify-between shadow-xl group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-brand-caramel uppercase tracking-widest">
                      SPECIMEN // 03
                    </span>
                    <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider mt-1">
                      DARK CHOCOLATE STRAWBERRY
                    </h3>
                  </div>
                  <span className="font-display text-2xl text-brand-caramel font-mono">
                    ₹179
                  </span>
                </div>

                <div className="relative w-full h-44 my-5 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/web-assets/Decadent Chocolate Strawberry Waffle.png"
                    alt="Decadent Chocolate Strawberry Waffle with fresh berries"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <p className="font-body text-xs text-[#D9C1C4] leading-relaxed">
                  Bittersweet 54% dark Callebaut chocolate ganache, ripe Mahabaleshwar strawberries, and caramelized pearl sugar crunch.
                </p>
              </article>
            )}

            {/* Specimen 4: Belgian Dark Cocoa Freakshake (Cols 5-8) */}
            {(selectedFilter === "all" || selectedFilter === "shakes") && (
              <article className="lg:col-span-4 bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] rounded-2xl p-6 flex flex-col justify-between shadow-xl group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-brand-pink uppercase tracking-widest">
                      SPECIMEN // 04
                    </span>
                    <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider mt-1">
                      CHOCOLATE FREAKSHAKE
                    </h3>
                  </div>
                  <span className="font-display text-2xl text-brand-pink font-mono">
                    ₹199
                  </span>
                </div>

                <div className="relative w-full h-44 my-5 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/web-assets/Decadent Chocolate Freakshake Splash.png"
                    alt="Tall artisanal chocolate freakshake splash in crystal coupe"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <p className="font-body text-xs text-[#D9C1C4] leading-relaxed">
                  Rich Belgian cocoa spun thick with gelato, dripping fudge ganache, whipped chantilly peak, and wafer straws.
                </p>
              </article>
            )}

            {/* Specimen 5: Crystal Coupe Sundae (Cols 9-12) */}
            {(selectedFilter === "all" || selectedFilter === "sundae") && (
              <article className="lg:col-span-4 bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] rounded-2xl p-6 flex flex-col justify-between shadow-xl group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-brand-caramel uppercase tracking-widest">
                      SPECIMEN // 05
                    </span>
                    <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider mt-1">
                      DEATH BY CHOCOLATE SUNDAE
                    </h3>
                  </div>
                  <span className="font-display text-2xl text-brand-caramel font-mono">
                    ₹199
                  </span>
                </div>

                <div className="relative w-full h-44 my-5 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/web-assets/Decadent Chocolate Strawberry Sundae.png"
                    alt="Death by Chocolate Brownie Sundae with waffle crisps"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <p className="font-body text-xs text-[#D9C1C4] leading-relaxed">
                  Fudgy brownie cubes, double chocolate gelato, warm Liege waffle bites, and molten chocolate fudge in crystal coupe.
                </p>
              </article>
            )}
          </div>

          {/* Quick Register Strip */}
          <div className="mt-16 p-8 rounded-2xl bg-[#110e07] border border-[rgba(255,245,233,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-wine/40 border border-brand-wine flex items-center justify-center text-brand-caramel">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display text-2xl text-[#FFF5E9] tracking-wider block">
                  EXPLORE OVER 60+ FRESHLY CRAFTED SPECIALTIES
                </span>
                <span className="font-mono text-xs text-[#D9C1C4]">
                  Waffle Cakes · Gourmet Platters · Cold Coffee · Garlic Bread & Fries
                </span>
              </div>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl flex-shrink-0"
            >
              <span>BROWSE ALL CATEGORIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY MATRIX — GOOD MOOD. GREAT FOOD. */}
      <section
        id="philosophy-matrix"
        className="relative w-full bg-[#17130c] py-24 px-6 lg:px-12 overflow-hidden border-t border-[rgba(255,245,233,0.08)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-caramel uppercase tracking-widest">
                <Flame className="w-4 h-4 text-brand-caramel" />
                <span>KORAMANGALA CAFE IDENTITY</span>
              </div>

              <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] uppercase tracking-wider leading-none">
                GOOD MOOD.<br />GREAT FOOD.
              </h2>

              <p className="font-body text-base sm:text-lg text-[#D9C1C4] leading-relaxed">
                Euphoria Café wasn’t built to be another quick-stop dessert kiosk. Tucked into the vibrant grid of Koramangala 5th Block, we engineered a warm, luminous haven where tactile crunch meets unapologetic indulgence.
              </p>

              <p className="font-body text-sm text-outline leading-relaxed">
                Our rotary waffle irons are calibrated precisely at 185°C to caramelize authentic Belgian pearl sugar instantly on contact, sealing an airy, pillow-soft crumb beneath a golden shatter-crisp exterior.
              </p>

              {/* Three Culinary Technical Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="bg-[#231f18] p-4 rounded-xl border border-white/5 flex flex-col">
                  <span className="font-display text-3xl text-brand-caramel font-mono">
                    185°C
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-1">
                    IRON TEMPER
                  </span>
                </div>
                <div className="bg-[#231f18] p-4 rounded-xl border border-white/5 flex flex-col">
                  <span className="font-display text-3xl text-brand-pink font-mono">
                    54%
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-1">
                    BELGIAN CACAO
                  </span>
                </div>
                <div className="bg-[#231f18] p-4 rounded-xl border border-white/5 flex flex-col">
                  <span className="font-display text-3xl text-secondary-fixed font-mono">
                    01 AM
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-1">
                    MIDNIGHT SERVICE
                  </span>
                </div>
              </div>
            </div>

            {/* Right Overlapping Photo Collage with Mascot Seal (7 cols) */}
            <div className="lg:col-span-7 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl border border-[rgba(255,245,233,0.12)]">
                <Image
                  src="/assets/gallery/DSC06476.JPG"
                  alt="Cozy ambient interior of Euphoria Cafe Koramangala with warm lighting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110e07]/80 via-transparent to-transparent" />
              </div>

              {/* Official Euphoria Loves You Mascot Seal */}
              <div className="absolute -bottom-6 -left-2 sm:left-6 bg-brand-wine/95 text-[#FFF5E9] p-4 sm:p-5 rounded-2xl shadow-2xl border border-brand-pink/30 max-w-xs flex items-center gap-4 backdrop-blur-xl">
                <div className="relative w-16 h-16 flex-shrink-0 animate-bounce duration-1000">
                  <Image
                    src="/assets/brand/euphoria-loves-u.png"
                    alt="Euphoria Loves You Official Seal"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl leading-none text-brand-pink tracking-wider uppercase">
                    EUPHORIA LOVES YOU
                  </span>
                  <span className="font-mono text-[10px] text-brand-caramel uppercase tracking-widest mt-1">
                    Official Mascot Seal of Happiness
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED GOOGLE REVIEWS SECTION */}
      <GoogleReviews />

      {/* 4. INSTAGRAM & SOCIAL MOMENTS GALLERY */}
      <InstagramFeed />

      {/* 5. VISIT ATELIER — YOUR NEXT HAPPY BITE AWAITS */}
      <section
        id="visit-atelier"
        className="relative w-full bg-[#110e07] text-[#EBE1D5] py-24 px-6 lg:px-12 border-t border-[rgba(255,245,233,0.1)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-brand-caramel uppercase tracking-widest block mb-2">
                VISIT US IN KORAMANGALA
              </span>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider text-brand-pink uppercase leading-none">
                YOUR NEXT HAPPY<br />BITE AWAITS.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-cream text-brand-chocolate font-mono text-xs font-bold uppercase rounded-full shadow-2xl hover:bg-brand-caramel hover:text-white transition-all"
              >
                <MapPin className="w-4 h-4 text-brand-wine" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href="tel:+919611966969"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-brand-wine bg-[#30201F]/80 text-[#FFF5E9] font-mono text-xs font-bold uppercase rounded-full hover:bg-brand-wine transition-all"
              >
                <Phone className="w-4 h-4 text-brand-caramel" />
                <span>CALL +91 96119 66969</span>
              </a>
            </div>
          </div>

          {/* 3 Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Location */}
            <div className="bg-[#1f1b14] border border-white/5 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 text-brand-caramel mb-4">
                <MapPin className="w-5 h-5 text-brand-caramel" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  GEOGRAPHIC PIN
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl text-[#FFF5E9] uppercase tracking-wider">
                  6TH BLOCK KORAMANGALA
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] leading-relaxed">
                  Euphoria Café, 880, 6th Cross Rd, 6th Block, Koramangala, Bengaluru, Karnataka 560095 (Near Koramangala Club)
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-outline">
                COORDINATES: 12.9349° N, 77.6250° E
              </div>
            </div>

            {/* Card 2: Hours */}
            <div className="bg-[#1f1b14] border border-white/5 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 text-brand-caramel mb-4">
                <Clock className="w-5 h-5 text-brand-caramel" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  SERVICE HOURS
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl text-[#FFF5E9] uppercase tracking-wider">
                  EVERY SINGLE DAY
                </h3>
                <p className="font-body text-sm text-brand-pink font-bold">
                  11:00 AM — 01:00 AM IST
                </p>
                <p className="font-body text-xs text-outline leading-relaxed">
                  Late-night dessert cravings, warm dine-in seating &amp; takeaway service.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-brand-caramel">
                STATUS: FRESH BATTER AT 185°C
              </div>
            </div>

            {/* Card 3: Reservations & Warm Invitation */}
            <div className="bg-brand-wine/50 border border-brand-pink/30 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 text-brand-pink mb-4">
                <Heart className="w-5 h-5 fill-brand-pink" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  RESERVATIONS
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl text-[#FFF5E9] uppercase tracking-wider">
                  LET&apos;S SAVE YOU A SEAT
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] leading-relaxed">
                  Planning a celebration or midnight waffle rendezvous? Ring our direct telephone desk.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brand-pink/20">
                <a
                  href="tel:+919611966969"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#FFF5E9] hover:text-brand-caramel transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-caramel" />
                  <span>+91 96119 66969 (CALL DESK)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
