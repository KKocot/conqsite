"use client";

import { ReactNode } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import {
  SquareUserRound,
  Frame,
  Castle,
  Notebook,
  Info,
  BookTypeIcon,
} from "lucide-react";
import LanguageToggle from "./language-toggle";
import { ModeToggle } from "./theme-menu";
import { useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import { profileQueryOptions } from "@/queries/profile.query";
import SupportButton from "./support-button";
import MobileTrigger from "./mobile-trigger";
import NavUser from "./user-navbar";
import ResposiveSidebar from "./responsive-navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import HoverClickTooltip from "@/components/hover-click-tooltip";
import Image from "next/image";

const CustomSidebarProvider = ({ children }: { children: ReactNode }) => {
  const { data: commanders = [] } = useQuery(rolesQueryOptions());
  const { data } = useSession();
  const t = useTranslations("Navigation");
  const { data: profile, isLoading } = useQuery(
    profileQueryOptions(data?.user.id)
  );
  const list_of_house = profile?.house
    .filter((house) => house !== "none")
    .filter((house, index, self) => self.indexOf(house) === index);
  const openLinks = {
    title: t("dashboard.dashboard"),
    url: "/dashboard",
    icon: "/icons/book.svg",
    items: [
      {
        title: t("dashboard.list_of_house"),
        url: "/dashboard/houses",
        disabled: false,
        iconPath: "/icons/houses.svg",
      },
      {
        title: t("dashboard.units"),
        url: "/dashboard/units",
        disabled: false,
        iconPath: "/icons/units.svg",
      },
      {
        title: t("dashboard.doctrines"),
        url: "/dashboard/doctrines",
        disabled: false,
        iconPath: "/icons/doctrines.svg",
      },
      // {
      //   title: "Map (Soon)",
      //   url: "/dashboard/maps",
      //   disabled: false,
      //   // TODO translate
      //   iconPath: "/icons/doctrines.svg",
      // },
      {
        title: "Wiki requests",
        url: `/dashboard/wiki-requests`,
        visibleTo: data?.user.id ? true : false,
        iconPath: "/icons/wiki.svg",
      },
    ],
  };
  const membersLinks = {
    title: t("member.member"),
    url: "/member",
    icon: "/icons/profile.svg",
    items: [
      {
        title: t("member.my_profile"),
        url: "/member/profile",
        disabled: !profile,
        iconPath: "/icons/myprofile.svg",
      },
      {
        title: t("member.my_stats"),
        url: "/member/stats",
        disabled: !profile,
        iconPath: "/icons/stats.svg",
      },
      {
        title: t("member.update_form"),
        url: "/member/update-form",
        disabled: false,
        iconPath: "/icons/update.svg",
      },
      {
        title: "My Archive",
        url: "/member/my-history",
        disabled: !profile,
        iconPath: "/icons/archive.svg",
      },
    ],
  };
  const houseLinks = list_of_house?.map((house) => ({
    title: house,
    url: `/house/${house}`,
    icon: "",
    items: [
      {
        title: t("house.lineups"),
        url: `/lineups/${house}`,
        visibleTo: true,
        iconPath: "/icons/lineups.svg",
      },
      {
        title: "Archive",
        url: `/history/${house}`,
        visibleTo: true,
        // TODO translate
        iconPath: "/icons/archive.svg",
      },
      {
        title: t("house.my_house"),
        url: `/my-house/${house}`,
        visibleTo: true,
        iconPath: "/icons/myhouse.svg",
      },
      {
        title: t("house.build_team"),
        url: `/team-builder/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
        iconPath: "/icons/builder.svg",
      },
      {
        title: t("house.house_stats"),
        url: `/stats/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
        iconPath: "/icons/stats.svg",
      },
      {
        title: t("house.bot_controller"),
        url: `/bot-controller/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
        iconPath: "/icons/bot.svg",
      },
      {
        title: "House Settings",
        url: `/settings/bot-config/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            (e.role === "HouseLeader" || e.role === "RightHand")
        ),
        iconPath: "/icons/settings.svg",
      },
    ],
  }));

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <ResposiveSidebar
            openLinks={openLinks}
            membersLinks={membersLinks}
            houseLinks={houseLinks ?? []}
            dataExists={!!data}
            isLoading={!!data ? isLoading : false}
          />
        </SidebarContent>
        <SidebarFooter>
          <SupportButton />
          <div className="flex items-center justify-between px-4 py-1">
            <HoverClickTooltip
              buttonStyle="rounded-md"
              triggerChildren={
                <Link
                  href="/policy"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/policy.svg"
                    alt="policy"
                    width={30}
                    height={30}
                    className="bg-accent rounded-xl"
                  />
                </Link>
              }
            >
              <p className="text-sm w-40">{t("dashboard.privacy_policy")}</p>
            </HoverClickTooltip>
            <HoverClickTooltip
              buttonStyle="rounded-md"
              triggerChildren={
                <Link
                  href="/tos"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/tos.svg"
                    alt="tos"
                    width={30}
                    height={30}
                    className="bg-accent rounded-xl"
                  />
                </Link>
              }
            >
              <p className="text-sm w-40">{t("dashboard.terms_of_service")}</p>
            </HoverClickTooltip>
            <HoverClickTooltip
              buttonStyle="rounded-full"
              triggerChildren={
                <Link
                  href="/docs"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/icons/docs.svg"
                    alt="docs"
                    width={30}
                    height={30}
                    className="bg-accent rounded-full"
                  />
                </Link>
              }
            >
              <p className="text-sm w-40">{t("dashboard.documentation")}</p>
            </HoverClickTooltip>
          </div>
          {data ? (
            <NavUser name={data.user.name} avatar={data.user.image} />
          ) : (
            <div className="flex items-center justify-around">
              <LanguageToggle />
              <ModeToggle />
              <Link href="/login">
                <Button className="rounded-xl" variant="custom">
                  {t("auth.login")}
                </Button>
              </Link>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <MobileTrigger />
      {children}
    </SidebarProvider>
  );
};
export default CustomSidebarProvider;
