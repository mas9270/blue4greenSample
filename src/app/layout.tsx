import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/providers/providers";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B4G",
  description: "blue 4 green app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
