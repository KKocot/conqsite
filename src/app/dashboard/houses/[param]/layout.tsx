import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";

type Props = {
  params: { param: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const house = params.param.toString();
  const origin = process.env.ORIGIN;
  const response = await fetch(`${origin}/api/house?name=${house}`).then(
    (res) => res.json()
  );
  return {
    title: response.name,
    description: response.description,
    openGraph: {
      title: response.name,
      description: response.description,
      type: "website",
      url: `${origin}/houses/${house}`,
      images: [response.image],
    },
  };
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
