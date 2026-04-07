"use client";

import Link from "next/link";
import { getServicesByCategory } from "@/data/services";

const lawnCare = getServicesByCategory("lawn-care");
const exterior = getServicesByCategory("exterior-cleaning");

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Gallery", href: "/#portfolio" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-sage-dark)] text-white">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-20">
        {/* Main columns */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 mb-12 md:mb-14">
          {/* Logo + tagline */}
          <div className="max-w-[220px]">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/logo-full.png"
                alt="Temple Landscaping"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[14px] text-white/45 leading-[1.7]">
              Lawn care, landscaping, and exterior cleaning. Proudly serving
              Calgary and surrounding areas.
            </p>
          </div>

          {/* Lawn Care */}
          <div>
            <Link href="/services/lawn-care" className="label-caps block mb-4 text-white/50 hover:text-white/70 transition-colors">Lawn Care</Link>
            <ul className="space-y-2.5">
              {lawnCare.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-[14px] text-white/35 hover:text-white/70 transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exterior */}
          <div>
            <Link href="/services/exterior-cleaning" className="label-caps block mb-4 text-white/50 hover:text-white/70 transition-colors">Exterior</Link>
            <ul className="space-y-2.5">
              {exterior.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-[14px] text-white/35 hover:text-white/70 transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <span className="label-caps block mb-4 text-white/50">Company</span>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/35 hover:text-white/70 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/25">
            &copy; {new Date().getFullYear()} Temple Landscaping &amp; Exterior Services. All rights reserved.
          </p>
          <p className="text-[13px] text-white/40">
            ryantemplelandscape@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
