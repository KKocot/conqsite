"use client";

import {
  SidebarGroup,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Minus, MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import clsx from "clsx";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import HouseLinks from "./house-links";
import HouseLinkMobile from "./house-link-moblie";
import Image from "next/image";
interface LinkItem {
  title: string;
  url: string;
  disabled?: boolean;
  visibleTo?: boolean;
  iconPath: string;
}

export interface SidebarLink {
  title: string;
  url: string;
  icon: string;
  items?: LinkItem[];
}

const ResposiveSidebar = ({
  openLinks,
  membersLinks,
  houseLinks,
  dataExists,
  isLoading,
}: {
  openLinks: SidebarLink;
  membersLinks: SidebarLink;
  houseLinks: SidebarLink[];
  dataExists: boolean;
  isLoading: boolean;
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
              href="/home"
              className={clsx("font-extrabold text-2xl text-accent", {
                hidden: !open,
              })}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/website-logo.png`}
                alt="logo"
                width={160}
                height={80}
                className="rounded-xl bg-accent"
              />
            </Link>
            <div className="flex items-center h-full">
              <SidebarTrigger />
            </div>
          </div>
          <DropdownMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="p-0">
                <Link href="/home">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/icons/home.png`}
                    alt="home"
                    width={40}
                    height={40}
                    className="rounded-xl bg-accent p-[1px]"
                  />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Image
                    src={openLinks.icon}
                    alt="open links"
                    width={30}
                    height={30}
                    className="rounded-xl bg-accent p-[1px]"
                  />{" "}
                  {openLinks.title} <MoreHorizontal className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {openLinks.items?.length ? (
                <DropdownMenuContent className="min-w-56 rounded-lg">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Image
                        src={openLinks.icon}
                        alt="open links"
                        width={30}
                        height={30}
                        className="rounded-xl bg-accent p-[2px]"
                      />
                      <span className="truncate font-semibold">
                        {openLinks.title}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  {openLinks.items.map((item) => (
                    <DropdownMenuItem asChild key={item.title}>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 px-1 py-1.5 text-left text-sm ml-3"
                      >
                        <Image
                          src={item.iconPath}
                          alt="link"
                          width={25}
                          height={25}
                          className="rounded-xl bg-accent p-[1px]"
                        />
                        {item.title}
                      </Link>
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
                    <Image
                      src={membersLinks.icon}
                      alt="members links"
                      width={30}
                      height={30}
                      className="rounded-xl bg-accent p-[1px]"
                    />{" "}
                    {membersLinks.title} <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {membersLinks.items?.length ? (
                  <DropdownMenuContent className="min-w-56 rounded-lg">
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Image
                          src={membersLinks.icon}
                          alt="members links"
                          width={30}
                          height={30}
                          className="rounded-xl bg-accent"
                        />
                        <span className="truncate font-semibold">
                          {membersLinks.title}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    {membersLinks.items.map((item) => (
                      <DropdownMenuItem asChild key={item.title}>
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 px-1 py-1.5 text-left text-sm ml-3"
                        >
                          <Image
                            src={item.iconPath}
                            alt="link"
                            width={25}
                            height={25}
                            className="rounded-xl bg-accent p-[1px]"
                          />
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                ) : null}
              </SidebarMenuItem>
            </DropdownMenu>
          ) : null}
          {houseLinks?.map((e) => (
            <HouseLinkMobile key={e.title} house={e} />
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
              href="/home"
              className={clsx("font-extrabold text-2xl text-accent", {
                hidden: !open,
              })}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/website-logo.png`}
                alt="logo"
                width={160}
                height={80}
                className="rounded-3xl bg-accent"
              />
            </Link>
            <div className="flex items-center h-full">
              <SidebarTrigger />
            </div>
          </div>{" "}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/home">
                  <div className="bg-accent rounded-xl p-1">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/icons/home.png`}
                      alt="home"
                      width={20}
                      height={20}
                      className="rounded-xl"
                    />
                  </div>
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Collapsible
              defaultOpen={true}
              key={openLinks.title}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Image
                      src={openLinks.icon}
                      alt="members links"
                      width={28}
                      height={28}
                      className="rounded-xl bg-accent p-[2px]"
                    />{" "}
                    {openLinks.title}{" "}
                    <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                    <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {openLinks.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {openLinks.items?.map((subItem) =>
                        subItem.visibleTo === false ? null : (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <Image
                                  src={subItem.iconPath}
                                  alt="link"
                                  width={25}
                                  height={25}
                                  className="rounded-xl bg-accent p-[1px]"
                                />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
          {dataExists ? (
            <SidebarMenu>
              <Collapsible
                defaultOpen={true}
                key={membersLinks.title}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Image
                        src={membersLinks.icon}
                        alt="members links"
                        width={30}
                        height={30}
                        className="rounded-xl bg-accent p-[2px]"
                      />{" "}
                      {membersLinks.title}{" "}
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
                              <Link href={subItem.url}>
                                <Image
                                  src={subItem.iconPath}
                                  alt="link"
                                  width={25}
                                  height={25}
                                  className="rounded-xl bg-accent p-[1px]"
                                />{" "}
                                <span>{subItem.title}</span>
                              </Link>
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
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 w-[160px] rounded-3xl m-2"
                />
              ))
            : houseLinks?.map((e) => <HouseLinks key={e.title} house={e} />)}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ResposiveSidebar;
