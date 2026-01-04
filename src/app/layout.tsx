import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen flex flex-col">
        <div className="scanlines pointer-events-none fixed inset-0 z-50"></div>
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
