"use client";

import { Doctrine } from "@/assets/doctrines";
import DoctrinesLisItem from "./doctrines-list-item";

const DoctrinesList = ({ doctrines }: { doctrines: Doctrine[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {doctrines.map((doctrine) => (
        <DoctrinesLisItem key={doctrine.name} doctrine={doctrine} />
      ))}
    </div>
  );
};

export default DoctrinesList;
