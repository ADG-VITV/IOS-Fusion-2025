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
    if (questionRef.current) {
      setContentHeight(questionRef.current.clientHeight);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (questionRef.current && !questionRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={questionRef}
      
      className={`border rounded-lg lg:w-[80%] w-[100%] transition-all duration-300 
      ${isOpen 
        ? "bg-[#5F2EEA]/20 border-[#5F2EEA] shadow-[0_0_20px_rgba(95,46,234,0.6)]" 
        : "bg-[#111827] border-gray-600 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:border-cyan-400"}`}
    >
      <div
        onClick={toggle}
        className="h-16 md:h-[3rem] items-center justify-between flex p-4 cursor-pointer"
      >
        <p className={`text-[0.9rem] md:text-[1rem] ${isOpen ? "text-cyan-300" : "text-gray-200"}`}>
          {ques}
        </p>
        <p className="text-2xl">
          {isOpen ? (
            <MdKeyboardArrowDown className="text-[#5F2EEA] transition-all duration-300" />
          ) : (
            <MdKeyboardArrowRight className="text-gray-400 transition-all duration-300" />
          )}
        </p>
      </div>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentHeight}px` : "0px",
          transition: "all 300ms cubic-bezier(0.3, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <hr className="mx-4 border-[#38bdf8]/40" />
        <p className="mx-4 md:my-3 my-5 text-gray-300">{ans}</p>
      </div>
    </div>
  );
}
