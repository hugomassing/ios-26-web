import { useEffect, useRef, useState } from "react";

interface DynamicBorderProps {
  rounded?: string;
  className?: string;
  children?: React.ReactNode;
}

const DynamicBorder = ({
  rounded = "rounded-full",
  className = "",
  children,
}: DynamicBorderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovered(true));
      container.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovered(true));
        container.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  const calculateGradient = () => {
    if (!isHovered)
      return "conic-gradient(from 0deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))";

    const angle =
      Math.atan2(mousePosition.y - 50, mousePosition.x - 50) * (180 / Math.PI);
    return `conic-gradient(from ${angle}deg, 
      rgba(255,255,255,0.8) 0%,
      rgba(255,255,255,0.4) 25%,
      rgba(255,255,255,0.1) 50%,
      rgba(255,255,255,0.4) 75%,
      rgba(255,255,255,0.8) 100%
    )`;
  };

  return (
    <div ref={containerRef} className={`relative ${rounded} ${className}`}>
      <div
        className={`absolute inset-0 ${rounded} transition-all duration-300`}
        style={{
          background: calculateGradient(),
          maskImage: `
            linear-gradient(black, black),
            linear-gradient(black, black)
          `,
          WebkitMaskImage: `
            linear-gradient(black, black),
            linear-gradient(black, black)
          `,
          maskSize: "100% 100%, calc(100% - 4px) calc(100% - 4px)",
          WebkitMaskSize: "100% 100%, calc(100% - 4px) calc(100% - 4px)",
          maskPosition: "0 0, 2px 2px",
          WebkitMaskPosition: "0 0, 2px 2px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DynamicBorder;
