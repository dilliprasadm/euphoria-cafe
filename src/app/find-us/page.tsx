"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ArrowUpRight,
  Sparkles,
  Compass,
  Heart,
  CalendarCheck,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function FindUsPage() {
  return (
    <div className="w-full bg-surface text-on-surface min-h-screen pt-28 pb-24">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase w-fit">
              <Compass className="w-3.5 h-3.5 text-brand-caramel" />
              <span>SANCTUARY DISCOVERY // KORAMANGALA</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-wider text-[#FFF5E9] uppercase leading-[0.95]">
              FIND YOUR WAY<br />
              <span className="text-brand-pink">TO HAPPINESS.</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-[#D9C1C4] leading-relaxed max-w-xl">
              Plan your visit, save your seat, and get ready for a little moment of sweetness at Euphoria Café. Where Belgian Liege craftsmanship meets Koramangala’s late-night confectionery pulse.
            </p>

            {/* Primary Actions: Reserve, Directions, Call */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="tel:+919611966969"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl group"
              >
                <CalendarCheck className="w-4 h-4 text-brand-wine group-hover:text-white" />
                <span>RESERVE A TABLE</span>
              </a>

              <a
                href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/80 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
              >
                <MapPin className="w-4 h-4 text-brand-caramel" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href="tel:+919611966969"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-[#231f18] text-[#D9C1C4] hover:text-white hover:border-brand-pink transition-all font-mono text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-brand-pink" />
                <span>CALL THE CAFÉ</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[rgba(255,245,233,0.12)]">
              <Image
                src="/assets/gallery/DSC06473.JPG"
                alt="Euphoria Cafe Koramangala entrance welcoming guests"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110e07] via-transparent to-transparent opacity-80" />

              {/* Coordinates Pill */}
              <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-brand-wine/90 backdrop-blur-md text-brand-pink font-mono text-[10px] tracking-widest uppercase border border-brand-pink/30 shadow-lg">
                12.9352° N, 77.6245° E
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#17130c]/90 backdrop-blur-md border border-white/10 shadow-xl">
                <span className="font-mono text-[9px] text-brand-caramel uppercase tracking-widest block">
                  KORAMANGALA 5TH BLOCK
                </span>
                <span className="font-display text-2xl text-[#FFF5E9] tracking-wider uppercase block mt-1">
                  EUPHORIA SANCTUARY
                </span>
                <span className="font-body text-xs text-[#D9C1C4] block mt-0.5">
                  Warm ambient lighting, velvet seating &amp; rotary waffle iron bar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE RESERVATIONS SECTION — "LET'S SAVE YOU A SEAT" */}
      <section className="w-full bg-[#1b1510] py-24 px-6 lg:px-12 border-y border-[rgba(255,245,233,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
                TELEPHONE-BASED CONCIERGE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] tracking-wider uppercase leading-none">
                LET&apos;S SAVE YOU A SEAT.
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-[#D9C1C4] max-w-md leading-relaxed">
              Planning a date, catching up with friends, or simply craving something decadent after hours? Give us a call, and our hospitality team will gladly coordinate your seating.
            </p>
          </div>

          {/* Large Telephone Dispatch Panel */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#24030c] via-[#360815] to-[#1c0209] border border-brand-pink/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-brand-pink uppercase tracking-widest block mb-2">
                DIRECT TELEPHONE DISPATCH
              </span>
              <a
                href="tel:+919611966969"
                className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#FFF5E9] tracking-wider hover:text-brand-caramel transition-colors block"
              >
                +91 96119 66969
              </a>
              <span className="font-mono text-xs text-brand-caramel uppercase tracking-wider block mt-2">
                Live voice desk · Daily 11:00 AM – 11:30 PM IST
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 w-full lg:w-auto">
              <a
                href="tel:+919611966969"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl"
              >
                <Phone className="w-4 h-4 text-brand-wine" />
                <span>CALL TO RESERVE NOW</span>
              </a>
            </div>
          </div>

          {/* Transparent Process Notice */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-[#D9C1C4]">
            <div className="p-6 rounded-2xl bg-[#231f18] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-caramel flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[#FFF5E9] font-bold block mb-1">NO ONLINE QUEUES</span>
                <span>Speak directly with our team on the floor to check instant table availability.</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#231f18] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[#FFF5E9] font-bold block mb-1">CELEBRATION HOSTING</span>
                <span>Special custom waffle cake and seating arrangements for birthday parties.</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#231f18] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-caramel flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[#FFF5E9] font-bold block mb-1">WALK-INS WELCOME</span>
                <span>We always keep tables open for spontaneous dessert lovers every night.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & GOOGLE MAPS SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
              LOCATION PROTOCOL
            </span>
            <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] tracking-wider uppercase leading-none">
              COME FIND US
            </h2>
          </div>
          <p className="font-body text-sm text-[#D9C1C4] max-w-sm">
            Situated along the bustling avenues of Koramangala 5th Block, Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location & Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#1f1b14] border border-[rgba(255,245,233,0.1)] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-caramel font-mono text-xs uppercase tracking-widest mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>ADDRESS // 5TH BLOCK</span>
                </div>
                <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                  EUPHORIA CAFÉ
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] mt-2 leading-relaxed">
                  Koramangala 5th Block, Bengaluru, Karnataka 560095
                </p>
                <div className="mt-3 font-mono text-xs text-outline">
                  Ample two-wheeler and street parking adjacent.
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div>
                  <span className="font-mono text-xs text-brand-pink uppercase tracking-widest block mb-1">
                    OPERATING HOURS
                  </span>
                  <p className="font-body text-sm text-[#FFF5E9] font-bold">
                    Monday — Sunday, All Week
                  </p>
                  <p className="font-display text-2xl text-brand-caramel font-mono mt-0.5">
                    11:00 AM — 01:00 AM IST
                  </p>
                  <span className="font-mono text-[11px] text-outline block mt-1">
                    Continuous dine-in and late-night cravings
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="font-mono text-xs text-brand-caramel uppercase tracking-widest block mb-1">
                    COMMUNITY INSTAGRAM
                  </span>
                  <a
                    href="https://www.instagram.com/euphoria_cafe_koramangala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-[#FFF5E9] hover:text-brand-pink transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-brand-pink" />
                    <span>@euphoria_cafe_koramangala</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-outline" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-xl"
              >
                <MapPin className="w-4 h-4 text-brand-wine" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map Representation Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#17130c] border border-[rgba(255,245,233,0.1)] rounded-3xl overflow-hidden shadow-2xl relative min-h-[420px] flex flex-col justify-between p-8 sm:p-12">
            {/* Background Map Imagery / Aesthetic Grid */}
            <div className="absolute inset-0 z-0 bg-[#231f18] flex items-center justify-center">
              <Image
                src="/assets/gallery/DSC06474.JPG"
                alt="Euphoria Cafe Koramangala street presence"
                fill
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110e07] via-[#17130c]/70 to-[#110e07]/80" />
            </div>

            {/* Top Compass Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs text-brand-caramel">
                <Compass className="w-4 h-4 text-brand-caramel" />
                <span>KORAMANGALA 5TH BLOCK · BENGALURU</span>
              </div>
              <span className="font-mono text-xs text-outline hidden sm:inline">
                LAT 12.9352° · LNG 77.6245°
              </span>
            </div>

            {/* Center Pin Graphic */}
            <div className="relative z-10 my-auto text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-wine border-2 border-brand-pink flex items-center justify-center text-brand-cream shadow-2xl animate-pulse">
                <MapPin className="w-8 h-8 text-brand-caramel" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-[#FFF5E9] tracking-wider uppercase mt-4">
                EUPHORIA CAFÉ ATELIER
              </h3>
              <p className="font-body text-sm text-[#D9C1C4] max-w-sm mt-1">
                Your late-night dessert haven in Bengaluru
              </p>
            </div>

            {/* Bottom Maps Launch Button */}
            <div className="relative z-10 pt-4">
              <a
                href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#30201F]/90 border border-brand-caramel/40 text-brand-cream hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs uppercase tracking-wider backdrop-blur-md shadow-xl"
              >
                <span>Navigate Live with Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESSERT PREVIEW SECTION — "A LITTLE SOMETHING TO LOOK FORWARD TO" */}
      <section className="w-full bg-[#1b1510] py-24 px-6 lg:px-12 border-y border-[rgba(255,245,233,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-caramel block mb-2">
                CONFECTIONERY PREVIEWS
              </span>
              <h2 className="font-display text-5xl sm:text-6xl text-[#FFF5E9] tracking-wider uppercase leading-none">
                A LITTLE SOMETHING TO LOOK FORWARD TO
              </h2>
            </div>
            <p className="font-body text-sm text-[#D9C1C4] max-w-sm">
              Freshly pressed, molten ganache, and chilled glass creations awaiting your table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Preview 1: Waffles */}
            <div className="bg-[#1f1b14] border border-white/5 rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/assets/web-assets/Decadent Chocolate Strawberry Waffle.png"
                  alt="Golden Belgian Liege waffle with molten chocolate"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur-md text-brand-caramel">
                  WAFFLE ARCHITECTURE
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider uppercase">
                  MADE FOR THE CRAVINGS
                </h3>
                <p className="font-body text-xs text-[#D9C1C4] mt-2 leading-relaxed">
                  Deep Belgian Liege pockets caramelizing pearl sugars at 185°C. Topped with strawberries and 54% Callebaut ganache.
                </p>
              </div>
            </div>

            {/* Preview 2: Cheesecakes & Sundaes */}
            <div className="bg-[#1f1b14] border border-white/5 rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/assets/web-assets/Glossy Berry Cheesecake Slice.png"
                  alt="Cheesecake Waffle with berry coulis"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur-md text-brand-pink">
                  NEW YORK HYBRID
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider uppercase">
                  LITTLE MOMENTS, EXTRA SWEET
                </h3>
                <p className="font-body text-xs text-[#D9C1C4] mt-2 leading-relaxed">
                  Smooth Philadelphia-style cream cheese fluff, spiced speculoos cookie crust, and glossy wild blueberry reduction.
                </p>
              </div>
            </div>

            {/* Preview 3: Milkshakes */}
            <div className="bg-[#1f1b14] border border-white/5 rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/assets/web-assets/Decadent Chocolate Freakshake Splash.png"
                  alt="Hand-spun thick chocolate freakshake"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur-md text-brand-caramel">
                  CHILLED FLUTES
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider uppercase">
                  SIP SOMETHING WONDERFUL
                </h3>
                <p className="font-body text-xs text-[#D9C1C4] mt-2 leading-relaxed">
                  Hand-spun thick freakshakes, signature cold brews, and refreshing iced sodas crafted for late Bangalore nights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA — "COME HUNGRY. LEAVE HAPPY." */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-28">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-r from-[#24030c] via-[#360815] to-[#1c0209] border border-brand-pink/40 text-center flex flex-col items-center shadow-2xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-brand-pink text-brand-pink" />
            <span>KORAMANGALA AWAITS</span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#FFF5E9] tracking-wider uppercase leading-none">
            COME HUNGRY. LEAVE HAPPY.
          </h2>

          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-4 max-w-xl leading-relaxed">
            Whether it&apos;s a mid-afternoon espresso, a post-dinner date, or a midnight celebration with friends, our tables are ready for you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919611966969"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl"
            >
              <CalendarCheck className="w-4 h-4 text-brand-wine" />
              <span>RESERVE A TABLE</span>
            </a>

            <a
              href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/80 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
            >
              <MapPin className="w-4 h-4 text-brand-caramel" />
              <span>GET DIRECTIONS</span>
            </a>

            <a
              href="tel:+919611966969"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-[#231f18] text-[#D9C1C4] hover:text-white hover:border-brand-pink transition-all font-mono text-xs font-bold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-brand-pink" />
              <span>CALL THE CAFÉ</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
