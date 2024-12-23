import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Unit } from "@/lib/type";
import clsx from "clsx";
import Link from "next/link";

const Page = () => {
  const units = [goldenUnits, heroicUnits, blueUnits, greenUnits, greyUnits];
  return (
    <div className="flex flex-col gap-6 container">
      {units.map((unit, index) => (
        <List key={index} units={unit} />
      ))}
    </div>
  );
};
export default Page;

const List = ({ units }: { units: Unit[] }) => {
  return (
    <Card>
      <CardHeader
        className={clsx({
          "bg-gradient-to-l from-yellow-300 to-yellow-800":
            units[0].era === "golden",
          "bg-gradient-to-l from-violet-300 to-violet-800":
            units[0].era === "heroic",
          "bg-gradient-to-l from-green-300 to-green-800":
            units[0].era === "green",
          "bg-gradient-to-l from-blue-300 to-blue-800": units[0].era === "blue",
          "bg-gradient-to-l from-gray-300 to-gray-800": units[0].era === "grey",
        })}
      >
        <CardTitle>{`${
          units[0].era.charAt(0).toUpperCase() + units[0].era.slice(1)
        } Units`}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {units.map((unit) => (
          <div key={unit.id}>
            <Link
              href={`/unit/${unit.era}/${unit.name
                .toLowerCase()
                .replaceAll(" ", "_")}`}
              className="flex items-center gap-2 p-2 hover:bg-background"
            >
              <img src={unit.icon} alt={unit.name} className="w-12" />
              <h1>{unit.name}</h1>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
