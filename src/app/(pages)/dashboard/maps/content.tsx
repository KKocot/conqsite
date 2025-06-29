"use client";

import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapAsset } from "@/lib/get-data";
import { Filter } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const Content = ({ data }: { data: MapAsset[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = useMemo(
    () =>
      data.filter((map) =>
        map.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );
  return (
    <div className="flex flex-col gap-4 p-12">
      <h1 className="text-2xl font-bold">Maps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((map) => (
          <Link
            href={`/dashboard/maps/${map.name.replaceAll(" ", "_")}`}
            key={map.name}
          >
            <Card>
              <CardHeader className="text-center">{map.name}</CardHeader>
              <CardContent>
                <ImageComponent
                  name={`${map.name}-mini`}
                  width={300}
                  height={300}
                  type="map"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4 shadow-lg w-64">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search map..."
            className="w-full px-3 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default Content;
