"use client";

import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import { weapons } from "@/assets/weapons";
import { useSession } from "next-auth/react";
import Loading from "react-loading";
import { ownedUnits } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/queries/profile.query";
import Image from "next/image";
import List from "@/feature/unit-builder/unit-list";
export default function Content() {
  const { data: user_data } = useSession();
  const t = useTranslations("BuildTeam");

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    ...profileQueryOptions(user_data!.user.id),
    enabled: !!user_data?.user.id,
  });

  if (profileIsLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-center py-12 text-2xl font-extrabold">
          {t("update_form_first")}
        </div>
        <Link
          href="/update-form"
          className="block w-fit text-center text-destructive p-4 hover:text-destructive-foreground"
        >
          {t("update_form")}
        </Link>
      </div>
    );
  }

  const golden = ownedUnits(goldenUnits, profileData.units.golden);
  const heroic = ownedUnits(heroicUnits, profileData.units.heroic);
  const blue = ownedUnits(blueUnits, profileData.units.low);
  const green = ownedUnits(greenUnits, profileData.units.low);
  const grey = ownedUnits(greyUnits, profileData.units.low);
  const weapons_list = weapons.map((weapon) => {
    const matchingWeapon = profileData.weapons.find(
      (w, index) => index + 1 === weapon.id
    );
    return { ...weapon, matchingWeapon };
  });
  return (
    <div>
      <div className="p-2 sm:p-8">
        <div className="flex items-center gap-10">
          <Avatar className="w-16 h-16">
            <AvatarImage
              alt="avatar"
              src={user_data?.user.image ?? "/placeholder-avatar.jpg"}
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <span>{profileData.inGameNick}</span>(
              <span className="text-red-600">{profileData.characterLevel}</span>
              )
            </h2>
            <div className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              {profileData.discordNick}
              <div className="flex items-center">
                {profileData.house.length > 0 ? (
                  <div>
                    {t("from")}
                    {profileData.house.map((e, i) => (
                      <span key={e}>
                        {i + 1 === profileData.house.length ? e : e + ","}{" "}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <ul className="flex gap-8 flex-wrap">
            {weapons_list.map((e) =>
              e.matchingWeapon?.value ? (
                <li
                  key={e.id}
                  className={clsx("flex flex-col items-center w-18", {
                    "text-green-500": e.matchingWeapon.pref === 4,
                    "text-blue-500": e.matchingWeapon.pref === 3,
                    "text-purple-500": e.matchingWeapon.pref === 2,
                    "text-yellow-500": e.matchingWeapon.pref === 1,
                  })}
                  title={t("leadership") + ": " + e.matchingWeapon.leadership}
                >
                  <Image
                    height={48}
                    width={48}
                    src={e.src}
                    alt={e.name}
                    className="rounded-full"
                  />
                  <span className="text-sm">{e.name}</span>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="py-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center px-1 text-yellow-500">
                  {t("maxed_and_preffer")}
                </TableHead>
                <TableHead className="text-center px-1 text-purple-500">
                  {t("preffer")}
                </TableHead>
                <TableHead className="text-center px-1 text-blue-500">
                  {t("maxed")}
                </TableHead>
                <TableHead className="text-center px-1 text-green-500">
                  {t("i_have")}
                </TableHead>
                <TableHead className="text-center px-1 text-red-500">
                  {t("i_dont_have")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <List units={golden} value="4" />
                <List units={golden} value="3" />
                <List units={golden} value="2" />
                <List units={golden} value="1" />
                <List units={golden} value="0" />
              </TableRow>
              <TableRow>
                <List units={heroic} value="4" />
                <List units={heroic} value="3" />
                <List units={heroic} value="2" />
                <List units={heroic} value="1" />
                <List units={heroic} value="0" />
              </TableRow>
              <TableRow>
                <List units={blue} value="4" />
                <List units={blue} value="3" />
                <List units={blue} value="2" />
                <List units={blue} value="1" />
                <List units={blue} value="0" />
              </TableRow>
              <TableRow>
                <List units={green} value="4" />
                <List units={green} value="3" />
                <List units={green} value="2" />
                <List units={green} value="1" />
                <List units={green} value="0" />
              </TableRow>
              <TableRow>
                <List units={grey} value="4" />
                <List units={grey} value="3" />
                <List units={grey} value="2" />
                <List units={grey} value="1" />
                <List units={grey} value="0" />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
