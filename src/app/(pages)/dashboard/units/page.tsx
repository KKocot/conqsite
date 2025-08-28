import { getQueryClient } from "@/lib/react-query";
import Content from "./content";
import {
  allUnitsAssetsOptions,
  mostUsedUnitsOptions,
  tierListOptions,
} from "@/feature/units/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(allUnitsAssetsOptions);
  void queryClient.prefetchQuery(tierListOptions);
  void queryClient.prefetchQuery(mostUsedUnitsOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
