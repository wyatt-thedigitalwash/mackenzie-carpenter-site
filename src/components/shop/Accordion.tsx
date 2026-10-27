"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

// Expanding section that animates open/closed by transitioning grid rows from
// 0fr to 1fr (native <details> can't animate its height).
export default function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-t border-suede/15">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="w-full flex items-center justify-between py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-suede hover:text-black transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {title}
          <Plus size={16} aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="pb-5 text-[14px] leading-relaxed text-suede/85">{children}</div>
        </div>
      </div>
    </div>
  );
}
