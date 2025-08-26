import { getPremiumStatus } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const usePremiumStatus = () => {
  const premiumStatus = useQuery({
    queryKey: ["premiumStatus"],
    queryFn: getPremiumStatus,
  });

  return premiumStatus;
};

export default usePremiumStatus;
