"use client";

import { UnitAsset } from "@/lib/get-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListTab from "@/feature/units/list-tab";
import TierListContainer from "@/feature/units/tier-list-containter";

const listTab = [
  {
    value: "fillList",
    label: "Full List",
  },
  {
    value: "CommunityTierList",
    label: "Community Tier List",
  },
];
const Content = () => {
  const params = useSearchParams();
  const router = useRouter();
  const card = params.get("card") as "fillList" | "CommunityTierList" | null;
  const [tab, setTab] = useState(card ?? "fillList");
  const onTabChange = (value: "fillList" | "CommunityTierList") => {
    setTab(value);
    router.push(`/dashboard/units?card=${value}`);
  };
  return (
    <div className="flex flex-col gap-6 container my-12">
      <Tabs
        value={tab}
        onValueChange={(e) =>
          onTabChange(e as "fillList" | "CommunityTierList")
        }
      >
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
      </Tabs>
    </div>
  );
};
export default Content;
