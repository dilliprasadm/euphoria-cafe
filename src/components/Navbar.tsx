"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu as MenuIcon, X, MapPin, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Our Story", href: "/story" },
  { name: "Gallery", href: "/gallery" },
  { name: "Find Us & Reservations", href: "/find-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#17130c]/95 backdrop-blur-xl border-b border-[rgba(255,245,233,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-caramel/40 bg-surface-container-high flex items-center justify-center p-1 group-hover:border-brand-pink transition-colors">
            <Image
              src="/assets/brand/logo.png"
              alt="Euphoria Café Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl lg:text-3xl tracking-widest text-[#FFF5E9] group-hover:text-brand-pink transition-colors leading-none">
              EUPHORIA CAFÉ
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-brand-caramel leading-tight mt-0.5">
              KORAMANGALA · BENGALURU
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-widest transition-all relative py-1 ${
                  isActive
                    ? "text-[#FFF5E9] font-bold"
                    : "text-[#EBE1D5]/70 hover:text-[#FFF5E9]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-caramel rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action: Phone Desk & Reserve Pill */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+919611966969"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#30201F]/60 text-[#FFF5E9] hover:bg-brand-wine/50 transition-all text-xs font-mono tracking-wider group"
          >
            <Phone className="w-3.5 h-3.5 text-brand-caramel" />
            <span className="text-secondary font-bold">+91 96119 66969</span>
          </a>

          <Link
            href="/find-us"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all text-xs font-mono font-bold tracking-wider uppercase shadow-xl"
          >
            <span>Reserve a Table</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#FFF5E9] hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#17130c]/98 border-b border-[rgba(255,245,233,0.12)] px-6 py-6 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-sm uppercase tracking-wider py-2 flex items-center justify-between border-b border-white/5 ${
                    isActive ? "text-brand-caramel font-bold" : "text-[#EBE1D5]/80"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />}
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+919611966969"
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-brand-wine bg-brand-chocolate text-[#FFF5E9] font-mono text-xs tracking-wider"
              >
                <Phone className="w-4 h-4 text-brand-caramel" />
                <span>Call Desk: +91 96119 66969</span>
              </a>

              <Link
                href="/find-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-cream text-brand-chocolate font-mono text-xs uppercase font-bold tracking-widest"
              >
                <MapPin className="w-4 h-4 text-brand-wine" />
                <span>Find Us & Reservations</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
