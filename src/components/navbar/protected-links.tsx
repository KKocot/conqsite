"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { useTranslations } from "next-intl";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Castle, Crown, SquareUserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "../../queries/roles.query";

export const ProtectedLinks = () => {
  const t = useTranslations("HomePage");
  const { data: commanders = [] } = useQuery(rolesQueryOptions());

  const { data } = useSession();

  const isCommander =
    data && commanders.some((e) => e.discordId === data.user.id);
  const isHouseLeader =
    data &&
    commanders
      .filter((e) => e.role === "HouseLeader" || e.role === "RightHand")
      .some((e) => e.discordId === data.user.id);

  if (!data) return null;
  return (
    <>
      <NavigationMenu delayDuration={0}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn({
                "rounded-r-none": isCommander,
              })}
            >
              <SquareUserRound />
              {t("member_menu")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-max">
                <Link href="/profile" legacyBehavior passHref>
                  <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                    {t("my_profile")}
                  </NavigationMenuLink>
                </Link>
                <Link href="/update-form" legacyBehavior passHref>
                  <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                    {t("update_form")}
                  </NavigationMenuLink>
                </Link>
                <Link href="/house" legacyBehavior passHref>
                  <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                    {t("house")}
                  </NavigationMenuLink>
                </Link>
                <Link href="/houses" legacyBehavior passHref>
                  <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                    {t("all_houses")}
                  </NavigationMenuLink>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {isCommander ? (
        <NavigationMenu delayDuration={0}>
          <NavigationMenuList>
            <NavigationMenuItem className="w-max">
              <NavigationMenuTrigger
                className={cn({
                  "rounded-l-none": isCommander,
                  "rounded-r-none": isHouseLeader,
                })}
              >
                <Crown />
                {t("high_command_menu")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-max">
                  <Link href="/team-builder" legacyBehavior passHref>
                    <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                      {t("build_team")}
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/my-house" legacyBehavior passHref>
                    <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                      {t("my_house")}
                    </NavigationMenuLink>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
      {isHouseLeader ? (
        <NavigationMenu delayDuration={0}>
          <NavigationMenuList>
            <NavigationMenuItem className="w-max">
              <NavigationMenuTrigger className={"rounded-l-none"}>
                <Castle />
                {t("house_leader_menu")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-max">
                  <Link href="/settings" legacyBehavior passHref>
                    <NavigationMenuLink className="w-full px-4 py-2 hover:bg-accent">
                      {t("settings")}
                    </NavigationMenuLink>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
    </>
  );
};
