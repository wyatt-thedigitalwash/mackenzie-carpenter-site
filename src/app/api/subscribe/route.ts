import { NextResponse } from "next/server";
import crypto from "crypto";

// All four env vars must also be set in Vercel's environment variables for production.
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY ?? "";
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID ?? "";
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX ?? "";
const LAYLO_API_KEY = process.env.LAYLO_API_KEY ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting: in-memory IP map, 3 submissions per 5 minutes
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: {
    email?: string;
    phone?: string;
    zip?: string;
    country?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Honeypot: if the hidden "website" field is filled, silently succeed
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const phone = (body.phone ?? "").trim();
  const zip = (body.zip ?? "").trim();
  const country = (body.country ?? "").trim();

  // Validation
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (phone.length > 20) {
    return NextResponse.json(
      { ok: false, error: "Phone number is too long." },
      { status: 400 }
    );
  }

  if (!zip || zip.length > 20) {
    return NextResponse.json(
      { ok: false, error: "A valid zip code is required." },
      { status: 400 }
    );
  }

  if (!country || country.length > 100) {
    return NextResponse.json(
      { ok: false, error: "A valid country is required." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------
  // STEP 1 — MAILCHIMP (primary, gating call)
  // ---------------------------------------------------------------
  const emailHash = crypto
    .createHash("md5")
    .update(email)
    .digest("hex");

  const mcAuth = `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`;
  const mcUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;

  const mergeFields: Record<string, string> = {
    MMERGE9: "mackenziecarpenter.com",
  };
  if (phone) mergeFields.PHONE = phone;
  if (country) mergeFields.MMERGE12 = country;
  if (zip) mergeFields.MMERGE14 = zip;

  let mailchimpOk = false;

  try {
    const mcRes = await fetch(mcUrl, {
      method: "PUT",
      headers: { Authorization: mcAuth, "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        tags: ["Mackenzie Carpenter"],
        ...(Object.keys(mergeFields).length > 0 && {
          merge_fields: mergeFields,
        }),
      }),
    });

    if (mcRes.ok) {
      mailchimpOk = true;
    } else {
      const mcBody = await mcRes.json().catch(() => null);
      console.error("[Mailchimp] Status:", mcRes.status, "Body:", JSON.stringify(mcBody));

      // If merge fields caused the error, retry with email only
      if (mcBody?.detail?.includes("merge")) {
        const retry = await fetch(mcUrl, {
          method: "PUT",
          headers: {
            Authorization: mcAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status_if_new: "subscribed",
            status: "subscribed",
          }),
        });
        if (retry.ok) {
          mailchimpOk = true;
        } else {
          const retryBody = await retry.json().catch(() => null);
          console.error("[Mailchimp] Retry status:", retry.status, "Body:", JSON.stringify(retryBody));
        }
      }
    }
  } catch (err) {
    console.error("[Mailchimp] Fetch error:", err);
    mailchimpOk = false;
  }

  if (!mailchimpOk) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // ---------------------------------------------------------------
  // STEP 2 — LAYLO (fire-and-forget, only if Mailchimp succeeded)
  // A Laylo failure must never affect the user-facing response.
  // ---------------------------------------------------------------
  try {
    if (LAYLO_API_KEY) {
      const layloHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LAYLO_API_KEY}`,
      };
      const layloUrl = "https://laylo.com/api/graphql";

      // Call 1: subscribe by email
      fetch(layloUrl, {
        method: "POST",
        headers: layloHeaders,
        body: JSON.stringify({
          query: `mutation($email: String) { subscribeToUser(email: $email) }`,
          variables: { email },
        }),
      }).catch(() => {});

      // Call 2: subscribe by phone (only if provided)
      if (phone) {
        const digits = phone.replace(/\D/g, "");
        const formatted = digits.startsWith("1")
          ? `+${digits}`
          : `+1${digits}`;

        fetch(layloUrl, {
          method: "POST",
          headers: layloHeaders,
          body: JSON.stringify({
            query: `mutation($phoneNumber: String) { subscribeToUser(phoneNumber: $phoneNumber) }`,
            variables: { phoneNumber: formatted },
          }),
        }).catch(() => {});
      }
    }
  } catch {
    // Laylo errors are silently swallowed
  }

  return NextResponse.json({ ok: true });
}
