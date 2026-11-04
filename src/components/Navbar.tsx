"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu as MenuIcon,
  X,
  MapPin,
  Sparkles,
  CalendarCheck,
  Clock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Our Story", href: "/story" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reservations", href: "/find-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#14100b]/95 backdrop-blur-xl border-b border-[rgba(255,245,233,0.08)] shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
          : "bg-gradient-to-b from-[#14100b]/90 via-[#14100b]/50 to-transparent border-b border-transparent"
      }`}
    >
      {/* Top Micro-Utility Bar */}
      <div className="hidden md:block w-full bg-[#0d0a07]/80 border-b border-white/5 py-1.5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-[#D9C1C4]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-caramel">
              <MapPin className="w-3 h-3 text-brand-caramel" />
              <span>880, 6th Cross Rd, Koramangala 6th Block, Bengaluru</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-brand-pink" />
              <span>Morning Breakfast 6 AM – 11 AM · Café 11 AM – 11 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919611966969?text=Hi%20Euphoria%20Cafe!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[10px] tracking-wider uppercase"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
            <span className="text-white/20">·</span>
            <span className="text-brand-pink font-semibold">ROOFTOP CAFÉ</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group flex-shrink-0">
          <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-brand-caramel/50 bg-[#17130c] flex items-center justify-center p-1 group-hover:border-brand-pink transition-all shadow-xl group-hover:scale-105">
            <Image
              src="/assets/brand/logo.png"
              alt="Euphoria Café Logo"
              width={52}
              height={52}
              className="object-contain w-full h-full p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-[#FFF5E9] group-hover:text-brand-pink transition-colors leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] whitespace-nowrap">
              EUPHORIA CAFÉ
            </span>
            <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.22em] uppercase text-brand-caramel leading-tight mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] font-semibold whitespace-nowrap">
              ROOFTOP · KORAMANGALA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body font-medium text-[13px] tracking-wider uppercase transition-all duration-200 relative py-1.5 whitespace-nowrap ${
                  isActive
                    ? "text-brand-caramel font-semibold"
                    : "text-[#EBE1D5]/80 hover:text-[#FFF5E9] hover:scale-105"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-brand-caramel via-brand-pink to-brand-caramel rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action: Phone Desk & Reserve Pill */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:+919611966969"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-[#231a16]/70 text-[#FFF5E9] hover:bg-brand-wine/60 hover:border-brand-pink/40 transition-all text-xs font-mono tracking-wider whitespace-nowrap group shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-brand-caramel group-hover:scale-110 transition-transform" />
            <span className="text-[#FFF5E9] font-medium whitespace-nowrap">+91 96119 66969</span>
          </a>

          <Link
            href="/find-us#reserve"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all text-xs font-mono font-bold tracking-wider uppercase shadow-xl whitespace-nowrap hover:scale-105 active:scale-95"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-brand-wine" />
            <span>Book a Table</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#FFF5E9] hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14100b]/98 border-b border-[rgba(255,245,233,0.12)] px-6 py-6 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-body font-medium text-sm uppercase tracking-wider py-2.5 flex items-center justify-between border-b border-white/5 ${
                    isActive ? "text-brand-caramel font-bold" : "text-[#EBE1D5]/80"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-brand-caramel" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-outline" />
                  )}
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/find-us#reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-cream text-brand-chocolate font-mono text-xs uppercase font-bold tracking-widest shadow-xl"
              >
                <CalendarCheck className="w-4 h-4 text-brand-wine" />
                <span>Book a Table Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919611966969"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-[#231a16] text-[#FFF5E9] font-mono text-xs tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>Call Desk</span>
                </a>

                <a
                  href="https://wa.me/919611966969?text=Hi%20Euphoria%20Cafe!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/30 bg-[#162a1e] text-emerald-300 font-mono text-xs tracking-wider"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
