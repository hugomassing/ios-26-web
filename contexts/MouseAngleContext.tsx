"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import DebugOverlay from "@/components/DebugOverlay";

// Add type definition for DeviceOrientationEvent with requestPermission
interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission(): Promise<PermissionState>;
}

interface MouseAngleContextType {
  angle: number;
  isHovered: boolean;
  hasPermission: boolean;
  requestPermission: () => Promise<void>;
}

const MouseAngleContext = createContext<MouseAngleContextType>({
  angle: 0,
  isHovered: false,
  hasPermission: false,
  requestPermission: async () => {},
});

export const useMouseAngle = () => useContext(MouseAngleContext);

interface MouseAngleProviderProps {
  children: React.ReactNode;
  showDebug?: boolean;
}

export const MouseAngleProvider: React.FC<MouseAngleProviderProps> = ({
  children,
  showDebug = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [beta, setBeta] = useState<number | null>(null);
  const [gamma, setGamma] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isIOS = isClient && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Check if we're on a mobile device
  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };
    checkMobile();
  }, [isClient]);

  const requestPermission = async () => {
    if (!isClient) return;

    if (
      isIOS &&
      typeof DeviceOrientationEvent !== "undefined" &&
      "requestPermission" in DeviceOrientationEvent
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission
        ).requestPermission();
        setHasPermission(permission === "granted");
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
      }
    } else {
      // For Android and other devices, we don't need explicit permission
      setHasPermission(true);
    }
  };

  // Handle device orientation for mobile
  useEffect(() => {
    if (!isClient || !isMobile) return;

    // Set initial permission state
    if (!isIOS) {
      setHasPermission(true);
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null) setBeta(event.beta);
      if (event.gamma !== null) setGamma(event.gamma);
    };

    if (typeof DeviceOrientationEvent !== "undefined" && hasPermission) {
      window.addEventListener("deviceorientation", handleOrientation, {
        capture: true,
      });
    }

    return () => {
      if (typeof DeviceOrientationEvent !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [hasPermission, isIOS, isMobile, isClient]);

  // Handle mouse movement for desktop
  useEffect(() => {
    if (!isClient || isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerEnter = () => setIsHovered(true);
    const handlePointerLeave = () => setIsHovered(false);

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerenter", handlePointerEnter);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isMobile, isClient]);

  const normalizeAngle = (angle: number): number => {
    // Normalize angle to [0, 360) range
    return ((angle % 360) + 360) % 360;
  };

  const calculateAngle = () => {
    if (!isClient) return 0;

    if (isMobile) {
      // Use device orientation for mobile
      if (beta !== null && gamma !== null) {
        // Normalize beta and gamma to [-1, 1] range
        // Beta: [-180, 180] -> [-1, 1]
        // Gamma: [-90, 90] -> [-1, 1]
        const normalizedBeta = beta / 180;
        const normalizedGamma = gamma / 90;

        // Use the same approach as mouse position
        // Treat normalized gamma as x-coordinate and normalized beta as y-coordinate
        const radians = Math.atan2(normalizedGamma, -normalizedBeta);
        return normalizeAngle((radians * 180) / Math.PI + 180 + 360);
      }
      return 0;
    } else {
      // Use mouse position for desktop
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radians = Math.atan2(position.x - centerX, -(position.y - centerY));
      return normalizeAngle((radians * 180) / Math.PI + 180 + 360);
    }
  };

  const angle = calculateAngle();

  return (
    <MouseAngleContext.Provider
      value={{ angle, isHovered, hasPermission, requestPermission }}
    >
      {children}
      {isClient && showDebug && (
        <DebugOverlay
          beta={beta}
          gamma={gamma}
          angle={angle}
          hasPermission={hasPermission}
          onRequestPermission={requestPermission}
        />
      )}
    </MouseAngleContext.Provider>
  );
};
