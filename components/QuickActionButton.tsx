import React from "react";
import LiquidGlass from "./LiquidGlass";
import DynamicBorder from "./DynamicBorder";

interface QuickActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  size?: number;
  darkTint?: boolean;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  className,
  icon,
  size = 48,
  darkTint = false,
  ...props
}) => (
  <DynamicBorder
    className={`flex items-center justify-center shadow-lg ${className}`}
    style={{ width: size, height: size, ...props.style }}
    {...props}
  >
    <LiquidGlass rounded="rounded-full" />
    {darkTint && (
      <div className="absolute inset-0 rounded-full bg-black/30 z-10 pointer-events-none" />
    )}
    <div className="absolute inset-0 flex items-center justify-center z-20">
      {icon}
    </div>
  </DynamicBorder>
);

export default QuickActionButton;
