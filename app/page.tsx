"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Lock } from "lucide-react";
import LockScreen from "@/components/LockScreen";
import HomeScreen from "@/components/HomeScreen";
import AppScreen from "@/components/AppScreen";
import StatusBar from "@/components/StatusBar";
import HomeIndicator from "@/components/HomeIndicator";
import Image from "next/image";
import LiquidGlass from "@/components/LiquidGlass";

export type Screen = "lock" | "home" | "app";

export interface AppData {
  id: string;
  name: string;
  icon: string;
  color: string;
  component?: React.ComponentType;
}

export default function IPhone() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("lock");
  const [currentApp, setCurrentApp] = useState<AppData | null>(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Fit phone to screen on mount and resize
  useEffect(() => {
    function fitToScreen() {
      const phoneWidth = 375;
      const phoneHeight = 813;
      const padding = 48; // total vertical/horizontal padding (p-4 = 16px, mb-4 = 16px)
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding - 48; // extra for zoom controls
      const scaleW = availableWidth / phoneWidth;
      const scaleH = availableHeight / phoneHeight;
      const newScale = Math.min(scaleW, scaleH, 1.1); // don't scale above 1.1
      setScale(newScale);
    }
    fitToScreen();
    window.addEventListener("resize", fitToScreen);
    // Loading screen timeout
    const timer = setTimeout(() => setLoading(false), 500);
    // Fade-in after loading
    let fadeTimer: NodeJS.Timeout;
    fadeTimer = setTimeout(() => setShowContent(true), 550);
    return () => {
      window.removeEventListener("resize", fitToScreen);
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const navigateToScreen = (screen: Screen, app?: AppData) => {
    setCurrentScreen(screen);
    if (app) {
      setCurrentApp(app);
    } else {
      setCurrentApp(null);
    }
  };

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.1, 2));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.1, 0.5));

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-blue-400 animate-spin"></div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Zoom Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-black shadow border border-white/30"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-black shadow border border-white/30"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div
          className={`relative mx-auto transition-opacity duration-700 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: 375,
            height: 813,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
          }}
        >
          {/* iPhone Frame */}
          <div className="relative w-full h-full bg-black rounded-[4rem] shadow-2xl">
            {/* Power Button */}
            <div
              className="absolute -right-2 top-[100px] w-2 h-24 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-r-md shadow-lg border border-gray-600/50 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:border-gray-500/50 group z-50 cursor-pointer"
              onClick={() => navigateToScreen("lock")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent rounded-r-md"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:8px_8px] rounded-r-md group-hover:bg-[length:6px_6px]"></div>

              {/* Floating Lock Icon */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-4 pointer-events-none z-[60]">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute -left-2 top-1/2 w-4 h-[1px] bg-white/50"></div>
                  <div className="relative w-10 h-10 rounded-full">
                    <LiquidGlass rounded="rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full bg-black rounded-[3.5rem] overflow-hidden relative">
              <StatusBar />
              {/* Phone Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
                <Image
                  src="/background-light.webp"
                  alt="Phone Background"
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                  fill
                  style={{ borderRadius: "3.5rem" }}
                />
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-20 shadow-lg border border-black/70" />

              {/* HomeScreen always rendered */}
              <div className="absolute inset-0 z-10">
                <HomeScreen
                  onAppSelect={(app) => navigateToScreen("app", app)}
                  onLock={() => navigateToScreen("lock")}
                  currentScreen={currentScreen}
                />
              </div>
              {/* LockScreen overlays HomeScreen when currentScreen is 'lock' */}
              {currentScreen === "lock" && (
                <div className="absolute inset-0 z-20">
                  <LockScreen onUnlock={() => navigateToScreen("home")} />
                </div>
              )}
              {/* AppScreen overlays everything when in app mode */}
              {currentScreen === "app" && currentApp && (
                <div className="absolute inset-0 z-10">
                  <AppScreen
                    app={currentApp}
                    onBack={() => navigateToScreen("home")}
                  />
                </div>
              )}

              {/* Home Indicator */}
              <HomeIndicator
                onPress={() => navigateToScreen("home")}
                visible={currentScreen !== "lock"}
                variant={currentScreen === "app" ? "dark" : "light"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
