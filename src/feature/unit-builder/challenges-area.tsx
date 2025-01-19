import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UnitObject } from "@/lib/get-data";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

const ChallengesArea = ({
  editMode,
  form,
}: {
  editMode: boolean;
  form: UseFormReturn<UnitObject, any, undefined>;
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "challenges",
  });
  return fields.length > 0 || editMode ? (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        Challenges
        {editMode && (
          <Button
            className="rounded-full w-fit h-fit p-0"
            variant="custom"
            onClick={() =>
              append({
                tier: fields.length + 1,
                quests: [],
              })
            }
          >
            <PlusCircle className="w-6 h-6" />
          </Button>
        )}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field, i) => (
          <Card key={field.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Tier {field.tier}
                  {editMode ? (
                    <Button
                      className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                      variant="ghost"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </Button>
                  ) : null}
                </span>

                {editMode ? (
                  <Button
                    className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                    variant="ghost"
                    onClick={() => remove(i)}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                ) : null}
              </h3>
              <ul>
                {field.quests.map((quest, index) => (
                  <li key={i}>
                    {editMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          {...form.register(`challenges.${i}.quests.${index}`)}
                        />
                        <Button
                          className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                          variant="ghost"
                          onClick={() => remove(i)}
                        >
                          <Trash2 className="w-6 h-6" />
                        </Button>
                      </div>
                    ) : (
                      quest
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ) : null;
};
export default ChallengesArea;
