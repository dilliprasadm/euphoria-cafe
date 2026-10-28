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
    image: "/assets/social/cafe_moment_7.jpg",
    caption: "Step into our fairytale rooftop haven in the heart of Koramangala! 🌸✨ Freshly pressed waffles & cozy vibes every day until 11 PM.",
    likes: "482",
    comments: "39",
    tag: "Fairytale Entrance",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-2",
    image: "/assets/social/cafe_moment_9.jpg",
    caption: "Our iconic 'Euphoria Loves You' wall 🐘💕 The sweetest spot for your weekend dates and selfie memories.",
    likes: "614",
    comments: "52",
    tag: "Iconic Mural",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-3",
    image: "/assets/social/cafe_moment_5.jpg",
    caption: "Birthdays are sweeter at Euphoria! 🎉 Lotus Biscoff layer cakes, gourmet burgers & rose celebrations with the best squad.",
    likes: "378",
    comments: "28",
    tag: "Celebrations",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-4",
    image: "/assets/social/cafe_moment_2.jpg",
    caption: "Foosball championships, board games, and thick milkshakes! Unplug from the screen and make real connections. 🎲☕",
    likes: "529",
    comments: "44",
    tag: "Game Lounge",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-5",
    image: "/assets/social/cafe_moment_11.jpg",
    caption: "Waffle Sundaes loaded with Death by Chocolate Brownies, Ferrero Rocher & Belgian ganache. Which one are you trying today? 🍫🍨",
    likes: "892",
    comments: "71",
    tag: "Dessert Atelier",
    aspect: "col-span-1 md:col-span-1"
  },
  {
    id: "post-6",
    image: "/assets/reviews/review_photo_6.jpg",
    caption: "Our weekend community board game jam! Beanbags, giant teddy bears, and endless laughter with old & new friends. 🧸🧩",
    likes: "445",
    comments: "33",
    tag: "Community Jam",
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
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                  className="object-cover"
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
