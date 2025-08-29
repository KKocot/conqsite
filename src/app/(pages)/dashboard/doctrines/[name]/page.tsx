import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { getDoctrineAssetOptions } from "@/feature/doctrines/lib/query";

type Props = {
  params: { name: string };
};

const Page = (props: Props) => {
  const name = props.params.name.toString();
  const doctrineAssetOptions = getDoctrineAssetOptions(name);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(doctrineAssetOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
