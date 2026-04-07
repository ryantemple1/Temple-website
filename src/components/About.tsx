"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import Image from "next/image";
import FadeUp from "./FadeUp";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 bg-[var(--color-background)]">
      <div className="px-6 md:px-10">
        {/* Small centered icon image — like Daya template */}
        <FadeUp className="flex justify-center mb-10">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden">
            <Image
              src="/img-about-icon.jpeg"
              alt="Temple Landscaping"
              fill
              className="object-cover"
              sizes="96px"
              loading="lazy"
            />
          </div>
        </FadeUp>

        {/* Centered label */}
        <FadeUp delay={0.05} className="text-center">
          <span className="label-caps" style={{ fontSize: "13px" }}>Temple&apos;s Services</span>
        </FadeUp>

        {/* Big serif headline — centered, editorial */}
        <FadeUp delay={0.1} className="text-center mt-6">
          <h2 className="font-sans leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground)] uppercase max-w-3xl mx-auto">
            <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">We Handle</span>
            <span className="block text-[clamp(30px,4.5vw,54px)] font-bold">Everything.</span>
            <span className="block text-[clamp(24px,3.5vw,42px)] font-semibold">You Enjoy.</span>
          </h2>
        </FadeUp>

        {/* Body text — centered, narrow measure */}
        <FadeUp delay={0.15} className="text-center mt-8 max-w-xl mx-auto">
          <p className="text-[15px] md:text-[16px] text-[var(--color-muted-foreground)] leading-[1.8]">
            This summer, you should be spending your weekends with cold drinks
            on the patio, burgers on the grill, and quality time with the
            people you care about most. Not pushing a mower in the
            heat.
          </p>
        </FadeUp>

        <FadeUp delay={0.2} className="text-center mt-5 max-w-xl mx-auto">
          <p className="text-[15px] md:text-[16px] text-[var(--color-muted-foreground)] leading-[1.8]">
            From weekly lawn care and seasonal clean-ups to sparkling windows
            and sealed driveways, Temple handles everything so the only thing
            you need to do in your backyard is relax.
          </p>
        </FadeUp>

        {/* Patio Beers playlist — centered */}
        <FadeUp delay={0.25} className="flex justify-center mt-10">
          <a
            href="https://open.spotify.com/playlist/37i9dQZF1DXbCceGqODMkz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-[var(--color-border-visible)] rounded-full px-5 py-3 hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="h-9 w-9 rounded-full bg-[var(--color-sage)]/10 flex items-center justify-center">
              <Music className="h-4 w-4 text-[var(--color-sage)]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-sage)] transition-colors">
                Patio Beers Playlist
              </p>
              <p className="text-[11px] text-[var(--color-muted-foreground)]">
                Our curated summer soundtrack
              </p>
            </div>
          </a>
        </FadeUp>

        {/* Asymmetric two-image layout — like the references */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img-lawn-rays.jpeg"
                alt="Beautiful Calgary lawn maintained by Temple"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden md:mt-16">
              <Image
                src="/img-landscape-aerial.jpeg"
                alt="Aerial view of landscaped property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
