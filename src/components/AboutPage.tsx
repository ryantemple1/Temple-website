"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactInfoList from "./ContactInfoList";
import FadeUp from "./FadeUp";

export default function AboutPage() {
  return (
    <>
      {/* Hero + Story — clean editorial */}
      <section className="pt-[72px] bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28">
          <FadeUp className="text-center mb-16 md:mb-24">
            <div className="flex justify-center mb-6">
              <div className="relative w-14 h-14 md:w-16 md:h-16">
                <Image
                  src="/logo-icon.png"
                  alt="Temple Landscaping logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <span className="label-caps block mb-4" style={{ fontSize: "13px" }}>About Us</span>
            <h1 className="font-sans text-[clamp(36px,6vw,64px)] font-black text-[var(--color-foreground)] tracking-[-0.02em] leading-[1.05] uppercase mb-5">
              Our Story
            </h1>
            <p className="text-[17px] md:text-[18px] text-[var(--color-muted-foreground)] leading-[1.75] max-w-[520px] mx-auto">
              Built on hard work and Calgary pride. One team, one standard,
              every property treated like our own.
            </p>
          </FadeUp>

          {/* Two-column: photo + story */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16 items-start">
            {/* Owner photo */}
            <FadeUp className="flex-shrink-0 w-full lg:w-[380px]">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4]">
                <Image
                  src="/img-ryan-about-v2.jpg"
                  alt="Temple Landscaping owner Ryan serving Calgary homeowners"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  priority
                />
              </div>
            </FadeUp>

            {/* Story content */}
            <FadeUp delay={0.1} className="flex-1">
              <span className="label-caps text-[var(--color-sage)] block mb-3">Who We Are</span>
              <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase mb-6">
                Built on Hard Work &amp; Calgary Pride
              </h2>

              <div className="space-y-4 sm:space-y-5 text-[15px] sm:text-[17px] md:text-[20px] text-[var(--color-muted-foreground)] leading-[1.75]">
                <p>
                  Calgary born and raised. Temple Landscaping grew the way most
                  good things do. Job after job, a reputation built on showing up
                  and doing the work right. We handle everything from weekly lawn
                  care to full exterior cleanups for homeowners across Calgary.
                </p>
                <p>
                  My whole thing is simple. You work hard all week. The last thing
                  you should be doing on a Saturday afternoon is stressing about
                  your yard. That is what we are here for. So you can crack a beer,
                  fire up the grill, and actually enjoy the summer.
                </p>
              </div>

            </FadeUp>
          </div>

          {/* Credibility bar — full width */}
          <FadeUp>
            <div className="flex justify-between sm:grid sm:grid-cols-5 sm:gap-x-4 pt-10 mt-12 border-t border-[var(--color-border-visible)]">
              <div className="text-center">
                <div className="font-sans text-[20px] sm:text-[36px] md:text-[42px] font-black text-[var(--color-sage)] leading-none">
                  500+
                </div>
                <div className="text-[11px] sm:text-[14px] text-[var(--color-muted-foreground)] mt-1">
                  Homes
                </div>
              </div>
              <div className="text-center">
                <div className="font-sans text-[20px] sm:text-[36px] md:text-[42px] font-black text-[var(--color-sage)] leading-none">
                  8+
                </div>
                <div className="text-[11px] sm:text-[14px] text-[var(--color-muted-foreground)] mt-1">
                  Years
                </div>
              </div>
              <div className="text-center">
                <div className="font-sans text-[20px] sm:text-[36px] md:text-[42px] font-black text-[var(--color-sage)] leading-none">
                  $3M
                </div>
                <div className="text-[11px] sm:text-[14px] text-[var(--color-muted-foreground)] mt-1">
                  Insured
                </div>
              </div>
              <div className="text-center">
                <div className="font-sans text-[20px] sm:text-[36px] md:text-[42px] font-black text-[var(--color-sage)] leading-none">
                  100+
                </div>
                <div className="text-[11px] sm:text-[14px] text-[var(--color-muted-foreground)] mt-1">
                  Reviews
                </div>
              </div>
              <div className="text-center">
                <div className="font-sans text-[20px] sm:text-[36px] md:text-[42px] font-black text-[var(--color-sage)] leading-none">
                  Free
                </div>
                <div className="text-[11px] sm:text-[14px] text-[var(--color-muted-foreground)] mt-1">
                  Estimates
                </div>
              </div>
            </div>
          </FadeUp>
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
              <ContactForm idPrefix="about" />
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
              <ContactForm idPrefix="about" />
            </FadeUp>
            <ContactInfoList />
          </div>
        </div>
      </section>
    </>
  );
}
