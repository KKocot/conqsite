import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Retrieve the locale from cookies
  const cookieStore = cookies();
  const locale = cookieStore.get("locale")?.value || "gb";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
