"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-black">
      <h1
        className="text-4xl md:text-5xl text-ivory mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Something went wrong
      </h1>
      <p className="text-lg text-ivory/70 mb-8">
        An unexpected error occurred.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-ivory text-black uppercase tracking-widest text-sm font-semibold px-8 py-4 transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-ivory text-ivory uppercase tracking-widest text-sm font-semibold px-8 py-4 transition-opacity hover:opacity-80"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
