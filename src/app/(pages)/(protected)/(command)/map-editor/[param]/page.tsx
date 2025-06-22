"use client";

import Content from "./content";
import { useParams } from "next/navigation";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");

  return <Content house={house} />;
};

export default Page;
