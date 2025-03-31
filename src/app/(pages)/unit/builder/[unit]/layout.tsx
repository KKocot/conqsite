import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
type Props = {
  params: { era: string; unit: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let data;
  const origin = process.env.ORIGIN;
  const unitName = params.unit.replaceAll("_", " ");
  try {
    const response = await fetch(`${origin}/api/assets/units?name=${unitName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    console.error("Error fetching commanders:", error);
  }

  return {
    title: unitName,
  };
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
