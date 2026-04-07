"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactInfoList from "./ContactInfoList";
import FadeUp from "./FadeUp";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40 bg-[var(--color-background)]">
      <div className="px-6 md:px-10">
        {/* Header */}
        <FadeUp className="text-center mb-16 md:mb-24">
          <span className="label-caps block mb-5">Contact</span>
          <h2 className="font-sans text-[clamp(26px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase">
            Free Estimates, No Obligations
          </h2>
        </FadeUp>

        {/* Two-column: image + info left, form right — like Wembley newsletter section */}
        {/* Desktop: two-column layout */}
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
            <ContactForm />
          </FadeUp>
        </div>

        {/* Mobile: image → form → contact info stacked */}
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
            <ContactForm />
          </FadeUp>
          <ContactInfoList />
        </div>
      </div>
    </section>
  );
}
