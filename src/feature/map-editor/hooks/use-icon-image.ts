import { useState, useEffect } from "react";
import type { IconType } from "../types";
import { UnitAsset } from "@/lib/get-data";

export const useIconImage = (iconType: IconType, units: UnitAsset[]) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const unit = units.find((u) => u.name === iconType);
    if (!unit) return;

    const img = new Image();
    img.src = unit.icon;
    img.onload = () => setImage(img);
  }, [iconType, units]);

  return image;
};
