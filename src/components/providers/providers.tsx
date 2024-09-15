"use client";

import type { Metadata } from "next";
import { NextAuthProvider } from "@/components/providers/next-auth";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { getMessages } from "next-intl/server";
import { RolesProvider } from "@/components/providers/globalData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "House management app",
  description: "Counquerors Blade app to house management",
};

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="theme"
        >
          <RolesProvider>{children}</RolesProvider>
        </ThemeProvider>
      </NextAuthProvider>
    </QueryClientProvider>
  );
}
