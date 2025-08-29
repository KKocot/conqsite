"use client";

import { useParams } from "next/navigation";
import { DoctrineType, UnitAsset, UnitObject } from "@/lib/get-data";
import { useSuspenseQuery } from "@tanstack/react-query";
import BuilderForm from "@/feature/unit-builder/builder-form";
import { getFullPostInfoOptions } from "@/feature/unit-builder/lib/query";

const Contact = () => {
  const unitName = useParams();
  const cleanUnitName = unitName.unit.toString().replaceAll("_", " ");
  const fullPostInfoOptions = getFullPostInfoOptions(cleanUnitName, "unitPage");

  const { data } = useSuspenseQuery(fullPostInfoOptions);
  const doctrines: DoctrineType[] = data.doctrinesForUnit;
  const unitAssets: UnitAsset = data.asset;
  const unitTree: UnitObject = data.wiki;
  return (
    <BuilderForm data={unitAssets} unitTree={unitTree} doctrines={doctrines} />
  );
};
export default Contact;
