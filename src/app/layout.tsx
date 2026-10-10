import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { Suspense } from "react";
import Marquee from "@/Components/Marquee";
import Footer from "@/Components/Footer";
import ToastProvider from "@/Components/ToastProvider";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "BazarDor - আজকের বাজারের দাম",
  description:
    "আজকের বাজারের দাম, পণ্যের দাম পরিবর্তন, এবং বাজারের হালচাল সম্পর্কে তথ্য।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className}    h-full antialiased scroll-smooth
      data-scroll-behavior="smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <ToastProvider />
        <Suspense fallback={<div className="h-24" />}>
          <Navbar />
          <Marquee />
          <main className="flex-1">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
