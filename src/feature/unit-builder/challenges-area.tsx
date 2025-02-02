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
          <Card key={i}>
            <CardContent className="p-4 flex flex-col gap-4">
              <h3 className="font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Tier {i + 1}
                  {editMode ? (
                    <Button
                      className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                      variant="ghost"
                      onClick={() =>
                        update(i, {
                          tier: i + 1,
                          quests: [...field.quests, ""],
                        })
                      }
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
              <ul className="flex flex-col gap-2">
                {field.quests.map((quest, index) => (
                  <li key={index}>
                    {editMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          {...form.register(`challenges.${i}.quests.${index}`)}
                          value={quest}
                          onChange={(e) => {
                            const newQuests = [...field.quests];
                            newQuests[index] = e.target.value;
                            update(i, { ...field, quests: newQuests });
                          }}
                        />
                        <Button
                          className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                          variant="ghost"
                          onClick={() => {
                            const newQuests = [...field.quests];
                            newQuests.splice(index, 1);
                            update(i, { ...field, quests: newQuests });
                          }}
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
