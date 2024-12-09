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
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
type doctrine = { id: number; name: string; img: string };
export interface UnitData {
  title: string;
  id: string;
  unit: string;
  ytlink: string;
  description: string;
  tree: { structure: Map<number, number>; maxlvl: number };
  doctrines: doctrine[];
}

const DEFAULT_UNIT_DATA: UnitData = {
  title: "",
  id: "",
  unit: "",
  ytlink: "",
  description: "",
  tree: {
    structure: new Map<number, number>(),
    maxlvl: 0,
  },
  doctrines: [
    { id: 1, name: "", img: "" },
    { id: 2, name: "", img: "" },
    { id: 3, name: "", img: "" },
    { id: 4, name: "", img: "" },
    { id: 5, name: "", img: "" },
  ],
};

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
  const form = useForm({
    values: {
      ...DEFAULT_UNIT_DATA,
      unit: found_unit?.name || "",
      tree: {
        structure: new Map<number, number>(
          new Map(found_unit?.tree?.structure.map((node) => [node.id, 0]) || [])
        ),
        maxlvl: found_unit?.tree?.maxlvl || 0,
      },
    },
  });
  if (!found_unit) {
    return <div>Unit not found</div>;
  }
  const values = form.getValues();
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
          <Form {...form}>
            <form className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ytlink"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="ytlink">Youtube Link</Label>
                    <Input id="ytlink" type="url" {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...field} />
                  </FormItem>
                )}
              />

              <Tree
                nodes={found_unit.tree?.structure || []}
                unitlvl={found_unit?.tree?.maxlvl || 0}
                mode="edit"
              />
              <DoctrinedBuilder
                setValue={form.setValue}
                doctrineSlot={values.doctrines}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
