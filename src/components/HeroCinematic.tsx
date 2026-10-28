"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown, Sparkles, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active section state: 0 = Hero Intro, 1 = Step 1, 2 = Step 2, 3 = Step 3, 4 = Step 4
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Master GSAP ScrollTrigger & Video Frame-Scrubbing Engine
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
    let targetTime = 0.001;
    let currentTime = 0.001;
    let isSeeking = false;

    // Draw frame on canvas with aspect-ratio cover fit and atmospheric vignette
    const drawFrame = () => {
      if (video.readyState >= 2) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const vWidth = video.videoWidth || 1280;
        const vHeight = video.videoHeight || 720;
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

        // Edge vignette to ensure text contrast while keeping central dessert bright
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.25,
          width / 2,
          height / 2,
          width * 0.82
        );
        grad.addColorStop(0, "rgba(0,0,0,0.02)");
        grad.addColorStop(0.65, "rgba(23,19,12,0.4)");
        grad.addColorStop(1, "rgba(23,19,12,0.88)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    // 60fps render loop drawing video frames to the full-bleed canvas
    const render = () => {
      if (video.readyState >= 2) {
        // Smooth interpolation for frame-accurate, stutter-free scrubbing
        currentTime += (targetTime - currentTime) * 0.22;
        if (!isSeeking && Math.abs(video.currentTime - currentTime) > 0.015) {
          video.currentTime = currentTime;
        }
        drawFrame();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      targetTime = 0.001;
      video.currentTime = 0.001;
      drawFrame();
      render();
    };

    const handleSeeking = () => {
      isSeeking = true;
    };

    const handleSeeked = () => {
      isSeeking = false;
      drawFrame();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleLoadedMetadata);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 2) {
      handleLoadedMetadata();
    } else {
      video.load();
    }

    // Pinned container covering 500vh:
    // 0.00 - 0.12 -> Hero initial content (Frame 0)
    // 0.12 - 0.34 -> Step 1: The Beginning
    // 0.34 - 0.56 -> Step 2: The Craft
    // 0.56 - 0.78 -> Step 3: The Indulgence
    // 0.78 - 1.00 -> Step 4: Pure Euphoria (Final Frame)
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Continuous timeline: Video starts at frame 0 at the top, advances continuously, and ends at final frame at Step 4
        if (video.duration) {
          targetTime = Math.max(0.001, Math.min(video.duration - 0.05, p * video.duration));
        }

        if (p < 0.12) {
          setActiveStep(0); // Hero Intro at Frame 0
        } else if (p < 0.34) {
          setActiveStep(1); // Step 1 — The Beginning
        } else if (p < 0.56) {
          setActiveStep(2); // Step 2 — The Craft
        } else if (p < 0.78) {
          setActiveStep(3); // Step 3 — The Indulgence
        } else {
          setActiveStep(4); // Step 4 — Pure Euphoria (Final Frame)
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleLoadedMetadata);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, []);

  // Jump to specific step or back to Hero
  const jumpToStep = useCallback((stepNum: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetP = 0.02; // Hero
    if (stepNum === 1) targetP = 0.22;
    if (stepNum === 2) targetP = 0.45;
    if (stepNum === 3) targetP = 0.67;
    if (stepNum === 4) targetP = 0.90;

    window.scrollTo({
      top: containerTop + totalScroll * targetP,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#17130c]"
      id="hero-stage"
    >
      {/* The master video element kept active in the DOM pipeline for continuous frame decoding */}
      <video
        ref={videoRef}
        src="/videos/hero-dessert.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute opacity-0 pointer-events-none w-px h-px -z-50"
      />

      {/* STICKY FULL-SCREEN VIEWPORT (100vw x 100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* =============================================================== */}
        {/* 1. FULL-BLEED CONTINUOUS VIDEO BACKGROUND                       */}
        {/* =============================================================== */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#17130c]">
          {/* Fullscreen Canvas for continuous frame-by-frame scrubbing */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* High-Resolution Storyboard Fallback Stages */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              !isVideoReady ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStep <= 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-1.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStep === 2 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-2.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStep === 3 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-3.png')` }}
            />
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                activeStep === 4 ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('/assets/brand/stage-4.png')` }}
            />
          </div>

          {/* Atmospheric ambient lighting & gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130c]/90 via-transparent to-[#17130c]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_0%,rgba(23,19,12,0.75)_100%)] pointer-events-none" />
        </div>

        {/* =============================================================== */}
        {/* 2. HERO INITIAL VIEW (At Frame Zero, Progress 0.0 - 0.12)        */}
        {/* =============================================================== */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ${
            activeStep === 0
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-12 pointer-events-none"
          }`}
        >
          <div className="max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-wine/60 border border-brand-pink/30 text-brand-pink font-mono text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
              <span>EUPHORIA CAFÉ · KORAMANGALA 5TH BLOCK</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#FFF5E9] tracking-wider leading-[0.95] uppercase drop-shadow-2xl">
              WHERE SWEET MOMENTS<br />
              <span className="text-brand-pink">TAKE SHAPE.</span>
            </h1>

            <p className="font-body text-base sm:text-xl text-[#D9C1C4] mt-6 max-w-xl leading-relaxed drop-shadow">
              Bengaluru&apos;s premier dessert destination. Freshly pressed Belgian Liege waffles, rich couverture ganache, and hand-spun milkshakes served till 1:00 AM.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => jumpToStep(1)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl group"
              >
                <span>EXPERIENCE THE CRAFT</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/80 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Animated Scroll Cue at Bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-brand-caramel uppercase tracking-widest animate-bounce">
            <span>SCROLL TO UNVEIL THE STORY</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* =============================================================== */}
        {/* 3. CONTINUATION INTO THE 4 STORYTELLING STEPS (Steps 1–4)        */}
        {/* =============================================================== */}

        {/* STEP 1 — THE BEGINNING (Left Side) */}
        <div
          className={`absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl z-20 transition-all duration-700 ${
            activeStep === 1
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            01 &nbsp;/&nbsp; THE BEGINNING
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Every great<br className="hidden sm:inline" />
            moment starts with<br className="hidden sm:inline" />
            a little <span className="text-brand-pink italic">magic.</span>
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

        {/* STEP 2 — THE CRAFT (Right Side) */}
        <div
          className={`absolute right-6 sm:right-12 lg:right-28 top-1/2 -translate-y-1/2 max-w-xl z-20 text-left transition-all duration-700 ${
            activeStep === 2
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            02 &nbsp;/&nbsp; THE CRAFT
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Golden on the outside.<br className="hidden sm:inline" />
            Happiness in <span className="text-brand-pink italic">every layer.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            A little texture. A little warmth. A lot to look forward to.
          </p>
        </div>

        {/* STEP 3 — THE INDULGENCE (Left Side) */}
        <div
          className={`absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl z-20 transition-all duration-700 ${
            activeStep === 3
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            03 &nbsp;/&nbsp; THE INDULGENCE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Then comes the<br className="hidden sm:inline" />
            <span className="text-brand-pink italic">irresistible</span> part.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#D9C1C4] mt-5 leading-relaxed max-w-md drop-shadow">
            Rich chocolate, fresh toppings, and a moment worth slowing down for.
          </p>
        </div>

        {/* STEP 4 — PURE EUPHORIA (Right Side, Video Ends Here) */}
        <div
          className={`absolute right-6 sm:right-12 lg:right-28 top-1/2 -translate-y-1/2 max-w-xl z-20 text-left transition-all duration-700 ${
            activeStep === 4
              ? "opacity-100 translate-y-[-50%] pointer-events-auto"
              : "opacity-0 translate-y-[-45%] pointer-events-none"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-caramel tracking-[0.25em] uppercase block mb-3 font-semibold">
            04 &nbsp;/&nbsp; PURE EUPHORIA
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFF5E9] leading-[1.08] tracking-tight drop-shadow-2xl">
            Made for your<br className="hidden sm:inline" />
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
        {/* 4. FAR-RIGHT VERTICAL STORYBOARD PROGRESS INDICATOR             */}
        {/* =============================================================== */}
        <div
          className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center transition-all duration-500 ${
            activeStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          {/* Subtle vertical line */}
          <div className="absolute top-2 bottom-2 w-px bg-white/20 -z-10" />

          {/* 4 Numbered Progress Dots */}
          <div className="flex flex-col gap-8 py-2">
            {[1, 2, 3, 4].map((step) => {
              const isActive = activeStep === step;
              return (
                <button
                  key={step}
                  onClick={() => jumpToStep(step)}
                  className="group flex items-center gap-3 transition-transform focus:outline-none"
                  aria-label={`Jump to Step ${step}`}
                >
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
