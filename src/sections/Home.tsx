import React from "react";
import Navbar from "@/components/Navbar";
import CountdownTimer from "@/components/Countdown";
import ADG from "@/components/ADG";

export default function Home() {
  const phoneNumber = "917007299680";
  const whatsappURL = `https://wa.me/${phoneNumber}`;

  return (
    <div className="flex h-[100vh] bg-gradient-to-r from-indigo-950 to-black">
      {/* Left Section */}
      <div className="w-[70%] justify-center">
        <Navbar />
        <div className="md:m-16 lg:m-32 text-white">
          <p className="text-6xl font-bold my-4 text-[#5F2EEA] custom-font">
            iOS
          </p>
          <p className="text-8xl font-bold my-4 custom-font">FUSION 8.0 </p>
          <p className="text-2xl text-gray-400 mt-8">
            iOS Fusion 8.0: Where the future of app development unfolds.
            Experience the power to innovate like never before, pushing the
            limits of iOS technology and unlocking a world of possibilities.
          </p>

          <div className="flex my-8 mx-0 z-10">
            <button className="w-[14rem] text-2xl h-[3.5rem] shadow-md bg-[#5F2EEA] border-0 rounded-full mr-4 z-10">
              <a
                target="_blank"
                href="https://gravitas.vit.ac.in/events/af543ff7-0bd3-476f-ad5d-e37805869d2c"
              >
                REGISTER
              </a>
            </button>
            <button className="w-[14rem] text-2xl h-[3.5rem] shadow-md border rounded-full mr-4 z-10">
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
      <div className="w-[40%] h-full flex justify-center items-center">
        <video
          className="w-[80%] rounded-xl"
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
  );
}
