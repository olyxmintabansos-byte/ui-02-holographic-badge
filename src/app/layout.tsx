import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI-02 // Holographic 3D ID Badge",
  description: "Tactile Holographic Security Badge with 3D Tilt Physics, Gyro Simulation & Cryptographic Matrix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
