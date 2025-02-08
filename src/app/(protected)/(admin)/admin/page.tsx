"use client";

import LoadingComponent from "@/feature/ifs/loading";
import { getHighRoles, getSurveysAdmin } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";

const AdminPage = () => {
  const house = "test";
  const { data: wikiData, isLoading: wikiLoading } = useQuery({
    queryKey: ["highRolesList", house],
    queryFn: () => getHighRoles(house),
  });
  const { data: surveysStats, isLoading: surveysStatsLoading } = useQuery({
    queryKey: ["surveysStats", house],
    queryFn: () => getSurveysAdmin(),
  });

  if (wikiLoading || surveysStatsLoading) return <LoadingComponent />;
  if (!wikiData || !surveysStats) return <NoData />;
  return <Content wikiRoles={wikiData} surveysStats={surveysStats} />;
};

export default AdminPage;
