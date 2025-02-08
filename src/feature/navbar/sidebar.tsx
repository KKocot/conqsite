"use client";

import { ReactNode } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import { SquareUserRound, Frame, Castle } from "lucide-react";
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

const CustomSidebarProvider = ({ children }: { children: ReactNode }) => {
  const { data: commanders = [] } = useQuery(rolesQueryOptions());
  const { data } = useSession();
  const t = useTranslations("Navigation");
  const { data: profile, isLoading } = useQuery(
    profileQueryOptions(data?.user.id)
  );
  const openLinks = {
    title: t("dashboard.dashboard"),
    url: "/dashboard",
    icon: Frame,
    items: [
      {
        title: t("dashboard.list_of_house"),
        url: "/dashboard/houses",
        disabled: false,
      },
      {
        title: t("dashboard.units"),
        url: "/dashboard/units",
        disabled: false,
      },
      {
        title: t("dashboard.doctrines"),
        url: "/dashboard/doctrines",
        disabled: false,
      },
      {
        title: "Map (Soon)",
        url: "/dashboard/maps",
        disabled: false,
        // TODO translate
      },
      {
        title: "Wiki requests",
        url: `/dashboard/wiki-requests`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.role === "Reviewer"
        ),
      },
      {
        title: t("dashboard.privacy_policy"),
        url: "/dashboard/policy",
        disabled: false,
      },
      {
        title: t("dashboard.terms_of_service"),
        url: "/dashboard/tos",
        disabled: false,
      },
      {
        title: t("dashboard.documentation"),
        url: "/dashboard/docs",
        disabled: false,
      },
    ],
  };
  const membersLinks = {
    title: t("member.member"),
    url: "/member",
    icon: SquareUserRound,
    items: [
      {
        title: t("member.my_profile"),
        url: "/member/profile",
        disabled: !profile,
      },
      {
        title: t("member.my_stats"),
        url: "/member/stats",
        disabled: !profile,
      },
      {
        title: t("member.update_form"),
        url: "/member/update-form",
        disabled: false,
      },
      {
        title: "My Archive",
        url: "/member/my-history",
        disabled: !profile,
      },
    ],
  };
  const houseLinks = profile?.house.map((house) => ({
    title: house,
    url: `/house/${house}`,
    icon: Castle,
    items: [
      {
        title: t("house.lineups"),
        url: `/lineups/${house}`,
        visibleTo: true,
      },
      {
        title: "Archive",
        url: `/history/${house}`,
        visibleTo: true,
        // TODO translate
      },
      {
        title: t("house.my_house"),
        url: `/my-house/${house}`,
        visibleTo: true,
      },
      {
        title: t("house.build_team"),
        url: `/team-builder/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
      },
      {
        title: t("house.house_stats"),
        url: `/stats/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
      },
      {
        title: t("house.bot_controller"),
        url: `/bot-controller/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
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
