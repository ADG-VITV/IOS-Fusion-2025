"use client";
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

type QuestionProps = {
  ques: string;
  ans: string;
};

export default function Question({ ques, ans }: QuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, ans]);

  return (
    <div
      ref={questionRef}
      
      className={`group border rounded-xl lg:w-[80%] w-full overflow-hidden transition-colors duration-300 
      ${isOpen 
        ? "bg-[#5F2EEA]/90 border-[#5F2EEA] shadow-[0_10px_30px_rgba(95,46,234,0.35)]" 
        : "bg-[#1A1A1A]/80 border-white/10 hover:border-[#5F2EEA] hover:shadow-[0_6px_22px_rgba(95,46,234,0.28)]"}`}
    >
      <div
        onClick={toggle}
        className="h-16 md:h-[3rem] items-center justify-between flex p-4 cursor-pointer select-none"
      >
        <p className={`text-[0.9rem] md:text-[1rem] ${isOpen ? "text-white" : "text-gray-200 group-hover:text-gray-100"}`}>
          {ques}
        </p>
        <p className="text-2xl">
          {isOpen ? (
            <MdKeyboardArrowDown className="text-white transition-colors duration-300" />
          ) : (
            <MdKeyboardArrowRight className="text-gray-400 group-hover:text-[#5F2EEA] transition-colors duration-300" />
          )}
        </p>
      </div>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentHeight}px` : "0px",
          transition: "height 300ms cubic-bezier(0.3, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div className=" rounded mx-4  border-t-3 border-white/10 " ></div>
        <p className="mx-4 md:my-3 my-5  border-white text-gray-300">{ans}</p>
      </div>
    </div>
  );
}
