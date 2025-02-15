"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getRolesByHouseAndId, getUnitWikiById } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";
import { useSession } from "next-auth/react";

const Page = () => {
  const { param: id }: { param: string } = useParams();
  const user = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["previewUnit", id],
    queryFn: () => getUnitWikiById(id),
    enabled: !!id,
  });
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRolesByHouseAndId("test", user.data?.user.id ?? ""),
    enabled: !!user.data?.user.id,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} roles={roles} />;
};
export default Page;
