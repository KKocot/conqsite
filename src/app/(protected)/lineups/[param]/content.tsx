"use client";

import Preview from "@/components/preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getPublicLineup } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

const Content = ({
  date,
  house,
  units,
}: {
  date: string;
  house: string;
  units: Unit[];
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["lineups", house, date],
    queryFn: () => getPublicLineup(house, date),
    enabled: !!house,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return (
    <Tabs defaultValue={data[0].name} className="w-full flex flex-col">
      <TabsList>
        {data.map((e) => (
          <TabsTrigger value={e.name}>{e.name}</TabsTrigger>
        ))}
      </TabsList>
      {data.map((e) => (
        <TabsContent value={e.name} className="flex self-center">
          <Preview data={e.sheet} units={units} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
