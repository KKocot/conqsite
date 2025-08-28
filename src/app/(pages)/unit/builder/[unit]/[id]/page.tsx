import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Content from "./content";
import { getFullPostInfoOptions } from "@/feature/unit-builder/lib/query";
import { getQueryClient } from "@/lib/react-query";

type Props = {
  params: { unit: string; id: string };
};
const Page = ({ params }: Props) => {
  const unitName = params.unit.toString().replaceAll("_", " ");
  const id = params.id;

  const fullPostInfoOptions = getFullPostInfoOptions(id, unitName);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(fullPostInfoOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
