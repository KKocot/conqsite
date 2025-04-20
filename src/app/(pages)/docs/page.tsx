"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getPageMD } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

const DocsPage: FC = () => {
  const [docsContent, setDocsContent] = useState("");
  const [botContent, setBotContent] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["docs"],
    queryFn: () => getPageMD("docs"),
  });
  const { data: botData, isLoading: botLoading } = useQuery({
    queryKey: ["bot"],
    queryFn: () => getPageMD("bot"),
  });

  useEffect(() => {
    const processMarkdown = async () => {
      if (data?.body && botData?.body) {
        const processedDocsContent = await remark()
          .use(html)
          .process(data.body);
        const processedBotContent = await remark()
          .use(html)
          .process(botData.body);
        setDocsContent(processedDocsContent.toString());
        setBotContent(processedBotContent.toString());
      }
    };
    processMarkdown();
  }, [data, botData]);
  if (isLoading || botLoading) return <LoadingComponent />;
  if (!data || !botData) return <NoData />;
  return (
    <div className="prose max-w-none container py-12">
      <div dangerouslySetInnerHTML={{ __html: botContent }} />
      <div dangerouslySetInnerHTML={{ __html: docsContent }} />
    </div>
  );
};

export default DocsPage;
