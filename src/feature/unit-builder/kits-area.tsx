import { KitsAssets } from "@/lib/get-data";
import Image from "next/image";

const KitsArea = ({ kits }: { kits: KitsAssets[] }) => {
  return kits.length !== 0 ? (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Kits</h2>
      <div>
        <div className="flex">
          {kits.map((kit, i) => (
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
