import { QueryClient } from "@tanstack/react-query";
import Content from "./content";
import { getPremiumStatus } from "@/lib/get-data";

const Page = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["premiumStatus"],
    queryFn: getPremiumStatus,
  });
  return <Content />;
};

export default Page;
