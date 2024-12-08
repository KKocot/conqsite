"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Unit } from "@/lib/type";
import { getUnit } from "@/lib/utils";
import { useParams } from "next/navigation";
import Tree from "@/components/tree";
import DoctrinedBuilder from "@/components/doctrines-builder";

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
          <form className="flex flex-col gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" />
            </div>
            <div>
              <Label htmlFor="ytlink">Youtube Link</Label>
              <Input id="ytlink" type="url" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" />
            </div>
            <Tree
              nodes={found_unit.tree?.structure || []}
              unitlvl={found_unit?.tree?.maxlvl || 0}
              mode="edit"
            />
            <DoctrinedBuilder />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
