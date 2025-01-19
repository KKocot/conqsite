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
import Image from "next/image";
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
  const [open, setOpen] = useState(false);

  const id = useId();
  const [value, setValue] = useState("");
  const onSubmit = () => {
    onSetImage(value);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <Image
                  src={`/${path}/${image}`}
                  title={image}
                  alt={image}
                  width={40}
                  height={40}
                  className="cursor-pointer"
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
