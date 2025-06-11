interface LiquidGlassProps {
  rounded?: string;
}

const LiquidGlass = ({ rounded }: LiquidGlassProps) => (
  <>
    <div className={`liquidGlass-effect ${rounded}`}></div>
    <div className={`liquidGlass-tint ${rounded}`}></div>
    <div className={`liquidGlass-shine ${rounded}`}></div>
  </>
);

export default LiquidGlass;
