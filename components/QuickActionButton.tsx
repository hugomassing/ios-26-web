import React from "react";
import LiquidGlass from "./LiquidGlass";

interface QuickActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  ...props
}) => (
  <div
    className="relative w-12 h-12 liquidGlass-border rounded-full flex items-center justify-center"
    {...props}
  >
    <LiquidGlass rounded="rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {icon}
    </div>
  </div>
);

export default QuickActionButton;
