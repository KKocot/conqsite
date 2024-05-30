import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Kingdom of Poland",
  description: "Counquerors Blade Kingdom of Poland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className="h-screen">
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </Providers>
  );
}
