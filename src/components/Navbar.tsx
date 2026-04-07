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
  const [menuVisible, setMenuVisible] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // Sync menuVisible with mobileOpen (instant open, delayed close for fade-out)
  useEffect(() => {
    if (mobileOpen) {
      setMenuVisible(true);
    }
  }, [mobileOpen]);

  const close = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    // Delay hiding the DOM element so fade-out plays
    setTimeout(() => setMenuVisible(false), 200);
  }, []);

  const navTo = useCallback((href: string) => {
    close();
    if (href.includes("#")) {
      const id = href.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [close]);

  const s = mounted && scrolled;
  const lc = "text-[#1a1a1a]/60 hover:text-[#1a1a1a]";

  return (
    <>
      {/* ── Navbar bar ── */}
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          s ? "bg-[var(--color-background)]/95 backdrop-blur-lg border-b border-[var(--color-border-visible)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto w-full px-5 md:px-10 lg:px-14 h-[72px] flex items-center justify-between relative">
          <Link href="/" className="flex-shrink-0 relative z-10">
            <img src="/logo-icon.png" alt="Temple Landscaping" className="h-9 md:h-10 w-auto" />
          </Link>

          {/* TEMPLE text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 lg:justify-start lg:pl-[120px]"
            style={{ opacity: s ? 1 : 0 }}
          >
            <span className="font-sans text-[13px] lg:text-[14px] font-bold uppercase tracking-[0.15em] text-[var(--color-foreground)]">
              Temple
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <Link href="/services" className={`flex items-center gap-1 text-[14px] font-medium transition-colors duration-300 ${lc}`}>
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
              <Link key={link.label} href={link.href} className={`text-[14px] font-medium transition-colors duration-300 ${lc}`}>{link.label}</Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => mobileOpen ? close() : setMobileOpen(true)}
            className="lg:hidden p-2 -mr-2 relative z-10"
            aria-label="Toggle menu"
          >
            {menuVisible ? <X className="h-5 w-5 text-[#1a1a1a]" /> : <Menu className="h-5 w-5 text-[#1a1a1a]" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile menu (separate portal-style, above everything) ── */}
      {menuVisible && (
        <div
          className="fixed inset-0 z-[100] lg:hidden transition-opacity duration-200"
          style={{ opacity: mobileOpen ? 1 : 0 }}
        >
          {/* Solid background — covers entire screen */}
          <div className="absolute inset-0 bg-[var(--color-background)]" />

          {/* Navbar row — logo + X */}
          <div className="relative z-10 px-5 h-[72px] flex items-center justify-between">
            <Link href="/" onClick={close} className="flex-shrink-0">
              <img src="/logo-icon.png" alt="Temple Landscaping" className="h-9 w-auto" />
            </Link>
            <button onClick={close} className="p-2 -mr-2" aria-label="Close menu">
              <X className="h-5 w-5 text-[#1a1a1a]" />
            </button>
          </div>

          {/* Menu content */}
          <div className="relative z-10 flex flex-col" style={{ height: "calc(100dvh - 72px)" }}>
            <div className="flex-1 overflow-y-auto overscroll-contain px-8 pt-6 pb-4">
              <nav className="flex flex-col gap-1">
                {/* Services */}
                <div>
                  <div className="flex items-center justify-between py-3">
                    <Link href="/services" onClick={() => navTo("/services")} className="font-sans text-[18px] font-bold uppercase tracking-[0.02em] text-[var(--color-foreground)]">
                      Services
                    </Link>
                    <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="p-2 -mr-2" aria-label="Toggle services">
                      <ChevronDown className={`h-4 w-4 text-[var(--color-muted-foreground)] transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div
                    className="grid overflow-hidden transition-all duration-300"
                    style={{ gridTemplateRows: mobileServicesOpen ? "1fr" : "0fr", opacity: mobileServicesOpen ? 1 : 0 }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pl-4 pb-3 border-l-2 border-[var(--color-sage)]/20 ml-1">
                        <Link href="/services/lawn-care" onClick={() => navTo("/services/lawn-care")} className="label-caps text-[var(--color-sage)] block mb-2 mt-1">Lawn Care</Link>
                        {lawnCare.map((sv) => (
                          <Link key={sv.slug} href={`/services/${sv.slug}`} onClick={() => navTo(`/services/${sv.slug}`)} className="block py-1.5 text-[15px] text-[var(--color-muted-foreground)]">{sv.title}</Link>
                        ))}
                        <Link href="/services/exterior-cleaning" onClick={() => navTo("/services/exterior-cleaning")} className="label-caps text-[var(--color-sage)] block mb-2 mt-4">Exterior Cleaning</Link>
                        {exterior.map((sv) => (
                          <Link key={sv.slug} href={`/services/${sv.slug}`} onClick={() => navTo(`/services/${sv.slug}`)} className="block py-1.5 text-[15px] text-[var(--color-muted-foreground)]">{sv.title}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => navTo(link.href)} className="block py-3 font-sans text-[18px] font-bold uppercase tracking-[0.02em] text-[var(--color-foreground)]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom CTA */}
            <div className="shrink-0 px-8 pt-4 border-t border-[var(--color-border-visible)] bg-[var(--color-background)]" style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))" }}>
              <Link href="/#contact" onClick={() => navTo("/#contact")} className="block w-full text-center text-[13px] font-semibold uppercase tracking-[0.08em] border-2 border-[var(--color-foreground)] text-[var(--color-foreground)] py-3.5 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 mb-3">
                Get a Free Quote
              </Link>
              <a href="tel:+14033908395" className="flex items-center justify-center gap-2 text-[13px] text-[var(--color-muted-foreground)] py-2">
                <Phone className="h-3.5 w-3.5" />
                (403) 390-8395
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
