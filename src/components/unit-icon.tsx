"use client";

import Image from "next/image";

const UnitIcon = ({
  unitName,
  width = 32,
  height = 32,
  className = "",
}: {
  unitName: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  const unitImage = `${
    process.env.NEXT_PUBLIC_IMAGES_IP_HOST
  }/images/unit-icons/${unitName
    .toLowerCase()
    .replace(/[ ':]/g, "-")}-icon.png`;

  return (
    <div className="flex items-center justify-center">
      <Image
        src={unitImage}
        alt={unitName}
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

export default UnitIcon;
