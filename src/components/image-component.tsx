"use client";

import Image from "next/image";

const getImageSrc = (name: string, type: string) => {
  const nameLower = name.toLowerCase().replaceAll(/[ ':]/g, "-");
  console.log(nameLower, type);
  switch (type) {
    case "unit":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/unit-icons/${nameLower}-icon.png`;
    case "map":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/maps/${nameLower}.png`;
    case "unitCard":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/unit-cards/${nameLower}-card.png`;
    case "weapon":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/weapons/${nameLower}.png`;
    case "artillery":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/artillery/${nameLower}.png`;
    case "material":
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/materials/${nameLower}.png`;
    default:
      return `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/logo.png`;
  }
};

const ImageComponent = ({
  name,
  width = 32,
  height = 32,
  className = "",
  type = "unit",
  onClick,
}: {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  type?: "unit" | "map" | "unitCard" | "weapon" | "artillery" | "material";
  onClick?: () => void;
}) => {
  const imageSrc = getImageSrc(name, type);

  return (
    <div className="flex items-center justify-center" onClick={onClick}>
      <Image
        src={imageSrc}
        alt={name}
        id={name}
        className={className}
        width={width}
        height={height}
        onError={(e) => {
          e.currentTarget.src = `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/logo.png`; // Fallback image
        }}
      />
    </div>
  );
};

export default ImageComponent;
