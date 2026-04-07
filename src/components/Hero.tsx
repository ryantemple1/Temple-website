"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  // Mobile scroll
  const mobileRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.01, 0.04], [0, 1]);

  // Desktop scroll
  const desktopRef = useRef<HTMLElement>(null);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end start"],
  });
  const deskBeforeOpacity = useTransform(desktopProgress, [0, 0.06], [1, 0]);
  const deskAfterOpacity = useTransform(desktopProgress, [0.02, 0.08], [0, 1]);
  const deskImgScale = useTransform(desktopProgress, [0, 0.1], [1.02, 1]);

  return (
    <>
    {/* ── Mobile hero ── */}
    <section ref={mobileRef} className="md:hidden bg-[var(--color-background)] h-[100dvh] flex flex-col pt-[72px]">

      {/* All content — evenly distributed across the full height */}
      <div className="flex-1 flex flex-col items-center justify-evenly px-6 pb-[60px]">

        {/* Title + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="text-center"
        >
          <h1 className="font-sans text-[30px] font-black leading-[0.95] tracking-[-0.02em] text-[var(--color-foreground)] uppercase">
            Landscaping &amp; Exterior Services
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-8 h-px bg-[var(--color-foreground)]/15 shrink-0" />
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted-foreground)] font-medium">
              Proudly Serving Calgary
            </p>
            <div className="w-8 h-px bg-[var(--color-foreground)]/15 shrink-0" />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="flex justify-center gap-3"
        >
          <a
            href="/services"
            className="inline-flex items-center justify-center text-[12px] font-semibold uppercase tracking-[0.06em] border-2 border-[var(--color-foreground)] text-[var(--color-foreground)] px-5 py-3 whitespace-nowrap hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300"
          >
            Our Services
          </a>
          <a
            href="tel:+14033908395"
            className="inline-flex items-center justify-center text-[12px] font-medium tracking-[0.02em] border border-[var(--color-border-visible)] text-[var(--color-muted-foreground)] px-5 py-3 whitespace-nowrap hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)] transition-all duration-300"
          >
            (403) 390-8395
          </a>
        </motion.div>

        {/* Lawn crossfade — unmowed → striped on scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease }}
          className="w-full pointer-events-none select-none overflow-hidden"
        >
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="relative w-[140%] -ml-[20%] h-[36vh]"
          >
            {/* Before — unmowed grass */}
            <motion.div className="absolute inset-0" style={{ opacity: beforeOpacity }}>
              <Image
                src="/img-grass-before.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            {/* After — fresh stripes */}
            <motion.div className="absolute inset-0" style={{ opacity: afterOpacity }}>
              <Image
                src="/img-lawn-stripes-mobile.jpeg"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            {/* Multi-layer fade — dissolves edges into the page */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, var(--color-background) 68%)",
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, var(--color-background) 0%, transparent 30%, transparent 70%, var(--color-background) 100%)",
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, var(--color-background) 0%, transparent 15%, transparent 85%, var(--color-background) 100%)",
            }} />
          </motion.div>
        </motion.div>

        {/* Credibility marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="w-full overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />
          <div className="py-3 flex whitespace-nowrap animate-marquee-slow">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4">500+ Homes</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4">8+ Years</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4">$3M Insured</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4">Free Estimates</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4">Calgary, AB</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Desktop hero ── */}
    <section ref={desktopRef} className="hidden md:flex bg-[var(--color-background)] h-[100dvh] flex-col">
      {/* Navbar spacer */}
      <div className="h-[72px] shrink-0" />

      {/* Image container with notch — fills remaining space */}
      <div className="flex-1 relative mx-3 sm:mx-5 md:mx-10 lg:mx-14 mb-0 min-h-0">
        {/* Full image — rounded corners with inset padding from notch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Before — unmowed grass, subtle zoom out on scroll */}
          <motion.div className="absolute inset-0" style={{ opacity: deskBeforeOpacity, scale: deskImgScale }}>
            <Image
              src="/img-grass-before.jpg"
              alt="Unmowed lawn before Temple Landscaping service"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </motion.div>
          {/* After — fresh stripes */}
          <motion.div className="absolute inset-0" style={{ opacity: deskAfterOpacity }}>
            <Image
              src="/img-lawn-stripes.jpeg"
              alt="Professional lawn care and landscaping services in Calgary, Alberta"
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* Subtle gradient at bottom for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Scroll indicator — bottom right of image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="absolute bottom-5 md:bottom-8 right-5 md:right-8"
          >
            <a
              href="#services"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/50 text-white hover:bg-white/10 transition-colors"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Cream notch — top left, overlays the image */}
        <div
          className="absolute top-0 left-0 z-10 bg-[var(--color-background)] rounded-br-3xl p-5 sm:p-6 md:p-10 pr-6 sm:pr-8 md:pr-16 pb-6 sm:pb-8 md:pb-12 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <div className="flex items-center gap-3 md:gap-5 mb-1">
              <h1 className="font-sans text-[clamp(36px,6vw,80px)] font-black leading-[0.92] tracking-[-0.02em] text-[var(--color-foreground)] uppercase whitespace-nowrap">
                Landscaping&nbsp;&amp;
              </h1>
              <img
                src="/logo-icon.png"
                alt="Temple Landscaping logo"
                className="h-[1em] w-auto opacity-90" style={{ fontSize: "clamp(36px,6vw,80px)" }}
              />
            </div>
            <h1 className="font-sans text-[clamp(36px,6vw,80px)] font-black leading-[0.92] tracking-[-0.02em] text-[var(--color-foreground)] uppercase">
              Exterior&nbsp;Services
            </h1>
          </motion.div>

          {/* Subtext + CTAs — single row on desktop, stacked on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-6 md:mt-8 gap-4 md:gap-5"
          >
            {/* Editorial subtext */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className="w-6 md:w-10 h-px bg-[var(--color-foreground)]/15 shrink-0" />
              <p className="text-[13px] sm:text-[16px] md:text-[22px] uppercase tracking-[0.1em] text-[var(--color-muted-foreground)] font-medium whitespace-nowrap">
                Proudly Serving Calgary
              </p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.06em] border-2 border-[var(--color-foreground)] text-[var(--color-foreground)] px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 shrink-0"
              >
                Free Quote
              </a>
              <a
                href="tel:+14033908395"
                className="inline-flex items-center justify-center text-[13px] sm:text-[14px] font-medium tracking-[0.02em] border border-[var(--color-border-visible)] text-[var(--color-muted-foreground)] px-5 sm:px-6 py-3 sm:py-3.5 hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)] transition-all duration-300 shrink-0"
              >
                (403) 390-8395
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero bar — scrolling marquee with liquid glass */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease }}
        className="shrink-0 overflow-hidden relative"
        style={{
          background: "linear-gradient(180deg, rgba(244,241,235,0.95) 0%, rgba(244,241,235,0.8) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />

        <div className="py-5 md:py-6 flex whitespace-nowrap animate-marquee-slow">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4 sm:px-6 md:px-10">500+ Homes</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
              <span className="text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4 sm:px-6 md:px-10">8+ Years</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
              <span className="text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4 sm:px-6 md:px-10">$3M Insured</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
              <span className="text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4 sm:px-6 md:px-10">Free Estimates</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
              <span className="text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] font-medium px-4 sm:px-6 md:px-10">Calgary, AB</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-muted-foreground)]/30 shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  );
}
