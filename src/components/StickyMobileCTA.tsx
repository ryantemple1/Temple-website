"use client";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-md px-5 py-3 border-t border-[var(--color-border-visible)] md:hidden">
      <a
        href="#contact"
        className="block w-full text-center text-[13px] font-medium uppercase tracking-[0.08em] bg-[var(--color-sage)] text-white py-3.5 hover:bg-[var(--color-sage-dark)] transition-colors duration-300"
      >
        Get a Free Quote
      </a>
    </div>
  );
}
