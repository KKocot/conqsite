import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { surveysAndHousesNumberOptions } from "../../../feature/landingPage/lib/query";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(surveysAndHousesNumberOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
