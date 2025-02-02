import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnitObject } from "@/lib/get-data";
import { PlusCircle, PlusSquare, Trash2 } from "lucide-react";
import { FC } from "react";
import ImagePickerDialog from "./image-picker-dialog";
import skills from "@/assets/skills";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Image from "next/image";

const SkillsArea: FC<{
  editMode: boolean;
  form: UseFormReturn<UnitObject, any, undefined>;
}> = ({ editMode, form }) => {
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  return (
    <div>
      {fields.length > 0 || editMode ? (
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          Skills
          {editMode && (
            <Button
              className="rounded-full w-fit h-fit p-0"
              variant="custom"
              onClick={() =>
                append({
                  name: "",
                  description: "",
                  image: "",
                })
              }
            >
              <PlusCircle className="w-6 h-6" />
            </Button>
          )}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-5">
                {editMode ? (
                  <ImagePickerDialog
                    images={skills}
                    path="skills"
                    onSetImage={(image) => {
                      update(i, { ...field, image });
                    }}
                  >
                    {field.image ? (
                      <Image
                        width={40}
                        height={40}
                        src={`/skills/${field.image}`}
                        alt={field.name}
                        className="cursor-pointer hover:border-accent border-4"
                      />
                    ) : (
                      <Button
                        variant="outline"
                        className="p-0 h-fit rounded-xl"
                      >
                        <PlusSquare className="w-10 h-10" />
                      </Button>
                    )}
                  </ImagePickerDialog>
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src={`/skills/${field.image}`}
                    alt={field.name}
                    className="object-cover rounded"
                  />
                )}
                {editMode ? (
                  <Input
                    {...form.register(`skills.${i}.name`)}
                    onChange={(e) => {
                      update(i, { ...field, name: e.target.value });
                    }}
                    value={field.name}
                  />
                ) : (
                  <h3 className="font-semibold">{field.name}</h3>
                )}
                {editMode ? (
                  <Button
                    className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                    variant="ghost"
                    onClick={() => remove(i)}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                ) : null}
              </div>
              {editMode ? (
                <Textarea
                  {...form.register(`skills.${i}.description`)}
                  onChange={(e) => {
                    update(i, { ...field, description: e.target.value });
                  }}
                  value={field.description}
                />
              ) : (
                <p className="text-sm mt-4">{field.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsArea;
