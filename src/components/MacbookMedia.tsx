"use client";
import React, { useRef, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "motion/react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

/**
 * MacbookMedia
 * Safe wrapper around the existing MacbookScroll to allow embedding a video instead of an image
 * and optionally disabling the scroll transform (static mode).
 *
 * Props:
 *  - variant: "scroll" | "static" (default: scroll)
 *  - videoSrc?: string (when provided, renders video instead of image)
 *  - poster?: string fallback poster for video
 *  - title?: React.ReactNode (optional heading)
 *  - badge?: React.ReactNode (optional floating badge)
 *  - autoPlay/loop/muted/playsInline: forwarded video playback controls (sensible defaults)
 */
export interface MacbookMediaProps {
  variant?: "scroll" | "static";
  videoSrc?: string;
  poster?: string;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  /** When true (only meaningful for variant="scroll"), as you scroll past the Macbook the video "pops out" and scales up to fill the original Macbook area, reducing perspective. */
  popOutOnScroll?: boolean;
  /** starting scale before any movement (default 1, fills display like original image) */
  initialScale?: number;
  /** pixel distance of downward dip (default 8) */
  dipDistance?: number;
  /** final scale after flourish (default 1.035) */
  finalScale?: number;
}

export const MacbookMedia: React.FC<MacbookMediaProps> = ({
  variant = "scroll",
  videoSrc,
  poster,
  title,
  badge,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className,
  popOutOnScroll = false,
  initialScale = 1,
  dipDistance = 8,
  finalScale = 1.035,
}) => {
  // Static variant uses a lightweight frame; scroll variant now injects video directly into MacbookScroll's lid via screenContent.

  if (!videoSrc) {
    // Fall back to original behavior (image based) by simply delegating
    return (
      <div className={className}>
        <MacbookScroll
          title={title}
          badge={badge}
          src={"/linear.webp"}
          showGradient={false}
        />
      </div>
    );
  }


    /**
     * Usage Examples:
     * 1. Scroll animated video (landing hero side):
     *    <MacbookMedia variant="scroll" videoSrc="/Swift.mp4" title={<span>Swift in Motion</span>} />
     *
     * 2. Static framed video (no scroll transform):
     *    <MacbookMedia variant="static" videoSrc="/demo.mp4" title="Demo Preview" />
     *
     * 3. Image fallback (no video):
     *    <MacbookMedia title="Showcase" />  // uses default placeholder image
     *
     * Props you can adjust:
     *  - variant: 'scroll' | 'static'
     *  - videoSrc: string (if provided, renders <video>)
     *  - poster: static preview frame
     *  - title: ReactNode heading
     *  - badge: small decorative element (bottom-left in original design)
     *  - autoPlay / loop / muted / playsInline: forwarded to <video>
     *
     * Implementation notes:
     *  - The scroll variant overlays a video inside the existing MacbookScroll lid without modifying library code.
     *  - The static variant uses a simplified frame for performance and layout control.
     *  - To theme (e.g., add brand glow), wrap with a parent div and add Tailwind utilities.
     */
  if (variant === "static") {
    return (
      <div className={className + " relative flex flex-col items-center"}>
        {/* Lightweight static frame approximation */}
        <div className="relative w-[640px] max-w-full aspect-[16/10] rounded-2xl bg-[#050505] border border-neutral-700 shadow-2xl overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.55))]" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-24 rounded-t-xl bg-gradient-to-t from-neutral-800 to-neutral-600" />
        </div>
        {title && (
          <div className="mt-6 text-center text-white text-xl font-semibold max-w-md opacity-90">
            {title}
          </div>
        )}
      </div>
    );
  }

  // Scroll variant with video: leverage existing structure by passing a transparent src and layering video via CSS.
  // Scroll variant base: use screenContent injection into MacbookScroll's Lid.
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Local progress motion value (0-1) advanced only via wheel over the Macbook region.
  const localProgress = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Only react if cursor is over element bounds
      const rect = el.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      
      // Always prevent default scrolling when over the MacBook area
      e.preventDefault();
      
      const delta = e.deltaY; // positive scroll down
      const current = localProgress.get();
      // Only update progress if not at maximum
      if (current < 1 || delta < 0) {
        // Reduced sensitivity for smoother animation
        const next = Math.min(1, Math.max(0, current + delta * 0.0015));
        localProgress.set(next);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [localProgress]);

  // Pop-out path: start slightly lower (12px) then settle to 0 near 70%, then slight lift (-8px) at end for emphasis.
  // New path: start centered (0), move downward (+14px) early, then rise back to perfectly aligned (0) around 0.55, finally lift slightly (-10px) at end.
  // Revised again: keep scale = 1 until after full return. Slight dip starts later.
  // Dip: 0 -> 0.12 (0 to +10px)
  // Return: 0.12 -> 0.28 (back to 0)
  // Stable cover: 0.28 -> 0.78 (0)
  // Lift flourish: 0.78 -> 1 (-8px) with modest scale rise.
  // Start slightly smaller (0.9) so it grows into the frame when returning, then subtle lift growth.
  // Neutral path using configurable tuning props:
  // 0 -> 0.14 : scale initialScale -> (initialScale + 0.02), translate 0 -> +dipDistance
  // 0.14 -> 0.30 : scale to 1, translate back to 0
  // 0.30 -> 1 : scale to finalScale, stay aligned (translate 0)
  // Two-phase approach:
  // Phase 0 (seating): 0 -> seatEnd (very quick) scale from initialScale -> (initialScale + 0.03) giving a gentle settle before main path starts.
  // Main path (existing): seatEnd -> 0.14 -> 0.30 -> 1, continuing prior behavior but shifted to feel like it grows INTO bezel rather than OUT OF it.
  const seatEnd = 0.075; // extend seating window slightly for clearer perception
  const popScale = useTransform(
    localProgress,
    [0, seatEnd, 0.18, 0.30, 1],
    [initialScale, initialScale, initialScale + 0.045, 1, finalScale],
  );
  const popTranslateY = useTransform(
    localProgress,
    [0, seatEnd, 0.18, 0.30, 1],
    [0, 0, dipDistance, 0, 0],
  );
  const popBorderRadius = useTransform(localProgress, [0, 1], [8, 8]);
  // Removed animated seating padding to eliminate unnecessary borders

  return (
    <div ref={containerRef} className={className + " relative"}>
      <MacbookScroll
        title={title}
        badge={badge}
        src={"/linear.webp"}
        showGradient={false}
        externalProgress={localProgress}
        screenContent={
          <motion.div
            style={
              popOutOnScroll
                ? {
                    scale: popScale,
                    translateY: popTranslateY,
                    borderRadius: popBorderRadius,
                  }
                : undefined
            }
            className="relative h-full w-full"
          >
            {/* Inner seating wrapper adds subtle inset shadow so initial smaller scale reads as recessed, not floating */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <video
                className="h-full w-full object-cover"
                src={videoSrc}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.55))]" />
            </div>
          </motion.div>
        }
      />
    </div>
  );
};

export default MacbookMedia;
// Additional prop documentation:
// popOutOnScroll: When true (scroll variant only), the embedded video scales and lifts out slightly
// as the user scrolls past the component, giving a "breaking free" effect from the Macbook lid.
// Tweak thresholds by adjusting the useTransform ranges (currently [0, 0.6, 1]).
