import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/next-auth";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "House management app",
  description: "Counquerors Blade app to house management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <ToastContainer />
            </ThemeProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
