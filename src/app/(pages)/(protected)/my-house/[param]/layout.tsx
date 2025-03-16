import React from "react";
import Page from "./page";

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
