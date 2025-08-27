"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import usePremiumStatus from "@/feature/premium/hooks/use-premium-status";
import { PremiumStatus } from "@/lib/get-data";
import clsx from "clsx";
import { LucideArrowBigDownDash, LucideArrowBigUpDash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LoadingComponent from "../ifs/loading";

const PickHouseStep = ({
  selectedHouse,
  onHouseSelect,
}: {
  selectedHouse: PremiumStatus | null;
  onHouseSelect: (house: PremiumStatus | null) => void;
}) => {
  const { data, isLoading } = usePremiumStatus();
  const [filter, setFilter] = useState<boolean>(true);

  return isLoading ? (
    <LoadingComponent />
  ) : data ? (
    <>
      <h2 className="text-xl font-bold text-center">Select a House</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data
          .filter((h) => (filter ? h.userHouse : true))
          .map((house) => (
            <Badge
              key={house.name}
              variant="secondary"
              onClick={() => onHouseSelect(house)}
              className={clsx(
                "cursor-pointer items-center border-4 text-base",
                {
                  "bg-green-400 text-black": selectedHouse?.name === house.name,
                  "border-slate-200": house.premium === "silver",
                  "border-yellow-500": house.premium === "gold",
                  "border-blue-500": house.premium === "platinum",
                }
              )}
            >
              <div className="w-8 h-8 mr-2 rounded-xl overflow-hidden flex items-center">
                <Image
                  src={house.avatar}
                  alt={house.name}
                  width={30}
                  height={30}
                />
              </div>
              <h3>{house.name}</h3>
            </Badge>
          ))}
      </div>
      <Button
        onClick={() => setFilter((prev) => !prev)}
        variant="custom"
        className="mt-4"
      >
        {filter ? (
          <div className="flex items-center gap-2">
            <span>Show All Houses</span>
            <LucideArrowBigDownDash />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Show My Houses</span>
            <LucideArrowBigUpDash />
          </div>
        )}
      </Button>
    </>
  ) : (
    <p>No houses found.</p>
  );
};

export default PickHouseStep;
