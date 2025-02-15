import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getUnit } from "@/lib/utils";
import { Unit } from "@/lib/type";

type Props = {
  params: { era: string; unit: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(params.unit, era) ?? null;
  return {
    title: found_unit?.name,
  };
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
