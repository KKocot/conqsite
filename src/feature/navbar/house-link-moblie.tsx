import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarLink } from "./responsive-navbar";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getHouseDetails } from "@/lib/get-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Castle, MoreHorizontal } from "lucide-react";
const HouseLinkMobile = ({ house }: { house: SidebarLink }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["house", house.title],
    queryFn: () => getHouseDetails(house.title),
    enabled: !!house.title,
  });
  return (
    <DropdownMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            {isLoading ? (
              <Castle className="h-8 w-8 p-0" />
            ) : (
              <Avatar className="h-6 w-6 p-0">
                <AvatarImage src={data?.avatar} alt="House Icon" />
              </Avatar>
            )}
            {house.title} <MoreHorizontal className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        {house.items?.length ? (
          <DropdownMenuContent className="min-w-56 rounded-lg">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {isLoading ? (
                  <Castle className="h-8 w-8 p-0" />
                ) : (
                  <Avatar className="h-8 w-8 p-0">
                    <AvatarImage src={data?.avatar} alt="House Icon" />
                  </Avatar>
                )}
                <span className="truncate font-semibold">{house.title}</span>
              </div>
            </DropdownMenuLabel>
            {house.items.map((item) =>
              item.visibleTo === false ? null : (
                <DropdownMenuItem asChild key={item.title}>
                  <Link href={item.url}>{item.title}</Link>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        ) : null}
      </SidebarMenuItem>
    </DropdownMenu>
  );
};
export default HouseLinkMobile;
