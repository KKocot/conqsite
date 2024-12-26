"use client";

import {
  commonDoctrines,
  uncommonDoctrines,
  rareDoctrines,
  epicDoctrines,
} from "@/assets/doctrines";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import DoctrinesList from "@/feature/doctrines/doctrines-list";

const group = [
  ...epicDoctrines,
  ...rareDoctrines,
  ...uncommonDoctrines,
  ...commonDoctrines,
];

const Content = () => {
  const dedicatedForAll = group.filter(
    (doctrine) => doctrine.dedicated === "all"
  );
  const dedicatedForGruops = group.filter(
    (doctrine) => doctrine.dedicated === "group"
  );
  const dedicatedForUnits = group.filter(
    (doctrine) => doctrine.dedicated === "unit"
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex justify-between w-full">
        {["all", "group", "unit"].map((value) => (
          <TabsTrigger key={value} value={value}>
            {value === "all" ? "General Doctrines" : `Dedicated for ${value}s`}
          </TabsTrigger>
        ))}
      </TabsList>
      {[
        { value: "all", doctrines: dedicatedForAll },
        { value: "group", doctrines: dedicatedForGruops },
        { value: "unit", doctrines: dedicatedForUnits },
      ].map(({ value, doctrines }) => (
        <TabsContent key={value} value={value}>
          <DoctrinesList doctrines={doctrines} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
