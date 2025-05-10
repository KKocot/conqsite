"use client";

import {
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageToggle from "./language-toggle";
import { ModeToggle } from "./theme-menu";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function NavUser({
  name,
  avatar,
}: {
  name?: string | null;
  avatar?: string | null;
}) {
  const { isMobile } = useSidebar();
  const t = useTranslations("Navigation");
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
                  {(name ?? "Avatar").substring(0, 2)}
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
                    {(name ?? "Avatar").substring(0, 2)}
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
                <LogOut />
                {t("auth.logout")}
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUser;
