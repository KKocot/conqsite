import useImage from "use-image";
import { IconElement } from "./lib/types";
import { Image } from "react-konva";

// Custom component for unit icons
const UnitIconImage = ({ element }: { element: IconElement }) => {
  const unit = element.tool === "unitIcon";
  const [image] = useImage(
    `/api/images/${unit ? "unit-icons" : "artillery"}/${element.iconValue
      .toLowerCase()
      .replace(/[ ':]/g, "-")}${unit ? "-icon" : ""}.png`
  );

  if (!image) return null;
  return (
    <Image
      x={element.x - element.strokeWidth / 2}
      y={element.y - element.strokeWidth / 2}
      image={image}
      width={element.strokeWidth}
      height={element.strokeWidth}
    />
  );
};

export default UnitIconImage;
