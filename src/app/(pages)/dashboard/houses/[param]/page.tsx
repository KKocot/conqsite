"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getHighRoles, getHouseBadges, getHouseDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { Globe, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HouseBadges from "@/feature/house-settings/house-badges";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const t = useTranslations("HouseCard");
  const { data: card, isLoading: cardLoading } = useQuery({
    queryKey: ["houseCard", house],
    queryFn: () => getHouseDetails(house),
    enabled: !!house,
  });

  const { data: leaderData, isLoading: leaderLoading } = useQuery({
    queryKey: ["houseRoles", house],
    queryFn: () => getHighRoles(house),
    enabled: !!house,
  });
  const { data: badgesData } = useQuery({
    queryKey: ["houseBadges", house],
    queryFn: () => getHouseBadges(house),
    enabled: !!house,
  });
  if (cardLoading || leaderLoading) return <LoadingComponent />;
  if (!card || !leaderData) return <NoData />;
  const houseLeader = leaderData.find((role) => role.role === "HouseLeader");
  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-6xl overflow-hidden rder-2">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center relative">
            <Image src={card.avatar} alt={card.name} width={362} height={362} />
            <HouseBadges badgesData={badgesData} />
          </div>
          <CardContent className="flex-1 p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">{card.name}</h2>
              <p className="text-xl text-muted-foreground">
                {card.description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                {t("house_leader")}
              </p>
              <p className="text-2xl font-semibold">
                {houseLeader?.discordNick ?? "BardDev"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg">{card.server}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg">{card.country}</span>
              </div>
            </div>

            <Button
              className="w-full py-3 text-xl"
              variant="custom"
              onClick={() => window.open(card.discordLink, "_blank")}
            >
              {t("join_discord")}
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default Page;
