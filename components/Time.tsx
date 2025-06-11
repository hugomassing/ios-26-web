import React from "react";

interface TimeProps {
  date: Date;
  className?: string;
}

const Time: React.FC<TimeProps> = ({ date, className = "" }) => {
  const formatted = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", ":");

  return (
    <svg
      viewBox="0 0 400 160"
      width="100%"
      height="120"
      className={`block mx-auto ${className}`}
      style={{ maxWidth: "90%", height: "auto" }}
    >
      <defs>
        {/* Glassmorphism filter: blur + brightness */}
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for glass shine */}
        <linearGradient id="glass-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        {/* Frosted glass + directional glow + dark shadow filter */}
        <filter
          id="frosted-glass-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          {/* Frosted blur */}
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          {/* Semi-transparent white overlay */}
          <feFlood
            floodColor="#fff"
            floodOpacity="0.18"
            result="whiteOverlay"
          />
          <feComposite
            in="whiteOverlay"
            in2="blur"
            operator="in"
            result="frosted"
          />
          {/* Merge frosted with original */}
          <feMerge>
            <feMergeNode in="frosted" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
          {/* Directional border glow (bottom-right) */}
          <feDropShadow
            dx="4"
            dy="6"
            stdDeviation="4"
            floodColor="#fff"
            floodOpacity="0.35"
          />
          {/* Dark drop shadow (bottom) */}
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="8"
            floodColor="#000"
            floodOpacity="0.45"
          />
        </filter>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="SF Pro Display, Arial, sans-serif"
        fontWeight="900"
        fontSize="140"
        letterSpacing="2"
        fill="url(#glass-gradient)"
        filter="url(#frosted-glass-glow)"
        style={{
          paintOrder: "stroke",
          stroke: "rgba(255,255,255,0.6)",
          strokeWidth: 1,
        }}
      >
        {formatted}
      </text>
    </svg>
  );
};

export default Time;
