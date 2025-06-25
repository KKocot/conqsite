"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DoctrinedBuilder from "@/feature/unit-builder/doctrines/builder";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { DoctrineType, UnitAsset, UnitData, UnitObject } from "@/lib/get-data";
import Tree from "@/feature/unit-builder/tree";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostBuildMutation } from "@/components/hooks/use-post-build-mutation";
import { useSession } from "next-auth/react";
import Loading from "react-loading";
import ImageComponent from "@/components/image-component";

const DEFAULT_UNIT_DATA: UnitData = {
  title: "",
  author: "",
  unit: "",
  ytlink: "",
  date: "",
  description: "",
  tree: {
    structure: new Map<number, number>(),
    maxlvl: 0,
  },
  doctrines: [
    { id: 1, name: "", img: "", stats: "" },
    { id: 2, name: "", img: "", stats: "" },
    { id: 3, name: "", img: "", stats: "" },
    { id: 4, name: "", img: "", stats: "" },
    { id: 5, name: "", img: "", stats: "" },
  ],
};
const unitSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character",
    })
    .max(50, { message: "Title must be less than 50 characters" }),
  unit: z.string(),
  ytlink: z.string().url({ message: "Invalid URL" }).optional(),
  author: z.string(),
  date: z.string(),
  description: z
    .string()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  tree: z
    .object({
      structure: z.record(z.number()),
      maxlvl: z.number(),
    })
    .optional(),
  doctrines: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        img: z.string(),
        stats: z.string(),
      })
    )
    .refine(
      (doctrines) => {
        const names = doctrines.map((d) => d.name);
        return new Set(names).size === names.length;
      },
      { message: "Doctrines must be unique" }
    ),
});

interface ContentProps {
  data: UnitAsset;
  unitTree: UnitObject;
  doctrines: DoctrineType[];
  dataToEdit?: UnitData;
}
const BuilderForm = ({
  data,
  unitTree,
  doctrines,
  dataToEdit,
}: ContentProps) => {
  const user = useSession();
  const postBuildMutation = usePostBuildMutation();
  const form = useForm({
    resolver: zodResolver(unitSchema),
    values: !!dataToEdit
      ? { ...dataToEdit }
      : {
          ...DEFAULT_UNIT_DATA,
          date: new Date().toString(),
          author: user.data?.user.id || "",
          unit: data.name || "",
          description: data.description || "",
          tree: {
            structure: new Map<number, number>(
              new Map(unitTree.treeStructure.map((node) => [node.id, 0]) || [])
            ),
            maxlvl: Number(unitTree?.maxlvl) || 0,
          },
        },
  });
  const values = form.getValues();

  const onSubmit = async () => {
    const data = form.getValues();
    postBuildMutation.mutate(data);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <ImageComponent
              name={data.name}
              width={64}
              height={64}
              className="object-contain"
            />
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl">
              {data.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      {...field}
                      required
                      disabled={postBuildMutation.isPending}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ytlink"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="ytlink">Youtube Link</Label>
                    <Input
                      id="ytlink"
                      type="url"
                      {...field}
                      disabled={postBuildMutation.isPending}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...field}
                      disabled={postBuildMutation.isPending}
                    />
                  </FormItem>
                )}
              />
              <Tree
                nodes={unitTree.treeStructure || []}
                unitlvl={Number(unitTree?.maxlvl) || 0}
                mode="edit"
                unitTree={unitTree}
                setValue={form.setValue}
              />
              <DoctrinedBuilder
                setValue={form.setValue}
                doctrineSlot={values.doctrines}
                unitName={data.name}
                doctrines={doctrines}
              />
              <Button
                type="submit"
                onClick={onSubmit}
                variant="custom"
                disabled={postBuildMutation.isPending}
              >
                {postBuildMutation.isPending ? (
                  <Loading color="#94a3b8" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default BuilderForm;
