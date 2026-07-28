"use client";

import { useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SMS_COUNTRIES } from "@/lib/subscribe-validation";

type FormStatus = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "phone" | "";

// Mackenzie Carpenter design system: black background, ivory text, gold focus.
const baseInput =
  "w-full h-[50px] bg-ivory/10 border text-ivory placeholder:text-ivory/40 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors appearance-none";

const DEFAULT_SUCCESS =
  "You're subscribed. Check your phone for a text and reply to confirm SMS updates.";

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function FanClubForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard double-submit
    setStatus("loading");
    setErrorMessage("");
    setErrorField("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, zipCode, country, website }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccessMessage(data?.message || DEFAULT_SUCCESS);
        setStatus("success");
        setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setZipCode("");
        setCountry("United States");
        return;
      }

      const field: ErrorField =
        data?.field === "email" || data?.field === "phone" ? data.field : "";
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setErrorField(field);
      setStatus("error");
      requestAnimationFrame(() => {
        if (field === "email") emailRef.current?.focus();
        else if (field === "phone") phoneRef.current?.focus();
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="text-ivory text-lg tracking-wide max-w-md mx-auto py-4"
        role="status"
        aria-live="polite"
      >
        {successMessage || DEFAULT_SUCCESS}
      </p>
    );
  }

  const fieldClass = (field?: ErrorField) =>
    `${baseInput} ${
      field && errorField === field ? "border-red" : "border-ivory/20 focus-visible:border-ivory/50"
    }`;

  // US/Canada get the +1 auto-formatted REQUIRED phone; elsewhere it's optional/plain
  // because Laylo can only text North American numbers.
  const isNorthAmerica = SMS_COUNTRIES.has(country);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-md mx-auto text-left">
      {/* Honeypot — visually hidden, off-screen */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="fan-website">Website</label>
        <input id="fan-website" type="text" name="website" tabIndex={-1}
          autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="fan-first" className="sr-only">First Name</label>
          <input id="fan-first" name="firstName" placeholder="First Name" autoComplete="given-name"
            value={firstName} onChange={(e) => setFirstName(e.target.value)} className={fieldClass()} />
        </div>
        <div className="flex-1">
          <label htmlFor="fan-last" className="sr-only">Last Name</label>
          <input id="fan-last" name="lastName" placeholder="Last Name" autoComplete="family-name"
            value={lastName} onChange={(e) => setLastName(e.target.value)} className={fieldClass()} />
        </div>
      </div>

      <div>
        <label htmlFor="fan-email" className="sr-only">Email</label>
        <input ref={emailRef} id="fan-email" type="email" name="email" placeholder="Email *"
          required aria-required="true" aria-invalid={errorField === "email"}
          aria-describedby={errorField ? "form-error" : undefined} autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass("email")} />
      </div>

      <div>
        <label htmlFor="fan-phone" className="sr-only">Phone Number</label>
        {isNorthAmerica ? (
          <div className={`flex items-stretch h-[50px] bg-ivory/10 border ${errorField === "phone" ? "border-red" : "border-ivory/20 focus-within:border-ivory/50 focus-within:ring-2 focus-within:ring-gold"} transition-colors`}>
            <span className="flex items-center pl-4 pr-2 text-ivory/40 text-base select-none" aria-hidden="true">+1</span>
            <input ref={phoneRef} id="fan-phone" type="tel" name="phone" inputMode="numeric"
              placeholder="555-555-5555" required aria-required="true" aria-invalid={errorField === "phone"}
              aria-describedby={errorField ? "form-error" : undefined} autoComplete="tel"
              value={phone} onChange={(e) => setPhone(formatUsPhone(e.target.value))}
              className="bg-transparent text-ivory placeholder:text-ivory/40 py-3 pr-4 w-full text-base focus-visible:outline-none border-0" />
          </div>
        ) : (
          <input ref={phoneRef} id="fan-phone" type="tel" name="phone" inputMode="tel"
            placeholder="Phone Number (optional)" aria-invalid={errorField === "phone"}
            aria-describedby={errorField ? "form-error" : undefined} autoComplete="tel"
            value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldClass("phone")} />
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="fan-zip" className="sr-only">Zip Code</label>
          <input id="fan-zip" name="zipCode" inputMode="numeric" placeholder="Zip Code"
            autoComplete="postal-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={fieldClass()} />
        </div>
        <div className="flex-1">
          <label htmlFor="fan-country" className="sr-only">Country</label>
          <select id="fan-country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
            className={`${fieldClass()} pr-12`}>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-black text-ivory">{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" disabled={status === "loading"}
        className="bg-ivory text-black uppercase tracking-widest text-sm font-semibold px-8 py-4 transition-opacity hover:opacity-90 disabled:opacity-50">
        {status === "loading" ? "Submitting..." : "Sign Up"}
      </button>

      {/* Legally required when collecting phone via Laylo — keep this copy + both links. */}
      <p className="text-ivory/50 text-xs leading-relaxed mt-1">
        By subscribing you agree to receive email and recurring automated marketing text
        messages. We will text you once to confirm your number, reply to opt in. Consent is
        not a condition of purchase. Message and data rates may apply. See Laylo&apos;s{" "}
        <a href="https://laylo.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory/70">Terms<span className="sr-only"> (opens in new tab)</span></a>{" "}
        and{" "}
        <a href="https://laylo.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory/70">Privacy Policy<span className="sr-only"> (opens in new tab)</span></a>
        , and the{" "}
        <a href="https://www.bigmachinerecords.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory/70">Big Machine Records Privacy Policy<span className="sr-only"> (opens in new tab)</span></a>.
      </p>

      <div aria-live="assertive">
        {status === "error" && (
          <p id="form-error" role="alert" className="text-red text-sm">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
        )}
      </div>
    </form>
  );
}
