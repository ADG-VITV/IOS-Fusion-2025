"use client";
import { useState, useEffect, useRef } from "react"; 
import Event from "@/components/Event";
import Slider from "@mui/material/Slider";

// --- Custom Hook for Smooth Slider Animation ---
const useSmoothSlider = (targetValue: number, speed: number = 0.1) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      const difference = targetValue - currentValue;
      // If the difference is negligible, stop the animation
      if (Math.abs(difference) < 0.01) {
        setCurrentValue(targetValue);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        return;
      }

      // Move a fraction of the distance each frame
      setCurrentValue(currentValue + difference * speed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation if the targetValue changes again
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, currentValue, speed]);

  return currentValue;
};


// --- Event Data (No Changes) ---
const day1Events = [
  { event: "Opening & Introduction", time: "1:30 PM - 2:00 PM", venue: "Welcome session and overview of the hackathon." },
  { event: "Workshops", time: "2:00 PM - 5:00 PM", venue: "iOS and ML workshops to build technical skills." },
  { event: "Talks & Team Formation", time: "5:00 PM - 7:15 PM", venue: "Speaker session, hackathon rules, and team formation." },
  { event: "Dinner & Hack-0", time: "7:30 PM - 11:30 PM", venue: "Dinner followed by kickoff and brainstorming session." },
];

const day2Events = [
  { event: "Night Hackathon", time: "11:30 PM - 5:45 AM", venue: "Hack-1 to Hack-3 with music, entertainment, and games." },
  { event: "Morning Hack Sprint", time: "5:45 AM - 2:00 PM", venue: "Hack-4 session with a long break." },
  { event: "Project Review", time: "2:00 PM - 3:30 PM", venue: "Review 2 and mentor evaluations." },
  { event: "Final Hack & Ceremony", time: "3:30 PM - 6:00 PM", venue: "Hack-5 followed by final speeches and closing ceremony." },
];



const allEvents = [...day1Events, ...day2Events];
const totalEvents = allEvents.length;

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const segmentSize = 100 / (totalEvents - 1);

  const handleSliderChange = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    const rangeValue = Array.isArray(newValue) ? newValue[0] : newValue;
    const newIndex = Math.round((100 - rangeValue) / segmentSize);
    setActiveIndex(newIndex);
  };

  const handleEventClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Calculate the target position for the slider
  const targetSliderValue = 100 - activeIndex * segmentSize;
  // Use the custom hook to get a smoothly animated value
  const smoothSliderValue = useSmoothSlider(targetSliderValue);

  return (
    <section id="timeline" className="px-6 py-12 md:py-16 lg:px-24 xl:px-32 bg-[#1A1A1A] text-white min-h-screen">
      <h1 className="sm:mt-4 sm:mb-5 md:mb-15 text-3xl text-center md:text-4xl lg:text-5xl font-bold lg:mb-20">
        TIMELINE
              <div className="mx-auto mt-4 mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />

      </h1>
      
      <div className="relative flex flex-col md:flex-row md:space-x-8 lg:space-x-16">
        <div className="absolute h-full hidden md:flex items-center left-1/2 -translate-x-1/2 top-0 z-20">
          <Slider
            value={smoothSliderValue} // Use the smooth value here
            onChange={handleSliderChange}
            aria-labelledby="desktop-range-slider"
            min={0}
            max={100}
            track="inverted"
            orientation="vertical"
            sx={{
              height: "90%",
              color: "#5F2EEA" ,
              width: 8,
              '& .MuiSlider-thumb': {
                transition: 'top 0.1s ease-out', // Smoothen dragging visuals
              },
              '& .MuiSlider-rail': {  border: 'none' },
              '& .MuiSlider-track': { backgroundColor: '#3C2482', border: 'none' },
            }}
          />
        </div>

        <DayColumn
          dayTitle="DAY 1"
          events={day1Events}
          dayOffset={0}
          activeIndex={activeIndex}
          onEventClick={handleEventClick}
        />
        <DayColumn
          dayTitle="DAY 2"
          events={day2Events}
          dayOffset={day1Events.length}
          activeIndex={activeIndex}
          onEventClick={handleEventClick}
        />
      </div>
    </section>
  );
}

interface DayColumnProps {
  dayTitle: string;
  events: { event: string; time: string; venue: string }[];
  dayOffset: number;
  activeIndex: number;
  onEventClick: (index: number) => void;
}

function DayColumn({ dayTitle, events, dayOffset, activeIndex, onEventClick }: DayColumnProps) {
  
  // This function now returns styling classes for both color and scale
  const getActiveStyles = (index: number): string => {
    return index === activeIndex 
      ? "bg-[#5F2EEA] scale-100 md:scale-105" // Active cards are colored and slightly larger on desktop
      : "bg-[#1A1A1A] scale-100";
  };
  
  return (
    <div className="w-full md:w-1/2 mt-12 md:mt-0">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">{dayTitle}</h2>
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-[#5F2EEA] z-0"></div>
        
        {events.map((item, index) => {
          const globalIndex = index + dayOffset;
          const cardWidthClasses = "md:w-11/12 lg:w-10/12 xl:w-5/6";
          const baseCardClasses = "transform transition-all duration-600 ease-in-out relative z-10";
          const overlapClasses = index > 0 ? "md:-mt-12 lg:-mt-16" : "";

          return (
            <div key={`${dayTitle}-${index}`} className={`mb-8 md:mb-10 ${overlapClasses}`}>
              <div className="md:hidden flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#5F2EEA] z-10 flex-shrink-0"></div>
                <div className="pl-6 w-full">
                   <Event
                      onClick={() => onEventClick(globalIndex)}
                      className={`w-full ${baseCardClasses} ${getActiveStyles(globalIndex)}`}
                      {...item}
                    />
                </div>
              </div>

              <div className="hidden md:flex justify-center items-center relative">
                <div className="w-1/2 px-4 flex justify-end">
                  {globalIndex % 2 === 0 && (
                    <Event
                      onClick={() => onEventClick(globalIndex)}
                      className={`w-full ${cardWidthClasses} ${baseCardClasses} ${getActiveStyles(globalIndex)}`}
                      {...item}
                    />
                  )}
                </div>
                <div className="w-12 flex-shrink-0"></div>
                <div className="w-1/2 px-4 flex justify-start">
                  {globalIndex % 2 !== 0 && (
                    <Event
                      onClick={() => onEventClick(globalIndex)}
                      className={`w-full ${cardWidthClasses} ${baseCardClasses} ${getActiveStyles(globalIndex)}`}
                      {...item}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}