import Link from "next/link";
import SocialIcons from "./SocialIcons";
import CookieChoicesLink from "@/components/legal/CookieChoicesLink";

const FOOTER_LINKS = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Copyright (DMCA)", href: "/legal/dmca" },
  { label: "Cybersecurity", href: "/legal/cybersecurity" },
  { label: "TCPA", href: "/legal/tcpa" },
  { label: "Do Not Sell My Personal Information", href: "/legal/privacy#s10-2" },
];

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-black py-10 pb-20 xl:pb-10 px-5">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-6">
        <SocialIcons size={27} />

        <p className="text-[11px] uppercase tracking-widest text-blush/70 text-center">
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-blush/70">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-x-3">
              {i > 0 && <span className="text-ivory/30">/</span>}
              <Link href={link.href} className="transition-colors hover:text-ivory">
                {link.label}
              </Link>
            </span>
          ))}
          <span className="flex items-center gap-x-3">
            <span className="text-ivory/30">/</span>
            <CookieChoicesLink className="uppercase tracking-widest transition-colors hover:text-ivory" />
          </span>
        </div>
      </div>
    </footer>
  );
}
