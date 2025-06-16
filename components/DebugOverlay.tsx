"use client";

import React from "react";

interface DebugOverlayProps {
  beta: number | null;
  gamma: number | null;
  angle: number;
  hasPermission: boolean;
  onRequestPermission: () => void;
}

const DebugOverlay: React.FC<DebugOverlayProps> = ({
  beta,
  gamma,
  angle,
  hasPermission,
  onRequestPermission,
}) => {
  return (
    <div className="fixed left-4 top-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white/90 font-mono text-sm">
      {!hasPermission && (
        <div className="mb-4">
          <button
            onClick={onRequestPermission}
            className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
          >
            Enable Device Motion
          </button>
        </div>
      )}
      <div className="space-y-2">
        <div>
          <span className="text-white/50">Beta (front/back):</span>
          <span className="ml-2">{beta?.toFixed(2) ?? "N/A"}°</span>
        </div>
        <div>
          <span className="text-white/50">Gamma (left/right):</span>
          <span className="ml-2">{gamma?.toFixed(2) ?? "N/A"}°</span>
        </div>
        <div className="pt-2 border-t border-white/20">
          <span className="text-white/50">Calculated Angle:</span>
          <span className="ml-2">{angle.toFixed(2)}°</span>
        </div>
      </div>
    </div>
  );
};

export default DebugOverlay;
