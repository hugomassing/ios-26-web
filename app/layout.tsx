import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MouseAngleProvider } from "@/contexts/MouseAngleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liquid Glass Experiment - Hugo Massing",
  description: "An iOS-like interface built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MouseAngleProvider /* showDebug={true} */>
          {children}
        </MouseAngleProvider>
      </body>
    </html>
  );
}
