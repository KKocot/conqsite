import { UnitAssetsGroup } from "@/lib/get-data";
import Content from "./content";

interface PageProps {
  unitsAssets: UnitAssetsGroup | undefined;
}
export default async function Page({ unitsAssets }: PageProps) {
  return <Content unitsAssets={unitsAssets} />;
}
