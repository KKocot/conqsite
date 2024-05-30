import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import clsx from "clsx";

type FormColData = {
  id: number;
  name: string;
  src: string;
  leadership: number;
  masteryPoints: boolean;
  value: number;
  era: string;
};

const Component = ({
  unitValue,
  era,
  label,
  value,
}: {
  unitValue: string;
  era: string;
  label: string;
  value: string;
}) => {
  return (
    <FormLabel
      className={clsx(
        "p-1 w-full bg-slate-600 font-semibold rounded-sm text-white cursor-pointer hover:bg-slate-600 transition duration-300 ease-in-out transform",
        {
          "bg-gradient-to-r from-yellow-300 to-yellow-800 text-slate-800":
            unitValue === value && era === "golden",
          "hover:bg-gradient-to-r hover:to-yellow-300 hover:from-yellow-800 hover:text-white font-semibold":
            era === "golden",
          "bg-gradient-to-r from-violet-300 to-violet-800 text-slate-800":
            unitValue === value && era === "heroic",
          "hover:bg-gradient-to-r hover:to-violet-300 hover:from-violet-800 hover:text-white font-semibold":
            era === "heroic",
          "bg-gradient-to-r from-green-300 to-green-800 text-slate-800":
            unitValue === value && era === "green",
          "hover:bg-gradient-to-r hover:to-green-300 hover:from-green-800 hover:text-white font-semibold":
            era === "green",
          "bg-gradient-to-r from-blue-300 to-blue-800 text-slate-800":
            unitValue === value && era === "blue",
          "hover:bg-gradient-to-r hover:to-blue-300 hover:from-blue-800 hover:text-white font-semibold":
            era === "blue",
          "bg-gradient-to-r from-gray-300 to-gray-800 text-slate-800":
            unitValue === value && era === "grey",
          "hover:bg-gradient-to-r hover:to-gray-300 hover:from-gray-800 hover:text-white font-semibold":
            era === "grey",
        }
      )}
    >
      {label}
    </FormLabel>
  );
};
const RadioComponent: FC<{
  unitData: FormColData;
  controller: any;
}> = ({ unitData, controller }) => {
  const era =
    unitData.era === "golden"
      ? "golden"
      : unitData.era === "heroic"
      ? "heroic"
      : "low";

  return (
    <div>
      <FormField
        control={controller}
        name={`units.${era}.${unitData.id - 1}.value`}
        render={({ field }) => (
          <RadioGroup
            className="gap-1"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormItem className="flex items-center space-y-0">
              <FormControl>
                <RadioGroupItem value="0" className="hidden" />
              </FormControl>

              <Component
                unitValue={field.value}
                era={unitData.era}
                label="Nie mam"
                value="0"
              />
            </FormItem>
            <FormItem className="flex items-center space-y-0">
              <FormControl>
                <RadioGroupItem value="1" className="hidden" />
              </FormControl>
              <Component
                unitValue={field.value}
                era={unitData.era}
                label="Mam"
                value="1"
              />
            </FormItem>
            <FormItem className="flex items-center space-y-0">
              <FormControl>
                <RadioGroupItem value="2" className="hidden" />
              </FormControl>
              <Component
                unitValue={field.value}
                era={unitData.era}
                label="Wymaksowana"
                value="2"
              />
            </FormItem>
            <FormItem className="flex items-center space-y-0">
              <FormControl>
                <RadioGroupItem value="3" className="hidden" />
              </FormControl>
              <Component
                unitValue={field.value}
                era={unitData.era}
                label="Preferuje"
                value="3"
              />
            </FormItem>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default RadioComponent;
