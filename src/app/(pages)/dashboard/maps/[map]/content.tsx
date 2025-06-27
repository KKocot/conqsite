"use client";

import ImageComponent from "@/components/image-component";
import { MapAsset } from "@/lib/get-data";
import { ArrowBigLeft } from "lucide-react";

const Content = ({ data }: { data: MapAsset }) => {
  return (
    <div className="flex flex-col w-full">
      <ArrowBigLeft
        className="cursor-pointer relative top-0 left-0 ml-4 mt-4"
        onClick={() => history.back()}
      />
      <div className="flex flex-col gap-4 justify-center items-center p-12 justify-self-center">
        <h1 className="text-5xl font-bold">{data.name}</h1>
        <ImageComponent
          name={data.name}
          width={1000}
          height={1000}
          type="map"
        />
      </div>
    </div>
  );
};
export default Content;
