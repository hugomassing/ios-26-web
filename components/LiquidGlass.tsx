interface LiquidGlassProps {
  rounded?: string;
}

const LiquidGlass = ({ rounded }: LiquidGlassProps) => (
  <>
    <div
      className={`${rounded}`}
      style={{
        backdropFilter: "url(#glass-distortion) blur(0.25px) contrast(1.1)",
        position: "absolute",
        inset: 0,
        zIndex: -2,
      }}
    ></div>
    <div
      className={`${rounded}`}
      style={{
        zIndex: 1,
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.05)",
      }}
    ></div>
    <div
      className={`${rounded}`}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        boxShadow:
          "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)",
      }}
    ></div>
    <div
      className={`${rounded}`}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    ></div>
  </>
);

export default LiquidGlass;
