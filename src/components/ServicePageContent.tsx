"use client";

import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceDetail } from "@/data/services";
import ContactForm from "./ContactForm";
import ContactInfoList from "./ContactInfoList";
import FadeUp from "./FadeUp";

interface Props {
  service: ServiceDetail;
  related: ServiceDetail[];
}

export default function ServicePageContent({ service, related }: Props) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.templelandscaping.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.templelandscaping.ca/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://www.templelandscaping.ca/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Temple Landscaping & Exterior Services",
      url: "https://www.templelandscaping.ca",
      telephone: "+14033908395",
    },
    areaServed: {
      "@type": "City",
      name: "Calgary",
    },
    image: `https://www.templelandscaping.ca${service.heroImage}`,
    url: `https://www.templelandscaping.ca/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-[72px]">
        <div className="relative h-[350px] md:h-[420px] overflow-hidden">
          <Image
            src={service.heroImage}
            alt={`${service.title} service in Calgary by Temple Landscaping`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 w-full">
              <div>
                <span className="label-caps block mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{service.categoryLabel}</span>
                <h1 className="font-sans text-[clamp(32px,5vw,52px)] font-black text-white tracking-[-0.01em] leading-[1.1] uppercase">
                  {service.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section id="service-info" className="bg-[var(--color-surface)] border-b border-[var(--color-border-visible)]">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <div className="flex items-center gap-2 text-[14px]">
            <Link href="/" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-sage)] transition-colors">Home</Link>
            <span className="text-[var(--color-muted-foreground)]/40">/</span>
            <Link href="/services" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-sage)] transition-colors">Services</Link>
            <span className="text-[var(--color-muted-foreground)]/40">/</span>
            <span className="text-[var(--color-foreground)] font-semibold">{service.title}</span>
          </div>
        </div>
      </section>

      {/* Service details — two-column: content left, image right */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            {/* Left — text content */}
            <FadeUp>
              <span className="label-caps text-[var(--color-sage)] block mb-3">{service.categoryLabel}</span>
              <h2 className="font-sans text-[clamp(26px,3.5vw,40px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase mb-6">
                {service.title}
              </h2>

              {service.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] sm:text-[17px] md:text-[18px] text-[var(--color-muted-foreground)] leading-[1.75] mb-4 sm:mb-5 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              {/* What's included */}
              {service.includes && service.includes.length > 0 && (
                <div className="mt-10 pt-8 border-t border-[var(--color-border-visible)]">
                  <div className={service.includes.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8" : ""}>
                    {service.includes.map((group) => (
                      <div key={group.label}>
                        <h3 className="font-sans text-[15px] font-bold text-[var(--color-foreground)] uppercase tracking-[0.04em] mb-4">
                          {group.label}
                        </h3>
                        <div className="space-y-3">
                          {group.items.map((item) => (
                            <div key={item} className="flex items-center gap-3">
                              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[var(--color-sage)] flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-[15px] text-[var(--color-muted-foreground)]">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.additionalInfo && (
                <p className="text-[15px] text-[var(--color-muted-foreground)]/60 leading-[1.7] mt-8 pt-8 border-t border-[var(--color-border-visible)]">
                  {service.additionalInfo}
                </p>
              )}

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-[var(--color-border-visible)] text-center md:text-left">
                <p className="text-[15px] text-[var(--color-muted-foreground)] mb-5">
                  Interested in {service.title.toLowerCase()}? Get a free, no obligation quote for your property.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] px-7 py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300"
                >
                  Request a Free Quote
                </a>
              </div>
            </FadeUp>

            {/* Right — service image */}
            <FadeUp delay={0.1}>
              <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden sticky top-[100px]">
                <Image
                  src={service.heroImage}
                  alt={`${service.title} in Calgary, AB by Temple Landscaping`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Contact section — homepage style */}
      <section id="contact" className="py-24 md:py-40 bg-[var(--color-background)]">
        <div className="px-6 md:px-10">
          {/* Header */}
          <FadeUp className="text-center mb-16 md:mb-24">
            <span className="label-caps block mb-5">Contact</span>
            <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
              Free Estimates, No Obligations
            </h2>
          </FadeUp>

          {/* Desktop: two-column */}
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
              <ContactForm defaultService={service.slug} idPrefix="service" />
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
              <ContactForm defaultService={service.slug} idPrefix="service" />
            </FadeUp>
            <ContactInfoList />
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-[var(--color-background)]">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <FadeUp>
              <h3 className="font-sans text-[18px] font-bold text-[var(--color-foreground)] uppercase tracking-[0.02em] mb-8">
                Related Services
              </h3>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r, i) => (
                <FadeUp key={r.slug} delay={0.05 + i * 0.05}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group block"
                  >
                    <div className="relative h-[160px] sm:h-[180px] md:h-[200px] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={r.heroImage}
                        alt={`${r.title} service in Calgary by Temple Landscaping`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-sage)] transition-colors">
                        {r.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[var(--color-muted-foreground)]/30 group-hover:text-[var(--color-sage)] transition-colors" />
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <section className="py-6 bg-[var(--color-background)] border-t border-[var(--color-border-visible)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Link
            href={`/services/${service.category}`}
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)] hover:text-[var(--color-sage)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {service.category === "lawn-care" ? "Lawn Care" : "Exterior Cleaning"}
          </Link>
        </div>
      </section>
    </>
  );
}
