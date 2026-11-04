import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Instagram, Clock, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#110e07] border-t border-[rgba(255,245,233,0.1)] text-[#EBE1D5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(255,245,233,0.08)]">
          {/* Col 1: Brand & Manifesto (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-brand-caramel/40 bg-surface-container-high p-1 flex items-center justify-center">
                <Image
                  src="/assets/brand/logo.png"
                  alt="Euphoria Café Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl tracking-widest text-[#FFF5E9]">
                  EUPHORIA CAFÉ
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] text-brand-caramel uppercase">
                  KORAMANGALA · BENGALURU
                </span>
              </div>
            </Link>

            <p className="font-body text-sm text-[#D9C1C4] leading-relaxed max-w-sm">
              More than waffles. A sensory dessert sanctuary in Bengaluru where Belgian Liege craftsmanship meets late-night dessert culture. Every creation is freshly pressed, generously topped, and made to spark joy.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-brand-caramel pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-wine/30 border border-brand-wine/50">
                <span className="w-2 h-2 rounded-full bg-brand-caramel animate-pulse" />
                <span>OPEN TILL 01:00 AM DAILY</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFF5E9] font-bold">
              Explore
            </span>
            <ul className="flex flex-col gap-2.5 font-mono text-xs text-[#D9C1C4]">
              <li>
                <Link href="/" className="hover:text-brand-caramel transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-brand-caramel transition-colors">
                  Menu &amp; Order
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-brand-caramel transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-caramel transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/find-us" className="hover:text-brand-caramel transition-colors">
                  Reserve &amp; Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Dining (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFF5E9] font-bold">
              Hours
            </span>
            <div className="flex flex-col gap-3 font-mono text-xs text-[#D9C1C4]">
              <div>
                <span className="block text-brand-pink font-bold">Morning Breakfast</span>
                <span>Daily 6:00 AM – 11:00 AM</span>
                <span className="block text-[#FFF5E9]">Toasts &amp; Networking</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="block text-brand-caramel font-bold">Café &amp; Rooftop</span>
                <span>Daily 11:00 AM – 11:00 PM</span>
                <span className="block text-[#FFF5E9]">Waffles, Coffee &amp; Bites</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFF5E9] font-bold">
              Connect
            </span>
            <div className="flex flex-col gap-3 text-xs font-mono text-[#D9C1C4]">
              <a
                href="tel:+919611966969"
                className="flex items-center gap-2.5 text-[#FFF5E9] hover:text-brand-caramel transition-colors group"
              >
                <div className="w-7 h-7 rounded bg-brand-wine/40 flex items-center justify-center text-brand-caramel group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 96119 66969</span>
              </a>

              <a
                href="https://maps.google.com/?q=Euphoria+Cafe+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[#D9C1C4] hover:text-[#FFF5E9] transition-colors group"
              >
                <div className="w-7 h-7 rounded bg-brand-wine/40 flex items-center justify-center text-brand-caramel flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Koramangala 5th Block, Bengaluru, Karnataka 560095</span>
              </a>

              <a
                href="https://www.instagram.com/euphoria_cafe_koramangala/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#D9C1C4] hover:text-brand-pink transition-colors group pt-1"
              >
                <div className="w-7 h-7 rounded bg-brand-wine/40 flex items-center justify-center text-brand-pink group-hover:scale-110 transition-transform">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span>@euphoria_cafe_koramangala</span>
                <ArrowUpRight className="w-3 h-3 text-outline" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-outline">
          <div>
            © {new Date().getFullYear()} Euphoria Café · All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-brand-caramel">
            <span>Crafted with love in Koramangala</span>
            <Heart className="w-3 h-3 fill-brand-pink text-brand-pink" />
          </div>
        </div>
      </div>
    </footer>
  );
}
