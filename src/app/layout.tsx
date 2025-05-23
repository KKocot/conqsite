import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocale, getMessages } from "next-intl/server";

import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getQueryClient } from "@/lib/react-query";
import AppSidebar from "@/feature/navbar/sidebar";

export const metadata: Metadata = {
  title: "House management app",
  description: "Counquerors Blade app to house management",
  keywords: ["Conqueror Blade", "CB", "House", "Management"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(rolesQueryOptions());
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/card-logo.webp" sizes="any" />
      </head>
      <body className="grid grid-rows-[max-content_1fr_max-content] min-h-screen w-full">
        <NextIntlClientProvider messages={messages}>
          <Providers session={session}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <AppSidebar>{children}</AppSidebar>
              <ToastContainer theme="colored" autoClose={2000} />
            </HydrationBoundary>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
