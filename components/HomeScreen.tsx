"use client";

import { useState, useRef, useEffect } from "react";
import { AppData } from "@/app/page";
import {
  MessageCircle,
  Phone,
  Mail,
  Music,
  Camera,
  Settings,
  Map,
  Calendar,
  Clock,
  Calculator,
  Cloud,
  Gamepad2,
  Wifi,
  Battery,
  Signal,
  Search as SearchIcon,
  Lock,
  Image,
  FileText,
  Bell,
  TrendingUp,
  Heart,
  CreditCard,
  Home,
  Book,
  Headphones,
  Tv,
  Zap,
  Languages,
  Mic,
  Folder,
  Users,
  Video,
  Presentation,
  Table,
  Activity,
  Lightbulb,
} from "lucide-react";
import Icon from "./Icon";
import LiquidGlass from "./LiquidGlass";
import Search from "./Search";
import Dock from "./Dock";

interface HomeScreenProps {
  onAppSelect: (app: AppData) => void;
  onLock: () => void;
  currentScreen: "lock" | "home" | "app";
}

export default function HomeScreen({
  onAppSelect,
  onLock,
  currentScreen,
}: HomeScreenProps) {
  const [currentTime] = useState("9:41");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore
          (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  // Define pages as an array of arrays, each sub-array is a page
  const pages: AppData[][] = [
    [
      {
        id: "messages",
        name: "Messages",
        icon: "MessageCircle",
        color: "bg-green-500",
      },
      { id: "phone", name: "Phone", icon: "Phone", color: "bg-green-400" },
      { id: "mail", name: "Mail", icon: "Mail", color: "bg-blue-500" },
      { id: "music", name: "Music", icon: "Music", color: "bg-red-500" },
      { id: "camera", name: "Camera", icon: "Camera", color: "bg-gray-600" },
    ],
    [
      {
        id: "settings",
        name: "Settings",
        icon: "Settings",
        color: "bg-gray-500",
      },
      { id: "maps", name: "Maps", icon: "Map", color: "bg-blue-400" },
      {
        id: "calendar",
        name: "Calendar",
        icon: "Calendar",
        color: "bg-red-600",
      },
      { id: "photos", name: "Photos", icon: "Image", color: "bg-purple-500" },
      { id: "weather", name: "Weather", icon: "Cloud", color: "bg-blue-300" },
    ],
    [], // Empty page in the middle
    [
      { id: "notes", name: "Notes", icon: "FileText", color: "bg-yellow-500" },
      {
        id: "reminders",
        name: "Reminders",
        icon: "Bell",
        color: "bg-orange-500",
      },
      {
        id: "stocks",
        name: "Stocks",
        icon: "TrendingUp",
        color: "bg-green-600",
      },
      { id: "health", name: "Health", icon: "Heart", color: "bg-red-400" },
    ],
    [
      {
        id: "wallet",
        name: "Wallet",
        icon: "CreditCard",
        color: "bg-blue-600",
      },
      { id: "home", name: "Home", icon: "Home", color: "bg-indigo-500" },
      { id: "books", name: "Books", icon: "Book", color: "bg-orange-400" },
      {
        id: "podcasts",
        name: "Podcasts",
        icon: "Headphones",
        color: "bg-purple-400",
      },
      { id: "tv", name: "TV", icon: "Tv", color: "bg-gray-700" },
    ],
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optimized pointer drag-to-scroll state
  const [uiDragging, setUiDragging] = useState(false); // Only for select-none/cursor and click prevention
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = 8; // px

  const [showPageDots, setShowPageDots] = useState(false);
  const hideDotsTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setShowPageDots(true);
    if (hideDotsTimeout.current) clearTimeout(hideDotsTimeout.current);
    isDragging.current = false;
    setUiDragging(false);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
  };

  const handleWindowPointerMove = (e: PointerEvent) => {
    setShowPageDots(true);
    if (!scrollRef.current) return;
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = x - startX.current;
    if (!isDragging.current && Math.abs(walk) > dragThreshold) {
      isDragging.current = true;
      setUiDragging(true);
    }
    if (isDragging.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleWindowPointerUp = () => {
    document.body.style.cursor = "";
    window.removeEventListener("pointermove", handleWindowPointerMove);
    window.removeEventListener("pointerup", handleWindowPointerUp);

    // JS-driven smooth snap to the nearest page
    if (isDragging.current && scrollRef.current) {
      // Remove snap classes
      scrollRef.current.classList.remove("snap-x", "snap-mandatory");
      // Add scroll-smooth
      scrollRef.current.classList.add("scroll-smooth");
      const pageWidth =
        scrollRef.current.firstChild instanceof HTMLElement
          ? scrollRef.current.firstChild.offsetWidth
          : scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const page = Math.round(scrollLeft / pageWidth);
      scrollRef.current.scrollTo({
        left: page * pageWidth,
        behavior: "smooth",
      });
      // After the scroll, re-add snap classes and remove scroll-smooth
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.classList.add("snap-x", "snap-mandatory");
          scrollRef.current.classList.remove("scroll-smooth");
        }
      }, 400);
    }
    // Show dots for a bit, then hide
    if (hideDotsTimeout.current) clearTimeout(hideDotsTimeout.current);
    hideDotsTimeout.current = setTimeout(() => setShowPageDots(false), 1200);
    isDragging.current = false;
    setUiDragging(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowPageDots(true);
    if (hideDotsTimeout.current) clearTimeout(hideDotsTimeout.current);
    hideDotsTimeout.current = setTimeout(() => setShowPageDots(false), 1200);

    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const pageWidth = width + 32; // Add 32px (2rem) for the gap between pages

    // Calculate the current page based on scroll position
    const page = Math.round(scrollLeft / pageWidth);

    // Ensure page is within bounds
    const boundedPage = Math.max(0, Math.min(page, pages.length - 1));

    if (currentPage !== boundedPage) {
      setCurrentPage(boundedPage);
    }
  };

  // Scroll to a specific page when a dot is clicked
  const scrollToPage = (pageIdx: number) => {
    if (!scrollRef.current) return;

    const pageWidth = scrollRef.current.offsetWidth + 32; // Add 32px for the gap
    const targetScroll = pageIdx * pageWidth;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    // Update current page immediately for better UX
    setCurrentPage(pageIdx);
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      MessageCircle,
      Phone,
      Mail,
      Music,
      Camera,
      Settings,
      Map,
      Calendar,
      Clock,
      Calculator,
      Cloud,
      Gamepad2,
      Image,
      FileText,
      Bell,
      TrendingUp,
      Heart,
      CreditCard,
      Home,
      Book,
      Headphones,
      Tv,
      Zap,
      Languages,
      Mic,
      Folder,
      Users,
      Video,
      Presentation,
      Table,
      Activity,
      Lightbulb,
    };
    return iconMap[iconName] || Settings;
  };

  // Define dock apps separately
  const dockApps: AppData[] = [
    { id: "phone", name: "Phone", icon: "Phone", color: "bg-green-400" },
    { id: "safari", name: "Safari", icon: "Compass", color: "bg-blue-400" },
    {
      id: "messages",
      name: "Messages",
      icon: "MessageCircle",
      color: "bg-green-500",
    },
    { id: "music", name: "Music", icon: "Music", color: "bg-red-500" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden pt-20">
      {/* Dynamic Background with subtle animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-16 left-8 w-24 h-24 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-6 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-12 w-20 h-20 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* App Grid with Paging */}
      <div className="flex-1 flex flex-col items-center justify-start mx-4">
        <div
          ref={scrollRef}
          className={`flex w-full h-[560px] overflow-x-auto overflow-y-hidden scrollbar-hide ${
            uiDragging ? "select-none" : ""
          } ${isTouchDevice ? "snap-x snap-mandatory" : ""}`}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            ...(isTouchDevice && {
              scrollSnapType: "x mandatory",
              WebkitScrollSnapType: "x mandatory",
            }),
          }}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
        >
          {pages.map((apps, pageIdx) => (
            <div
              key={pageIdx}
              className={`min-w-full min-w-[320px] h-full flex flex-col items-center justify-start relative px-8 ${
                isTouchDevice ? "snap-center" : ""
              }`}
              style={{
                ...(isTouchDevice && {
                  scrollSnapAlign: "center",
                }),
              }}
            >
              {/* Invisible background to capture pointer events */}
              <div className="absolute inset-0 bg-black/0 z-0" />
              <div className="grid grid-cols-4 gap-4 gap-x-12 pt-2 h-full w-full content-start relative z-10 select-none">
                {apps.slice(0, 24).map((app) => {
                  const IconComponent = getIcon(app.icon);
                  return (
                    <Icon
                      key={app.id}
                      icon={IconComponent}
                      label={app.name}
                      onClick={() => onAppSelect(app)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Merged Search Bar and Page Dots */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none">
          {showPageDots ? (
            <div className="flex justify-center items-center gap-2 bg-black/40 rounded-full px-6 py-2">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none ${
                    currentPage === idx ? "bg-white/80" : "bg-white/30"
                  }`}
                  onClick={() => scrollToPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="w-full max-w-[280px] flex justify-center pointer-events-auto">
                <Search />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dock */}
      <Dock apps={dockApps} onAppSelect={onAppSelect} getIcon={getIcon} />
    </div>
  );
}
