"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { getServicesByCategory } from "@/data/services";

const navLinks = [
  { label: "Gallery", href: "/#portfolio" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const lawnCare = getServicesByCategory("lawn-care");
const exterior = getServicesByCategory("exterior-cleaning");

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  // On hero: dark text on sage green. Scrolled: dark text on cream.
  const linkColor = "text-[#1a1a1a]/60 hover:text-[#1a1a1a]";
  const iconColor = "text-[#1a1a1a]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-lg border-b border-[var(--color-border-visible)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto w-full px-5 md:px-10 lg:px-14 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/logo-icon.png"
            alt="Temple Landscaping"
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav — right aligned, simple like Wembley */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 text-[14px] font-medium transition-colors duration-300 ${linkColor}`}
            >
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                >
                  <div className="w-[420px] bg-white rounded-2xl border border-[var(--color-border-visible)] shadow-xl shadow-black/[0.06] p-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <Link href="/services/lawn-care" className="label-caps text-[var(--color-sage)] block mb-3">Lawn Care</Link>
                        <div className="space-y-1.5">
                          {lawnCare.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} className="block text-[13px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">{s.title}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Link href="/services/exterior-cleaning" className="label-caps text-[var(--color-sage)] block mb-3">Exterior Cleaning</Link>
                        <div className="space-y-1.5">
                          {exterior.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} className="block text-[13px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">{s.title}</Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[14px] font-medium transition-colors duration-300 ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className={`h-5 w-5 ${iconColor}`} />
          ) : (
            <Menu className={`h-5 w-5 ${iconColor}`} />
          )}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[72px] z-50 bg-[var(--color-background)] lg:hidden flex flex-col"
          >
            {/* Scrollable nav links */}
            <div className="flex-1 overflow-y-auto px-8 pt-10">
              <nav className="flex flex-col gap-1">
                {/* Services with inline dropdown */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 font-sans text-[18px] font-bold uppercase tracking-[0.02em] text-[var(--color-foreground)]"
                  >
                    Services
                    <ChevronDown className={`h-4 w-4 text-[var(--color-muted-foreground)] transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-3 border-l-2 border-[var(--color-sage)]/20 ml-1">
                          <span className="label-caps text-[var(--color-sage)] block mb-2 mt-1">Lawn Care</span>
                          {lawnCare.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeMobile} className="block py-1.5 text-[15px] text-[var(--color-muted-foreground)]">{s.title}</Link>
                          ))}
                          <span className="label-caps text-[var(--color-sage)] block mb-2 mt-4">Exterior Cleaning</span>
                          {exterior.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeMobile} className="block py-1.5 text-[15px] text-[var(--color-muted-foreground)]">{s.title}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="block py-3 font-sans text-[18px] font-bold uppercase tracking-[0.02em] text-[var(--color-foreground)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom CTA — pinned */}
            <div className="shrink-0 px-8 pb-8 pt-4 border-t border-[var(--color-border-visible)]">
              <Link
                href="/#contact"
                onClick={closeMobile}
                className="block w-full text-center text-[13px] font-semibold uppercase tracking-[0.08em] border-2 border-[var(--color-foreground)] text-[var(--color-foreground)] py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 mb-3"
              >
                Get a Free Quote
              </Link>
              <a href="tel:+14035551234" className="flex items-center justify-center gap-2 text-[13px] text-[var(--color-muted-foreground)] py-2">
                <Phone className="h-3.5 w-3.5" />
                (403) 555-1234
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
