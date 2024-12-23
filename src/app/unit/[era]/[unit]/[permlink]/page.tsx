"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { era, unit, permlink } = useParams();
  return (
    <div>
      <h1>Unit: {unit}</h1>
      <h1>Permlink: {permlink}</h1>
    </div>
  );
};
export default Page;
