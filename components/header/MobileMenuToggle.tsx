"use client";
import { useState } from "react";
import NavbarLinks from "./NavbarLinks";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden text-foreground"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 md:hidden px-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="py-4 flex flex-col bg-background border rounded-2xl shadow-xl w-full">
            <NavbarLinks
              className="flex flex-col items-center space-y-4 w-full"
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
