import React from "react";
import type { Metadata } from "next";
import { getUnit } from "@/lib/utils";
import { Unit } from "@/lib/type";
import Page from "./page";
import { useQuery } from "@tanstack/react-query";
import { getUnitsAssets } from "@/lib/get-data";

type Props = {
  params: { era: string; unit: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let data;
  const origin = process.env.ORIGIN;
  try {
    try {
      const response = await fetch(`${origin}/api/assets/units`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
    } catch (error) {
      console.error("Error fetching commanders:", error);
    }
  } catch (error) {
    console.error("Failed to fetch units assets:", error);
  }

  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";

  const found_unit: Unit | null = getUnit(params.unit, era, data) ?? null;
  return {
    title: found_unit?.name,
  };
}

export default async function Layout() {
  const origin = process.env.ORIGIN;
  let data;
  try {
    const response = await fetch(`${origin}/api/assets/units`);
    data = await response.json();
  } catch (error) {
    console.error("Error fetching commanders:", error);
  }
  return <Page unitsAssets={data} />;
}
