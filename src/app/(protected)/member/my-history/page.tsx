"use client";

import { useQuery } from "@tanstack/react-query";
import { getHistoryDatesByUser } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import { useSession } from "next-auth/react";
import Content from "./content";

const Page = () => {
  const { data } = useSession();
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["dateslist", data?.user.id],
    queryFn: () => getHistoryDatesByUser(),
    enabled: !!data?.user.id,
  });
  if (historyLoading) return <LoadingComponent />;
  const dates = history
    ? Array.from(new Set(history.map((item) => item)))
    : undefined;
  return <Content dates={dates} />;
};

export default Page;
