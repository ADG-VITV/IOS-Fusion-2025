"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollImage() {
  const { scrollY } = useScroll();

  // Transform scroll position to opacity and x position
  const opacity = useTransform(scrollY, [0, 1000], [1, 0]); // Fade out
  const x = useTransform(scrollY, [0, 1000], ["0%", "-100%"]); // Move to the left

  return (
    <motion.div
      className="absolute left-0 bottom-0 m-0 p-0 h-[16.5rem]"
      style={{ opacity, x }}
      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing as needed
    >
      <Image
        className="object-cover w-full h-full"
        src="/ADG.png"
        alt="ADG"
        width={500}
        height={500}
      />
    </motion.div>
  );
}