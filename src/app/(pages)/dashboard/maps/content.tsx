"use client";

import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapAsset } from "@/lib/get-data";
import Link from "next/link";

const Content = ({ data }: { data: MapAsset[] }) => {
  return (
    <div className="flex flex-col gap-4 p-12">
      <h1 className="text-2xl font-bold">Maps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((map) => (
          <Link
            href={`/dashboard/maps/${map.name.replaceAll(" ", "_")}`}
            key={map.name}
          >
            <Card>
              <CardHeader className="text-center">{map.name}</CardHeader>
              <CardContent>
                <ImageComponent
                  name={map.name}
                  width={300}
                  height={300}
                  type="map"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Content;
