"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, CheckCircle2, Sparkles } from "lucide-react";

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

    // Subtle vignette overlay matching the dark Euphoria burgundy theme
    const grad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.28,
      width / 2,
      height / 2,
      width * 0.85
    );
    grad.addColorStop(0, "rgba(0,0,0,0.02)");
    grad.addColorStop(0.7, "rgba(23,19,12,0.45)");
    grad.addColorStop(1, "rgba(23,19,12,0.88)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

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

        {/* Minimal Prototype HUD / Status Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
          {/* Top Info Banner (below navbar) */}
          <div className="pt-20 flex flex-col items-start gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17130c]/80 border border-brand-pink/40 text-brand-pink font-mono text-xs tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-caramel" />
              <span>SCROLL-CONTROLLED VIDEO PROTOTYPE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-[#FFF5E9] tracking-wider leading-none uppercase drop-shadow-lg">
              EUPHORIA CINEMATIC SCRUB
            </h1>
            <p className="font-mono text-xs text-[#D9C1C4] max-w-lg mt-1 drop-shadow">
              Original waffle footage &rarr; FFmpeg WebP frames &rarr; Canvas &rarr; GSAP ScrollTrigger.
            </p>
          </div>

          {/* Bottom Controls & Real-Time Scrub HUD */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pb-4">
            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#17130c]/85 border border-white/10 backdrop-blur-md text-[#FFF5E9] font-mono text-xs tracking-wider">
              <ArrowDown className="w-4 h-4 text-brand-caramel animate-bounce" />
              <span>
                {activeFrameIndex === 0
                  ? "SCROLL DOWN TO ADVANCE FRAMES"
                  : activeFrameIndex === totalFrames - 1
                  ? "FINAL FRAME REACHED — KEEP SCROLLING TO CONTINUE"
                  : "SCROLL UP/DOWN TO SCRUB VIDEO"}
              </span>
            </div>

            {/* Real-time telemetry badge: proves frame-by-frame control */}
            <div className="flex items-center gap-4 px-5 py-2.5 rounded-xl bg-[#17130c]/90 border border-brand-caramel/40 backdrop-blur-md font-mono text-xs shadow-2xl">
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/50 tracking-widest uppercase">
                  ACTIVE FRAME
                </span>
                <span className="text-brand-caramel font-bold text-sm">
                  {String(activeFrameIndex + 1).padStart(3, "0")} / {totalFrames}
                </span>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/50 tracking-widest uppercase">
                  PROGRESS
                </span>
                <span className="text-[#FFF5E9] font-bold text-sm">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/50 tracking-widest uppercase">
                  BUFFER
                </span>
                <span
                  className={`font-bold text-xs flex items-center gap-1 ${
                    loadedCount >= totalFrames ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {loadedCount >= totalFrames ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      READY
                    </>
                  ) : (
                    `${loadedCount}/${totalFrames}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
