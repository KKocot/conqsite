"use client";

import { ReactNode } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  ChevronsUpDown,
  LogOut,
  LucideIcon,
  Minus,
  MoreHorizontal,
  Plus,
  SquareUserRound,
  Frame,
  Castle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import LanguageToggle from "./language-toggle";
import { ModeToggle } from "./theme-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import clsx from "clsx";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import Image from "next/image";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { profileQueryOptions } from "@/queries/profile.query";

interface LinkItem {
  title: string;
  url: string;
  disabled?: boolean;
  visibleTo?: boolean;
}

interface SidebarLink {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: LinkItem[];
}

const CustomSidebarProvider = ({ children }: { children: ReactNode }) => {
  const { data: commanders = [] } = useQuery(rolesQueryOptions());
  const { data } = useSession();
  const { data: profile } = useQuery(profileQueryOptions(data?.user.id));
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
            e.role === "HouseLeader"
        ),
      },
      {
        title: "Bot Config",
        url: `/settings/bot-config/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            e.role === "HouseLeader"
        ),
      },
      {
        title: "House Card",
        url: `/settings/house-card/${house}`,
        visibleTo: commanders.some(
          (e) =>
            e.discordId === data?.user.id &&
            e.house === house &&
            e.role === "HouseLeader"
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
          />
        </SidebarContent>
        <SidebarFooter>
          <CaffeeButton />
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

const MobileTrigger = () => {
  const { isMobile } = useSidebar();
  return (
    <div className="fixed top-0 left-0 z-20">
      <SidebarTrigger
        className={clsx({
          hidden: !isMobile,
        })}
      />
    </div>
  );
};

function NavUser({
  name,
  avatar,
}: {
  name?: string | null;
  avatar?: string | null;
}) {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={avatar ?? "/logo.png"}
                  alt={name ?? "avatar"}
                />
                <AvatarFallback className="rounded-lg">
                  <Image height={32} width={32} src="/logo" alt="Logo" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs"></span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={avatar ?? "/logo.png"}
                    alt={name ?? "avatar"}
                  />
                  <AvatarFallback className="rounded-lg">
                    <Image height={32} width={32} src="/logo" alt="Logo" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs"></span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex items-center justify-between p-1">
              <LanguageToggle />
              <ModeToggle />
              <Button
                variant="destructive"
                className="flex gap-1"
                onClick={() => signOut()}
              >
                <LogOut /> Logout
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
const CaffeeButton = () => {
  const { open } = useSidebar();
  return (
    <a
      href="https://ko-fi.com/K3K713SMAY"
      target="_blank"
      className={clsx("self-center", {
        hidden: !open,
      })}
    >
      <img
        className="h-8"
        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
  );
};

const ResposiveSidebar = ({
  openLinks,
  membersLinks,
  houseLinks,
  dataExists,
}: {
  openLinks: SidebarLink;
  membersLinks: SidebarLink;
  houseLinks: SidebarLink[];
  dataExists: boolean;
}) => {
  const { open } = useSidebar();
  return !open ? (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <div
            className={clsx("flex items-center justify-center", {
              "justify-between": open,
            })}
          >
            <Link
              href="/"
              className={clsx("font-extrabold text-2xl text-accent", {
                hidden: !open,
              })}
            >
              ConqSite
            </Link>
            <SidebarTrigger />
          </div>
          <DropdownMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <openLinks.icon /> {openLinks.title}{" "}
                  <MoreHorizontal className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {openLinks.items?.length ? (
                <DropdownMenuContent className="min-w-56 rounded-lg">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <openLinks.icon />
                      <span className="truncate font-semibold">
                        {openLinks.title}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  {openLinks.items.map((item) => (
                    <DropdownMenuItem asChild key={item.title}>
                      <a href={item.url}>{item.title}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
          {dataExists ? (
            <DropdownMenu>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <membersLinks.icon /> {membersLinks.title}{" "}
                    <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {membersLinks.items?.length ? (
                  <DropdownMenuContent className="min-w-56 rounded-lg">
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <membersLinks.icon />
                        <span className="truncate font-semibold">
                          {membersLinks.title}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    {membersLinks.items.map((item) => (
                      <DropdownMenuItem asChild key={item.title}>
                        <a href={item.url}>{item.title}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                ) : null}
              </SidebarMenuItem>
            </DropdownMenu>
          ) : null}
          {houseLinks?.map((e) => (
            <DropdownMenu key={e.title}>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <e.icon /> {e.title} <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {e.items?.length ? (
                  <DropdownMenuContent className="min-w-56 rounded-lg">
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <e.icon />
                        <span className="truncate font-semibold">
                          {e.title}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    {e.items.map((item) =>
                      item.visibleTo === false ? null : (
                        <DropdownMenuItem asChild key={item.title}>
                          <a href={item.url}>{item.title}</a>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                ) : null}
              </SidebarMenuItem>
            </DropdownMenu>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ) : (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <div
            className={clsx("flex items-center justify-center", {
              "justify-between": open,
            })}
          >
            <Link
              href="/"
              className={clsx("font-extrabold text-2xl text-accent", {
                hidden: !open,
              })}
            >
              ConqSite
            </Link>
            <SidebarTrigger />
          </div>{" "}
          <SidebarMenu>
            <Collapsible key={openLinks.title} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <openLinks.icon /> {openLinks.title}{" "}
                    <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                    <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {openLinks.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {openLinks.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
          {dataExists ? (
            <SidebarMenu>
              <Collapsible
                key={membersLinks.title}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <membersLinks.icon /> {membersLinks.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {membersLinks.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {membersLinks.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ) : null}
          {houseLinks?.map((e, i) => (
            <SidebarMenu key={e.title}>
              <Collapsible key={e.title} className="group/collapsible">
                <SidebarMenuItem>
                  {e.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <e.icon /> {e.title}{" "}
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {e.items?.map((subItem) =>
                            subItem.visibleTo === false ? null : (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
