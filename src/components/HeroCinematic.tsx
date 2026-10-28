"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Flame, Sparkles, Droplets, Heart, ArrowRight, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStage, setActiveStage] = useState<number>(1);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Setup Canvas & Video Rendering Pipeline
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle canvas sizing with device pixel ratio
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    // Smooth render loop drawing video to canvas with cinematic grade
    const render = () => {
      if (video.readyState >= 2) {
        // Interpolate time smoothly
        currentTime += (targetTime - currentTime) * 0.15;
        if (Math.abs(video.currentTime - currentTime) > 0.02) {
          video.currentTime = currentTime;
        }

        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Cover fit calculation
        const vWidth = video.videoWidth || 1920;
        const vHeight = video.videoHeight || 1080;
        const vAspect = vWidth / vHeight;
        const cAspect = width / height;

        let drawW = width;
        let drawH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (cAspect > vAspect) {
          drawW = width;
          drawH = width / vAspect;
          offsetY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * vAspect;
          offsetX = (width - drawW) / 2;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, offsetX, offsetY, drawW, drawH);

        // Apply subtle cinematic vignette & color wash directly on canvas
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.2,
          width / 2,
          height / 2,
          width * 0.75
        );
        gradient.addColorStop(0, "rgba(71, 5, 29, 0.1)");
        gradient.addColorStop(0.6, "rgba(48, 32, 31, 0.45)");
        gradient.addColorStop(1, "rgba(23, 19, 12, 0.85)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      targetTime = 0.01;
      video.currentTime = 0.01;
      render();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    // GSAP ScrollTrigger for 400vh container
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgressPercent(Math.round(p * 100));

        // Scrub video time
        if (video.duration) {
          targetTime = Math.max(0, Math.min(video.duration - 0.05, p * video.duration));
        }

        // Determine current active stage (strictly alternating 1 -> 2 -> 3 -> 4)
        if (p < 0.25) {
          setActiveStage(1);
        } else if (p < 0.5) {
          setActiveStage(2);
        } else if (p < 0.75) {
          setActiveStage(3);
        } else {
          setActiveStage(4);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, []);

  // Jump to specific chapter
  const scrollToChapter = useCallback((chapter: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetProgress = 0.05;
    if (chapter === 2) targetProgress = 0.35;
    if (chapter === 3) targetProgress = 0.62;
    if (chapter === 4) targetProgress = 0.92;

    window.scrollTo({
      top: containerTop + totalScroll * targetProgress,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-gradient-to-b from-[#2a040e] via-[#360815] to-[#1c0209]"
      id="hero-stage"
    >
      {/* Hidden source video element used for canvas scrubbing */}
      <video
        ref={videoRef}
        src="/videos/hero-dessert.mp4"
        playsInline
        muted
        preload="auto"
        className="hidden"
      />

      {/* Pinned Sticky Viewport (100vh) */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20"
      >
        {/* Top HUD Sub-bar */}
        <div className="w-full h-11 border-b border-[rgba(255,245,233,0.1)] px-4 sm:px-8 lg:px-12 flex items-center justify-between bg-black/40 backdrop-blur-md text-xs font-mono z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand-caramel animate-pulse" />
            <span className="text-brand-pink tracking-widest uppercase">
              EUPHORIA SCROLL CINEMA
            </span>
            <span className="text-outline-variant hidden sm:inline">|</span>
            <span className="text-[#ebe1d5]/70 hidden sm:inline">
              SCROLL TO PROGRESS CINEMATIC STORY
            </span>
          </div>

          <div className="flex items-center gap-4 text-brand-caramel">
            <span className="font-bold text-[#FFF5E9]">
              STAGE {String(activeStage).padStart(2, "0")} / 04
            </span>
            <span className="text-outline-variant">·</span>
            <span className="text-brand-pink hidden md:inline">185°C ROTARY PRESS</span>
          </div>
        </div>

        {/* 3-ZONE MAIN CINEMATIC STAGE */}
        <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* =============================================================== */}
          {/* BACKGROUND / CENTER CANVAS VIEWPORT (Spans full stage background) */}
          {/* =============================================================== */}
          <div className="absolute inset-0 z-0 bg-[#24030c] flex items-center justify-center overflow-hidden">
            {/* The Hardware-Accelerated Scrubbing Canvas */}
            <canvas
              ref={canvasRef}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isVideoReady && !prefersReducedMotion ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Fallback image when video is loading or user prefers reduced motion */}
            {(!isVideoReady || prefersReducedMotion) && (
              <div className="absolute inset-0">
                <Image
                  src="/assets/web-assets/Luxurious Chocolate Strawberry Dessert Backdrop.png"
                  alt="Euphoria Signature Dessert Masterpiece"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130c] via-[#24030c]/70 to-[#17130c]/80" />
              </div>
            )}

            {/* Atmospheric Specular Glow */}
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17130c] via-transparent to-[#17130c]/70 pointer-events-none z-10" />
          </div>

          {/* =============================================================== */}
          {/* ZONE 1: LEFT SIDE (Active in Stage 1 & Stage 3)                   */}
          {/* =============================================================== */}
          <aside className="relative lg:col-span-5 h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-20 pointer-events-none">
            <div className="my-auto flex flex-col justify-center relative min-h-[360px]">
              {/* STAGE 1 — LEFT SIDE */}
              <div
                className={`transition-all duration-700 ${
                  activeStage === 1
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-8 pointer-events-none absolute inset-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>STAGE 01 // THE BEGINNING</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-[0.95] drop-shadow-xl">
                  EVERY GREAT MOMENT STARTS WITH A LITTLE MAGIC.
                </h1>

                <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
                  It begins with pure ingredients, genuine passion, and a little imagination. Authentic Liege pearls suspended in golden batter anticipation, crafted live for Koramangala.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-caramel uppercase tracking-widest">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-white/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel" />
                    <span>ORIGIN: BELGIAN PEARL CRUMB</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-white/10 backdrop-blur-sm">
                    <span>100% ARTISANAL BATTER</span>
                  </div>
                </div>
              </div>

              {/* STAGE 3 — LEFT SIDE */}
              <div
                className={`transition-all duration-700 ${
                  activeStage === 3
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-8 pointer-events-none absolute inset-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
                  <Droplets className="w-3.5 h-3.5 text-brand-pink" />
                  <span>STAGE 03 // THE INDULGENCE</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-[0.95] drop-shadow-xl">
                  THEN COMES THE IRRESISTIBLE PART.
                </h2>

                <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
                  Molten dark chocolate, fresh sliced Mahabaleshwar strawberries, and a moment worth slowing down for. Single-origin Callebaut ganache flowing in decadent rhythm over warm pockets.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-caramel uppercase tracking-widest">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-white/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    <span>54% INTENSE CALLEBAUT GANACHE</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-white/10 backdrop-blur-sm">
                    <span>MADAGASCAR VANILLA BEAN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Side Status Footer */}
            <div className="hidden lg:flex items-center gap-3 pt-4 border-t border-[rgba(255,245,233,0.1)] text-xs font-mono text-outline">
              <span>ATMOSPHERE // SANCTUARY</span>
              <span className="text-brand-caramel">KORAMANGALA 5TH BLOCK</span>
            </div>
          </aside>

          {/* =============================================================== */}
          {/* ZONE 2: EMPTY MIDDLE COLUMN (Gives visual breathing space for the dessert) */}
          {/* =============================================================== */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

          {/* =============================================================== */}
          {/* ZONE 3: RIGHT SIDE (Active in Stage 2 & Stage 4)                  */}
          {/* =============================================================== */}
          <aside className="relative lg:col-span-5 h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-20 pointer-events-none text-right lg:text-left">
            <div className="my-auto flex flex-col justify-center relative min-h-[360px]">
              {/* STAGE 2 — RIGHT SIDE */}
              <div
                className={`transition-all duration-700 ${
                  activeStage === 2
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
                  <Flame className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>STAGE 02 // THE CRAFT</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-[0.95] drop-shadow-xl">
                  GOLDEN ON THE OUTSIDE. HAPPINESS IN EVERY LAYER.
                </h2>

                <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
                  A little crunch. A little warmth. A lot to look forward to. Pressed live at 185°C on custom European rotary waffle irons until the pearl sugar caramelizes to golden perfection.
                </p>

                <div className="mt-8 p-4 rounded-xl bg-black/60 border border-[rgba(255,245,233,0.1)] backdrop-blur-md max-w-md space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D9C1C4]">Pocket Grid Depth</span>
                    <span className="text-brand-caramel font-bold">12mm Cast Pocket</span>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D9C1C4]">Crust Acoustic Shatter</span>
                    <span className="text-brand-pink font-bold">98% Crisp Crunch</span>
                  </div>
                </div>
              </div>

              {/* STAGE 4 — RIGHT SIDE */}
              <div
                className={`transition-all duration-700 ${
                  activeStage === 4
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-wine/50 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase">
                  <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
                  <span>STAGE 04 // PURE EUPHORIA</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] tracking-wider leading-[0.95] drop-shadow-xl">
                  MADE FOR YOUR HAPPY MOMENTS.
                </h2>

                <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
                  Your next favourite sweet treat is waiting. Waffles, cheesecake wedges, crystal sundaes, and thick freakshakes. Served hot till 1:00 AM every night.
                </p>

                {/* Final Call to Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 max-w-md pointer-events-auto">
                  <Link
                    href="/menu"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl shadow-black/80 group"
                  >
                    <span>EXPLORE FULL MENU</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/find-us"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-brand-pink/50 bg-[#30201F]/80 text-[#FFF5E9] hover:bg-brand-wine hover:border-brand-pink transition-all font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <Compass className="w-4 h-4 text-brand-caramel" />
                    <span>VISIT THE CAFÉ</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side Status Footer */}
            <div className="hidden lg:flex items-center justify-between pt-4 border-t border-[rgba(255,245,233,0.1)] text-xs font-mono text-outline">
              <span>SERVED HOT TO ORDER</span>
              <span className="text-secondary font-bold">11:00 AM — 01:00 AM</span>
            </div>
          </aside>
        </div>

        {/* =============================================================== */}
        {/* BOTTOM SYNCHRONIZED CHAPTER JUMP SCRUBBER & TIMELINE             */}
        {/* =============================================================== */}
        <div className="w-full h-16 border-t border-[rgba(255,245,233,0.12)] px-4 sm:px-8 lg:px-12 flex items-center justify-between bg-[#1f030a]/95 backdrop-blur-md z-30">
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-outline">
            <span className="text-brand-caramel font-bold">SCRUBBER</span>
            <span>{progressPercent}%</span>
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-caramel transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Chapter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 mx-auto sm:mx-0">
            {[
              { num: 1, title: "The Beginning" },
              { num: 2, title: "The Craft" },
              { num: 3, title: "The Indulgence" },
              { num: 4, title: "Pure Euphoria" },
            ].map((ch) => (
              <button
                key={ch.num}
                onClick={() => scrollToChapter(ch.num)}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  activeStage === ch.num
                    ? "bg-brand-caramel text-brand-chocolate font-bold shadow-md shadow-brand-caramel/20 scale-105"
                    : "text-[#D9C1C4]/80 hover:text-[#FFF5E9] hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>{`0${ch.num} / ${ch.title}`}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-brand-pink">
            <span className="animate-bounce">↓</span>
            <span className="tracking-wider uppercase">SCROLL FOR MENU & STORY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
