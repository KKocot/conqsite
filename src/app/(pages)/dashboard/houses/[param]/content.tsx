"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/lib/get-data";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Globe, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HouseBadges from "@/feature/house-settings/house-badges";
import {
  getHousesBadgesOptions,
  getHousesDetailsOptions,
} from "@/feature/house-profile/lib/query";
import { HouseCard } from "@/feature/house-profile/lib/utils";
import NoData from "@/feature/ifs/no-data";
import LoadingComponent from "@/feature/ifs/loading";

const Content = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const t = useTranslations("HouseCard");
  const housesDetailsOptions = getHousesDetailsOptions(house);
  const housesBadgesOptions = getHousesBadgesOptions(house);

  const { data: card, isLoading: isLoadingCard } =
    useSuspenseQuery(housesDetailsOptions);
  const { data: badges, isLoading: isLoadingBadges } =
    useSuspenseQuery(housesBadgesOptions);
  const cardData: HouseCard = card;
  const badgesData: Badge = badges;
  if (!card || !badges) return <NoData />;
  if (isLoadingCard || isLoadingBadges) return <LoadingComponent />;
  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-6xl overflow-hidden rder-2">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center relative">
            <Image
              src={cardData.houseDetails.avatar}
              alt={cardData.houseDetails.name}
              width={362}
              height={362}
            />
            <HouseBadges badgesData={badgesData} />
          </div>
          <CardContent className="flex-1 p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">
                {cardData.houseDetails.name}
              </h2>
              <p className="text-xl text-muted-foreground">
                {cardData.houseDetails.description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                {t("house_leader")}
              </p>
              <p className="text-2xl font-semibold">
                {cardData?.houseLeader?.discordNick ?? "BardDev"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg">{cardData.houseDetails.server}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg">{cardData.houseDetails.country}</span>
              </div>
            </div>

            <Button
              className="w-full py-3 text-xl"
              variant="custom"
              onClick={() =>
                window.open(cardData.houseDetails.discordLink, "_blank")
              }
            >
              {t("join_discord")}
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default Content;
