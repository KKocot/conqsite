"use client";

import React from "react";
import Content from "./content";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { param: house }: { param: string } = useParams();
  return <Content house={house} />;
};

export default Page;
