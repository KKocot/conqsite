import { IconElement } from "./types";

export const getImageSrc = (iconValue: string, tool: IconElement["tool"]) => {
  const value = iconValue.toLowerCase().replaceAll(/[ ':]/g, "-");

  switch (tool) {
    case "unitIcon":
      return `unit-icons/${value}-icon`;
    case "artilleryIcon":
      return `artillery/${value}`;
    case "otherIcon":
      return `other-icons/${value}`;
    default:
      return "logo";
  }
};
