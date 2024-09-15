"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRolesContext } from "@/components/providers/globalData";

export default function Home() {
  const t = useTranslations("HomePage");
  const { data } = useSession();
  const commanders = useRolesContext();

  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-6 sm:h-full my-12">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center">
        Conqueror&lsquo;s Blade
      </h1>
      <h1>{t("title")}</h1>
      {data ? (
        <>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h1 className="pb-4 text-lg text-center">{t("member_menu")}</h1>
            <div className="flex gap-4 justify-center">
              <Link href="/profile">
                <Button>{t("my_profile")}</Button>
              </Link>
              <Link href="/update-form">
                <Button>{t("update_form")}</Button>
              </Link>
              <Link href="/house">
                <Button>{t("house")}</Button>
              </Link>
              <Link href="/houses">
                <Button>{t("all_houses")}</Button>
              </Link>
            </div>
          </div>

          {commanders.some((e) => e.discordId === data.user.id) ? (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h1 className="pb-4 text-lg text-center">
                {t("high_command_menu")}
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/team-builder">
                  <Button>{t("build_team")}</Button>
                </Link>
                <Link href="/my-house">
                  <Button>{t("my_house")}</Button>
                </Link>
              </div>
            </div>
          ) : null}
          {commanders
            .filter((e) => e.role === "HouseLeader" || e.role === "RightHand")
            .some((e) => e.discordId === data.user.id) ? (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h1 className="pb-4 text-lg text-center">
                {t("house_leader_menu")}
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/settings">
                  <Button>{t("settings")}</Button>
                </Link>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400">
            {t("login_to_access_your_profile")}
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() =>
                signIn("discord", { callbackURL: process.env.NEXTAUTH_URL })
              }
            >
              {t("login")}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
