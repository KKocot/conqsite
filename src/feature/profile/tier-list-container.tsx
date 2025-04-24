// const { data, isLoading } = useQuery({
//   queryKey: ["tierList", id],
//   queryFn: () => getTierUnits(id),
// });

import TierList from "@/components/tier-list";
import { getTierUnits } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const TierListContainer = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["tierList", id],
    queryFn: () => getTierUnits(id),
  });

  return <TierList data={data} isLoading={isLoading} />;
};

export default TierListContainer;
