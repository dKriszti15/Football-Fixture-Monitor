import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme/themeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeSwitcher from "@/components/themeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixture Monitor",
  description: "Dashboard to visualise predicted football matches' outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <div className="fixed top-4 left-4 z-50">
              <ThemeSwitcher />
            </div>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
