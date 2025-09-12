"use client";
import { useState, useEffect, useRef } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsAnimating(true);
    setIsMenuOpen(true);
  };

  const handleLinkClick = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAnimating(false);
        setTimeout(() => setIsMenuOpen(false), 300);
      }
    };

    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative custom-font">
      <button onClick={handleClick}>
        <IoReorderThreeOutline className="text-white text-4xl" />
      </button>
      <div
        ref={menuRef}
        className={`fixed right-0 w-[50vw] h-full z-30 top-0 bg-[#5F2EEA] text-white text-lg transition-all ease-in-out duration-300 transform ${
          isMenuOpen && isAnimating
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-3 justify-center w-full px-4 py-4 ">
          <a href="#" className="p-2" onClick={handleLinkClick}>
            HOME
          </a>
          <a href="#about" className="p-2" onClick={handleLinkClick}>
            ABOUT
          </a>
          {/* <a href="#speakers" className="p-2" onClick={handleLinkClick}>
            SPEAKERS
          </a> */}
          <a href="#timeline" className="p-2" onClick={handleLinkClick}>
            TIMELINE
          </a>
          <a href="#partners" className="p-2" onClick={handleLinkClick}>
            PARTNERS
          </a>
          <a href="#faq" className="p-2" onClick={handleLinkClick}>
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
}
