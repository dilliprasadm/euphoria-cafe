"use client";

import React, { useState } from "react";
import { Calendar, Clock, Users, MapPin, Sparkles, Phone, MessageCircle } from "lucide-react";

export default function ReservationForm() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: today,
    time: "7:00 PM",
    guests: "2",
    seating: "Rooftop Terrace (Open-Air)",
    specialRequest: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number to reserve a table.");
      return;
    }

    // Build formatted WhatsApp message
    const message = `*TABLE RESERVATION REQUEST — EUPHORIA CAFÉ*
----------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}\n` : ""}*Date:* ${formData.date}
*Time Slot:* ${formData.time}
*Guests:* ${formData.guests} person(s)
*Seating Zone:* ${formData.seating}
${formData.specialRequest ? `*Special Request:* ${formData.specialRequest}\n` : ""}----------------------------------
_Please confirm availability for my party!_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919611966969?text=${encoded}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div id="reserve" className="w-full bg-[#1b1510] border border-[rgba(255,245,233,0.12)] rounded-3xl p-8 sm:p-12 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
            <span>TABLE CONCIERGE &amp; RESERVATION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#FFF5E9] uppercase tracking-wider leading-none">
            YOUR FAVOURITE SPOT.<br />
            <span className="text-brand-pink">WAITING FOR YOU.</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#D9C1C4] mt-3 max-w-xl leading-relaxed">
            Planning a date, coffee catch-up, morning networking session, or a late-night waffle rendezvous? Reserve your table in advance and arrive knowing your spot at Euphoria is ready.
          </p>
        </div>

        {/* Operating Hours Callout */}
        <div className="bg-[#110e07] border border-brand-caramel/30 rounded-2xl p-5 flex flex-col gap-2 min-w-[280px]">
          <span className="font-mono text-[10px] text-brand-caramel uppercase tracking-widest">
            ROOFTOP &amp; CAFÉ SCHEDULE
          </span>
          <div className="font-mono text-xs text-[#EBE1D5] space-y-1">
            <p>
              <strong className="text-brand-pink">Morning 6:00 AM – 11:00 AM:</strong>
              <br />Healthy Breakfast, Sourdough &amp; Networking
            </p>
            <p className="pt-1 border-t border-white/5">
              <strong className="text-brand-caramel">Café 11:00 AM – 11:00 PM:</strong>
              <br />Waffles, Shakes, Pizzas &amp; Desserts
            </p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-brand-wine/30 border border-brand-pink/40 text-center flex flex-col items-center justify-center gap-4">
          <span className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
            ✓
          </span>
          <h3 className="font-display text-2xl text-[#FFF5E9] tracking-wider">
            RESERVATION DISPATCHED TO WHATSAPP
          </h3>
          <p className="font-body text-sm text-[#D9C1C4] max-w-md">
            Your table reservation details have opened in WhatsApp. Our hospitality desk will confirm your seating shortly!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-full bg-[#231f18] text-brand-caramel font-mono text-xs uppercase hover:bg-white/10 transition-all mt-2"
          >
            Submit Another Reservation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Guest Name */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-caramel transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider">
              Phone Number (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-caramel transition-colors"
            />
          </div>

          {/* Email Address (Optional) */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rahul@example.com"
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-caramel transition-colors"
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-caramel" />
              <span>Reservation Date *</span>
            </label>
            <input
              type="date"
              required
              min={today}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel transition-colors"
            />
          </div>

          {/* Time Slot Picker */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-pink" />
              <span>Time Slot *</span>
            </label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel transition-colors"
            >
              <optgroup label="Morning · Healthy Breakfast & Networking">
                <option>6:00 AM</option>
                <option>6:30 AM</option>
                <option>7:00 AM</option>
                <option>7:30 AM</option>
                <option>8:00 AM</option>
                <option>8:30 AM</option>
                <option>9:00 AM</option>
                <option>9:30 AM</option>
                <option>10:00 AM</option>
                <option>10:30 AM</option>
              </optgroup>
              <optgroup label="Regular Café & Evening Hours">
                <option>11:00 AM</option>
                <option>11:30 AM</option>
                <option>12:00 PM</option>
                <option>12:30 PM</option>
                <option>1:00 PM</option>
                <option>1:30 PM</option>
                <option>2:00 PM</option>
                <option>2:30 PM</option>
                <option>3:00 PM</option>
                <option>3:30 PM</option>
                <option>4:00 PM</option>
                <option>4:30 PM</option>
                <option>5:00 PM</option>
                <option>5:30 PM</option>
                <option>6:00 PM</option>
                <option>6:30 PM</option>
                <option>7:00 PM</option>
                <option>7:30 PM</option>
                <option>8:00 PM</option>
                <option>8:30 PM</option>
                <option>9:00 PM</option>
                <option>9:30 PM</option>
                <option>10:00 PM</option>
                <option>10:30 PM</option>
              </optgroup>
            </select>
          </div>

          {/* Number of Guests */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-caramel" />
              <span>Party Size (Guests) *</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "12+", "15+", "20+"].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Seating Preference */}
          <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-pink" />
              <span>Seating Preference</span>
            </label>
            <select
              value={formData.seating}
              onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] focus:outline-none focus:border-brand-caramel transition-colors"
            >
              <option>Rooftop Terrace (Open-Air)</option>
              <option>Window View Table</option>
              <option>Cozy Indoor Lounge</option>
              <option>Garden Corner</option>
              <option>Any (Best Available)</option>
            </select>
          </div>

          {/* Special Requests */}
          <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-2">
            <label className="font-mono text-xs text-[#D9C1C4] uppercase tracking-wider">
              Special Requests / Occasion
            </label>
            <input
              type="text"
              value={formData.specialRequest}
              onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
              placeholder="e.g. Birthday surprise, quiet corner for laptop work, extra pillows"
              className="w-full bg-[#110e07] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#FFF5E9] placeholder:text-outline focus:outline-none focus:border-brand-caramel transition-colors"
            />
          </div>

          {/* Submission Row */}
          <div className="md:col-span-2 lg:col-span-3 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
            <p className="font-mono text-xs text-outline">
              * Direct instant booking dispatched via WhatsApp concierge to ensure zero wait time.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="tel:+919611966969"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-[#231f18] text-[#D9C1C4] hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-brand-pink" />
                <span>Call Desk Instead</span>
              </a>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all group"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Request on WhatsApp ↗</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
