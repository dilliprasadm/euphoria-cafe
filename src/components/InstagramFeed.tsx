"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from "lucide-react";

interface SocialPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
  aspect?: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-1",
    image: "/assets/live-site/rooftop-seating.jpg",
    caption: "Open-air skies, fairy lights, and cozy rooftop seating right in the heart of Koramangala 6th Block! ☀️🌿 Sourdough toasts from 6 AM and hot waffles till 11 PM.",
    likes: "642",
    comments: "54",
    tag: "Rooftop Terrace",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-2",
    image: "/assets/live-site/waffles-berries.jpg",
    caption: "Golden Liege waffle pressed live at 185°C with ripe strawberries & Belgian chocolate drizzle! 🍓🧇 The ultimate sweet indulgence.",
    likes: "819",
    comments: "68",
    tag: "Fresh Berry Waffles",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-3",
    image: "/assets/live-site/coffee-brew.jpg",
    caption: "Morning breakfast & networking coffee under Bangalore skies. Fresh espresso extractions from 6 AM every day! ☕✨",
    likes: "485",
    comments: "37",
    tag: "Artisanal Espresso",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-4",
    image: "/assets/live-site/celebrations-spread.jpg",
    caption: "Birthdays, bride-to-be parties, and reunion feasts are sweeter on our rooftop! 🎉🥂 Reserve your customized celebration package.",
    likes: "931",
    comments: "82",
    tag: "Celebration Feast",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-5",
    image: "/assets/google-photos/euphoria_google_photo_4.jpg",
    caption: "Late night sweet cravings sorted! Decadent brownie sundaes, loaded freakshakes, and warm waffle bites. 🍫🍨",
    likes: "740",
    comments: "49",
    tag: "Dessert Haven",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-6",
    image: "/assets/live-site/cafe-ambiance.jpg",
    caption: "Good mood. Great food. Cozy corners, great conversations, and pure happiness. See you upstairs at Euphoria! 🐘💕",
    likes: "567",
    comments: "41",
    tag: "Euphoria Sanctuary",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-7",
    image: "/assets/google-photos/euphoria_google_photo_6.jpg",
    caption: "Crispy Peri-Peri crinkle fries, melted cheese pull baguettes, and gourmet loaded fries to balance every sweet dessert! 🍟🧀",
    likes: "612",
    comments: "38",
    tag: "Savory Bites",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-8",
    image: "/assets/online-gallery/online_photo_1.jpg",
    caption: "The Euphoria waffle spread that turns any casual hangout into an unforgettable dessert feast! 🧇🍓 Belgian Liege perfection.",
    likes: "874",
    comments: "73",
    tag: "Waffle Feast",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-9",
    image: "/assets/online-gallery/online_photo_10.jpg",
    caption: "Beat the Bangalore sun with crushed ice blueberry mojitos and fizzy craft coolers under our rooftop palms! 🧊🫐🌿",
    likes: "529",
    comments: "44",
    tag: "Artisan Coolers",
    aspect: "col-span-1 md:col-span-1"
  }
];

export default function InstagramFeed() {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  return (
    <section id="instagram-feed" className="relative w-full bg-[#181110] text-[#FFF5E9] py-24 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-pink uppercase tracking-widest mb-3">
              <Instagram className="w-4 h-4 text-brand-pink" />
              <span>@EUPHORIA_CAFE_KORAMANGALA</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] uppercase tracking-wider leading-none">
              FROM OUR <span className="font-serif italic text-brand-caramel font-normal">Instagram</span> FEED.
            </h2>
          </div>

          <a
            href="https://www.instagram.com/euphoria_cafe_koramangala/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-opacity shadow-xl self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative h-96 rounded-2xl overflow-hidden bg-[#241A19] border border-white/10 hover:border-brand-pink/50 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md font-mono text-[11px] uppercase tracking-wider text-brand-pink border border-white/10">
                  {post.tag}
                </span>
              </div>

              {/* Hover Overlay with Instagram Interaction stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <p className="font-body text-xs sm:text-sm text-[#FFF5E9] line-clamp-3 mb-4 leading-relaxed">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between border-t border-white/15 pt-3 font-mono text-xs text-[#D9C1C4]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[#FFF5E9]" />
                      {post.comments}
                    </span>
                  </div>
                  <span className="text-brand-caramel uppercase font-bold text-[11px]">
                    VIEW POST ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Post Detail */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#1C1413] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full md:w-1/2 h-80 md:h-[480px]">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.caption}
                  fill
                  className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06]"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display text-sm text-[#FFF5E9]">euphoria_cafe_koramangala</h4>
                        <span className="font-mono text-[10px] text-[#A89689] block">Koramangala, Bengaluru</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-[#D9C1C4] hover:text-white font-mono text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="font-body text-sm text-[#E5D7CC] leading-relaxed my-4">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#D9C1C4] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
                      {selectedPost.likes} likes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      {selectedPost.comments} comments
                    </span>
                  </div>

                  <a
                    href="https://www.instagram.com/euphoria_cafe_koramangala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-brand-wine hover:bg-brand-caramel text-[#FFF5E9] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>OPEN ON INSTAGRAM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
