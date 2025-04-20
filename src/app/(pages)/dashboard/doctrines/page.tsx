"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Content from "./content";
import { getDoctrineAssets } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const queryClient = new QueryClient();

const DoctrinesContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["doctrines"],
    queryFn: getDoctrineAssets,
  });

  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return <Content doctrines={data} />;
};

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center p-10 w-full">
        <DoctrinesContent />
      </div>
    </QueryClientProvider>
  );
};

export default Page;
