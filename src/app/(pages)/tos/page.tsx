"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getPageMD } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

const TosPage: FC = () => {
  const [content, setContent] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["tos"],
    queryFn: () => getPageMD("tos"),
  });

  useEffect(() => {
    const processMarkdown = async () => {
      if (data?.body) {
        const processedContent = await remark().use(html).process(data.body);
        setContent(processedContent.toString());
      }
    };
    processMarkdown();
  }, [data]);
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="prose max-w-none container py-12">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
export default TosPage;
