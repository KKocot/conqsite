import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    const currentLocale = storedLocale || searchParams.get("locale") || "en";
    setLocale(currentLocale);
    if (!storedLocale) {
      localStorage.setItem("locale", currentLocale);
    }
  }, [searchParams]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    document.cookie = `locale=${newLocale}; path=/`; // Set the locale in cookies
    const params = new URLSearchParams(searchParams);
    params.set("locale", newLocale);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  return (
    <div>
      <Button onClick={() => changeLanguage("en")} disabled={locale === "en"}>
        English
      </Button>
      <Button onClick={() => changeLanguage("pl")} disabled={locale === "pl"}>
        Polish
      </Button>
      <Button onClick={() => changeLanguage("fr")} disabled={locale === "fr"}>
        French
      </Button>
    </div>
  );
};

export default LanguageToggle;
