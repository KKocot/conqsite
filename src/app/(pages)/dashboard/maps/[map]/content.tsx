"use client";

import ImageComponent from "@/components/image-component";
import { MapAsset } from "@/lib/get-data";

const Content = ({ data }: { data: MapAsset }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-12">
      <h1 className="text-5xl font-bold">{data.name}</h1>
      <ImageComponent name={data.name} width={1000} height={1000} type="map" />
    </div>
  );
};
export default Content;
