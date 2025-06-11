import React, { useRef } from "react";
import LiquidGlass from "./LiquidGlass";

interface IconProps {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  size?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  label,
  size = 8,
  onClick,
  disabled,
}) => {
  const pointerDownX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownX.current = e.pageX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (disabled) return;
    if (pointerDownX.current !== null) {
      const distance = Math.abs(e.pageX - pointerDownX.current);
      if (distance < 8) {
        onClick?.();
      }
    }
    pointerDownX.current = null;
  };

  return (
    <div
      className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
        onClick && !disabled ? "hover:scale-105 active:scale-95" : ""
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ zIndex: 1 }}
    >
      <div className="relative w-14 aspect-square flex items-center justify-center rounded-[1.2rem] liquidGlass-border">
        <LiquidGlass rounded="rounded-[1.2rem]" />
        <IconComponent
          className={`w-${size} h-${size} text-white/90 relative z-10`}
        />
      </div>
      {label && (
        <span className="text-white/80 text-xs font-medium text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
};

export default Icon;
