"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

export default function FloatingContact() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Mini Helper Pill on First Load */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1b1510]/95 text-[#FFF5E9] border border-brand-pink/30 px-3.5 py-1.5 rounded-full shadow-2xl backdrop-blur-md animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-[#EBE1D5]">
            Instant WhatsApp &amp; Call Desk
          </span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-outline hover:text-white ml-1"
            aria-label="Dismiss helper"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Action Buttons Column */}
      <div className="flex sm:flex-col items-center gap-2.5">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919611966969?text=Hi%20Euphoria%20Cafe!%20I%20have%20a%20question."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Euphoria Cafe on WhatsApp"
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20 stroke-[2.2]" />
          
          {/* Hover Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#110e07] text-[#FFF5E9] font-mono text-[11px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl border border-white/10 hidden sm:block">
            WhatsApp Desk
          </span>
        </a>

        {/* Telephone Call Button */}
        <a
          href="tel:+919611966969"
          aria-label="Call Euphoria Cafe direct desk"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-brand-chocolate border border-brand-caramel/40 text-brand-caramel shadow-2xl hover:bg-brand-wine hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <Phone className="w-5 h-5 stroke-[2.2]" />

          {/* Hover Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#110e07] text-[#FFF5E9] font-mono text-[11px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl border border-white/10 hidden sm:block">
            Call +91 96119 66969
          </span>
        </a>
      </div>
    </div>
  );
}
