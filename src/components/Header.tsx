"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./SocialIcons";
import { useMenu } from "@/lib/MenuContext";

const NAV_ITEMS = [
  { label: "Tour", href: "/tour" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Merch", href: "https://mackcarpmusic.square.site/", external: true },
  { label: "Fan Club", href: "/fan-club" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  const barBase =
    "block w-[24px] h-[2px] bg-ivory rounded-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out";
  return (
    <div className="relative w-[24px] h-[18px] flex flex-col justify-between" aria-hidden="true">
      <span
        className={`${barBase} origin-center ${
          open ? "translate-y-[8px] rotate-45" : ""
        }`}
      />
      <span
        className={`${barBase} ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`${barBase} origin-center ${
          open ? "-translate-y-[8px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

export default function Header() {
  const { menuOpen, setMenuOpen } = useMenu();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, [setMenuOpen]);

  // Close menu when the pathname changes (route navigation completed)
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Manage drawerVisible for enter/exit animation
  useEffect(() => {
    if (menuOpen) {
      setDrawerVisible(true);
    } else {
      const timer = setTimeout(() => setDrawerVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    drawer.addEventListener("keydown", trapFocus);
    return () => drawer.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="relative mx-auto flex items-center justify-between px-5 py-3 xl:px-8 z-50">
        {/* Logo — z-50 keeps it above the drawer overlay */}
        <Link href="/" className="relative z-50 shrink-0" aria-label="Mackenzie Carpenter - Home">
          <Image
            src="/branding/MackenzieCarpenter_PinkLogo.png"
            alt="Mackenzie Carpenter logo"
            width={300}
            height={105}
            className="h-[108px] w-auto md:h-[139px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blush text-[24px] tracking-wide transition-colors hover:text-ivory whitespace-nowrap"
              >
                {item.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-blush text-[24px] tracking-wide transition-colors hover:text-ivory whitespace-nowrap"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop social icons */}
        <div className="hidden xl:block relative z-10">
          <SocialIcons size={25} />
        </div>

        {/* Mobile hamburger / X morph */}
        <button
          ref={hamburgerRef}
          className="xl:hidden relative z-50 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerVisible && (
        <div
          ref={drawerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={`xl:hidden fixed inset-0 top-0 bg-black z-40 flex flex-col items-center justify-center transition-opacity ${
            menuOpen
              ? "opacity-100 duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
              : "opacity-0 duration-200 ease-out pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity" }}
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col items-center gap-8 mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {NAV_ITEMS.map((item, i) => {
              const linkClass = `text-blush text-2xl tracking-wide transition-colors hover:text-ivory ${
                menuOpen
                  ? "motion-safe:animate-[navFadeIn_350ms_ease-out_forwards]"
                  : "opacity-0"
              }`;
              const delay = menuOpen ? `${150 + i * 60}ms` : undefined;

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  style={{ opacity: 0, animationDelay: delay }}
                  onClick={closeMenu}
                >
                  {item.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={linkClass}
                  style={{ opacity: 0, animationDelay: delay }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile drawer social icons */}
          <div
            className={
              menuOpen
                ? "motion-safe:animate-[navFadeIn_350ms_ease-out_forwards]"
                : "opacity-0"
            }
            style={{ opacity: 0, animationDelay: menuOpen ? `${150 + NAV_ITEMS.length * 60 + 40}ms` : undefined }}
          >
            <SocialIcons size={25} />
          </div>
        </div>
      )}
    </header>
  );
}
