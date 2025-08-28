import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { doctrineAssetsOptions } from "@/feature/doctrines/lib/query";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(doctrineAssetsOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex justify-center p-10 w-full">
        <Content />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
