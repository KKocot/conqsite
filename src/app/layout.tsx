import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/next-auth";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <NextAuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className="h-screen">
          <Navbar />
          {children}
          <ToastContainer />
        </body>
      </html>
    </NextAuthProvider>
  );
}
