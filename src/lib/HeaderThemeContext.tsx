"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// The header floats over whatever sits at the top of the page. Most banners are
// dark, so the logo / nav / social icons are blush by default. A light banner
// (e.g. the Kinda Want Your Man hero) sets "dark" so those turn black and stay
// legible. HeroSlider drives this per slide and resets it on unmount.
export type HeaderTheme = "default" | "dark";

interface HeaderThemeValue {
  headerTheme: HeaderTheme;
  setHeaderTheme: (theme: HeaderTheme) => void;
}

const HeaderThemeContext = createContext<HeaderThemeValue | null>(null);

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>("default");
  const value = useMemo(() => ({ headerTheme, setHeaderTheme }), [headerTheme]);
  return <HeaderThemeContext.Provider value={value}>{children}</HeaderThemeContext.Provider>;
}

export function useHeaderTheme() {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) throw new Error("useHeaderTheme must be used within HeaderThemeProvider");
  return ctx;
}
