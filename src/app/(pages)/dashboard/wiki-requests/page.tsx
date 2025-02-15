"use client";

import { getUnitsReview } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useState } from "react";

const Page = () => {
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">(
    "pending"
  );
  const { data, isLoading } = useQuery({
    queryKey: ["wiki-requests", status],
    queryFn: () => getUnitsReview(status),
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} status={status} setStatus={setStatus} />;
};

export default Page;
