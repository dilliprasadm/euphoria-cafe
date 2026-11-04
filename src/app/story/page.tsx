"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Flame, Clock, MapPin, Phone, ArrowRight, Quote } from "lucide-react";

export default function StoryPage() {
  return (
    <div className="w-full bg-surface text-on-surface min-h-screen pt-28 pb-24 overflow-hidden">
      {/* 1. HERO OPENING */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        {/* Top Meta Ribbon */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(255,245,233,0.1)] font-mono text-xs text-outline">
          <div className="flex items-center gap-2 text-brand-caramel">
            <span className="w-2 h-2 rounded-full bg-brand-caramel animate-pulse" />
            <span>12.9352° N, 77.6245° E // KORAMANGALA 5TH BLOCK</span>
          </div>
          <span className="hidden sm:inline">ORIGIN CODEX · VOL. 01</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Typography Lockup (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase w-fit">
              <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
              <span>THE EUPHORIA PHILOSOPHY</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-[#FFF5E9] uppercase leading-[0.95]">
              MORE THAN WAFFLES.<br />
              <span className="text-brand-pink">A LITTLE WORLD OF HAPPINESS.</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-[#D9C1C4] leading-relaxed max-w-xl">
              Good food, sweet moments, and the people who make them memorable. An architectural patisserie and late-night dessert salon nestled in the pulsating heart of Koramangala.
            </p>

            <div className="flex items-center gap-6 pt-4 font-mono text-xs text-brand-caramel">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />
                <span>EST. IN KORAMANGALA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                <span>AUTHENTIC BELGIAN PEARL RECIPES</span>
              </div>
            </div>
          </div>

          {/* Hero Image with Floating Badge (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[rgba(255,245,233,0.12)]">
              <Image
                src="/assets/live-site/rooftop-seating.jpg"
                alt="Euphoria Cafe warm evening atmosphere and open-air rooftop seating"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#110e07]/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#231f18]/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-4">
                <Quote className="w-8 h-8 text-brand-pink flex-shrink-0" />
                <p className="font-serif italic text-xs text-[#FFF5E9] leading-snug">
                  &ldquo;Laughter carries further when the waffle is still steaming.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE EUPHORIA FEELING (SPLIT EDITORIAL) */}
      <section className="w-full bg-[#1b1510] py-24 px-6 lg:px-12 border-y border-[rgba(255,245,233,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Collage (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[rgba(255,245,233,0.1)]">
              <Image
                src="/assets/live-site/celebrations-spread.jpg"
                alt="Euphoria celebration table spread and happy gatherings"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06]"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#110e07]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Mascot Overlap Seal */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-brand-wine text-[#FFF5E9] p-4 rounded-2xl shadow-2xl border border-brand-pink/30 flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/assets/brand/euphoria-loves-u.png"
                  alt="Euphoria Loves You"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-lg tracking-wider text-brand-pink uppercase block leading-none">
                  EUPHORIA LOVES YOU
                </span>
                <span className="font-mono text-[9px] text-brand-caramel uppercase">
                  Sanctuary of Happiness
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Narrative (6 cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel">
              THE CORE PHILOSOPHY
            </span>

            <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] uppercase tracking-wider leading-none">
              GOOD MOOD.<br />GREAT FOOD.
            </h2>

            <p className="font-body text-base text-[#D9C1C4] leading-relaxed">
              A place to pause, catch up, share something sweet, and make an ordinary day feel a little more special. Euphoria was founded with an unbending conviction: dessert is not merely an afterthought at the conclusion of a meal—it is an emotional sanctuary.
            </p>

            <p className="font-body text-sm text-outline leading-relaxed">
              We built this corner in Koramangala for unhurried conversations: where late college shifts, startup sprints, tender first dates, and noisy celebratory friend reunions discover common solace in golden brioche and hand-whipped cream.
            </p>

            {/* Pull Quote Card */}
            <div className="p-6 rounded-2xl bg-brand-wine/40 border border-brand-pink/20">
              <p className="font-serif italic text-base sm:text-lg text-brand-pink leading-snug">
                &ldquo;Every table has a story. We just provide the chocolate.&rdquo;
              </p>
            </div>

            {/* Metric Pair */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono">
              <div>
                <span className="font-display text-3xl text-brand-caramel">2200K</span>
                <p className="text-xs text-outline mt-1">
                  Mellow amber glow engineered for unhurried conversations.
                </p>
              </div>
              <div>
                <span className="font-display text-3xl text-brand-pink">185°C</span>
                <p className="text-xs text-outline mt-1">
                  Heavy rotary cast irons caramelizing authentic pearl sugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A VISUAL JOURNEY THROUGH THE CAFÉ (ASYMMETRICAL GALLERY) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              SPATIAL CURATION
            </span>
            <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] tracking-wider uppercase leading-none">
              STEP INSIDE THE LIVING ROOM<br />OF KORAMANGALA
            </h2>
          </div>
          <p className="font-body text-sm text-[#D9C1C4] max-w-sm">
            From quiet book nooks to celebratory late-night waffle pours, here is our sensory space captured across real hours and real encounters.
          </p>
        </div>

        {/* Asymmetrical 4-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Wide Velvet Twilight Booth (7 cols) */}
          <div className="lg:col-span-7 bg-[#1f1b14] rounded-3xl overflow-hidden border border-white/10 shadow-xl group flex flex-col justify-between">
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/assets/google-photos/euphoria_google_photo_1.jpg"
                alt="Velvet booth twilight rooftop seating"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-caramel uppercase">
                ATMOSPHERE // 01
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                THE ROOFTOP TWILIGHT HAVEN
              </h3>
              <p className="font-body text-sm text-[#D9C1C4] mt-2 leading-relaxed">
                Open-air Koramangala skies and fairy-lit terrace seating contoured for uninterrupted late-night banter. Where friends linger over towering sundae bowls until closing time.
              </p>
            </div>
          </div>

          {/* Card 2: Quiet Corner Nook (5 cols) */}
          <div className="lg:col-span-5 bg-[#1f1b14] rounded-3xl overflow-hidden border border-white/10 shadow-xl group flex flex-col justify-between">
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/assets/google-photos/euphoria_google_photo_7.jpg"
                alt="Terrace seating and lush potted greenery"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-pink uppercase">
                SANCTUARY // 02
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                THE TERRACE GREENERY RETREAT
              </h3>
              <p className="font-body text-sm text-[#D9C1C4] mt-2 leading-relaxed">
                Plush cushioned benches, leafy palms, and freshly pulled espresso for writers, students, and daydreamers seeking a calm afternoon retreat.
              </p>
            </div>
          </div>

          {/* Card 3: Communal Table Rituals (5 cols) */}
          <div className="lg:col-span-5 bg-[#1f1b14] rounded-3xl overflow-hidden border border-white/10 shadow-xl group flex flex-col justify-between">
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/assets/google-photos/euphoria_google_photo_3.jpg"
                alt="Communal table dessert sharing and happy moments"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-caramel uppercase">
                COMMUNITY // 03
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                COMMUNAL TABLE RITUALS
              </h3>
              <p className="font-body text-sm text-[#D9C1C4] mt-2 leading-relaxed">
                Sharing plates stacked high with seasonal berries, house-churned gelatos, and cold brew coffees. Built for sharing tastes and trading stories.
              </p>
            </div>
          </div>

          {/* Card 4: The Molten Cocoa Elevation (7 cols) */}
          <div className="lg:col-span-7 bg-[#1f1b14] rounded-3xl overflow-hidden border border-white/10 shadow-xl group flex flex-col justify-between">
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/assets/google-photos/euphoria_google_photo_5.jpg"
                alt="Molten cocoa chocolate ganache pour on Liege waffle"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-brand-pink uppercase">
                GASTRONOMY // 04
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                THE MOLTEN COCOA ELEVATION
              </h3>
              <p className="font-body text-sm text-[#D9C1C4] mt-2 leading-relaxed">
                Single-origin couverture chocolate cascaded over crisp Belgian dough pockets at 185°C. Every order is a live sensory performance witnessed right before your eyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE LIVING RHYTHMS OF EUPHORIA */}
      <section className="w-full bg-[#110e07] py-24 px-6 lg:px-12 border-t border-[rgba(255,245,233,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              DAY-TO-NIGHT CADENCE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] uppercase tracking-wider leading-none">
              THREE RHYTHMS OF EUPHORIA:<br />CRAFTED FOR THE WAY YOU LIVE
            </h2>
            <p className="font-body text-sm text-[#D9C1C4] mt-4">
              Whether stepping in alone or arriving with your entire crew, Euphoria reshapes itself around your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rhythm 1 */}
            <div className="bg-[#1f1b14] border border-white/5 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-brand-caramel uppercase tracking-widest block mb-3">
                  01 // AFTERNOON STILLNESS
                </span>
                <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                  SWEET LITTLE BREAKS
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] mt-3 leading-relaxed">
                  Stepping away from work or studies for thirty quiet minutes. A piping hot classic honey waffle, a cold brew latte, and a moment to reset your mind.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-xs text-outline">
                HOURS: 11:00 AM – 04:00 PM
              </div>
            </div>

            {/* Rhythm 2 */}
            <div className="bg-brand-wine/30 border border-brand-pink/30 p-8 rounded-3xl flex flex-col justify-between shadow-xl">
              <div>
                <span className="font-mono text-xs text-brand-pink uppercase tracking-widest block mb-3">
                  02 // EVENING GATHERINGS
                </span>
                <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                  GOOD FOOD, BETTER COMPANY
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] mt-3 leading-relaxed">
                  The peak Koramangala hours. Tables crowded with friends clinking freakshake glasses, pulling apart hot garlic bread, and dividing waffle cakes.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-brand-pink/20 font-mono text-xs text-brand-pink">
                HOURS: 04:00 PM – 10:00 PM
              </div>
            </div>

            {/* Rhythm 3 */}
            <div className="bg-[#1f1b14] border border-white/5 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block mb-3">
                  03 // MIDNIGHT DESIRE
                </span>
                <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                  YOUR KIND OF EUPHORIA
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] mt-3 leading-relaxed">
                  The late-night dessert fix Bangalore swears by. Post-dinner date nights, midnight waffle cravings, and quiet nightcap scoops served till 1:00 AM.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-xs text-brand-caramel">
                HOURS: 10:00 PM – 01:00 AM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSING INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#24030c] via-[#360815] to-[#1c0209] border border-brand-pink/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              JOIN US AT THE TABLE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#FFF5E9] tracking-wider leading-none">
              COME MAKE A LITTLE HAPPINESS.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 leading-relaxed">
              We&apos;re located in Koramangala 5th Block, waiting to welcome you with warm waffles and cheerful smiles every single day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              href="/find-us"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              <MapPin className="w-4 h-4 text-brand-wine" />
              <span>Plan Your Visit</span>
            </Link>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/70 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
            >
              <span>Explore Menu Codex</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
