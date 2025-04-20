"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import {
  getBotEvents,
  getHouseAssets,
  getHouseSettings,
  getPageMD,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

const Page = () => {
  const [botContent, setBotContent] = useState("");

  // Get house name from URL
  const { param }: { param: string } = useParams();

  // Clean param to get house name
  const house = param.replaceAll("%20", " ");

  // Get user session
  const { data: user } = useSession();

  // Fetch config data from house
  const { data, isLoading } = useQuery({
    queryKey: ["houseSettings", house],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });
  // Fetch data about active events in the house
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events", house],
    queryFn: () => getBotEvents(house),
    enabled: !!house,
  });

  // Get house assets
  const { data: assets } = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  const { data: botData, isLoading: botLoading } = useQuery({
    queryKey: ["bot"],
    queryFn: () => getPageMD("bot"),
  });

  useEffect(() => {
    const processMarkdown = async () => {
      if (botData?.body) {
        const processedBotContent = await remark()
          .use(html)
          .process(botData.body);
        setBotContent(processedBotContent.toString());
      }
    };
    processMarkdown();
  }, [data, botData]);
  // Show loading component while fetching data
  if (isLoading || eventsLoading) return <LoadingComponent />;
  // Show no data component if no data is found
  if (!data || !user || !events) return <NoData />;

  return (
    <Content
      botContent={botContent}
      assets={assets}
      config={data}
      events={events}
      house={house}
      userId={user.user.id}
    />
  );
};
export default Page;
