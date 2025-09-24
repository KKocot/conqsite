"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/lib/get-data";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HouseBadges from "./house-badges";
import { useState } from "react";

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
  const [img, setImg] = useState(house.avatar);
  return (
    <div className="relative">
      <HouseBadges badgesData={badgesData} />
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
            <Image
              src={img}
              width={362}
              height={362}
              alt={`${house.name} avatar`}
              onError={() => setImg("https://i.imgur.com/4VEMy1m.png")}
            />
          </Link>
        </div>
        <CardHeader className="pt-2 bg-card">
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
        <CardContent className="flex-grow bg-card">
          <p className="text-sm mb-2">{house.description}</p>
        </CardContent>
        <CardFooter className="bg-card">
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
