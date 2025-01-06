import Image from "next/image";
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
import { HouseAssets } from "@/lib/get-data";
import clsx from "clsx";
import { useTranslations } from "next-intl";

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
  assetsData,
}: {
  house: HouseDetails;
  assetsData?: HouseAssets[];
}) {
  const houseAssets = assetsData?.find((asset) => asset.name === house.name);
  const t = useTranslations("ListOfHouses");
  return (
    <Card
      className={clsx("w-[362px] overflow-hidden flex flex-col", {
        "border-4 border-accent": houseAssets?.premium,
      })}
    >
      <div className="relative w-full h-[362px]">
        <Image
          src={house.avatar}
          alt={`${house.name} avatar`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader className="pt-2 ">
        <CardTitle
          className={clsx("text-xl font-bold", {
            "text-accent": houseAssets?.premium,
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
  );
}
