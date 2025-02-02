"use client";

import LoadingComponent from "@/feature/ifs/loading";
import { getHighRoles } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";

const AdminPage = () => {
  const house = "test";
  const { data: wikiData, isLoading: wikiLoading } = useQuery({
    queryKey: ["highRolesList", house],
    queryFn: () => getHighRoles(house),
  });
  if (wikiLoading) return <LoadingComponent />;
  if (!wikiData) return <NoData />;
  return <Content wikiRoles={wikiData} />;
};

export default AdminPage;
