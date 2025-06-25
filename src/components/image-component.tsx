"use client";

import Image from "next/image";

const ImageComponent = ({
  name,
  width = 32,
  height = 32,
  className = "",
  type = "unit",
}: {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  type?: "unit" | "map" | "unitCard";
}) => {
  const nameLower = name.toLowerCase().replaceAll(/[ ':]/g, "-");
  let imageSrc = "";
  switch (type) {
    case "unit":
      imageSrc = `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/unit-icons/${nameLower}-icon.png`;
      break;
    case "map":
      imageSrc = `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/maps/${nameLower}.png`;
      break;
    case "unitCard":
      imageSrc = `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/unit-cards/${nameLower}-card.png`;
      break;
    default:
      imageSrc = "/logo.png";
  }

  return (
    <div className="flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={name}
        className={className}
        width={width}
        height={height}
        onError={(e) => {
          e.currentTarget.src = "/logo.png"; // Fallback image
        }}
      />
    </div>
  );
};

export default ImageComponent;
