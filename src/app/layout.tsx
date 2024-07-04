import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ToastObserver from "@/components/ToastObserver";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Translations Manager",
  description: "Manage Saund translations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          GeistSans.className + " dark flex flex-col min-h-screen w-full"
        }
      >
        {children}
        <Toaster />
        <Suspense>
          <ToastObserver />
        </Suspense>
      </body>
    </html>
  );
}
