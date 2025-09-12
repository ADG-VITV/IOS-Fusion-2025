"use client";
import { useState } from "react";
import Event from "@/components/Event"; // Assuming Event component is in this path
import Slider from "@mui/material/Slider";

// --- Event Data for Day 1 ---
const day1Events = [
  { event: "INTRO & WORKSHOPS", time: "11:00 AM - 12:00 PM", venue: "Kickoff with iOS + ML workshops" },
  { event: "HANDS ON WORKSHOP", time: "12:00 PM - 11:00 PM", venue: "Workshop begins, Speaker Session-2, Breaks" },
  { event: "LUNCH AND NETWORKING", time: "1:30 PM - 2:30 PM", venue: "Food Court Area" },
  { event: "SPEAKER SESSION", time: "2:30 PM - 4:00 PM", venue: "Guest Speaker Talk" },
];

// --- Event Data for Day 2 ---
const day2Events = [
  { event: "APPATHON BEGINS", time: "12:00 AM - 5:00 AM", venue: "Appathon, Reviews and Fun Games" },
  { event: "MID-DAY CHECK-IN", time: "10:00 AM - 11:00 AM", venue: "Mentors Available" },
  { event: "FINAL REVIEW", time: "1:00 PM - 2:00 PM", venue: "Project Demos" },
  { event: "CLOSING & PRIZES", time: "2:00 PM - 3:00 PM", venue: "Ceremony and Awards" },
];

const totalEvents = day1Events.length + day2Events.length;

export default function Timeline() {
  const [range, setRange] = useState<number>(100);
  const segmentSize = 100 / (totalEvents - 1);

  const getBackgroundColor = (index: number): string => {
    const idealIndex = Math.round((100 - range) / segmentSize);
    if (index === idealIndex) {
      return "bg-[#5C4AC8]";
    }
    return "bg-[#1A1A1A]";
  };

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(Array.isArray(newValue) ? newValue[0] : newValue);
  };

  const handleClick = (index: number) => {
    setRange(100 - index * segmentSize);
  };

  return (
    <section id="timeline" className="px-6 py-12 md:py-16 lg:px-32 lg: text-white h-screen">
      <h1 className="mt-8 text-3xl text-center md:text-4xl lg:text-5xl font-bold mb-16">
        TIMELINE
      </h1>
      <div className="relative flex flex-col md:flex-row mt-35 md:space-x-8 lg:space-x-16">
        {/* Vertical Slider - Placed here to span both columns */}
        <div className="absolute h-full hidden md:flex items-center left-1/2 -translate-x-1/2 top-0 z-20">
            <Slider
              value={range}
              onChange={handleRangeChange}
              aria-labelledby="range-slider"
              min={0}
              max={100}
              track="inverted"
              orientation="vertical"
              sx={{
                height: "95%", // A bit less than 100% to avoid overflow
                color: "#5f37b0",
                width: 8,
                '& .MuiSlider-rail': { opacity: 0.5 },
              }}
            />
        </div>

        {/* DAY 1 COLUMN */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">DAY 1</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-[#5f37b0] z-0"></div>
            {day1Events.map((item, index) => (
              <div key={`day1-${index}`} className="flex justify-center items-center mb-8 relative">
                <div className="w-1/2 px-4 flex justify-end">
                  {index % 2 === 0 && ( <Event onClick={() => handleClick(index)} className={`w-full md:w-5/6 lg:w-3/4 ${getBackgroundColor(index)}`} {...item} /> )}
                </div>
                <div className="w-12 flex-shrink-0"></div>
                <div className="w-1/2 px-4 flex justify-start">
                  {index % 2 !== 0 && ( <Event onClick={() => handleClick(index)} className={`w-full md:w-5/6 lg:w-3/4 ${getBackgroundColor(index)}`} {...item} /> )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DAY 2 COLUMN */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">DAY 2</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-[#5f37b0] z-0"></div>
            {day2Events.map((item, index) => {
              const globalIndex = index + day1Events.length; // Continue index from Day 1
              return (
                <div key={`day2-${index}`} className="flex justify-center items-center mb-8 relative">
                  <div className="w-1/2 px-4 flex justify-end">
                    {globalIndex % 2 === 0 && ( <Event onClick={() => handleClick(globalIndex)} className={`w-full md:w-5/6 lg:w-3/4 ${getBackgroundColor(globalIndex)}`} {...item} /> )}
                  </div>
                  <div className="w-12 flex-shrink-0"></div>
                  <div className="w-1/2 px-4 flex justify-start">
                    {globalIndex % 2 !== 0 && ( <Event onClick={() => handleClick(globalIndex)} className={`w-full md:w-5/6 lg:w-3/4 ${getBackgroundColor(globalIndex)}`} {...item} /> )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}