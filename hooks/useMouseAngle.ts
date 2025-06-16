import { useEffect, useRef, useState } from "react";

interface UseMouseAngleProps {
  enabled?: boolean;
}

export const useMouseAngle = ({ enabled = true }: UseMouseAngleProps = {}): {
  ref: React.RefObject<HTMLDivElement>;
  angle: number;
  isHovered: boolean;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate angle from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const newAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      setAngle(newAngle);
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

  return { ref, angle, isHovered };
};
