import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forge - Generate Flowcharts with AI  🔥",
  description: " Forge is a powerful AI-powered tool that helps you generate flowcharts and diagrams with ease. It uses the latest AI technology to generate high-quality diagrams in seconds. Whether you're a developer, designer, or just someone who needs to create a flowchart, Forge has you covered. Try it out today!",
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
       
            {children}
         
      </body>
    </html>
  );
}
