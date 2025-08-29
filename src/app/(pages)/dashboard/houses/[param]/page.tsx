import {
  getHousesBadgesOptions,
  getHousesDetailsOptions,
} from "@/feature/house-profile/lib/query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
type Props = {
  params: { param: string };
};
const Page = ({ params }: Props) => {
  const house = params.param.toString();

  const housesDetailsOptions = getHousesDetailsOptions(house);
  const housesBadgesOptions = getHousesBadgesOptions(house);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(housesDetailsOptions);
  void queryClient.prefetchQuery(housesBadgesOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
export default Page;
