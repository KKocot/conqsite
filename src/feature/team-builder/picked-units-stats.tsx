import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SheetTypes } from "@/lib/type";
import { Sheet } from "lucide-react";
import { useMemo } from "react";
import UnitIcon from "@/components/unit-icon";

interface Unit {
  name: string;
  types: string[];
}

type UnitCount = {
  name: string;
  count: number;
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
    return countUniqueUnits(sheetData);
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
      <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Sheet Stats</h1>

          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <h2 className="text-base font-semibold">Main Unit Types</h2>
              {typeStats.mainTypeStats.map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between rounded bg-primary/10 px-2 py-1 text-sm"
                >
                  <span>{stat.type}</span>
                  <span className="font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold">Other Types</h2>
              {typeStats.otherTypeStats.map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between rounded bg-secondary/10 px-2 py-1 text-sm"
                >
                  <span>{stat.type}</span>
                  <span className="font-semibold">{stat.count}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold">Units</h2>
              {unitsList.map((unit) => (
                <div
                  key={unit.name}
                  className="flex items-center justify-between rounded bg-accent pr-2 font-medium text-background text-sm"
                >
                  <div className="flex items-center gap-2">
                    <UnitIcon unitName={unit.name} />
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

function countUniqueUnits(sheetData: SheetTypes[]): UnitCount[] {
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
  }));
}
