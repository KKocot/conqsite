import kits from "@/assets/kits";

const KitsArea = ({ unitName }: { unitName: string }) => {
  const kit = kits.find((kit) => kit.unit === unitName);
  const houseKit = kits.find((kit) => kit.unit === "House");
  return kit ? (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Kits</h2>

      <div>
        <img
          src={`/kits/${kit.image}`}
          alt={kit.unit}
          className="w-full h-24 object-contain mb-2"
        />
        <p className="text-sm font-medium">{`${kit.unit} kit`}</p>
      </div>
      {houseKit ? (
        <div>
          <img
            src={houseKit.image}
            alt={houseKit.unit}
            className="w-full h-24 object-contain mb-2"
          />
          <p className="text-sm font-medium">{`${houseKit.unit} house`}</p>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default KitsArea;
