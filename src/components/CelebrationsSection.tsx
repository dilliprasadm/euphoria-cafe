"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, PartyPopper, Check, MessageCircle, Phone } from "lucide-react";

export default function CelebrationsSection() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "Birthday Celebration",
    date: today,
    time: "18:00",
    guests: "10",
    budget: "",
    rooftop: true,
    privateSpace: true,
    decoration: true,
    food: true,
    specialRequirements: "",
  });

  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please provide your name and phone number for event planning.");
      return;
    }

    const packageWants = [
      form.rooftop ? "✓ Rooftop Seating" : null,
      form.privateSpace ? "✓ Private Space Reserved" : null,
      form.decoration ? "✓ Custom Decor & Ambience" : null,
      form.food ? "✓ Food & Beverage Catering" : null,
    ].filter(Boolean).join("\n");

    const message = `*CELEBRATION / PRIVATE EVENT ENQUIRY — EUPHORIA CAFÉ*
----------------------------------------
*Host Name:* ${form.name}
*Phone:* ${form.phone}
*Occasion:* ${form.eventType}
*Preferred Date:* ${form.date}
*Preferred Time:* ${form.time}
*Estimated Guests:* ${form.guests}
${form.budget ? `*Budget Range:* ${form.budget}\n` : ""}
*Requirements Requested:*
${packageWants}

${form.specialRequirements ? `*Special Notes:* ${form.specialRequirements}\n` : ""}----------------------------------------
_Please share availability and customized package pricing!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919611966969?text=${encoded}`, "_blank");
    setDispatched(true);
  };

  return (
    <section id="celebrations" className="w-full bg-[#17130c] text-[#EBE1D5] py-24 px-6 lg:px-12 border-t border-[rgba(255,245,233,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase mb-3">
              <PartyPopper className="w-3.5 h-3.5 text-brand-caramel" />
              <span>CELEBRATE AT EUPHORIA</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider text-[#FFF5E9] uppercase leading-none">
              YOUR REASON TO CELEBRATE.<br />
              <span className="text-brand-pink">OUR ROOFTOP TO MAKE IT HAPPEN.</span>
            </h2>
          </div>

          <p className="font-body text-base text-[#D9C1C4] max-w-md leading-relaxed">
            Birthdays, anniversaries, bride-to-be &amp; groom-to-be parties, reunions, team gatherings, and intimate sunset meetups. Tell us the occasion, bring your people, and let Euphoria become part of the memory.
          </p>
        </div>

        {/* Content Grid: Photo Showcase (5 cols) + Event Inquiry Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Collage Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[rgba(255,245,233,0.12)]">
              <Image
                src="/assets/live-site/celebrations-spread.jpg"
                alt="Euphoria Cafe Celebration Table Setup"
                fill
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06]"
              />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#110e07]/85 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#17130c]/90 backdrop-blur-md border border-white/10 shadow-xl">
                <span className="font-mono text-[10px] text-brand-caramel uppercase tracking-widest block">
                  KORAMANGALA 6TH BLOCK ROOFTOP
                </span>
                <span className="font-display text-2xl text-[#FFF5E9] tracking-wider uppercase block mt-1">
                  CURATED CELEBRATION PACKAGES
                </span>
                <span className="font-body text-xs text-[#D9C1C4] block mt-1">
                  Custom dessert platters, fairy lights, sound system &amp; dedicated hospitality concierge.
                </span>
              </div>
            </div>
          </div>

          {/* Event Mini-Form Card */}
          <div className="lg:col-span-7 bg-[#1b1510] border border-[rgba(255,245,233,0.12)] rounded-3xl p-8 sm:p-10 shadow-2xl">
            {dispatched ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-3xl text-[#FFF5E9] tracking-wider uppercase">
                  EVENT INQUIRY DISPATCHED
                </h3>
                <p className="font-body text-sm text-[#D9C1C4] max-w-md">
                  Your celebration brief has opened in WhatsApp. Our events coordinator will reply with packages and photos.
                </p>
                <button
                  onClick={() => setDispatched(false)}
                  className="px-6 py-2.5 rounded-full bg-[#231f18] text-brand-caramel font-mono text-xs uppercase hover:bg-white/10 transition-all mt-4"
                >
                  Edit or Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs text-brand-caramel uppercase tracking-wider">
                    PLAN YOUR EVENT
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#FFF5E9] uppercase tracking-wider">
                    Request an Event Package
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Host Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Nair"
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  {/* Event Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Occasion / Event Type
                    </label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink transition-colors"
                    >
                      <option>Birthday Celebration</option>
                      <option>Anniversary Dinner</option>
                      <option>Bride-to-be / Groom-to-be</option>
                      <option>Corporate Meetup / Networking</option>
                      <option>College / School Reunion</option>
                      <option>Kitty Party / Brunch</option>
                      <option>Private Rooftop Gathering</option>
                    </select>
                  </div>

                  {/* Expected Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="100"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>
                </div>

                {/* Checkbox Inclusions */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                    What would you like included?
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: "rooftop", label: "Rooftop" },
                      { key: "privateSpace", label: "Private Space" },
                      { key: "decoration", label: "Custom Decor" },
                      { key: "food", label: "Food & Drinks" },
                    ].map(({ key, label }) => {
                      const checked = (form as any)[key];
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setForm({ ...form, [key]: !checked })}
                          className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all ${
                            checked
                              ? "bg-brand-wine/80 border-brand-pink text-white"
                              : "bg-[#110e07] border-white/10 text-outline hover:text-white"
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                              checked ? "bg-brand-pink text-brand-wine font-bold" : "border border-white/30"
                            }`}
                          >
                            {checked ? "✓" : ""}
                          </span>
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-[#D9C1C4] uppercase tracking-wider">
                    Special Requirements or Cake Requests
                  </label>
                  <textarea
                    rows={2}
                    value={form.specialRequirements}
                    onChange={(e) => setForm({ ...form, specialRequirements: e.target.value })}
                    placeholder="e.g. Personalized message on Waffle Cake, balloon setup, photography corner..."
                    className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-outline">
                    Instant package quotation dispatched via WhatsApp.
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-wine" />
                    <span>Enquire on WhatsApp ↗</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
