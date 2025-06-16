import React, { useRef } from "react";
import LiquidGlass from "./LiquidGlass";
import { useMouseAngle } from "@/contexts/MouseAngleContext";

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
  const { angle, isHovered } = useMouseAngle();

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
        onClick && !disabled ? "active:scale-95" : ""
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ zIndex: 1 }}
    >
      <div className="relative w-12 aspect-square rounded-[1.2rem]">
        {/* SVG Mask Definition */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="icon-mask">
              <path
                d="M32 0C40.8366 0 48 7.16344 48 16V32C48 40.8366 40.8366 48 32 48H16C7.16344 48 2.5772e-07 40.8366 0 32V16C0 7.16344 7.16344 2.57703e-07 16 0H32ZM16 0.5C7.43959 0.5 0.500001 7.43959 0.5 16V32C0.5 40.5604 7.43959 47.5 16 47.5H32C40.5604 47.5 47.5 40.5604 47.5 32V16C47.5 7.43959 40.5604 0.500001 32 0.5H16Z"
                fill="#00FFB2"
              />
            </clipPath>
          </defs>
        </svg>

        {/* Border gradient layer */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `linear-gradient(${angle}deg, rgba(255,255,255,0.6) 0% 40%, rgba(255,255,255,0.1) 60% 100%)`,
            clipPath: "url(#icon-mask)",
            zIndex: 2,
          }}
        />

        {/* Inner content layer */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[1rem] border-[0.5px] border-transparent"
          style={{
            zIndex: 1,
          }}
        >
          <LiquidGlass rounded="rounded-[1rem]" />
          <IconComponent
            className={`w-${size} h-${size} text-white/90 relative z-10`}
          />
        </div>
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
