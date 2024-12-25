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
import { signIn, useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { profileQueryOptions } from "@/queries/profile.query";
import SupportButton from "./support-button";
import MobileTrigger from "./mobile-trigger";
import NavUser from "./user-navbar";
import ResposiveSidebar from "./responsive-navbar";

const CustomSidebarProvider = ({ children }: { children: ReactNode }) => {
  const { data: commanders = [] } = useQuery(rolesQueryOptions());
  const { data } = useSession();
  const { data: profile, isLoading } = useQuery(
    profileQueryOptions(data?.user.id)
  );
  const openLinks = {
    title: "Dashboard",
    url: "/dashboard",
    icon: Frame,
    items: [
      {
        title: "List of Houses",
        url: "/dashboard/houses",
        disabled: false,
      },
      {
        title: "Units",
        url: "/dashboard/units",
        disabled: false,
      },
      {
        title: "Doctrines",
        url: "/dashboard/doctrines",
        disabled: false,
      },
      {
        title: "Privacy Policy",
        url: "/dashboard/policy",
        disabled: false,
      },
      {
        title: "Terms of Service",
        url: "/dashboard/tos",
        disabled: false,
      },
      {
        title: "Documentation",
        url: "/dashboard/docs",
        disabled: false,
      },
    ],
  };
  const membersLinks = {
    title: "Member",
    url: "/member",
    icon: SquareUserRound,
    items: [
      {
        title: "My Profile",
        url: "/member/profile",
        disabled: !profile,
      },
      {
        title: "My Stats",
        url: "/member/stats",
        disabled: !profile,
      },
      {
        title: "Update Survey",
        url: "/member/update-form",
        disabled: false,
      },
      {
        title: "Create House",
        url: "/member/create-house",
      },
    ],
  };
  const houseLinks = profile?.house.map((house) => ({
    title: house,
    url: `/house/${house}`,
    icon: Castle,
    items: [
      {
        title: "Lineups",
        url: `/lineups/${house}`,
        visibleTo: true,
      },
      {
        title: "My House",
        url: `/my-house/${house}`,
        visibleTo: true,
      },
      {
        title: "Build Team",
        url: `/team-builder/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
      },
      {
        title: "House Stats",
        url: `/stats/${house}`,
        visibleTo: commanders.some(
          (e) => e.discordId === data?.user.id && e.house === house
        ),
      },
      {
        title: "High Roles",
        url: `/settings/high-roles/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            (e.role === "HouseLeader" || e.role === "HighCommander")
        ),
      },
      {
        title: "Bot Config",
        url: `/settings/bot-config/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            (e.role === "HouseLeader" || e.role === "HighCommander")
        ),
      },
      {
        title: "House Card",
        url: `/settings/house-card/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            (e.role === "HouseLeader" || e.role === "HighCommander")
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
            isLoading={isLoading}
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
              <Button
                onClick={() =>
                  signIn("discord", { callbackUrl: window.location.origin })
                }
                className="gap-1 rounded-xl h-9"
              >
                Login
                <SiDiscord />
              </Button>
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
