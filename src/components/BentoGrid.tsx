"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeUp from "./FadeUp";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const services = [
  {
    title: "Lawn Care & Landscaping",
    image: "/img-lawncare-header.png",
    ctaLabel: "All Lawn Care Services",
    ctaHref: "/services/lawn-care",
    items: [
      { name: "Weekly Mowing", desc: "Lawn mowing, edge trimming, blowing off sidewalks", slug: "weekly-lawn-mowing", img: "/img-mower.jpeg", alt: "Weekly lawn mowing service in SW Calgary by Temple Landscaping" },
      { name: "Seasonal Cleanups", desc: "Spring & fall aeration, power raking, leaf removal", slug: "spring-fall-clean-ups", img: "/img-fall-cleanup.jpg", alt: "Fall leaf cleanup and seasonal lawn maintenance in Calgary" },
      { name: "Hedge Trimming", desc: "Professional shaping of hedges and shrubs", slug: "hedge-trimming", img: "/img-trimmer-v2.jpeg", alt: "Professional hedge trimming and shaping in Calgary by Temple Landscaping" },
      { name: "Weed Control", desc: "Treatments to keep lawns and garden beds weed free", slug: "weed-control", img: "/img-fertilization.jpeg", alt: "Weed control and lawn fertilization treatment in Calgary" },
      { name: "Landscaping", desc: "Patios, walkways, retaining walls, sod, garden beds", slug: "landscaping", img: "/img-hardscape-aerial.jpeg", alt: "Hardscape landscaping with patio and walkway installation in Calgary" },
    ],
  },
  {
    title: "Exterior Cleaning Services",
    image: "/img-exterior-header.png",
    ctaLabel: "All Exterior Services",
    ctaHref: "/services/exterior-cleaning",
    items: [
      { name: "Driveway Sealing", desc: "Clear coat sealing for exposed aggregate driveways", slug: "driveway-sealing", img: "/img-driveway-sealing.jpg", alt: "Exposed aggregate driveway sealing in Calgary" },
      { name: "Window Cleaning", desc: "Streak-free interior and exterior window cleaning", slug: "window-cleaning", img: "/img-window-cleaning-v2.jpeg", alt: "Professional window cleaning service in Calgary" },
      { name: "Gutter Cleaning", desc: "Removal of leaves and debris from gutters and downspouts", slug: "gutter-cleaning", img: "/img-gutter-cleaning.png", alt: "Gutter cleaning and downspout maintenance in Calgary" },
      { name: "Pressure Washing", desc: "Driveways, sidewalks, patios, and exterior surfaces", slug: "pressure-washing", img: "/img-pressure-washing.png", alt: "Professional pressure washing for driveways and patios in Calgary" },
    ],
  },
];

function ServicePanel({ items, ctaLabel, ctaHref }: { items: typeof services[0]["items"]; ctaLabel: string; ctaHref: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="border-t border-[var(--color-border-visible)] flex flex-col flex-1">
      <div className="flex-1 flex flex-col">
      {items.map((item) => {
        const isOpen = active === item.slug;
        return (
          <Link
            key={item.slug}
            href={`/services/${item.slug}`}
            className="block border-b border-[var(--color-border-visible)] relative"
            onMouseEnter={() => setActive(item.slug)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Row */}
            <div className="flex items-center gap-4 py-5 md:py-6 cursor-pointer">
              {/* Title */}
              <p
                className="text-[18px] md:text-[24px] font-bold tracking-[-0.01em] flex-1"
                style={{
                  color: isOpen ? "var(--color-sage)" : "var(--color-foreground)",
                  transition: "color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {item.name}
              </p>

              {/* Arrow */}
              <ArrowRight
                className="h-5 w-5 shrink-0"
                style={{
                  color: isOpen ? "var(--color-foreground)" : "rgba(139,139,128,0.25)",
                  transform: isOpen ? "translateX(4px)" : "translateX(0)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>

            {/* Expanded content — description + image */}
            <div
              className="grid overflow-hidden"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-5 md:pb-6">
                  <p className="text-[13px] md:text-[14px] text-[var(--color-muted-foreground)] leading-[1.6] max-w-[300px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Image — spans full row height, flush to top/bottom borders */}
            <div
              className="absolute top-0 bottom-0 right-10 hidden sm:block overflow-hidden"
              style={{
                width: isOpen ? "90px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: "width 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
              }}
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="90px"
              />
            </div>
          </Link>
        );
      })}
      </div>

      {/* CTA button */}
      <div className="mt-8">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 w-full text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-6 py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 group/btn"
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function MobileServicePanel({ items, ctaLabel, ctaHref }: { items: typeof services[0]["items"]; ctaLabel: string; ctaHref: string }) {
  const [active, setActive] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const activeRef = useRef<string | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => {
      const viewCentre = window.innerHeight / 2;
      let closest: string | null = null;
      let closestDist = Infinity;

      itemRefs.current.forEach((el, slug) => {
        const rect = el.getBoundingClientRect();
        const itemCentre = rect.top + rect.height / 2;
        const dist = Math.abs(itemCentre - viewCentre);
        // Only consider items that are at least partially visible
        if (rect.bottom > 0 && rect.top < window.innerHeight && dist < closestDist) {
          closestDist = dist;
          closest = slug;
        }
      });

      if (closest && closest !== activeRef.current) {
        activeRef.current = closest;
        setActive(closest);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    check(); // initial check
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="border-t border-[var(--color-border-visible)] flex flex-col flex-1">
      <div className="flex-1 flex flex-col">
        {items.map((item) => {
          const isOpen = active === item.slug;
          return (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              ref={(el) => { if (el) itemRefs.current.set(item.slug, el); }}
              data-slug={item.slug}
              className="block border-b border-[var(--color-border-visible)] relative"
            >
              {/* Row */}
              <div className="py-5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <p
                    className="text-[18px] font-bold tracking-[-0.01em]"
                    style={{
                      color: isOpen ? "var(--color-sage)" : "var(--color-foreground)",
                      transition: "color 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {item.name}
                  </p>
                  <ArrowRight
                    className="h-4 w-4 shrink-0"
                    style={{
                      color: isOpen ? "var(--color-foreground)" : "rgba(139,139,128,0.25)",
                      transform: isOpen ? "translateX(3px)" : "translateX(0)",
                      transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              </div>

              {/* Expanded: description, clear of image */}
              <div
                className="grid overflow-hidden"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pb-5 pr-[110px]">
                    <p className="text-[13px] text-[var(--color-muted-foreground)] leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image — flush top/bottom of row, right side, square corners */}
              <div
                className="absolute top-0 bottom-0 right-8 overflow-hidden"
                style={{
                  width: isOpen ? "70px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="70px"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-6 py-3 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 group/btn"
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

const leftStats = [
  { value: "500+", label: "HOMES" },
  { value: "8+", label: "YEARS" },
  { value: "100+", label: "REVIEWS" },
];

const rightStats = [
  { value: "$3M", label: "INSURED" },
  { value: "FREE", label: "ESTIMATES" },
  { value: "9", label: "SERVICES" },
];

const ITEM_H = 52;

function StatDial({ stats, align, progress }: { stats: typeof leftStats; align: "left" | "right"; progress: import("framer-motion").MotionValue<number> }) {
  // Map scroll progress to a Y offset that cycles through stats
  const y = useTransform(progress, [0.35, 0.45, 0.55, 0.65], [0, 0, -ITEM_H, -ITEM_H * 2]);

  return (
    <div
      className={`hidden lg:block flex-1 overflow-hidden pointer-events-none ${align === "right" ? "pr-10 xl:pr-16" : "pl-10 xl:pl-16"}`}
      style={{
        height: ITEM_H,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}
    >
      <motion.div style={{ y }}>
        {stats.map((stat) => (
          <div
            key={stat.value}
            className={`flex items-center gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}
            style={{ height: ITEM_H }}
          >
            <span
              className="font-sans font-black text-[22px] xl:text-[26px] leading-none uppercase"
              style={{
                backgroundImage: "url(/img-grass-texture.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </span>
            <span
              className="font-sans font-black text-[22px] xl:text-[26px] leading-none uppercase text-[var(--color-muted-foreground)]/40"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phase 1 (0–0.45): image stays small (96px), sticky at viewport center
  // Phase 2 (0.45–0.5): brief pause
  // Phase 3 (0.5–0.7): image expands to match service section width (~1000px)
  const imageWidth = useTransform(scrollYProgress, [0, 0.5, 0.6, 0.82], [96, 96, 140, 1000]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.5, 0.6, 0.82], [96, 96, 92, 80]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 0.6, 0.82], [20, 20, 18, 14]);

  // Crossfade: mower visible at start, lawn stripes fades in during expansion
  const mowerOpacity = useTransform(scrollYProgress, [0.55, 0.7], [1, 0]);
  const stripesOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  // Clip-path for the light text layer — computed from real DOM positions
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lightTextRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!textContainerRef.current || !lightTextRef.current) return;

    const textRect = textContainerRef.current.getBoundingClientRect();
    const imgH = imageHeight.get();
    const imgTop = window.innerHeight / 2 - imgH / 2;
    const imgW = imageWidth.get();
    const imgR = borderRadius.get();

    const top = Math.max(0, imgTop - textRect.top);
    const bottom = Math.max(0, textRect.height - (imgTop - textRect.top + imgH));
    const left = Math.max(0, (textRect.width - imgW) / 2);
    const right = left;

    lightTextRef.current.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${imgR}px)`;
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Top padding */}
      <div className="h-12 md:h-40" />

      {/* Sticky image — stays at viewport center */}
      <div
        className="sticky flex justify-center pointer-events-none px-6 md:px-10"
        style={{ top: "calc(50vh - 48px)", zIndex: 1 }}
      >
        <motion.div
          className="relative overflow-hidden max-w-[1000px]"
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius,
          }}
        >
          <motion.div className="absolute inset-0" style={{ opacity: mowerOpacity }}>
            <Image
              src="/img-mower-aerial.jpeg"
              alt="Weekly lawn mowing service in SW Calgary by Temple Landscaping"
              fill
              className="object-cover"
              style={{ objectPosition: "70% 25%" }}
              sizes="400px"
              priority
            />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: stripesOpacity }}>
            <Image
              src="/img-lawn-stripes.jpeg"
              alt="Freshly mowed lawn with professional striping in SW Calgary"
              fill
              className="object-cover"
              sizes="1000px"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer — original spacing between image and text */}
      <div className="h-6 md:h-10" />

      {/* Text with flanking credibility dials */}
      <div className="relative px-6 md:px-10" style={{ zIndex: 10 }}>
        <div className="flex items-center justify-center max-w-[1200px] mx-auto">

          {/* Left dial */}
          <StatDial stats={leftStats} align="right" progress={scrollYProgress} />

          {/* Center text — unchanged */}
          <div ref={textContainerRef} className="relative shrink-0">
            <div className="text-center">
              <span className="label-caps" style={{ fontSize: "13px" }}>Temple&apos;s Services</span>
              <h2 className="font-sans leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground)] uppercase max-w-3xl mx-auto mt-6">
                <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">We Handle</span>
                <span className="block text-[clamp(30px,4.5vw,54px)] font-bold">Everything.</span>
                <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">You Enjoy.</span>
              </h2>
            </div>

            {/* Light text — clipped to image bounds */}
            <div
              ref={lightTextRef}
              className="absolute inset-0 text-center"
              style={{ clipPath: "inset(100% 100% 100% 100%)" }}
            >
              <span className="label-caps" style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Temple&apos;s Services</span>
              <h2 className="font-sans leading-[1.1] tracking-[-0.02em] uppercase max-w-3xl mx-auto mt-6" style={{ color: "#ffffff" }}>
                <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">We Handle</span>
                <span className="block text-[clamp(30px,4.5vw,54px)] font-bold">Everything.</span>
                <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">You Enjoy.</span>
              </h2>
            </div>
          </div>

          {/* Right dial */}
          <StatDial stats={rightStats} align="left" progress={scrollYProgress} />

        </div>
      </div>

      {/* Scroll room — image travels past text, expands, then unsticks below */}
      <div className="h-[18vh] md:h-[25vh]" />
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section id="services" className="pb-24 md:pb-40 bg-[var(--color-background)]">
      {/* ── Scroll animation: sticky image + glass text + expansion ── */}
      <HeroImage />

      {/* Spacing — image settles above service cards */}
      <div className="h-14 md:h-10" />

      {/* ── Service cards ── */}
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12 lg:gap-16 max-w-[1000px] mx-auto mt-6 md:mt-14 items-start md:items-stretch">
          {services.map((service, i) => {
            return (
              <FadeUp key={service.title} delay={i * 0.1} className="h-full">
                <div className="flex flex-col h-full">
                  {/* Title */}
                  <h3 className="font-sans text-[28px] md:text-[clamp(22px,2.2vw,30px)] font-black leading-[1.05] tracking-[-0.02em] md:tracking-[0.01em] text-[var(--color-sage)] md:text-[var(--color-foreground)] uppercase mb-6 sm:mb-8 mt-0 md:mt-2 text-center md:text-left">
                    {service.title}
                  </h3>

                  {/* Desktop: hover panel */}
                  <div className="hidden md:flex flex-1 flex-col">
                    <ServicePanel items={service.items} ctaLabel={service.ctaLabel} ctaHref={service.ctaHref} />
                  </div>

                  {/* Mobile: scroll-expand panel */}
                  <div className="md:hidden flex-1 flex flex-col">
                    <MobileServicePanel items={service.items} ctaLabel={service.ctaLabel} ctaHref={service.ctaHref} />
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
