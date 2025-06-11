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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

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
      className={
        "relative w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden cursor-pointer pt-12"
      }
      onClick={handleUnlock}
    >
      {/* Background Image with 3D Parallax */}
      <Image
        src="/lockscreen2.jpg"
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

      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-8 w-40 h-40 bg-purple-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-400 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Top and Bottom Gradient Blur Overlays */}
      <div className="pointer-events-none select-none">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 z-10 bg-gradient-to-b from-black/70 to-transparent blur-xl" />
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

      {/* Quick Action Buttons */}
      {/* Flashlight Button - Bottom Left */}
      <div className="absolute bottom-8 left-6">
        <QuickActionButton
          icon={<Flashlight className="w-6 h-6 text-white" />}
        />
      </div>
      {/* Camera Button - Bottom Right */}
      <div className="absolute bottom-8 right-6">
        <QuickActionButton icon={<Camera className="w-6 h-6 text-white" />} />
      </div>
    </motion.div>
  );
}
