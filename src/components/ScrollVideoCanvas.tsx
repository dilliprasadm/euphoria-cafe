"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

interface ScrollVideoCanvasProps {
  totalFrames?: number;
  framePrefix?: string;
  frameExtension?: string;
  scrollDistance?: string; // e.g. "300vh"
}

export default function ScrollVideoCanvas({
  totalFrames = 120,
  framePrefix = "/assets/sequence/frame_",
  frameExtension = ".webp",
  scrollDistance = "300vh",
}: ScrollVideoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Array of preloaded HTMLImageElements
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);

  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // Helper to construct frame URL
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = String(index + 1).padStart(3, "0");
      return `${framePrefix}${frameNum}${frameExtension}`;
    },
    [framePrefix, frameExtension]
  );

  // Draw a specific frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retrieve image or closest available loaded frame to prevent black flash
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest neighbor loaded image
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = imagesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const vWidth = img.naturalWidth || 1280;
    const vHeight = img.naturalHeight || 720;
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
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    lastRenderedIndexRef.current = index;
  }, [totalFrames]);

  // Handle canvas sizing with high-DPI support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Force redraw current frame on resize
    if (lastRenderedIndexRef.current >= 0) {
      drawFrame(lastRenderedIndexRef.current);
    }
  }, [drawFrame]);

  // 1. Progressive Image Preloading Pipeline
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(totalFrames).fill(null);

    // Step A: Load Frame 1 immediately and display it
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameReady(true);
      setLoadedCount((prev) => prev + 1);
      drawFrame(0);
    };

    // Step B: Progressively preload remaining frames
    const loadRemainingFrames = () => {
      for (let i = 1; i < totalFrames; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          setLoadedCount((prev) => prev + 1);

          // If the active scroll frame corresponds to this image, render immediately
          if (activeFrameIndex === i) {
            drawFrame(i);
          }
        };
      }
    };

    // Begin background preloading after initial frame request
    if (firstImg.complete) {
      loadRemainingFrames();
    } else {
      firstImg.addEventListener("load", loadRemainingFrames, { once: true });
    }

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFrameUrl, drawFrame, activeFrameIndex]);

  // 2. Setup Resize Listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // 3. Master GSAP ScrollTrigger Scrubbing Engine
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const st = ScrollTrigger.create({
      trigger: container,
      pin: viewport,
      pinSpacing: false,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // Direct, instant frame response without lagging behind scrollbar
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map progress 0.0 -> 1.0 to exact frame index 0 -> (totalFrames - 1)
        const frameIdx = Math.round(p * (totalFrames - 1));
        const clampedIdx = Math.max(0, Math.min(totalFrames - 1, frameIdx));

        setActiveFrameIndex(clampedIdx);

        // Only redraw if frame index actually changed
        if (clampedIdx !== lastRenderedIndexRef.current) {
          requestAnimationFrame(() => {
            drawFrame(clampedIdx);
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [totalFrames, drawFrame]);

  return (
    <section
      ref={containerRef}
      style={{ height: scrollDistance }}
      className="relative w-full bg-[#17130c]"
      id="scroll-video-prototype"
    >
      {/* Pinned Viewport Container (100vw x 100vh) */}
      <div
        ref={viewportRef}
        className="h-screen w-full overflow-hidden bg-[#17130c]"
      >
        {/* HTML5 Canvas Rendering the Active WebP Frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Fallback image while frame 1 is loading */}
        {!isFirstFrameReady && (
          <div
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{ backgroundImage: `url('/assets/sequence/frame_001.webp')` }}
          />
        )}

        {/* HERO TITLE & INTRO OVERLAY (Gracefully fades on scroll) */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ${
            scrollProgress < 0.12
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-12 pointer-events-none"
          }`}
        >
          {/* Subtle center scrim ensuring 100% typography contrast over bright dessert elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,19,12,0.65)_0%,rgba(23,19,12,0.35)_55%,transparent_85%)] pointer-events-none -z-10" />

          <div className="max-w-4xl flex flex-col items-center">
            {/* Top Category Tagline */}
            <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#C88752] uppercase block mb-4 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              EUPHORIA CAFÉ KORAMANGALA
            </span>

            {/* Editorial Serif Headline matching user reference */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase leading-[0.96] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] text-center">
              <span className="text-[#FFF5E9] block">A LITTLE TASTE</span>
              <span className="text-brand-pink italic block mt-1">OF EUPHORIA</span>
            </h1>

            {/* Editorial Subtext */}
            <p className="font-serif text-base sm:text-xl lg:text-2xl text-[#EBE1D5] mt-6 max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-normal text-center">
              A world of waffles, sweet treats, and happy moments. Pinned to the golden crisp honeycomb lattice.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-cream text-brand-chocolate hover:bg-brand-caramel hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-widest shadow-2xl group"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/find-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-brand-pink/50 bg-[#30201F]/80 text-[#FFF5E9] hover:bg-brand-wine transition-all font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
              >
                <span>RESERVE A TABLE</span>
              </Link>
            </div>
          </div>

          {/* Animated Scroll Cue at Bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full bg-[#17130c]/75 border border-white/10 backdrop-blur-md text-brand-caramel font-mono text-xs uppercase tracking-widest animate-bounce shadow-xl">
            <span>SCROLL TO UNVEIL THE STORY</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
