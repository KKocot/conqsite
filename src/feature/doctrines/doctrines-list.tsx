"use client";

import { DoctrineType } from "@/lib/get-data";
import DoctrinesLisItem from "./doctrines-list-item";

const DoctrinesList = ({ doctrines }: { doctrines: DoctrineType[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {doctrines.map((doctrine) => (
        <DoctrinesLisItem key={doctrine.name} doctrine={doctrine} />
      ))}
    </div>
  );
};

export default DoctrinesList;
