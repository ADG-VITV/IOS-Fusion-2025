"use client";
import { useState, useRef, useEffect } from "react";
import Event from "@/components/Event";
import Slider from "@mui/material/Slider";

export default function Timeline() {
  const [range, setRange] = useState<number>(100);

  const getBackgroundColor = (index: number): string => {

    if (range < 33.33 && index === 3) return "bg-[#5C4AC8]";
    if (range >= 33.33 && range < 66.66 && index === 2) return "bg-[#5C4AC8]";
    if (range >= 66.66 && range <= 99.99 && index === 1) return "bg-[#5C4AC8]";
    if (range == 100 && index === 0) return "bg-[#5C4AC8]";
    return "bg-[#1A1A1A]";
  };

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(Array.isArray(newValue) ? newValue[0] : newValue);
  };
  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        setRange(0);
        break;
      case 1:
        setRange(33.33);
        break;
      case 2:
        setRange(66.66);
        break;
      case 3:
        setRange(100);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="timeline"
      className="px-6 py-12 md:py-16 lg:px-32 lg:py-20 text-white"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold md:m-2 lg:m-4">TIMELINE</h1>
      <div className="flex lg:mx-auto h-full" contentEditable={false}>
        <div className="flex flex-col w-full text-xl md:text-2xl lg:text-5xl gap-8 my-8 md:my-12 items-center font-bold relative">
          <div className="flex w-full justify-between md:justify-evenly gap-6">
            <h1>DAY 1</h1>
            <div className="flex flex-col gap-4 mb-5 max-w-full">
              <Event
                key={0}
                onClick={() => handleClick(3)}
                className={`flex flex-col ${getBackgroundColor(0)}`}
                event="INTRODUCTION AND SPEAKER SESSION"
                time="11:00 AM - 12:00 PM"
                venue="SMV - 209"
              />  
              <Event
                key={1}
                onClick={() => handleClick(2)}
                className={`flex flex-col ${getBackgroundColor(1)}`}
                event="HANDS ON WORKSHOP"
                time="12:00 PM - 11:00 PM"
                venue="Workshop begins, Speaker Session-2, Breaks"
              />
               
            </div>
          </div>
          <div className="flex w-full justify-between md:justify-evenly gap-6">
            <h1>DAY 2</h1>
            <div className="flex flex-col gap-4 mb-5 max-w-full">
              <Event
                key={2}
                onClick={() => handleClick(1)}
                className={`flex flex-col ${getBackgroundColor(2)}`}
                event="APPATHON"
                time="12:00 AM - 5:00 AM"  
                venue=" Appathon, Reviews and Fun Games"
              />
              <Event
                key={3}
                onClick={() => handleClick(0)}
                className={`flex flex-col ${getBackgroundColor(3)}`}
                event="FINAL REVIEW AND CLOSING CEREMONY"
                time=" 9:30AM - 2:00 PM"
                venue="MGB 303, 304"
              />
            </div>
            <div className="hidden md:flex h-full justify-center items-center absolute top-0 left-[25%] lg:left-[35%] rotate-0">
              <Slider
                value={range}
                onChange={handleRangeChange}
                aria-labelledby="range-slider"
                min={0}
                max={100}
                track="inverted"
                orientation="vertical"
                sx={{
                  width: 8,
                  height: "100%",
                  color: "#5f37b0",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}