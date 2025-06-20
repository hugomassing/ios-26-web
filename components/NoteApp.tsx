import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface NoteAppProps {
  onBack: () => void;
}

const NoteApp = ({ onBack }: NoteAppProps) => {
  const handleContactMe = () => {
    window.open("mailto:hugo@example.com", "_blank");
  };

  const wavyBackground =
    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3e%3cpath fill='%23000' fill-opacity='0.05' d='M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,202.7C672,192,768,128,864,117.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3e%3c/path%3e%3c/svg%3e\")";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-zinc-950 text-zinc-50 font-sans overflow-y-auto"
      style={{
        backgroundImage: wavyBackground,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <div className="pt-12">
        {/* Header */}
        <header className="relative z-10 px-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="p-2 text-zinc-300 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
        </header>

        {/* Note Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-6 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg max-w-xl mx-auto"
          >
            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-white mb-4">
                Hugo Massing
              </h1>
              <p className="text-zinc-300 leading-relaxed">
                Front-end developer from Tours, France. 8+ years specializing in
                React.js & Next.js. Currently working on my first SAAS, also
                available as a freelance developer.
                <br />
                <br />
                Passionate about electronic music, always exploring new
                technologies, and love bikepacking adventures across Europe.
                <br />
                <br />
                <a
                  href="https://github.com/hugomassing"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  github.com/hugomassing
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/hugomassing/"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  linkedin.com/in/hugomassing
                </a>
              </p>
              <div className="mt-6">
                <button
                  onClick={handleContactMe}
                  className="w-full px-4 py-3 text-md font-bold text-zinc-900 bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  Contact me
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteApp;
