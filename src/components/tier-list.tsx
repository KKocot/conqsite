"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierUnits } from "@/lib/get-data";
import LoadingComponent from "../feature/ifs/loading";
import HoverClickTooltip from "@/components/hover-click-tooltip";
import Link from "next/link";
import clsx from "clsx";

// Type for the tier list items
type TierListItem = {
  tier: {
    value: number;
    color: string;
    label: string;
  };
  items: TierUnits[];
};

// Define all 11 tiers (0-10)
const tiers = [
  { value: 10, color: "bg-red-600", label: "10" },
  { value: 9, color: "bg-red-500", label: "9" },
  { value: 8, color: "bg-orange-500", label: "8" },
  { value: 7, color: "bg-orange-400", label: "7" },
  { value: 6, color: "bg-yellow-500", label: "6" },
  { value: 5, color: "bg-yellow-400", label: "5" },
  { value: 4, color: "bg-green-500", label: "4" },
  { value: 3, color: "bg-green-400", label: "3" },
  { value: 2, color: "bg-blue-500", label: "2" },
  { value: 1, color: "bg-blue-400", label: "1" },
];

const TierList = ({
  data,
  isLoading,
}: {
  data?: TierUnits[];
  isLoading: boolean;
}) => {
  const [units, setUnits] = useState<TierListItem[]>([]);
  const [filter, setFilter] = useState({
    golden: true,
    heroic: true,
    blue: true,
    green: true,
    grey: true,
  });
  useEffect(() => {
    if (data) {
      // Group items by their exact rating value
      const itemsByTier = tiers.map((tier) => {
        let tierItems: TierUnits[];

        if (tier.value === 0) {
          // For the 0 tier, include both items with rating 0 and undefined
          tierItems = data.filter((item) => item.rating === undefined);
        } else {
          // For all other tiers, match the exact rating value
          tierItems = data.filter((item) => item.rating === tier.value);
        }

        return { tier, items: tierItems };
      });
      setUnits(itemsByTier);
    }
  }, [data]); // Also fixed dependency array to use data directly

  const filteredUnitsByEra = useMemo(() => {
    return units.map((unit) => ({
      ...unit,
      items: unit.items.filter((item) => {
        if (filter.golden && item.era === "golden") return true;
        if (filter.heroic && item.era === "heroic") return true;
        if (filter.blue && item.era === "blue") return true;
        if (filter.green && item.era === "green") return true;
        if (filter.grey && item.era === "grey") return true;
        return false;
      }),
    }));
  }, [units, filter]);
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        <button
          onClick={() => setFilter((f) => ({ ...f, golden: !f.golden }))}
          className={clsx(
            "px-4 py-2 rounded-md border",
            filter.golden ? "bg-yellow-500 text-white" : "bg-transparent"
          )}
        >
          Golden
        </button>
        <button
          onClick={() => setFilter((f) => ({ ...f, heroic: !f.heroic }))}
          className={clsx(
            "px-4 py-2 rounded-md border",
            filter.heroic ? "bg-purple-500 text-white" : "bg-transparent"
          )}
        >
          Heroic
        </button>
        <button
          onClick={() => setFilter((f) => ({ ...f, blue: !f.blue }))}
          className={clsx(
            "px-4 py-2 rounded-md border",
            filter.blue ? "bg-blue-500 text-white" : "bg-transparent"
          )}
        >
          Blue
        </button>
        <button
          onClick={() => setFilter((f) => ({ ...f, green: !f.green }))}
          className={clsx(
            "px-4 py-2 rounded-md border",
            filter.green ? "bg-green-500 text-white" : "bg-transparent"
          )}
        >
          Green
        </button>
        <button
          onClick={() => setFilter((f) => ({ ...f, grey: !f.grey }))}
          className={clsx(
            "px-4 py-2 rounded-md border",
            filter.grey ? "bg-gray-500 text-white" : "bg-transparent"
          )}
        >
          Grey
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Rating Tier List (1-10)
      </h1>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        filteredUnitsByEra.map(({ tier, items }) => (
          <div key={tier.value} className="flex">
            <div
              className={`${tier.color} flex items-center justify-center w-16 rounded-l-lg`}
            >
              <span className="font-bold text-xl text-center">
                {tier.label}
              </span>
            </div>
            <Card className="flex-1 rounded-l-none">
              <CardContent className="p-0">
                {items.length === 0 ? (
                  <div className="h-12 flex items-center justify-center text-grey-400">
                    No items with rating {tier.label}
                  </div>
                ) : (
                  <div className="flex flex-wrap h-full ">
                    {items.map((item) => (
                      <HoverClickTooltip
                        key={item.id}
                        triggerChildren={
                          <Link
                            href={`/unit/${item.name.replaceAll(" ", "_")}`}
                            key={item.id}
                            className="p-[2px]"
                          >
                            <Avatar className="rounded-none w-12 h-12">
                              <AvatarImage
                                className=""
                                src={item.image}
                                alt={item.name}
                              />
                              <AvatarFallback>
                                {item.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        }
                      >
                        <span className="text-xs mt-1 text-center truncate w-full">
                          {item.name}
                        </span>
                      </HoverClickTooltip>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default TierList;
