import skills from "@/assets/skills";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

const SkillImageDialog = ({
  children,
  onSetImage,
  open,
  onOpen,
}: {
  children: ReactNode;
  onSetImage: (e: string) => void;
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  const onSubmit = () => {
    onSetImage(value);
    onOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Skill Image</DialogTitle>
          <DialogDescription>
            If Image is missing choose placeholder and report missing image on
            discord
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <div
              key={i}
              className={clsx("flex items-center gap-2 border-4", {
                "border-accent": value === skill,
              })}
            >
              <Label htmlFor={skill}>
                <img
                  src={`/skills/${skill}`}
                  title={skill}
                  className="w-10 h-10 cursor-pointer"
                />
              </Label>
              <Input
                checked={value === skill}
                onChange={() => setValue(skill)}
                className="hidden"
                id={skill}
                type="radio"
                name="skill"
                value={skill}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillImageDialog;
