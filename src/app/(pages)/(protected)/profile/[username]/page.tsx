import { getProfileTierlistOptions } from "@/feature/profile/lib/query";
import Content from "./content";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { username: string };
};
const Page = ({ params }: Props) => {
  const id = params.username.toString();

  const profileTierlistOptions = getProfileTierlistOptions(id);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(profileTierlistOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};

export default Page;
