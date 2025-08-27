import { getHousesDetails, HouseDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const useHousesQuery = () => {
  const housesQuery = useQuery<HouseDetails[]>({
    queryKey: ["houses"],
    queryFn: () => getHousesDetails(),
  });

  return housesQuery;
};

export default useHousesQuery;
