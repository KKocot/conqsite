"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Unit } from "@/lib/type";
import { getUnit } from "@/lib/utils";
import { useParams } from "next/navigation";

const Page = () => {
  const { era, unit } = useParams();
  const found_unit: Unit | null =
    getUnit(
      unit.toString(),
      era.toString() as "golden" | "heroic" | "green" | "blue" | "grey"
    ) ?? null;
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

          <div className="flex gap-5 w-full">
            <img src={found_unit.src} alt={found_unit.name} />
            <p className="text-sm w-56">{found_unit.description}</p>
            <div className="w-full">
              {[...Array(2)].map((_, index) => (
                <Card key={index} className="p-2 my-2 h-1/2">
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
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
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
{
  /* <div className="flex items-center gap-2">
<img src={found_unit?.icon} alt={found_unit?.name} className="w-16" />
<h1 className="text-5xl">{found_unit?.name}</h1>
</div>

<p>Leadership: {found_unit?.leadership}</p>
<p>Value: {found_unit?.value}</p>
<p>Mastery Points: {found_unit?.masteryPoints ? "Yes" : "No"}</p>
<p>Era: {found_unit?.era}</p>
<img src={found_unit?.src} alt={found_unit?.name} />
<p>{found_unit?.description}</p>
<h2>Skills</h2>
{found_unit?.skills?.map((skill) => (
<div key={skill.name}>
  <h3>{skill.name}</h3>
  <p>{skill.description}</p>
  <img src={skill.image} alt={skill.name} />
</div>
))}
<h2>Formation</h2>
{found_unit?.formation?.map((formation) => (
<div key={formation.name}>
  <h3>{formation.name}</h3>
  <p>{formation.description}</p>
  <img src={formation.img} alt={formation.name} />
</div>
))}
<h2>Dedicated Doctrins</h2>
{found_unit?.dedicatedDoctrins?.map((doctrine) => (
<div key={doctrine.name}>
  <h3>{doctrine.name}</h3>
  <img src={doctrine.img} alt={doctrine.name} />
</div>
))}
<h2>Kits</h2>
<img src={found_unit?.kits?.img} alt={found_unit?.kits?.name} /> */
}
