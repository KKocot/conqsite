"use client";

import { useState, useEffect } from "react";

export function useImageLoader(src: string | null): HTMLImageElement | null {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const onLoad = () => {
      setImage(img);
    };

    img.onload = onLoad;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return image;
}
