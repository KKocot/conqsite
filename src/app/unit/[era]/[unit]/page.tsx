"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Unit } from "@/lib/type";
import { getUnit } from "@/lib/utils";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const unit = params.unit.toString();
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(unit, era) ?? null;
  if (!found_unit) {
    return <div>Unit not found</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src={found_unit.icon}
              alt={found_unit.name}
              className="w-16 h-16 object-contain"
            />
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl">
              {found_unit.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Leadership</p>
              <p className="font-medium">{found_unit.leadership}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Value</p>
              <p className="font-medium">{found_unit.value}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mastery Points</p>
              <Badge
                variant={found_unit.masteryPoints ? "default" : "secondary"}
              >
                {found_unit.masteryPoints ? "Yes" : "No"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Era</p>
              <p className="font-medium">
                {found_unit.era.charAt(0).toUpperCase() +
                  found_unit.era.slice(1)}
              </p>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <img src={found_unit.src} alt={found_unit.name} className="h-64" />
            <p>{found_unit.description}</p>
            <div className="w-96 h-64 overflow-y-scroll">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="p-2 my-2">
                  <div>
                    <CardTitle className="text-xl">Build by User</CardTitle>
                  </div>
                  <div>
                    <div>Build </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {!found_unit?.skills
                ? null
                : found_unit?.skills.map((skill) => (
                    <Card key={skill.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-5">
                          <img
                            src={skill.image}
                            alt={skill.name}
                            className="object-cover rounded"
                          />
                          <h3 className="font-semibold">{skill.name}</h3>
                        </div>
                        <p className="text-sm mt-4">{skill.description}</p>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Formations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {!found_unit?.formation
                ? null
                : found_unit?.formation.map((formation) => (
                    <Card key={formation.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-5">
                          <img
                            src={formation.img}
                            alt={formation.name}
                            className="object-cover rounded"
                          />
                          <h3 className="font-semibold">{formation.name}</h3>
                        </div>
                        <p className="text-sm mt-4">{formation.description}</p>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          <div className="flex justify-around">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Dedicated Doctrines
              </h2>
              <div className="flex gap-4">
                {found_unit?.dedicatedDoctrins?.map((doctrine) => (
                  <div key={doctrine.name} className="text-center">
                    <img
                      src={doctrine.img}
                      alt={doctrine.name}
                      title={doctrine.description}
                      className="w-full h-24 object-contain mb-2"
                    />
                    <p className="text-sm font-medium">{doctrine.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Kits</h2>
              <img
                src={found_unit?.kits?.img}
                alt={found_unit?.kits?.name}
                className="w-full h-24 object-contain mb-2"
              />
              <p className="text-sm font-medium">{found_unit?.kits?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
