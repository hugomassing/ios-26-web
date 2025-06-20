"use client";

import { AppData } from "@/app/page";
import { motion } from "framer-motion";
import NoteApp from "./NoteApp";

interface AppScreenProps {
  app: AppData;
  onBack: () => void;
}

export default function AppScreen({ app, onBack }: AppScreenProps) {
  return (
    <motion.div
      key={app.id}
      initial={{ opacity: 0, scale: 1.1, y: "100%" }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
      }}
      exit={{
        opacity: 0,
        scale: 1.1,
        y: "100%",
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.1 },
      }}
      className="absolute inset-0 bg-white dark:bg-black z-10"
      style={{ borderRadius: "3.5rem" }}
    >
      <NoteApp onBack={onBack} />
    </motion.div>
  );
}
