"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp,
  Wifi,
  Battery,
  Signal,
  Flashlight,
  Camera,
} from "lucide-react";
import LiquidGlass from "./LiquidGlass";
import QuickActionButton from "./QuickActionButton";
import Image from "next/image";
import Time from "./Time";
import { motion } from "framer-motion";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const formatShortDate = (date: Date) => {
    return date
      .toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
      .replace(/\./g, "")
      .toLowerCase();
  };

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
      setIsUnlocking(false);
    }, 600); // match animation duration
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: isUnlocking ? 0 : 1,
        y: isUnlocking ? -120 : 0,
        scale: isUnlocking ? 3 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.4, 2, 0.6, 1] }}
      className={"relative w-full h-full  overflow-hidden cursor-pointer pt-12"}
      onClick={handleUnlock}
    >
      {/* Background Image with 3D Parallax */}
      <Image
        src="/lockscreen-3.jpg"
        alt="Lock Screen Background"
        fill
        className="object-cover object-center z-0 select-none pointer-events-none"
        priority
        draggable={false}
        style={{
          transform: `perspective(900px) rotateX(${
            -parallax.y * 4
          }deg) rotateY(${parallax.x * 4}deg) scale(1.07)`,
          transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
        }}
      />

      {/* Top and Bottom Gradient Blur Overlays */}
      <div className="pointer-events-none select-none">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 z-10 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 z-10 bg-gradient-to-t from-black/80 to-transparent blur-2xl" />
      </div>

      {/* Date and Time in Apple lock screen position */}
      <div className="absolute top-20 left-0 w-full flex flex-col items-center z-20 select-none">
        <span className="text-xl font-medium text-white drop-shadow mb-1">
          {formatShortDate(currentTime)}
        </span>
        <Time date={currentTime} />
      </div>

      {/* Unlock Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white opacity-75">
        <ChevronUp className="w-6 h-6 mb-2 animate-bounce" />
        <p className="text-sm font-light">Tap to unlock</p>
      </div>
    </motion.div>
  );
}
