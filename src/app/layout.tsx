import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const arcadeFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Algorithm Simulator",
  description: "Retro Arcade Algorithm Visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arcadeFont.variable} antialiased min-h-screen flex flex-col font-mono`}>
        <div className="scanlines pointer-events-none fixed inset-0 z-50"></div>
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
