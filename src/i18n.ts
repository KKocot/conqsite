import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./lib/locale";

export const locales = ["gb", "pl", "fr", "de", "tr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "gb";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Europe/Warsaw",
  };
});
