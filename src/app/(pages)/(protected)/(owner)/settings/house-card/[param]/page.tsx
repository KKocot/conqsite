"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseDetails } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["house", param],
    queryFn: () => getHouseDetails(house),
    enabled: !!house,
  });

  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="flex flex-col gap-6 container">
      <Content data={data} />
    </div>
  );
};
export default Page;
