import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SheetTypes } from "@/lib/type";
import { Sheet } from "lucide-react";
import { useMemo } from "react";

interface Unit {
  name: string;
  icon: string;
}

const PickedUnitsStats = ({
  sheetData,
  units,
}: {
  sheetData: SheetTypes[];
  units: Unit[];
}) => {
  const list = useMemo(() => {
    return countUniqueUnits(sheetData, units);
  }, [JSON.stringify(sheetData)]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-3">
          <Sheet className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-full overflow-y-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Sheet Stats</h1>

          <div className="flex flex-col gap-2">
            {list.map((unit) => (
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
                <p className="">{unit.count}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickedUnitsStats;

type UnitCount = {
  name: string;
  count: number;
  icon: string;
};

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
