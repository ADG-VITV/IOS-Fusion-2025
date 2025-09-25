"use client";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// 1. Define the types for the component's props
export interface EvervaultCardProps {
  text: string;
  className?: string; // Making className optional fixes the error in page.tsx
}

export const EvervaultCard = ({ text, className }: EvervaultCardProps) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  // 2. Add the correct type for the mouse event
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(200px at ${x}px ${y}px, white, transparent)`
  );

  const style = {
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "relative h-full bg-transparent flex items-center justify-center w-full group",
        className
      )}
    >
      <div className="absolute w-full h-full bg-transparent [mask-image:radial-gradient(white,transparent)] group-hover:opacity-50"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 bg-transparent opacity-0 mix-blend-overlay group-hover:opacity-100"
        style={style}
      />
      <p className="absolute inset-x-0 text-center text-2xl md:text-4xl font-bold text-slate-100 z-20">
        {text}
      </p>
    </div>
  );
};

export const Icon = (
  { className, ...rest }: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};