"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseDetails } from "@/lib/get-data";
import Loading from "react-loading";

const Page = () => {
  const { param } = useParams();
  const houseName = param.toString();
  const { data, isLoading } = useQuery({
    queryKey: ["house", param],
    queryFn: () => getHouseDetails(houseName),
    enabled: !!houseName,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h1 className="text-2xl font-bold">House Not Found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 container">
      <Content data={data} />
    </div>
  );
};
export default Page;
