"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { param: house } = useParams();
  return <div>{house}</div>;
};
export default Page;
