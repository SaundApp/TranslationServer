import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
      </body>
    </html>
  );
}
