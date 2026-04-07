"use client";

export default function Marquee() {
  const text = "WELCOME TO TEMPLE LANDSCAPING";
  const separator = "\u00A0\u00A0\u00A0\u00A0";

  return (
    <div className="overflow-hidden bg-[var(--color-background)] py-6 md:py-8 border-t border-[var(--color-border-visible)]">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="text-[clamp(24px,4vw,48px)] font-serif tracking-[-0.02em] text-[#1a1a1a]/25 mx-0"
          >
            {text}{separator}
          </span>
        ))}
      </div>
    </div>
  );
}
