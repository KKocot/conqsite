"use client";

import { UnitAssetsGroup } from "@/lib/get-data";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";

interface PageProps {
  data: UnitAssetsGroup | undefined;
}
const Page = ({ data }: PageProps) => {
  if (!data) return <NoData />;

  return <Content unitsAssets={data} />;
};
export default Page;
