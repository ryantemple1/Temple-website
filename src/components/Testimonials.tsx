"use client";

import { Star } from "lucide-react";
import FadeUp from "./FadeUp";

const testimonials = [
  {
    name: "Greg Tooth",
    initials: "GT",
    timeAgo: "Homeowner",
    quote:
      "Temple Landscaping does a fantastic job. High quality work, great communication, efficient team. I highly recommend.",
  },
  {
    name: "Cynthia McClare",
    initials: "CM",
    timeAgo: "Homeowner",
    quote:
      "Ryan came by and did my windows last weekend! He did a great job, gave me a good deal, and was a very personable and kind young man. Definitely recommend his services.",
  },
  {
    name: "Duane Parker",
    initials: "DP",
    timeAgo: "Homeowner",
    quote:
      "Great quality work with lawn mowing and maintenance. Highly recommend!",
  },
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-36 bg-[var(--color-background)]">
      <div className="px-6 md:px-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <span className="label-caps block mb-4">Reviews</span>
              <h2 className="font-sans text-[clamp(24px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground)] uppercase">
                5.0 on Google
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon className="h-5 w-5" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-[14px] font-medium text-[var(--color-foreground)] ml-1">5.0</span>
              <span className="text-[14px] text-[var(--color-muted-foreground)]">(108 reviews)</span>
            </div>
          </div>
        </FadeUp>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={0.05 + i * 0.08}>
              <div className="bg-white border border-[var(--color-border-visible)] rounded-lg p-5 sm:p-6 md:p-7 h-full flex flex-col">
                {/* Header: avatar + name + Google icon */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[var(--color-sage)] flex items-center justify-center shrink-0">
                      <span className="text-[13px] font-bold text-white">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--color-foreground)]">{t.name}</p>
                      <p className="text-[12px] text-[var(--color-muted-foreground)]">{t.timeAgo}</p>
                    </div>
                  </div>
                  <GoogleIcon className="h-5 w-5 shrink-0 mt-1" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] leading-[1.65] text-[var(--color-foreground)]/70 flex-1">
                  {t.quote}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
