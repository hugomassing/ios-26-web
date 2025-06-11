interface HomeIndicatorProps {
  onPress: () => void;
  visible: boolean;
  variant?: "light" | "dark";
}

export default function HomeIndicator({
  onPress,
  visible,
  variant = "light",
}: HomeIndicatorProps) {
  if (!visible) return null;

  const baseClasses =
    "absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 backdrop-blur-xl rounded-full cursor-pointer transition-all duration-300 group z-50";
  const variantClasses =
    variant === "light"
      ? "bg-white/40 hover:bg-white/60 active:bg-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      : "bg-gray-800/40 hover:bg-gray-800/60 active:bg-gray-800/80 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] active:shadow-[0_0_10px_rgba(0,0,0,0.2)]";

  return (
    <div
      className={`${baseClasses} ${variantClasses} hover:scale-110 active:scale-95`}
      onClick={onPress}
      role="button"
      aria-label="Return to home screen"
    >
      {/* Subtle glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${
          variant === "light"
            ? "from-white/0 via-white/20 to-white/0"
            : "from-gray-800/0 via-gray-800/20 to-gray-800/0"
        } blur-sm`}
      />
    </div>
  );
}
