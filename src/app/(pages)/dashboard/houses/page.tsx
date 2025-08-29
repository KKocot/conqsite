import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Content from "./content";
import { allHousesBadgesOptions } from "@/feature/houses-list/lib/query";
import { getQueryClient } from "@/lib/react-query";

const HousesPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(allHousesBadgesOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center sm:px-6 w-full">
        <Content />
      </div>
    </HydrationBoundary>
  );
};
export default HousesPage;
