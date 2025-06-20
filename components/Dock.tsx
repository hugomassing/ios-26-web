import React from "react";
import { AppData } from "@/app/page";
import Icon from "./Icon";
import LiquidGlass from "./LiquidGlass";
import { useMouseAngle } from "@/contexts/MouseAngleContext";

interface DockProps {
  apps: AppData[];
  onAppSelect: (app: AppData) => void;
  getIcon: (iconName: string) => React.ComponentType<{ className?: string }>;
}

const Dock: React.FC<DockProps> = ({ apps, onAppSelect, getIcon }) => {
  const { angle } = useMouseAngle();

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none"
      style={{ bottom: 20 }}
    >
      <div className="relative" style={{ width: 375 - 32 }}>
        {/* SVG Mask Definition */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="dock-mask">
              <path d="M305 0C325.987 0 343 17.0132 343 38V42C343 62.9868 325.987 80 305 80H38C17.0132 80 0 62.9868 0 42V38C1.03088e-06 17.0132 17.0132 0 38 0H305ZM38.5 0.5C17.5132 0.5 0.5 17.5132 0.5 38.5V41.5C0.500001 62.4868 17.5132 79.5 38.5 79.5H304.5C325.487 79.5 342.5 62.4868 342.5 41.5V38.5C342.5 17.5132 325.487 0.5 304.5 0.5H38.5Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Border gradient layer */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `linear-gradient(${angle}deg, rgba(255,255,255,0.6) 0% 40%, rgba(255,255,255,0.1) 60% 100%)`,
            clipPath: "url(#dock-mask)",
            zIndex: 4,
            filter: "blur(2px)",
          }}
        />

        {/* Inner content layer */}
        <div className="px-4 py-4 rounded-[2.5rem] shadow-2xl pointer-events-auto relative z-[2]">
          <LiquidGlass rounded="rounded-[2.5rem]" />
          <div className="flex justify-between relative z-10">
            {apps.map((app) => {
              const IconComponent = getIcon(app.icon);
              return (
                <Icon
                  key={app.id}
                  icon={IconComponent}
                  onClick={() => onAppSelect(app)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;
