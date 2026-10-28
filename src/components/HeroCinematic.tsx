"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStage, setActiveStage] = useState<number>(1);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Setup GSAP ScrollTrigger & Video / Canvas Scrubbing Engine
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let targetTime = 0.01;
    let currentTime = 0.01;

    // 60fps render loop drawing video frames to full-bleed canvas
    const render = () => {
      if (video.readyState >= 2) {
        // Smooth interpolation for frame-accurate, stutter-free scrubbing
        currentTime += (targetTime - currentTime) * 0.18;
        if (Math.abs(video.currentTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

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

        // Subtle edge vignette to ensure text contrast while keeping central dessert bright
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.25,
          width / 2,
          height / 2,
          width * 0.8
        );
        grad.addColorStop(0, "rgba(0,0,0,0.05)");
        grad.addColorStop(0.65, "rgba(23,19,12,0.35)");
        grad.addColorStop(1, "rgba(23,19,12,0.85)");

        ctx.fillStyle = grad;
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

    // ScrollTrigger pinning the entire 400vh section
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Advance video time smoothly across full duration
        if (video.duration) {
          targetTime = Math.max(0.01, Math.min(video.duration - 0.05, p * video.duration));
        }

        // Determine which of the 4 stages is active
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

  // Jump smoothly to any stage
  const jumpToStage = useCallback((stageNum: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetP = 0.02;
    if (stageNum === 2) targetP = 0.35;
    if (stageNum === 3) targetP = 0.62;
    if (stageNum === 4) targetP = 0.90;

    window.scrollTo({
      top: containerTop + totalScroll * targetP,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#17130c]"
      id="hero-stage"
    >
      {/* Video element used for frame extraction and scrubbing */}
      <video
        ref={videoRef}
        src="/videos/hero-dessert.mp4"
        playsInline
        muted
        preload="auto"
        className="hidden"
      />

      {/* STICKY FULL-SCREEN VIEWPORT (100vw x 100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* =============================================================== */}
        {/* 1. FULL-BLEED CINEMATIC DESSERT BACKGROUND                      */}
        {/* =============================================================== */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#17130c]">
          {/* Hardware-accelerated Canvas covering the entire screen */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Seamless Fallback Stages from the Storyboard */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              !isVideoReady ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStage === 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-1.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStage === 2 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-2.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStage === 3 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-3.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStage === 4 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-4.png')` }}
            />
          </div>

          {/* Deep dark cinematic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130c]/90 via-transparent to-[#17130c]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_0%,rgba(23,19,12,0.75)_100%)] pointer-events-none" />
        </div>

        {/* =============================================================== */}
        {/* 2. THE 4 STORYBOARD POINTS IN EMPTY SPACE (LEFT / RIGHT)        */}
        {/* =============================================================== */}

        {/* STAGE 1 — LEFT SIDE (Active in Stage 1) */}
        <div
          className={`absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl z-20 transition-all duration-700 ${
            activeStage === 1
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            01 &nbsp;/&nbsp; THE BEGINNING
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Every great moment starts with a little{" "}
            <span className="text-brand-pink italic">magic.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            It begins with simple ingredients and a little imagination.
          </p>

          <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#FFF5E9]/60 tracking-widest uppercase">
            <span className="w-8 h-px bg-brand-caramel" />
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 text-brand-caramel animate-bounce" />
          </div>
        </div>

        {/* STAGE 2 — RIGHT SIDE (Active in Stage 2) */}
        <div
          className={`absolute right-6 sm:right-12 lg:right-28 top-1/2 -translate-y-1/2 max-w-xl z-20 text-left transition-all duration-700 ${
            activeStage === 2
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            02 &nbsp;/&nbsp; THE CRAFT
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Golden on the outside. Happiness in{" "}
            <span className="text-brand-pink italic">every layer.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            A little texture. A little warmth. A lot to look forward to.
          </p>
        </div>

        {/* STAGE 3 — LEFT SIDE (Active in Stage 3) */}
        <div
          className={`absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl z-20 transition-all duration-700 ${
            activeStage === 3
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            03 &nbsp;/&nbsp; THE INDULGENCE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Then comes the{" "}
            <span className="text-brand-pink italic">irresistible</span> part.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            Rich chocolate, fresh toppings, and a moment worth slowing down for.
          </p>
        </div>

        {/* STAGE 4 — RIGHT SIDE (Active in Stage 4) */}
        <div
          className={`absolute right-6 sm:right-12 lg:right-28 top-1/2 -translate-y-1/2 max-w-xl z-20 text-left transition-all duration-700 ${
            activeStage === 4
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            04 &nbsp;/&nbsp; PURE EUPHORIA
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Made for your{" "}
            <span className="text-brand-pink italic">happy moments.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            More than waffles. A little joy in every bite.
          </p>

          {/* Explore The Menu Pill Button */}
          <div className="mt-8">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl group"
            >
              <span>EXPLORE THE MENU</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* =============================================================== */}
        {/* 3. FAR-RIGHT VERTICAL STORYBOARD TIMELINE (01, 02, 03, 04)       */}
        {/* =============================================================== */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
          {/* Subtle connecting vertical line */}
          <div className="absolute top-2 bottom-2 w-px bg-white/20 -z-10" />

          {/* 4 Storyboard Step Indicators */}
          <div className="flex flex-col gap-8 py-2">
            {[1, 2, 3, 4].map((step) => {
              const isActive = activeStage === step;
              return (
                <button
                  key={step}
                  onClick={() => jumpToStage(step)}
                  className="group flex items-center gap-3 transition-transform focus:outline-none"
                  aria-label={`Jump to Stage ${step}`}
                >
                  {/* Glowing active bullet or subtle inactive circle */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-brand-pink ring-4 ring-brand-pink/30 scale-125 border-2 border-[#FFF5E9]"
                        : "bg-[#17130c] border border-white/40 group-hover:border-white group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-wider transition-colors hidden sm:inline ${
                      isActive
                        ? "text-[#FFF5E9] font-bold"
                        : "text-white/40 group-hover:text-white"
                    }`}
                  >
                    {String(step).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
