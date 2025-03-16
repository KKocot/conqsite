"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { redirect, useSearchParams } from "next/navigation";
import { getBotToken } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: user } = useSession();
  const params = useSearchParams();
  const token: string = params.get("token") || "";
  const { data, isLoading } = useQuery({
    queryKey: ["authority"],
    queryFn: () => getBotToken(token),
    enabled: !!token,
  });
  if (user) redirect("/");
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};
export default Page;
