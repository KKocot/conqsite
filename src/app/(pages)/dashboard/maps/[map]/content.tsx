"use client";

import ImageComponent from "@/components/image-component";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getMapAssetsOptions } from "@/feature/map-editor/lib/query";
import { MapAsset } from "@/lib/get-data";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowBigLeft } from "lucide-react";
import { useParams } from "next/navigation";

const Content = () => {
  const { map } = useParams();
  const cleanMapName = map.toString().replaceAll("_", " ");
  const mapAssetsOptions = getMapAssetsOptions(cleanMapName);
  const { data, isLoading } = useSuspenseQuery(mapAssetsOptions);
  const mapData: MapAsset = data.mapAssets;
  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col w-full">
      <ArrowBigLeft
        className="cursor-pointer relative top-0 left-0 ml-4 mt-4"
        onClick={() => history.back()}
      />
      <div className="flex flex-col gap-4 justify-center items-center p-12 justify-self-center">
        <h1 className="text-5xl font-bold">{mapData.name}</h1>
        <div>{mapData.type}</div>
        {mapData.cities.length > 0 ? (
          <div>
            <span>Occurrence:</span>
            <ul className="font-semibold">
              {mapData.cities.map((e) => (
                <li key={e} className="list-disc">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {mapData.types.map((type) => (
          <ImageComponent
            key={`${mapData.name}-${type}`}
            name={`${mapData.name}-${type}`}
            width={1000}
            height={1000}
            type="map"
          />
        ))}
      </div>
    </div>
  );
};
export default Content;
