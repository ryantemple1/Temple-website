"use client";

import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import FadeUp from "./FadeUp";

export default function CTA() {
  return (
    <section className="bg-[var(--color-sage-dark)] relative overflow-hidden">
      {/* Two-column: image left, text right — like Wembley golf reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src="/img-landscape-aerial.jpeg"
            alt="Temple Landscaping property"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 py-12 sm:py-16 md:py-20">
          <FadeUp>
            <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-white uppercase">
              One Call Covers Your Entire Property
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] text-white/60 leading-[1.75] max-w-[440px]">
              Lawn care, landscaping, and exterior cleaning, handled by one
              trusted team across Calgary.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] border border-white text-white px-7 py-3.5 hover:bg-white hover:text-[var(--color-sage-dark)] transition-all duration-300"
              >
                Get a Free Quote
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+14035551234"
                className="inline-flex items-center justify-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] text-white/60 px-4 py-3.5 hover:text-white transition-colors duration-300"
              >
                <Phone className="h-3.5 w-3.5" />
                (403) 555-1234
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
