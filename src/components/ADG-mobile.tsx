"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollImage1() {
  const { scrollY } = useScroll();

  // Transform scroll position to opacity and x position
  const opacity = useTransform(scrollY, [0, 1000], [1, 0]); // Fade out
  const x = useTransform(scrollY, [0, 1000], ["0%", "-100%"]); // Move to the left

  return (
    <motion.div
      className="absolute left-0 bottom-0 md:bottom-2 m-0 p-0 h-[8rem] sm:h-[10rem] md:h-[11rem] lg:h-[13rem] xl:h-[16.5rem] z-0 pointer-events-none select-none md:opacity-90"
      style={{ opacity, x }}
      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing as needed
    >
      <Image
        className="object-contain w-auto h-full"
        src="/ADG-mobile.png"
        alt="ADG"
        width={500}
        height={500}
      />
    </motion.div>
  );
}