import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

type FormColData = {
  id: number;
  name: string;
  src: string;
  leadership: number;
  masteryPoints: boolean;
  value: number;
  era: string;
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
        name={`units.${era}.${unitData.id}.value`}
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
            <FormItem className="flex items-center space-x-1 space-y-0">
              <FormControl>
                <RadioGroupItem value="0" />
              </FormControl>
              <FormLabel>Nie mam</FormLabel>
            </FormItem>
            <FormItem className="flex items-center space-x-1 space-y-0">
              <FormControl>
                <RadioGroupItem value="1" />
              </FormControl>
              <FormLabel>Mam</FormLabel>
            </FormItem>
            <FormItem className="flex items-center space-x-1 space-y-0">
              <FormControl>
                <RadioGroupItem value="2" />
              </FormControl>
              <FormLabel>Wymaksowana</FormLabel>
            </FormItem>
            <FormItem className="flex items-center space-x-1 space-y-0">
              <FormControl>
                <RadioGroupItem value="3" />
              </FormControl>
              <FormLabel>Preferuje</FormLabel>
            </FormItem>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default RadioComponent;
