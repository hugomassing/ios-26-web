"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useMouseAngle } from "@/contexts/MouseAngleContext";
import LiquidGlass from "./LiquidGlass";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className = "" }) => {
  const { angle } = useMouseAngle();

  return (
    <div className="relative">
      {/* SVG Mask Definition */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="search-mask">
            <path d="M87 0C95.8366 0 103 7.16344 103 16C103 24.8366 95.8366 32 87 32H16C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 8.05322e-08 16 0H87ZM16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5H87C95.5604 31.5 102.5 24.5604 102.5 16C102.5 7.43959 95.5604 0.5 87 0.5H16Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Border gradient layer */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.6) 0% 40%, rgba(255,255,255,0.1) 60% 100%)`,
          clipPath: "url(#search-mask)",
          zIndex: 1,
        }}
      />

      {/* Inner content layer */}
      <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full z-20">
        <LiquidGlass rounded="rounded-full" />
        <SearchIcon className="w-4 h-4 text-white/90 z-20" />
        <span className="text-white/90 text-sm font-medium z-20">Search</span>
      </div>
    </div>
  );
};

export default Search;
