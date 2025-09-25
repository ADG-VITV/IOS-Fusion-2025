import React from "react";
import LandingPage from "@/sections/Home";
import LandingPageMobile from "@/sections/Home-mobile";
import Description from "@/sections/Description";
import Timeline from "@/sections/Timeline";
import Partners from "@/sections/Partners";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";
import ScrollTop from "@/components/ScrollTop";
import Tracks from "@/sections/Tracks";

export default function Home() {

  return (
    <>
      <div className="hidden md:block">
        <LandingPage />
      </div>
      <div className="md:hidden">
        <LandingPageMobile />
      </div>
      <Description />
      {/* <Speakers /> */}
      <Timeline />
      <Tracks />
      <Partners />
      <FAQ />
      <Footer />
      <ScrollTop />
    </>
  );
}