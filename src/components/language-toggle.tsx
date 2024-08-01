import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";

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
  const languages = [
    { code: "gb", name: "English" },
    { code: "pl", name: "Polski" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "tr", name: "Türkçe" },
    { code: "es", name: "Español" },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-10 w-10 rounded-full dark:bg-black items-center flex justify-center bg-white">
          <ReactCountryFlag countryCode={locale} svg title={locale} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languages.map((l) => (
            <DropdownMenuItem
              onClick={() => changeLanguage(l.code)}
              disabled={locale === l.code}
            >
              <ReactCountryFlag countryCode={l.code} svg title={l.name} />

              {l.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageToggle;
