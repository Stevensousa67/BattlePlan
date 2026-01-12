import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BattlePlan",
  description: "A war coordination and accountability platform for clan leaders, built on the official Clash of Clans API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-linear-to-b from-white via-white via-60% to-gray-300 dark:bg-linear-to-b dark:from-black dark:via-black dark:via-60% dark:to-gray-800`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="grow flex flex-col max-w-5xl w-full" style={{ position: 'relative', left: '50vw', transform: 'translateX(-50%)' }}>
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}