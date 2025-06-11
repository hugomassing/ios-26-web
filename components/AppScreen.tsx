"use client";

import { AppData } from "@/app/page";
import { ArrowLeft, Wifi, Battery, Signal } from "lucide-react";
import MessagesApp from "@/components/apps/MessagesApp";
import PhoneApp from "@/components/apps/PhoneApp";
import MailApp from "@/components/apps/MailApp";
import MusicApp from "@/components/apps/MusicApp";
import CameraApp from "@/components/apps/CameraApp";
import SettingsApp from "@/components/apps/SettingsApp";
import MapsApp from "@/components/apps/MapsApp";
import CalendarApp from "@/components/apps/CalendarApp";

interface AppScreenProps {
  app: AppData;
  onBack: () => void;
}

export default function AppScreen({ app, onBack }: AppScreenProps) {
  const getAppComponent = (appId: string) => {
    switch (appId) {
      case "messages":
        return <MessagesApp />;
      case "phone":
        return <PhoneApp />;
      case "mail":
        return <MailApp />;
      case "music":
        return <MusicApp />;
      case "camera":
        return <CameraApp />;
      case "settings":
        return <SettingsApp />;
      case "maps":
        return <MapsApp />;
      case "calendar":
        return <CalendarApp />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`w-24 h-24 ${app.color} rounded-3xl mx-auto mb-4 flex items-center justify-center`}
              >
                <span className="text-white text-2xl font-bold">
                  {app.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {app.name}
              </h2>
              <p className="text-gray-600">This is a demo app interface.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col pt-12">
      {/* App Content */}
      <div className="flex-1 overflow-hidden">{getAppComponent(app.id)}</div>
    </div>
  );
}
