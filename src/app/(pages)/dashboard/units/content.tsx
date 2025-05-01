"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListTab from "@/feature/units/list-tab";
import TierListContainer from "@/feature/units/tier-list-containter";
import MostUsedUnits from "@/feature/units/most-used-units";

const listTab = [
  {
    value: "fillList",
    label: "Full List",
  },
  {
    value: "CommunityTierList",
    label: "Community Tier List",
  },
  {
    value: "MostUsedUnits",
    label: "Most Used Units",
  },
];
type CardType = "fillList" | "CommunityTierList" | "MostUsedUnits" | null;
const Content = () => {
  const params = useSearchParams();
  const router = useRouter();
  const card = params.get("card") as CardType;
  const [tab, setTab] = useState(card ?? "fillList");
  const onTabChange = (value: CardType) => {
    if (value === null) return;
    setTab(value);
    router.push(`/dashboard/units?card=${value}`);
  };
  return (
    <div className="flex flex-col gap-6 container my-12">
      <Tabs value={tab} onValueChange={(e) => onTabChange(e as CardType)}>
        <TabsList>
          {listTab.map((e) => (
            <TabsTrigger value={e.value} key={e.value}>
              {e.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="fillList">
          <ListTab />
        </TabsContent>
        <TabsContent value="CommunityTierList">
          <TierListContainer />
        </TabsContent>
        <TabsContent value="MostUsedUnits">
          <MostUsedUnits />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Content;
