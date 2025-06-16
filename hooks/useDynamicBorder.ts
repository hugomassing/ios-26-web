import { useEffect, useRef, useState } from "react";

interface UseDynamicBorderProps {
  enabled?: boolean;
  borderWidth?: number;
}

interface UseDynamicBorderReturn {
  ref: React.RefObject<HTMLDivElement>;
  style: React.CSSProperties & {
    "--dynamic-border-gradient"?: string;
  };
}

export const useDynamicBorder = ({
  enabled = true,
  borderWidth = 2,
}: UseDynamicBorderProps = {}): UseDynamicBorderReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseenter", () => setIsHovered(true));
      element.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseenter", () => setIsHovered(true));
        element.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, [enabled]);

  const calculateGradient = () => {
    if (!isHovered) {
      return `linear-gradient(
        to right,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.1)
      )`;
    }

    const angle =
      Math.atan2(mousePosition.y - 50, mousePosition.x - 50) * (180 / Math.PI);
    return `linear-gradient(
      ${angle}deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8)
    )`;
  };

  const style: UseDynamicBorderReturn["style"] = {
    position: "relative",
    isolation: "isolate",
    border: `${borderWidth}px solid transparent`,
    borderImage: `${calculateGradient()} ${borderWidth}`,
    borderImageSlice: "1",
  };

  return { ref, style };
};
