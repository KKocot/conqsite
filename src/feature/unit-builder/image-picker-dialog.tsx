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
import { ReactNode, useId, useState } from "react";

const ImagePickerDialog = ({
  children,
  onSetImage,
  images,
  path,
}: {
  children: ReactNode;
  onSetImage: (e: string) => void;
  images: string[];
  path: string;
}) => {
  const [open, setOpenImagePicker] = useState(false);

  const id = useId();
  const [value, setValue] = useState("");
  const onSubmit = () => {
    onSetImage(value);
    setOpenImagePicker(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpenImagePicker}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-96 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Choose image</DialogTitle>
          <DialogDescription>
            If Image is missing choose placeholder and report missing image on
            discord
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 w-full justify-center">
          {images.map((image, i) => (
            <div
              key={i}
              className={clsx("flex items-center gap-2 border-4", {
                "border-accent": value === image,
              })}
            >
              <Label htmlFor={id + "_" + image}>
                <img
                  src={`/${path}/${image}`}
                  title={image}
                  className="w-10 h-10 cursor-pointer"
                />
              </Label>
              <Input
                checked={value === image}
                onChange={() => setValue(image)}
                className="hidden"
                id={id + "_" + image}
                type="radio"
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

export default ImagePickerDialog;
