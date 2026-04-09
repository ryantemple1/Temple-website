"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  defaultService?: string;
  idPrefix?: string;
}

export default function ContactForm({
  defaultService = "",
  idPrefix = "",
}: Props) {
  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
    _gotcha: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Could not connect. Please check your internet and try again.");
      setStatus("error");
    }
  };

  const labelClasses =
    "block text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--color-muted-foreground)] mb-2";

  const inputClasses =
    "w-full bg-transparent border-b border-[var(--color-border-visible)] px-0 py-3 text-[15px] text-[var(--color-foreground)] placeholder:text-[var(--color-faint)] focus:border-[var(--color-sage)] focus:outline-none transition-colors duration-200";

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-[var(--color-border-visible)] text-center py-12 sm:py-16 md:py-20">
        <CheckCircle2 className="h-10 w-10 text-[var(--color-sage)] mx-auto mb-4" />
        <h3 className="font-sans text-[20px] md:text-[24px] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase mb-3">
          Thank You
        </h3>
        <p className="text-[15px] text-[var(--color-muted-foreground)] leading-[1.6] max-w-sm mx-auto">
          We received your request and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ firstName: "", lastName: "", email: "", phone: "", service: defaultService, message: "", _gotcha: "" });
          }}
          className="mt-8 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-[var(--color-border-visible)]"
      onSubmit={handleSubmit}
    >
      <h3 className="font-sans text-[22px] md:text-[26px] font-black leading-[1.1] tracking-[-0.01em] text-[var(--color-foreground)] uppercase mb-8">
        Request a Free Quote
      </h3>

      {/* Honeypot — hidden from humans */}
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={form._gotcha}
          onChange={(e) => update("_gotcha", e.target.value)}
        />
      </div>

      {/* First Name / Last Name */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("firstName")} className={labelClasses}>First Name</label>
          <input
            type="text"
            id={id("firstName")}
            className={inputClasses}
            placeholder="John"
            required
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={id("lastName")} className={labelClasses}>Last Name</label>
          <input
            type="text"
            id={id("lastName")}
            className={inputClasses}
            placeholder="Doe"
            required
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
      </div>

      {/* Email / Phone */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("email")} className={labelClasses}>Email</label>
          <input
            type="email"
            id={id("email")}
            className={inputClasses}
            placeholder="john@example.com"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelClasses}>Phone</label>
          <input
            type="tel"
            id={id("phone")}
            className={inputClasses}
            placeholder="(403) 555-0000"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      {/* Service Needed */}
      <div className="mt-6">
        <label htmlFor={id("service")} className={labelClasses}>Service Needed</label>
        <select
          id={id("service")}
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className={`${inputClasses} cursor-pointer bg-transparent`}
        >
          <option value="">Select a service</option>
          <optgroup label="Lawn Care">
            <option value="weekly-lawn-mowing">Weekly Lawn Mowing</option>
            <option value="spring-fall-clean-ups">Spring &amp; Fall Clean Ups</option>
            <option value="landscaping">Landscaping</option>
            <option value="hedge-trimming">Hedge Trimming</option>
            <option value="weed-control">Weed Control</option>
          </optgroup>
          <optgroup label="Exterior">
            <option value="driveway-sealing">Driveway Sealing</option>
            <option value="window-cleaning">Window Cleaning</option>
            <option value="gutter-cleaning">Gutter Cleaning</option>
            <option value="pressure-washing">Pressure Washing</option>
          </optgroup>
        </select>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label htmlFor={id("message")} className={labelClasses}>Tell Us About Your Property</label>
        <textarea
          id={id("message")}
          rows={3}
          className={`${inputClasses} resize-none`}
          placeholder="Property size, what services you're looking for..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="mt-4 text-[14px] text-red-600">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 w-full inline-flex items-center justify-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] border border-[var(--color-foreground)] text-[var(--color-foreground)] py-4 hover:bg-[var(--color-foreground)] hover:text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-foreground)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request Free Estimate
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
