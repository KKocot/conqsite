import useImage from "use-image";
import { IconElement } from "./lib/types";
import { Image } from "react-konva";
import { getImageSrc } from "./lib/lib";

// Custom component for unit icons
const UnitIconImage = ({ element }: { element: IconElement }) => {
  const src = getImageSrc(element.iconValue, element.tool);
  const [image] = useImage(`/api/images/${src}.png`);

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
