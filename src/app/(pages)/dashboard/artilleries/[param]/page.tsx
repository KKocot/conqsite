import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { getArtilleryAssetOptions } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: {
    param: string;
  };
};
const Page = ({ params }: Props) => {
  const cleanedParam = params.param.replaceAll("-", " ");
  const queryClient = getQueryClient();
  const artilleryAssetOptions = getArtilleryAssetOptions(cleanedParam);
  void queryClient.prefetchQuery(artilleryAssetOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
