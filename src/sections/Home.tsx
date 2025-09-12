"use-client;"
import React from "react";
import Navbar from "@/components/Navbar";
import CountdownTimer from "@/components/Countdown";
import ADG from "@/components/ADG";

export default function Home() {
  const phoneNumber = "917007299680";
  const whatsappURL = `https://wa.me/${phoneNumber}`;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-950 to-black pt-16 md:pt-20">
      {/* Left Section */}
      <div className="relative w-full lg:w-[60%] xl:w-[65%] justify-center overflow-hidden">
        <Navbar />
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-6 md:py-10 text-white max-w-6xl">
          <p className="text-4xl md:text-6xl font-bold my-4 text-[#5F2EEA] custom-font">
            iOS
          </p>
          <p className="text-5xl md:text-7xl lg:text-8xl font-bold my-4 custom-font">FUSION 8.0 </p>
          <p className="text-base md:text-xl lg:text-2xl text-gray-400 mt-6 md:mt-8 max-w-2xl">
            iOS Fusion 8.0: Where the future of app development unfolds.
            Experience the power to innovate like never before, pushing the
            limits of iOS technology and unlocking a world of possibilities.
          </p>

          <div className="flex flex-wrap gap-4 my-8 mx-0 z-10">
            <button className="w-[12rem] md:w-[14rem] text-lg md:text-2xl h-[3rem] md:h-[3.5rem] shadow-md bg-[#5F2EEA] border-0 rounded-full z-10">
              <a
                target="_blank"
                href="https://gravitas.vit.ac.in/events/af543ff7-0bd3-476f-ad5d-e37805869d2c"
              >
                REGISTER
              </a>
            </button>
            <button className="w-[12rem] md:w-[14rem] text-lg md:text-2xl h-[3rem] md:h-[3.5rem] shadow-md border rounded-full z-10">
              <a target="_blank" href={whatsappURL}>
                REACH OUT
              </a>
            </button>
          </div>

          <ADG />

          <div>
            <CountdownTimer targetDate="2025-09-26T10:00:00" />
          </div>
        </div>
      </div>

      {/* Right Section (video instead of image) */}
      <div className="hidden lg:flex w-[40%] min-h-full justify-center items-center px-6">
        <div className="w-full max-w-[720px] aspect-video">
          <video
            className="w-full h-full rounded-xl object-contain"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Swift.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
