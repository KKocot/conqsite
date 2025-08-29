import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { getMapAssetsOptions } from "@/feature/map-editor/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { map: string };
};

const Page = ({ params }: Props) => {
  const cleanMapName = params.map.replaceAll("_", " ");
  const queryClient = getQueryClient();
  const mapAssetsOptions = getMapAssetsOptions(cleanMapName);
  void queryClient.prefetchQuery(mapAssetsOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};

export default Page;
