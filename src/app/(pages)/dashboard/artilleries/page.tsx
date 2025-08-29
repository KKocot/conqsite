import { artilleriesAssetsOptions } from "@/lib/query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(artilleriesAssetsOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};

export default Page;
