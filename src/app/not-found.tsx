import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Mackenzie Carpenter",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-black">
      <h1
        className="text-5xl md:text-6xl text-ivory mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        404
      </h1>
      <p className="text-lg text-ivory/70 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-ivory text-black uppercase tracking-widest text-sm font-semibold px-8 py-4 transition-opacity hover:opacity-90"
      >
        Go Home
      </Link>
    </main>
  );
}
