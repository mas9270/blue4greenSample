import type { Metadata } from "next";
import Header from "./header";
import ScrollToTopButton from "@/components/scrollToTop/scrollToTop";


export const metadata: Metadata = {
  title: "B4G",
  description: "blue 4 green app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      {children}
      <ScrollToTopButton />
    </div>
  );
}
