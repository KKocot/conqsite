import Content from "./content";
import { getFullUnitInfoOptions } from "@/feature/units/lib/query";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { unit: string };
};

const Page = ({ params }: Props) => {
  const unit = params.unit.replaceAll("%20", " ");
  const fullUnitInfo = getFullUnitInfoOptions(unit);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(fullUnitInfo);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content unitName={unit} />
    </HydrationBoundary>
  );
};
export default Page;
