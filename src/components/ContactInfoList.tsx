"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import FadeUp from "./FadeUp";

const EMAIL = "ryantemplelandscape@gmail.com";

const contactItems = [
  { icon: MapPin, label: "Service Area", value: "Calgary, AB" },
  { icon: Phone, label: "Phone", value: "(403) 555-1234", href: "tel:+14035551234" },
  { icon: Mail, label: "Email", value: EMAIL, copyEmail: true },
];

export default function ContactInfoList() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      window.prompt("Copy this email:", EMAIL);
    }
  };

  return (
    <div className="space-y-0">
      {contactItems.map((item, i) => {
        const inner = (
          <div className="flex items-center gap-4 py-4 border-b border-[var(--color-border-visible)]">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)]/10">
              <item.icon className="h-4 w-4 text-[var(--color-sage)]" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">{item.label}</p>
              <p className="text-[14px] font-medium text-[var(--color-foreground)] mt-0.5">{item.value}</p>
            </div>
            {item.copyEmail && copied && (
              <span className="flex items-center gap-1 text-[12px] text-[var(--color-sage)] font-medium">
                <Check className="h-3 w-3" />
                Copied
              </span>
            )}
          </div>
        );

        return (
          <FadeUp key={item.label} delay={0.1 + i * 0.05}>
            {item.copyEmail ? (
              <button
                type="button"
                onClick={handleCopyEmail}
                className="block w-full text-left hover:opacity-80 transition-opacity cursor-pointer"
              >
                {inner}
              </button>
            ) : item.href ? (
              <a href={item.href} className="block hover:opacity-80 transition-opacity">{inner}</a>
            ) : (
              inner
            )}
          </FadeUp>
        );
      })}
    </div>
  );
}
