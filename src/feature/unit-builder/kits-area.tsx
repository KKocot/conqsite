import kits from "@/assets/kits";
import Image from "next/image";

const KitsArea = ({ unitName }: { unitName: string }) => {
  const filteredKits = kits.filter((kit) => kit.unit === unitName);

  return filteredKits ? (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Kits</h2>
      <div>
        <div className="flex">
          {filteredKits.map((kit, i) => (
            <Image
              key={i}
              src={`/kits/${kit.image}`}
              alt={kit.unit}
              width={96}
              height={96}
              className="object-contain mb-2"
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default KitsArea;
