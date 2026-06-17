"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const COUNTRIES = [
  "United States",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function FanClubForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handlePhoneChange(value: string) {
    setPhone(formatPhone(value));
  }

  async function handleSubmit() {
    setErrorMsg("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!zip.trim() || !country) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          zip: zip.trim(),
          country: country.trim(),
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-ivory text-xl tracking-wide" role="status" aria-live="polite">
        Thanks for signing up!
      </p>
    );
  }

  const hasError = status === "error" && !!errorMsg;

  const inputClass =
    "w-full h-[50px] bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-ivory/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors appearance-none";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-4 max-w-md mx-auto"
      noValidate
    >
      {/* Honeypot field - hidden from humans, caught by bots */}
      <div className="absolute opacity-0 pointer-events-none" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="fan-website">Website</label>
        <input
          id="fan-website"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor="fan-email" className="sr-only">Email</label>
      <input
        id="fan-email"
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        aria-required="true"
        aria-invalid={hasError && !email.trim() ? "true" : undefined}
        aria-describedby={hasError ? "form-error" : undefined}
      />
      <label htmlFor="fan-phone" className="sr-only">Phone Number (optional)</label>
      <input
        id="fan-phone"
        type="tel"
        placeholder="Phone Number (optional)"
        value={phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        className={inputClass}
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="fan-zip" className="sr-only">Zip Code</label>
          <input
            id="fan-zip"
            type="text"
            placeholder="Zip Code *"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className={inputClass}
            aria-required="true"
            aria-invalid={hasError && !zip.trim() ? "true" : undefined}
            aria-describedby={hasError ? "form-error" : undefined}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="fan-country" className="sr-only">Country</label>
          <select
            id="fan-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`${inputClass} pr-12${country === "" ? " text-ivory/40" : ""}`}
            aria-required="true"
            aria-invalid={hasError && !country ? "true" : undefined}
            aria-describedby={hasError ? "form-error" : undefined}
          >
            <option value="" disabled>Country *</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-black text-ivory">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div aria-live="assertive">
        {errorMsg && (
          <p id="form-error" className="text-red text-sm" role="alert">{errorMsg}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-ivory text-black uppercase tracking-widest text-sm font-semibold px-8 py-4 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : "Sign Up"}
      </button>

      <p className="text-ivory/50 text-xs leading-relaxed mt-2">
        By signing up you agree to Laylo&apos;s{" "}
        <a
          href="https://laylo.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ivory/70"
        >
          Terms of Service
          <span className="sr-only"> (opens in new tab)</span>
        </a>{" "}
        and{" "}
        <a
          href="https://laylo.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ivory/70"
        >
          Privacy Policy
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        , and the{" "}
        <a
          href="https://www.bigmachinerecords.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ivory/70"
        >
          Big Machine Records Privacy Policy
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        .
      </p>
    </form>
  );
}
