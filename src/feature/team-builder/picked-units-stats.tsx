import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SheetTypes } from "@/lib/type";
import { Sheet } from "lucide-react";
import { useMemo } from "react";

interface Unit {
  name: string;
  icon: string;
  types: string[];
}

type UnitCount = {
  name: string;
  count: number;
  icon: string;
};

type TypeCount = {
  type: string;
  count: number;
};

const PickedUnitsStats = ({
  sheetData,
  units,
}: {
  sheetData: SheetTypes[];
  units: Unit[];
}) => {
  const unitsList = useMemo(() => {
    return countUniqueUnits(sheetData, units);
  }, [JSON.stringify(sheetData)]);

  const typeStats = useMemo(() => {
    const mainTypes = ["Range Infantry", "Melee Infantry", "Cavalry"];
    const typeCounts: Record<string, number> = {};

    unitsList.forEach((unit) => {
      const unitTypes = units.find((u) => u.name === unit.name)?.types || [];
      unitTypes.forEach((type) => {
        typeCounts[type] = (typeCounts[type] || 0) + unit.count;
      });
    });

    const mainTypeStats = mainTypes.map((type) => ({
      type,
      count: typeCounts[type] || 0,
    }));

    const otherTypeStats = Object.entries(typeCounts)
      .filter(([type]) => !mainTypes.includes(type))
      .map(([type, count]) => ({ type, count }));

    return { mainTypeStats, otherTypeStats };
  }, [unitsList, units]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-3">
          <Sheet className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Sheet Stats</h1>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Main Unit Types</h2>
              {typeStats.mainTypeStats.map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between rounded-lg bg-primary/10 p-2"
                >
                  <span>{stat.type}</span>
                  <span className="font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Other Types</h2>
              {typeStats.otherTypeStats.map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between rounded-lg bg-secondary/10 p-2"
                >
                  <span>{stat.type}</span>
                  <span className="font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Units</h2>
              {unitsList.map((unit) => (
                <div
                  key={unit.name}
                  className="flex items-center justify-between rounded-lg bg-accent pr-2 font-semibold text-background"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded-none">
                      <AvatarImage alt={unit.name} src={unit.icon} />
                    </Avatar>
                    <p>{unit.name === "" ? "Empty" : unit.name}</p>
                  </div>
                  <p>{unit.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickedUnitsStats;

function countUniqueUnits(sheetData: SheetTypes[], unit: Unit[]): UnitCount[] {
  const units = [
    ...sheetData.flatMap((user) => [user.unit1, user.unit2, user.unit3]),
  ];
  const countMap: Record<string, number> = {};

  for (const unit of units) {
    countMap[unit] = (countMap[unit] || 0) + 1;
  }

  return Object.entries(countMap).map(([name, count]) => ({
    name,
    count,
    icon: unit.find((u) => u.name === name)?.icon || "/logo.png",
  }));
}
