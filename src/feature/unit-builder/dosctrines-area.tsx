import { epicDoctrines, rareDoctrines } from "@/assets/doctrines";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const DoctrinesArea = ({ unitName }: { unitName: string }) => {
  const doctrines = [...epicDoctrines, ...rareDoctrines].filter(
    (doctrine) =>
      doctrine.dedicated === "unit" && doctrine.forUnit.includes(unitName)
  );
  return doctrines.length === 0 ? null : (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Dedicated Doctrines
      </h2>
      <div className="flex gap-4">
        {doctrines.map((doctrine) => (
          <div
            key={doctrine.name}
            className="text-center flex flex-col items-center"
          >
            <Avatar className="w-fit h-24 object-contain mb-2 rounded-none">
              <AvatarImage src={doctrine.img} alt={`${doctrine.name} avatar`} />
            </Avatar>
            <p className="text-sm font-medium">{doctrine.stats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DoctrinesArea;
