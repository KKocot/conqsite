import { AccordionContent } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";

const CheckboxItem = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: boolean) => void;
}) => {
  return (
    <AccordionContent>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label}
          checked={checked}
          onCheckedChange={(e) => {
            onChange(e as boolean);
          }}
        />
        <label
          htmlFor={label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </AccordionContent>
  );
};
export default CheckboxItem;
