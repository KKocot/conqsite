import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocale, getMessages } from "next-intl/server";
import Providers from "@/components/providers/providers";
import { NextIntlClientProvider } from "next-intl";

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
  const messages = await getMessages();
  const plainMessages = JSON.parse(JSON.stringify(messages)); // Ensure it's a plain object

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={plainMessages}>
            <>
              <Navbar />
              {children}
              <ToastContainer theme="colored" autoClose={2000} />
            </>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
