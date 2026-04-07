"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CategoryData, ServiceDetail } from "@/data/services";
import { categoryData } from "@/data/services";
import FadeUp from "./FadeUp";
import ContactForm from "./ContactForm";

interface Props {
  category: CategoryData;
  services: ServiceDetail[];
}

export default function ServiceCategoryPage({ category, services }: Props) {
  const otherCategory = categoryData.find((c) => c.slug !== category.slug)!;
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[72px]">
        <div className="relative h-[350px] md:h-[420px] overflow-hidden">
          <Image
            src={category.heroImage}
            alt={category.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 w-full">
              <div className="max-w-[600px]">
                <span className="label-caps text-white/60 block mb-4">{category.shortTitle}</span>
                <h1 className="font-sans text-[clamp(32px,5vw,52px)] font-black text-white tracking-[-0.01em] leading-[1.1] uppercase mb-4">
                  {category.title}
                </h1>
                <p className="text-[18px] md:text-[20px] text-white/60 leading-[1.75]">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border-visible)]">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <div className="flex items-center gap-2 text-[14px]">
            <Link href="/" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-sage)] transition-colors">Home</Link>
            <span className="text-[var(--color-muted-foreground)]/40">/</span>
            <Link href="/services" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-sage)] transition-colors">Services</Link>
            <span className="text-[var(--color-muted-foreground)]/40">/</span>
            <span className="text-[var(--color-foreground)] font-semibold">{category.shortTitle}</span>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 md:py-28 bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeUp className="mb-14">
            <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
              Our {category.shortTitle} Services
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {services.map((service, index) => (
              <FadeUp key={service.slug} delay={index * 0.06}>
                <Link href={`/services/${service.slug}`} className="group block cursor-pointer">
                  <div className="overflow-hidden rounded-2xl md:rounded-3xl mb-5">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-[220px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
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

      {/* Cross-link to other category */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="border-t border-[var(--color-border-visible)] py-10 md:py-14">
            <FadeUp>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <span className="label-caps text-[var(--color-muted-foreground)]/60 block mb-2">Also Available</span>
                  <h3 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] font-black text-[var(--color-foreground)] leading-[1.1] tracking-[-0.01em] uppercase">
                    {otherCategory.title}
                  </h3>
                </div>
                <Link
                  href={`/services/${otherCategory.slug}`}
                  className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-6 sm:px-7 py-3 sm:py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 shrink-0 self-start sm:self-auto"
                >
                  View Services
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Contact form — full width */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeUp>
            <ContactForm idPrefix={`cat-${category.slug}`} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
