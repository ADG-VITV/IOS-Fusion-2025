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
 *  - videoSrc?: string (when prov ided, renders video instead of image)
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

export const MacbookMedia: React.FC<MacbookMediaProps> = (props) => {
  const {
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
  } = props;

  const hasVideo = Boolean(videoSrc);
  const isStatic = variant === "static";

  // Always create refs & motion values so hook order is stable
  const containerRef = useRef<HTMLDivElement | null>(null);
  const localProgress = useMotionValue(0);

  useEffect(() => {
    if (!hasVideo || isStatic) return; // only needed for scroll + video
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      e.preventDefault();
      const delta = e.deltaY;
      const current = localProgress.get();
      if (current < 1 || delta < 0) {
        const next = Math.min(1, Math.max(0, current + delta * 0.0015));
        localProgress.set(next);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [hasVideo, isStatic, localProgress]);

  // Motion transforms (safe even if unused)
  const seatEnd = 0.075;
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

  // Rendering branches (no early returns before hooks now)
  if (!hasVideo) {
    return (
      <div className={className}>
        <MacbookScroll title={title} badge={badge} src={"/linear.webp"} showGradient={false} />
      </div>
    );
  }

  if (isStatic) {
    return (
      <div className={className + " relative flex flex-col items-center"}>
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
