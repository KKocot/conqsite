"use client";

import { Button } from "@/components/ui/button";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Login");
  const params = useSearchParams();

  return (
    <main className="grid sm:grid-cols-3 lg:grid-cols-4 w-full">
      <div className="absolute -z-10 inset-0 sm:relative lg:col-span-2 flex justify-center">
        <div className="relative h-full w-auto aspect-square">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/logov2_ver1.png`}
            alt="hero-preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid place-content-center">
        <div className="mt-56 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Use one of 2 Authorization method
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col justify-center gap-4">
              <h4 className="text-center font-semibold text-lg">
                Via Konquerus
              </h4>
              <div>
                Use command{" "}
                <span className="bg-gray-700 text-white p-1 rounded-xl">
                  /login_to_conqsite
                </span>{" "}
                on server with Konquerus or PM to him
              </div>
            </div>
            <div className="text-lg font-semibold">or</div>
            <div className="h-full flex flex-col justify-center gap-4">
              <h4 className="text-center font-semibold text-lg">
                Discord Account
              </h4>
              <div>Use classic discord Authorization</div>
              <div className="flex-grow" />
              <Button
                onClick={() =>
                  signIn("discord", {
                    callbackUrl:
                      params.get("callbackUrl") ?? window.location.origin,
                  })
                }
                className="text-xl gap-2 rounded-xl w-36"
              >
                <SiDiscord />
                {t("login")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// TODO: add translations
