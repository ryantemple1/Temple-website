"use client";

import Image from "next/image";
import FadeUp from "./FadeUp";
import { useRef, useState, useCallback, useEffect } from "react";

/* ── Before / After data ── */
const beforeAfterProjects = [
  {
    title: "Seasonal Cleanup",
    category: "Fall Clean Up",
    before: "/img-cleanup-before.jpg",
    after: "/img-cleanup-after.jpg",
    beforeAlt: "Calgary yard before seasonal fall cleanup by Temple Landscaping",
    afterAlt: "Calgary yard after professional fall cleanup by Temple Landscaping",
  },
  {
    title: "Garden Bed Landscaping",
    category: "Landscaping",
    before: "/img-landscaping-before.jpg",
    after: "/img-landscaping-after.jpg",
    beforeAlt: "Calgary garden bed before landscaping project by Temple Landscaping",
    afterAlt: "Landscaping garden bed with mulch and plantings in Calgary",
  },
  {
    title: "Driveway Sealing",
    category: "Exterior Cleaning",
    before: "/img-sealing-before.jpg",
    after: "/img-sealing-after.jpg",
    beforeAlt: "Calgary exposed aggregate driveway before sealing",
    afterAlt: "Exposed aggregate driveway sealing in Calgary by Temple Landscaping",
  },
];

const bottomProjects = [
  {
    title: "Weekly Lawn Mowing",
    category: "Lawn Care",
    image: "/img-weekly-mowing.jpg",
    alt: "Weekly lawn mowing service result in SW Calgary by Temple Landscaping",
  },
  {
    title: "Hardscape Walkway",
    category: "Landscaping",
    image: "/img-hardscape.jpg",
    alt: "Hardscape landscaping with patio and walkway installation in Calgary",
  },
];

/* ── Before / After Slider ── */
function BeforeAfterSlider({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(65); // Start at 65% to show mostly "after"
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intro animation: slide from 65 -> 50 on first view
  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          setTimeout(() => setPosition(55), 400);
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalRef.current = false;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = Math.abs(e.clientX - startXRef.current);
    const dy = Math.abs(e.clientY - startYRef.current);

    // Determine direction on first significant move
    if (!isHorizontalRef.current && (dx > 5 || dy > 5)) {
      isHorizontalRef.current = dx > dy;
      if (!isHorizontalRef.current) {
        // Vertical — release capture so page scrolls normally
        setIsDragging(false);
        try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
        return;
      }
    }

    if (isHorizontalRef.current) {
      e.preventDefault();
      updatePosition(e.clientX);
    }
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    isHorizontalRef.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden cursor-ew-resize select-none touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After image — full background */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
        loading="lazy"
        draggable={false}
      />

      {/* Before image — clipped by slider position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minWidth: containerRef.current?.offsetWidth || "100%" }}
          draggable={false}
        />
      </div>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          transition: isDragging ? "none" : "left 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/90" />

        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-[0.12em] font-semibold text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
        Before
      </span>
      <span className="absolute top-4 right-4 z-10 text-[11px] uppercase tracking-[0.12em] font-semibold text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
        After
      </span>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-40 bg-[var(--color-background)]">
      <div className="px-6 md:px-10">
        {/* Header */}
        <FadeUp className="text-center mb-16 md:mb-24">
          <span className="label-caps block mb-5">Our Work</span>
          <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
            Recent Projects
          </h2>
          <p className="text-[18px] md:text-[20px] text-[var(--color-muted-foreground)] max-w-lg mx-auto mt-5 leading-[1.75]">
            A look at some of the properties we&apos;ve transformed across
            Calgary, from full landscape builds to weekly maintenance programs.
          </p>
        </FadeUp>

        {/* Grid */}
        <div className="max-w-[1100px] mx-auto">
          {/* Row 1: 3 before/after sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {beforeAfterProjects.map((project, i) => (
              <FadeUp key={project.title} delay={i * 0.08}>
                <div>
                  <BeforeAfterSlider before={project.before} after={project.after} beforeAlt={project.beforeAlt} afterAlt={project.afterAlt} />
                  <div className="mt-4">
                    <p className="label-caps mb-1">{project.category}</p>
                    <p className="text-[15px] font-medium text-[var(--color-foreground)]">
                      {project.title}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Row 2: 2 images, wider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {bottomProjects.map((project, i) => (
              <FadeUp key={project.title} delay={(i + 3) * 0.08}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/2] rounded-2xl md:rounded-3xl overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  <p className="label-caps mb-1">{project.category}</p>
                  <p className="text-[15px] font-medium text-[var(--color-foreground)]">
                    {project.title}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
