"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MessageSquare, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  photos: string[];
}

const REVIEWS_DATA: Review[] = [
  {
    author: "P B",
    rating: 5,
    date: "5 months ago",
    text: "From the moment we entered, the whole place felt so warm, pretty, and comforting. The ambiance is absolutely beautiful and has such a soft elegant vibe. Every corner of the café is picture perfect and I had the best time clicking cute pictures! We tried the Irish Cream Shake and the Cranberry Mojito and both tasted absolutely amazing. The food and drinks felt premium and worth it. Good ambiance, amazing taste, lovely staff, beautiful aesthetics, and positive vibes all around!",
    avatar: "/assets/reviews/avatar_5.jpg",
    photos: [
      "/assets/reviews/review_photo_1.jpg",
      "/assets/reviews/review_photo_2.jpg",
      "/assets/reviews/review_photo_3.jpg"
    ]
  },
  {
    author: "Aishwarya Swamy",
    rating: 5,
    date: "3 months ago",
    text: "This is a unique café-cum-gaming house and a great place to meet new people and collaborate. I visited for a board games community event, and I was impressed by their huge collection of board games. The café has a cozy interior with a great vibe. They also have casual games like foosball, carrom, and giant board games. It's an excellent place to unplug from your phone, enjoy quality time, and have a fun, relaxing weekend in Koramangala!",
    avatar: "/assets/reviews/avatar_9.jpg",
    photos: [
      "/assets/reviews/review_photo_5.jpg",
      "/assets/reviews/review_photo_6.jpg",
      "/assets/reviews/review_photo_7.jpg"
    ]
  },
  {
    author: "Parul Joshi",
    rating: 5,
    date: "1 month ago",
    text: "It's a really cozy and cute place to come with your friends! I tried their signature coffee and pressed sandwich and it was really nice. The ambient lighting and rooftop terrace make it a lovely hidden gem. It's definitely a go-to place in Koramangala.",
    avatar: "/assets/reviews/avatar_11.jpg",
    photos: [
      "/assets/reviews/review_photo_9.jpg",
      "/assets/reviews/review_photo_10.jpg"
    ]
  },
  {
    author: "Nagashri S. Hegde",
    rating: 5,
    date: "5 months ago",
    text: "Beautiful café with a cozy vibe! Can host events for 20 to 30 people easily. Lots of games to challenge friends. In food, definitely try the waffles and thick milkshakes! Great available space for working people with pocket-friendly pricing and warm hospitality.",
    avatar: "/assets/reviews/avatar_15.jpg",
    photos: [
      "/assets/reviews/review_photo_11.jpg",
      "/assets/reviews/review_photo_13.jpg",
      "/assets/reviews/review_photo_14.jpg"
    ]
  }
];

export default function GoogleReviews() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  return (
    <section id="google-reviews" className="relative w-full bg-[#140F0E] text-[#FFF5E9] py-24 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header with Official Google Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8AB4F8] font-mono text-xs uppercase tracking-wider mb-3">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>VERIFIED GOOGLE REVIEWS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] uppercase tracking-wider leading-none">
              LOVED BY <span className="font-serif italic text-brand-pink font-normal">Koramangala</span>.
            </h2>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="flex flex-wrap items-center gap-4 bg-[#1F1716] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#FFF5E9] leading-none">4.6</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-mono text-xs text-[#D9C1C4] mt-1">
                  Based on 212+ Google ratings
                </span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

            <a
              href="https://www.google.com/maps/place/Euphoria+Cafe/@12.9348906,77.6224151,17z/data=!4m8!3m7!1s0x3bae15003666d925:0x8797f5f9a6568c48!8m2!3d12.9348906!4d77.62499!9m1!1b1!16s%2Fg%2F11w1pmdfrz?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-wine text-[#FFF5E9] font-mono text-xs uppercase font-bold rounded-lg hover:bg-brand-caramel transition-colors"
            >
              <span>READ ALL REVIEWS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS_DATA.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#1C1413] border border-white/5 hover:border-brand-pink/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Header: Author + Rating */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-wine/50 border border-brand-pink/30 flex items-center justify-center font-display text-lg text-brand-pink relative">
                      {review.avatar ? (
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span>{review.author[0]}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display text-xl text-[#FFF5E9] tracking-wide">
                          {review.author}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="font-mono text-xs text-[#A89689]">
                        Verified Diner • {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative my-4">
                  <Quote className="w-6 h-6 text-brand-wine/40 absolute -top-3 -left-2 -z-0" />
                  <p className="font-body text-sm sm:text-base text-[#E5D7CC] leading-relaxed relative z-10 pl-2">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              </div>

              {/* Review Photos attached by customer */}
              {review.photos.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-caramel block mb-2.5">
                    Customer Photos from Visit
                  </span>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {review.photos.map((photo, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setActivePhoto(photo)}
                        className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/15 hover:border-brand-pink transition-all hover:scale-105 group/thumb shadow-md"
                      >
                        <Image
                          src={photo}
                          alt={`Customer photo ${pIdx + 1} by ${review.author}`}
                          fill
                          sizes="80px"
                          className="object-cover brightness-[1.08] contrast-[1.03] saturate-[1.06]"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-transparent transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Customer Photos */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[600px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={activePhoto}
                alt="Enlarged review photo"
                fill
                className="object-contain brightness-[1.08] contrast-[1.03] saturate-[1.06]"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white px-3 py-1.5 rounded-full font-mono text-xs uppercase"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
