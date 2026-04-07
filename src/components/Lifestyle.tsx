"use client";

import Image from "next/image";
import { Music } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeUp from "./FadeUp";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Lifestyle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Left image: slides in from far left + scales up + parallax creep
  const leftX = useTransform(scrollYProgress, [0, 0.35], [-200, 0]);
  const leftScale = useTransform(scrollYProgress, [0, 0.35], [0.85, 1]);
  const leftRotate = useTransform(scrollYProgress, [0, 0.35], [-4, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.35, 1], [0, -30]);

  // Right image: slides in from far right + scales up + parallax creep
  const rightX = useTransform(scrollYProgress, [0.05, 0.4], [200, 0]);
  const rightScale = useTransform(scrollYProgress, [0.05, 0.4], [0.85, 1]);
  const rightRotate = useTransform(scrollYProgress, [0.05, 0.4], [4, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.4, 1], [0, -50]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--color-background)]">
      {/* Mobile background image wash */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        <Image
          src="/img-house-lawn.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          sizes="100vw"
        />
      </div>

      <div className="relative py-20 md:py-36">

        {/* Title */}
        <FadeUp className="px-8 md:px-10 mb-8 md:mb-16 text-center">
          <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
            You Deserve The Temple Experience
          </h2>
        </FadeUp>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(380px,620px)_minmax(0,0.8fr)] items-stretch">

          {/* Left image — dramatic entrance + subtle parallax */}
          <motion.div
            style={{
              x: leftX,
              scale: leftScale,
              rotate: leftRotate,
              opacity: leftOpacity,
              y: leftY,
            }}
            className="hidden md:block h-full"
          >
            <div
              className="relative h-full overflow-hidden ml-[-60px] lg:ml-[-40px]"
              style={{ borderRadius: "0 28px 28px 0" }}
            >
              <Image
                src="/img-garden-bed.jpg"
                alt="Garden bed with black mulch and plantings by Temple"
                fill
                className="object-cover"
                sizes="35vw"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Center text */}
          <div className="text-center px-8 md:px-10 lg:px-14 flex flex-col justify-between">
            <div>
              {/* Mobile — single quote block */}
              <FadeUp delay={0.06} className="md:hidden">
                <div className="border-l-2 border-[var(--color-sage)] pl-5 py-1">
                  <p className="text-[15px] leading-[1.75] text-[var(--color-foreground)]/60 text-left">
                    This summer, you should be spending your weekends with cold drinks
                    on the patio, burgers on the grill, and quality time with the
                    people you care about most. Not pushing a mower in the heat.
                  </p>
                </div>
              </FadeUp>

              {/* Desktop — both paragraphs */}
              <div className="hidden md:block">
                <FadeUp delay={0.06}>
                  <p className="text-[18px] md:text-[20px] leading-[1.75] text-[var(--color-foreground)]/60 text-justify">
                    This summer, you should be spending your weekends with cold drinks
                    on the patio, burgers on the grill, and quality time with the
                    people you care about most. Not pushing a mower in the heat.
                  </p>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <p className="text-[18px] md:text-[20px] leading-[1.75] text-[var(--color-foreground)]/60 mt-6 text-justify">
                    From weekly lawn care and seasonal cleanups to sparkling windows
                    and sealed driveways, Temple handles everything so the only thing
                    you need to do in your backyard is relax.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Buttons — desktop: side by side */}
            <FadeUp delay={0.18} className="hidden md:flex justify-center gap-3 mt-10">
              <a
                href="https://open.spotify.com/playlist/3pf2wxXScLtd8KtUXIiL0q?si=5dSqFHh6QLepptSY_PKA4Q&pi=VKZKVg9KQl-YY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-6 py-3 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300"
              >
                <Music className="h-4 w-4" />
                Patio Beers
              </a>
              <a
                href="#contact"
                className="inline-flex items-center text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-6 py-3 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300"
              >
                Free Quote
              </a>
            </FadeUp>

            {/* Mobile: full-width Patio Beers playlist button with background image */}
            <FadeUp delay={0.18} className="md:hidden mt-8">
              <a
                href="https://open.spotify.com/playlist/3pf2wxXScLtd8KtUXIiL0q?si=5dSqFHh6QLepptSY_PKA4Q&pi=VKZKVg9KQl-YY"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full overflow-hidden rounded-xl"
              >
                <div className="relative h-[72px]">
                  <Image
                    src="/img-garden-bed.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/65" />
                  <div className="absolute inset-0 flex items-center justify-center gap-2.5">
                    <Music className="h-4 w-4 text-white" />
                    <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                      Patio Beers Playlist
                    </span>
                  </div>
                </div>
              </a>
            </FadeUp>
          </div>

          {/* Right image — dramatic entrance + subtle parallax */}
          <motion.div
            style={{
              x: rightX,
              scale: rightScale,
              rotate: rightRotate,
              opacity: rightOpacity,
              y: rightY,
            }}
            className="hidden md:block h-full"
          >
            <div
              className="relative h-full overflow-hidden mr-[-60px] lg:mr-[-40px]"
              style={{ borderRadius: "28px 0 0 28px" }}
            >
              <Image
                src="/img-house-lawn.jpg"
                alt="Calgary home with fresh cut lawn"
                fill
                className="object-cover"
                sizes="35vw"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile images — hidden */}
      </div>
    </section>
  );
}
