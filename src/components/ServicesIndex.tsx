"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  categoryData,
  getServicesByCategory,
  services,
} from "@/data/services";
import FadeUp from "./FadeUp";
import ContactForm from "./ContactForm";
import ContactInfoList from "./ContactInfoList";

export default function ServicesIndex() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Tighter ranges work better on shorter mobile viewports
  const grassOpacity = useTransform(scrollYProgress, [0.02, 0.15], [1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);
  return (
    <>
      {/* Hero — editorial with grass landscape */}
      <section ref={heroRef} className="pt-[72px] bg-[var(--color-background)] relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 pt-10 md:pt-20">
          <FadeUp className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-14 h-14 md:w-16 md:h-16">
                <Image
                  src="/logo-icon.png"
                  alt="Temple Landscaping logo"
                  fill
                  className="object-contain"
                  sizes="64px"
                  priority
                />
              </div>
            </div>
            <span className="label-caps block mb-4" style={{ fontSize: "13px" }}>What We Offer</span>
            <h1 className="font-sans text-[clamp(36px,6vw,64px)] font-black text-[var(--color-foreground)] tracking-[-0.02em] leading-[1.05] uppercase mb-5">
              Our Services
            </h1>
            <p className="text-[15px] md:text-[18px] text-[var(--color-muted-foreground)] leading-[1.75] max-w-[320px] md:max-w-[500px] mx-auto text-left md:text-center">
              Two dedicated service divisions: lawn care &amp; landscaping
              and exterior cleaning. Focused expertise for every job.
            </p>
          </FadeUp>
        </div>

        {/* Desktop: stacked grass/cards animation */}
        <div className="hidden md:block relative mt-12 pb-24">
          <motion.div
            className="w-full overflow-hidden"
            style={{ opacity: grassOpacity }}
          >
            <img
              src="/hero-grass.png"
              alt="Healthy green lawn maintained by Temple Landscaping in Calgary"
              className="w-full object-cover object-top pointer-events-none select-none"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center px-10"
            style={{ opacity: cardsOpacity, y: cardsY }}
          >
            <div className="w-full max-w-[1200px] grid grid-cols-2 gap-7">
              {categoryData.map((category) => {
                const categoryServices = getServicesByCategory(category.slug);
                return (
                  <Link
                    key={category.slug}
                    href={`/services/${category.slug}`}
                    className="group block cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-3xl h-[420px]">
                      <Image
                        src={category.heroImage}
                        alt={`${category.title} services in Calgary by Temple Landscaping`}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                      <div className="absolute inset-0 flex flex-col justify-end p-10">
                        <span className="label-caps block mb-2" style={{ color: "white" }}>
                          {categoryServices.length} Services
                        </span>
                        <h3 className="font-sans text-[clamp(22px,3vw,34px)] font-black text-white tracking-[-0.01em] leading-[1.1] uppercase mb-3">
                          {category.title}
                        </h3>
                        <p className="text-[15px] text-white/90 leading-[1.7] mb-4 max-w-[400px]">
                          {category.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] text-white group-hover:text-white/80 transition-colors duration-200">
                          View Services
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile: stacked cards with clean separation */}
        <div className="md:hidden px-6 pt-10 pb-12">
          <div className="border-t border-[var(--color-border-visible)] pt-10">
            <div className="flex flex-col gap-5">
              {categoryData.map((category, index) => {
                const categoryServices = getServicesByCategory(category.slug);
                return (
                  <FadeUp key={category.slug} delay={index * 0.1}>
                    <Link
                      href={`/services/${category.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-2xl h-[260px]">
                        <Image
                          src={category.heroImage}
                          alt={`${category.title} services in Calgary by Temple Landscaping`}
                          fill
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          sizes="100vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <span className="label-caps block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                            {categoryServices.length} Services
                          </span>
                          <h3 className="font-sans text-[22px] font-black text-white tracking-[-0.01em] leading-[1.1] uppercase mb-2">
                            {category.title}
                          </h3>
                          <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/80">
                            View Services
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All services grid */}
      <section className="py-20 md:py-28 bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeUp className="text-center mb-14">
            <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
              All Services
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {services.map((service, index) => (
              <FadeUp key={service.slug} delay={index * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block cursor-pointer"
                >
                  <div className="overflow-hidden rounded-2xl md:rounded-3xl mb-5">
                    <Image
                      src={service.heroImage}
                      alt={`${service.title} service in Calgary by Temple Landscaping`}
                      width={600}
                      height={400}
                      className="w-full h-[220px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="label-caps text-[var(--color-sage)] block mb-1.5">
                        {service.categoryLabel}
                      </span>
                      <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-sage)] transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-[15px] text-[var(--color-muted-foreground)] leading-[1.7]">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-[var(--color-muted-foreground)]/30 group-hover:text-[var(--color-sage)] transition-colors duration-200 mt-1" />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact — matching homepage layout */}
      <section id="contact" className="py-24 md:py-40 bg-[var(--color-background)]">
        <div className="px-6 md:px-10">
          <FadeUp className="text-center mb-16 md:mb-24">
            <span className="label-caps block mb-5">Contact</span>
            <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
              Free Estimates, No Obligations
            </h2>
          </FadeUp>

          {/* Desktop */}
          <div className="max-w-[1100px] mx-auto hidden lg:grid grid-cols-2 gap-16">
            <div>
              <FadeUp>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-10">
                  <Image
                    src="/img-ryan-cutout.png"
                    alt="Temple Landscaping owner Ryan serving Calgary homeowners"
                    fill
                    className="object-cover object-bottom"
                    sizes="50vw"
                    loading="lazy"
                  />
                </div>
              </FadeUp>
              <ContactInfoList />
            </div>
            <FadeUp delay={0.15}>
              <ContactForm idPrefix="services" />
            </FadeUp>
          </div>

          {/* Mobile: image → form → contact info */}
          <div className="max-w-[1100px] mx-auto lg:hidden flex flex-col gap-10">
            <FadeUp>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/img-ryan-cutout.png"
                  alt="Temple Landscaping owner with equipment"
                  fill
                  className="object-cover object-bottom"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ContactForm idPrefix="services" />
            </FadeUp>
            <ContactInfoList />
          </div>
        </div>
      </section>
    </>
  );
}
