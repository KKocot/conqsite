import { useState } from "react";
import clsx from "clsx";
import { Button } from "./ui/button";
import RadioComponent from "./radio-component";

type FormColData = {
  id: number;
  name: string;
  src: string;
  leadership: number;
  masteryPoints: boolean;
  value: number;
  era: string;
};

const FormCol = ({
  data,
  controller,
}: {
  data: FormColData[];
  controller: any;
}) => {
  const [showMore, setShowMore] = useState(false);
  const sortedUnitData = showMore ? data : data.filter((e) => e.value > 7);
  const sortedData = sortedUnitData.sort((a, b) => b.value - a.value);
  return (
    <div className="sm:overflow-y-scroll flex flex-col items-center h-full w-72 relative">
      {sortedData.map((e) => (
        <div key={e.id} className="w-full">
          <h2
            className={clsx("text-lg font-medium text-center", {
              "bg-gradient-to-r from-yellow-300 to-yellow-800":
                e.era === "golden",
              "bg-gradient-to-r from-violet-300 to-violet-800":
                e.era === "heroic",
              "bg-gradient-to-r from-green-300 to-green-800": e.era === "green",
              "bg-gradient-to-r from-blue-300 to-blue-800": e.era === "blue",
              "bg-gradient-to-r from-gray-300 to-gray-800": e.era === "grey",
            })}
          >
            {e.name}
          </h2>
          <div className="items-center grid grid-cols-2">
            <div className="flex justify-center">
              <img className="h-32" src={e.src} />
            </div>
            <RadioComponent unitData={e} controller={controller} />
          </div>
        </div>
      ))}
      <Button
        className="sticky bottom-0 w-full"
        type="button"
        variant="secondary"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Pokaż mniej" : "Pokaz wiecej"}
      </Button>
    </div>
  );
};

export default FormCol;
