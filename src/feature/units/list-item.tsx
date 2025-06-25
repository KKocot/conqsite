import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageComponent from "@/components/image-component";
import { Unit } from "@/lib/type";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ListItem = ({ units }: { units: Unit[] }) => {
  const t = useTranslations("Units");
  if (!units || units.length === 0) {
    return null;
  }
  let era;
  switch (units[0]?.era ?? "") {
    case "golden":
      era = t("golden_era");
      break;
    case "heroic":
      era = t("heroic_era");
      break;
    case "blue":
      era = t("silver_era");
      break;
    case "green":
      era = t("knight_era");
      break;
    case "grey":
      era = t("feudal_and_rustical_era");
      break;
    default:
      era = "";
  }
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
        <CardTitle>{era}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {units.map((unit) => (
          <div key={unit.id}>
            <Link
              href={`/unit/${unit.name.replaceAll(" ", "_")}`}
              className="flex items-center gap-2 p-2 hover:bg-background"
            >
              <ImageComponent name={unit.name} width={48} height={48} />
              <h1>{unit.name}</h1>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default ListItem;
