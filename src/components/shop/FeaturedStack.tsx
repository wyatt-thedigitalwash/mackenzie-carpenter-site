"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FeaturedDetails from "./FeaturedDetails";
import type { FeaturedItem, ShopProduct, ShopVariant } from "@/lib/merch/shop";

// Resting pose for each layer of the pile, top first. Translate, rotate and
// scale are separate CSS properties in Tailwind v4, so they transition
// independently and stay on the compositor.
const LAYERS = [
  "translate-x-0 translate-y-0 rotate-[-4deg] scale-100",
  "translate-x-[11%] translate-y-[3%] rotate-[9deg] scale-100",
  "-translate-x-[10%] translate-y-[8%] rotate-[-14deg] scale-100",
];
// Off-pile pose the moving tee passes through, out to the left so it never
// crosses the copy column. It is invisible here, which is when its layer
// swaps, so tees never visibly pop over or under each other.
const DRIFT = "-translate-x-[42%] -translate-y-[4%] rotate-[-18deg] scale-[0.94]";

// A move has two phases. "out": the moving tee drifts to DRIFT and fades.
// "in": its layer swaps and it glides from DRIFT into its new spot. The other
// tees make one continuous glide across both phases.
const OUT_MS = 420;
const IN_MS = 580;
const GLIDE = "cubic-bezier(0.45, 0, 0.2, 1)";
const TRANSFORM = ["translate", "rotate", "scale"];

// How long each tee stays on top while the pile rotates on its own. The
// progress bar under the active tee button runs for this long and its
// animationend is what advances the pile, so hover-pause stays in sync.
const HOLD_MS = 5000;

type Phase = "idle" | "out" | "in";

interface Props {
  items: FeaturedItem[];
  onAdd: (product: ShopProduct, variant: ShopVariant, quantity: number) => void;
  onOpen: (product: ShopProduct) => void;
}

// "Mackenzie Carpenter Pale Blue Face Tee" -> "Pale Blue Face"
function shortName(title: string) {
  return title.replace("Mackenzie Carpenter ", "").replace(/ (Tee|T-Shirt)$/, "");
}

function transition(duration: number, easing: string, opacity?: [number, string]) {
  const parts = TRANSFORM.map((p) => `${p} ${duration}ms ${easing}`);
  if (opacity) parts.push(`opacity ${opacity[0]}ms ${opacity[1]}`);
  return parts.join(", ");
}

export default function FeaturedStack({ items, onAdd, onOpen }: Props) {
  // `order` is the committed pile (top first). `pending` is where a move is
  // heading while its tee is still on the way out.
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [pending, setPending] = useState<number[] | null>(null);
  const [mover, setMover] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  // The tee a fan (or the timer) asked for; a move chain keeps stepping until it is on top.
  const [dest, setDest] = useState<number | null>(null);
  // Once a fan picks a tee it sticks: auto-rotation stops for good.
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Refs mirror state for the timer callbacks, which outlive the render that scheduled them.
  const orderRef = useRef(order);
  const destRef = useRef<number | null>(null);
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  function step(dir: 1 | -1) {
    busy.current = true;
    const cur = orderRef.current;
    const next = dir === 1 ? [...cur.slice(1), cur[0]] : [cur[cur.length - 1], ...cur.slice(0, -1)];
    setMover(dir === 1 ? cur[0] : cur[cur.length - 1]);
    setPending(next);
    setPhase("out");
    later(OUT_MS, () => {
      orderRef.current = next;
      setOrder(next);
      setPending(null);
      setPhase("in");
      later(IN_MS, () => {
        setPhase("idle");
        setMover(null);
        busy.current = false;
        advance();
      });
    });
  }

  // Take one step toward the destination, choosing the shorter way round.
  function advance() {
    const target = destRef.current;
    const pos = target === null ? -1 : orderRef.current.indexOf(target);
    if (pos <= 0) {
      destRef.current = null;
      setDest(null);
      return;
    }
    step(pos <= orderRef.current.length / 2 ? 1 : -1);
  }

  function goTo(index: number) {
    destRef.current = index;
    setDest(index);
    if (!busy.current) advance();
  }

  // Next/previous relative to wherever the pile is heading, so rapid presses queue up.
  function goBy(dir: 1 | -1) {
    const cycle = orderRef.current;
    const head = destRef.current ?? cycle[0];
    goTo(cycle[(cycle.indexOf(head) + dir + cycle.length) % cycle.length]);
  }

  function pick(index: number) {
    setPinned(true);
    goTo(index);
  }

  function pickBy(dir: 1 | -1) {
    setPinned(true);
    goBy(dir);
  }

  const shown = dest ?? order[0];
  const moving = phase !== "idle";

  return (
    <div
      className="mx-auto max-w-[1280px] grid md:grid-cols-[1.15fr_1fr] items-center gap-10 md:gap-16 lg:gap-24"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative mx-auto w-[88%] md:w-[90%] max-w-[600px] aspect-square md:mr-[6%]">
        {items.map((item, i) => {
          const committed = order.indexOf(i);
          const heading = pending ? pending.indexOf(i) : committed;
          const isMover = i === mover;
          const leaving = isMover && phase === "out";
          const style = {
            // Layering follows the committed pile, which only changes while the mover is invisible.
            zIndex: 30 - committed * 10,
            opacity: leaving ? 0 : 1,
            willChange: "translate, rotate, scale, opacity",
            transition: isMover
              ? leaving
                ? transition(OUT_MS, "cubic-bezier(0.4, 0, 1, 1)", [OUT_MS, "cubic-bezier(0.7, 0, 0.9, 0.4)"])
                : transition(IN_MS, "cubic-bezier(0, 0, 0.2, 1)", [
                    // Arriving on top it turns solid quickly so it never reads as a ghost over the pile
                    Math.round(IN_MS * (committed === 0 ? 0.35 : 0.6)),
                    "cubic-bezier(0, 0, 0.3, 1)",
                  ])
              : transition(OUT_MS + IN_MS, GLIDE),
          };
          return (
            <button
              key={item.product.handle}
              type="button"
              onClick={() => pick(i)}
              tabIndex={-1}
              aria-hidden="true"
              style={style}
              className={`group absolute inset-[5%] cursor-pointer ${leaving ? DRIFT : LAYERS[heading]}`}
            >
              <Image
                src={item.image.src}
                alt=""
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 768px) 600px, 80vw"
                priority
                className={`w-full h-full object-contain drop-shadow-[0_28px_36px_rgba(0,0,0,0.5)] transition-[translate] duration-500 ease-out ${
                  heading === 0 ? "group-hover:-translate-y-2" : "group-hover:-translate-y-4"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Keyed so the copy fades in fresh and the size selection resets per tee */}
      <FeaturedDetails
        key={items[shown].product.handle}
        item={items[shown]}
        onAdd={onAdd}
        onOpen={onOpen}
        onInteract={() => setPinned(true)}
      >
        <div
          className="flex items-stretch gap-2 mb-6 w-full max-w-md mx-auto md:mx-0"
          role="group"
          aria-label="Featured tees"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") pickBy(1);
            if (e.key === "ArrowLeft") pickBy(-1);
          }}
        >
          <div className="flex-1 grid grid-cols-3 gap-2">
            {items.map((item, i) => {
              const active = shown === i;
              return (
                <button
                  key={item.product.handle}
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={active}
                  className={`relative flex flex-col items-center gap-2 px-1.5 pt-3 pb-3.5 border transition-colors duration-500 ${
                    active ? "border-ivory/70 bg-ivory/10" : "border-ivory/15 hover:border-ivory/40 hover:bg-ivory/5"
                  }`}
                >
                  <Image
                    src={item.image.src}
                    alt=""
                    width={item.image.width}
                    height={item.image.height}
                    sizes="56px"
                    className={`w-12 h-12 object-contain transition-[scale,opacity] duration-500 ${active ? "scale-110" : "opacity-70"}`}
                  />
                  <span
                    className={`text-[11px] uppercase tracking-[0.1em] leading-tight ${active ? "text-ivory" : "text-ivory/60"}`}
                  >
                    {shortName(item.product.title)}
                  </span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-ivory/15 overflow-hidden"
                    >
                      {pinned ? (
                        <span className="block h-full bg-ivory" />
                      ) : (
                        // motion-safe: with reduced motion there is no animation, so no
                        // animationend fires and the pile simply stays put.
                        <span
                          key={`${order.join()}-${shown}`}
                          onAnimationEnd={() => goBy(1)}
                          className="block h-full bg-ivory origin-left scale-x-0 motion-safe:animate-[heroProgress_linear_forwards]"
                          style={{
                            animationDuration: `${HOLD_MS}ms`,
                            animationPlayState: hovering || moving ? "paused" : "running",
                          }}
                        />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </FeaturedDetails>
    </div>
  );
}
