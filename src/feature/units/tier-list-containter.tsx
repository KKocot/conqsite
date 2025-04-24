import TierList from "@/components/tier-list";
import { getCommunityTierList } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const TierListContainer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tier-list"],
    queryFn: getCommunityTierList,
  });
  return (
    <div className="flex flex-col gap-6 mt-6">
      <TierList data={data} isLoading={isLoading} />
    </div>
  );
};
export default TierListContainer;
