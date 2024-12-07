import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { Unit } from "@/lib/type";
import Link from "next/link";

const Page = () => {
  const units = [goldenUnits, heroicUnits, blueUnits, greenUnits, greyUnits];
  return (
    <div className="flex container">
      {units.map((unit) => (
        <List units={unit} />
      ))}
    </div>
  );
};
export default Page;

const List = ({ units }: { units: Unit[] }) => {
  return (
    <ul>
      {units.map((unit) => (
        <li key={unit.id}>
          <Link
            href={`/unit/${unit.era}/${unit.name
              .toLowerCase()
              .replace(" ", "-")}`}
            className="flex items-center gap-2 p-2 hover:bg-background"
          >
            <img src={unit.icon} alt={unit.name} className="w-12" />
            <h1>{unit.name}</h1>
          </Link>
        </li>
      ))}
    </ul>
  );
};
