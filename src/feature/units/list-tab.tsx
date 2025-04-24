import { Input } from "@/components/ui/input";
import { getUnitsAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import List from "./list";
import LoadingComponent from "../ifs/loading";
import NoData from "../ifs/no-data";

const ListTab = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });

  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 my-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search unit"
      />
      {isLoading ? (
        <LoadingComponent />
      ) : data ? (
        <List data={data} query={query} />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default ListTab;
