"use client";

import { DoctrineType } from "@/lib/get-data";
import DoctrinesLisItem from "./doctrines-list-item";

const DoctrinesList = ({ doctrines }: { doctrines: DoctrineType[] }) => {
  return (
    <div className="mx-auto">
      {doctrines.map((doctrine) => (
        <DoctrinesLisItem key={doctrine.name} doctrine={doctrine} />
      ))}
    </div>
  );
};

export default DoctrinesList;
