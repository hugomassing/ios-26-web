import { useState, useEffect } from "react";
import { Signal, Wifi, Battery } from "lucide-react";

interface StatusBarProps {
  background?: "black" | "transparent";
}

export default function StatusBar({
  background = "transparent",
}: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    // Update time every minute
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .replace(/^0/, "")
      );
    };
    update();
    const interval = setInterval(update, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`px-10 text-white text-sm font-medium w-full absolute top-0 left-0 z-30 ${
        background === "black" ? "bg-black/80" : "bg-transparent"
      }`}
      style={{ minHeight: 54 }}
    >
      <div className="h-[54px] flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span>{currentTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
