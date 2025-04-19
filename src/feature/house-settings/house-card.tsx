import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Camera, ExternalLink, Send } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/lib/get-data";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HoverClickTooltip from "@/components/hover-click-tooltip";

interface HouseDetails {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}

export default function HouseCard({
  house,
  badgesData,
}: {
  house: HouseDetails;
  badgesData?: Badge;
}) {
  const t = useTranslations("ListOfHouses");
  return (
    <div className="relative">
      <div className="absolute -right-6 top-2 flex flex-col gap-2 z-50">
        {badgesData?.premium ? (
          <HoverClickTooltip
            triggerChildren={
              <Image
                src="/badges/image-1.webp"
                alt="premiumBadge"
                width={60}
                height={60}
                title="Premium House"
              />
            }
            contentStyle="w-48"
            buttonStyle="hover:bg-transparent"
          >
            <p className="text-sm">
              supports the project and gets premium features with over 25 euro
              donation per month
            </p>
          </HoverClickTooltip>
        ) : null}
        {(badgesData?.surveys ?? 0) > 90 ? (
          <HoverClickTooltip
            triggerChildren={
              <Image
                src="/badges/image.webp"
                alt="premiumBadge"
                width={60}
                height={60}
                title="Over 90% of filled surveys"
              />
            }
            contentStyle="w-48"
            buttonStyle="hover:bg-transparent"
          >
            <p className="text-sm">over 90% of filled surveys</p>
          </HoverClickTooltip>
        ) : null}
        {(badgesData?.history ?? 0) > 50 ? (
          <HoverClickTooltip
            triggerChildren={
              <div className="bg-accent rounded-2xl">
                <Camera className="h-14 w-14 text-background" />
              </div>
            }
            contentStyle="w-48"
            buttonStyle="hover:bg-transparent"
          >
            <p className="text-sm">House has over 50 PoVs in archive</p>
          </HoverClickTooltip>
        ) : null}
        {(badgesData?.conqBot ?? 0) > 50 ? (
          <HoverClickTooltip
            triggerChildren={
              <div className="bg-accent rounded-2xl">
                <Bot className="h-14 w-14 text-background" />
              </div>
            }
            contentStyle="w-48"
            buttonStyle="hover:bg-transparent"
          >
            <p className="text-sm">House used ConqBot events over 50 times</p>
          </HoverClickTooltip>
        ) : null}
        {(badgesData?.lineups ?? 0) > 100 ? (
          <HoverClickTooltip
            triggerChildren={
              <div className="bg-accent rounded-2xl">
                <Send className="h-14 w-14 text-background" />
              </div>
            }
            contentStyle="w-48"
            buttonStyle="hover:bg-transparent"
          >
            <p className="text-sm">over 100 of public lineups</p>
          </HoverClickTooltip>
        ) : null}
      </div>
      <Card
        className={clsx(
          "w-[362px] overflow-hidden flex flex-col relative z-20",
          {
            "border-4 border-accent": badgesData?.premium,
          }
        )}
      >
        <div className="w-full h-[362px]">
          <Link href={`/dashboard/houses/${house.name}`} target="_blank">
            <Avatar className="w-[362px] h-[362px] rounded-none">
              <AvatarImage src={house.avatar} alt={`${house.name} avatar`} />
              <AvatarFallback>
                <Image
                  src="https://i.imgur.com/4VEMy1m.png"
                  alt="avatar"
                  width={362}
                  height={362}
                />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <CardHeader className="pt-2 ">
          <CardTitle
            className={clsx("text-xl font-bold", {
              "text-accent": badgesData?.premium,
            })}
          >
            {house.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            <span title="Server">{house.server}</span> {house.country}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm mb-2">{house.description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant="custom">
            <Link
              href={house.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              {t("join_discord")} <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
