import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="h-screen">{children}</body>
    </html>
  );
}
