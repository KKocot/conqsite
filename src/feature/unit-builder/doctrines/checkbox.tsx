"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

const CheckboxItem = ({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: () => void;
  id: string;
}) => {
  return (
    <div
      className={clsx(
        "text-background border-x-8 flex items-center rounded-3xl",
        {
          "border-background": checked,
          "border-accent": !checked,
        }
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="hidden"
      />
      <Label htmlFor={id} className="cursor-pointer p-2">
        {id}
      </Label>
    </div>
  );
};

export default CheckboxItem;
