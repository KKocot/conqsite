"use client";

import { Button } from "@/components/ui/button";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const t = useTranslations("HomePage");
  const params = useSearchParams();

  return (
    <main className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center">
        Conqueror&lsquo;s Blade
      </h1>
      <h1>{t("title")}</h1>

      <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          {t("login_to_access_your_profile")}
        </p>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() =>
              signIn("discord", {
                callbackUrl:
                  params.get("callbackUrl") ?? window.location.origin,
              })
            }
            className="text-xl gap-2"
          >
            <SiDiscord />
            {t("login")}
          </Button>
        </div>
      </div>
    </main>
  );
}
