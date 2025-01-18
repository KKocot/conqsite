import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnitObject } from "@/lib/get-data";
import { PlusCircle, PlusSquare, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import SkillImageDialog from "./skills-image-dialog";

const SkillsArea = ({
  unit,
  editMode,
  setUnit,
}: {
  unit: UnitObject;
  editMode: boolean;
  setUnit: Dispatch<SetStateAction<UnitObject>>;
}) => {
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const onAddSkill = () => {
    setUnit((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          name: "",
          description: "",
          image: "",
        },
      ],
    }));
  };
  const onRemoveSkill = (index: number) => {
    const newSkills = [...unit.skills];
    newSkills.splice(index, 1);
    setUnit((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };
  const setImage = (image: string, i: number) => {
    const newSkills = [...unit.skills];
    newSkills[i].image = image;
    setUnit((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        Skills
        {editMode ? (
          <Button
            className="rounded-full w-fit h-fit p-0"
            variant="custom"
            onClick={onAddSkill}
          >
            <PlusCircle className="w-6 h-6" />
          </Button>
        ) : null}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {unit?.skills
          ? unit?.skills.map((skill, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-5">
                    {editMode ? (
                      <SkillImageDialog
                        open={openImagePicker}
                        onOpen={setOpenImagePicker}
                        onSetImage={(image) => {
                          setImage(image, i);
                        }}
                      >
                        {skill.image ? (
                          <img
                            src={`/skills/${skill.image}`}
                            alt={skill.name}
                            className="h-10 w-10 cursor-pointer hover:border-accent border-4"
                          />
                        ) : (
                          <Button
                            variant="outline"
                            className="p-0 h-fit rounded-xl"
                          >
                            <PlusSquare className="w-10 h-10" />
                          </Button>
                        )}
                      </SkillImageDialog>
                    ) : (
                      <img
                        src={`/skills/${skill.image}`}
                        alt={skill.name}
                        className="object-cover rounded h-10 w-10"
                      />
                    )}
                    {editMode ? (
                      <Input
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...unit.skills];
                          newSkills[i].name = e.target.value;
                          setUnit((prev) => ({
                            ...prev,
                            skills: newSkills,
                          }));
                        }}
                      />
                    ) : (
                      <h3 className="font-semibold">{skill.name}</h3>
                    )}
                    {editMode ? (
                      <Button
                        className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                        variant="ghost"
                        onClick={() => onRemoveSkill(i)}
                      >
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    ) : null}
                  </div>
                  {editMode ? (
                    <Textarea
                      value={skill.description}
                      onChange={(e) => {
                        const newSkills = [...unit.skills];
                        newSkills[i].description = e.target.value;
                        setUnit((prev) => ({
                          ...prev,
                          skills: newSkills,
                        }));
                      }}
                    />
                  ) : (
                    <p className="text-sm mt-4">{skill.description}</p>
                  )}
                </CardContent>
              </Card>
            ))
          : "No information yet"}
      </div>
    </div>
  );
};

export default SkillsArea;
