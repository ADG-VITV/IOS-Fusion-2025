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

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (questionRef.current && !questionRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={questionRef}
      className={`border border-gray-500 rounded-lg lg:w-[80%] w-[100%] ${
        isOpen ? "bg-[#5F2EEA] border-[#5F2EEA]" : ""
      }`}
    >
      <div
        onClick={toggle}
        className="h-16 md:h-[3rem] items-center justify-between flex p-4 cursor-pointer"
      >
        <p className="text-[0.9rem] md:text-[1rem]">{ques}</p>
        <p className="text-2xl">
          {isOpen ? (
            <MdKeyboardArrowDown className="transition-all duration-300 [transition-timing-function:cubic-bezier(0.22, 1, 0.36, 1)]" />
          ) : (
            <MdKeyboardArrowRight className="transition-all duration-300 [transition-timing-function:cubic-bezier(0.22, 1, 0.36, 1)]" />
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
        className="transition-all duration-300 ease-in"
      >
        <hr className="mx-4 text-center" />
        <p className="mx-4 md:my-3 my-5">{ans}</p>
      </div>
    </div>
  );
}
