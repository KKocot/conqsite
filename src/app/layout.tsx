import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/next-auth";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { RolesProvider } from "@/components/providers/globalData";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Counquerors Blade",
  description: "Counquerors Blade team builder",
=======
  title: "House management app",
  description: "Counquerors Blade app to house management",
>>>>>>> main
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
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
              <RolesProvider>{children}</RolesProvider>
              <ToastContainer theme="colored" autoClose={2000} />
            </ThemeProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
