import { SidebarLink } from "./responsive-navbar";
import {
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Castle, Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getHouseDetails } from "@/lib/get-data";
import Image from "next/image";

const HouseLinks = ({ house }: { house: SidebarLink }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["house", house.title],
    queryFn: () => getHouseDetails(house.title),
    enabled: !!house.title,
  });
  return (
    <SidebarMenu key={house.title}>
      <Collapsible key={house.title} className="group/collapsible">
        <SidebarMenuItem>
          {house.items?.length ? (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="gap-1 pl-0">
                  {isLoading ? (
                    <Castle className="h-8 w-8 p-0 mr-3" />
                  ) : (
                    <Avatar className="h-8 w-8 p-0">
                      <AvatarImage src={data?.avatar} alt="House Icon" />
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                  )}
                  {house.title}{" "}
                  <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                  <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {house.items?.map((subItem) =>
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
            </>
          ) : null}
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};
export default HouseLinks;
