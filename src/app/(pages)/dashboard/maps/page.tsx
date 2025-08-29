import { getQueryClient } from "@/lib/react-query";
import { mapsAssetsOptions } from "@/feature/map-editor/lib/query";
import Content from "./content";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(mapsAssetsOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};

export default Page;
