"use client";

import WIP from "@/feature/ifs/wip";
import { useParams } from "next/navigation";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  return <WIP />;
};

export default Page;
