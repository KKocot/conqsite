import { CurrencyType, PlanType } from "./lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PremiumPlanItem from "./plan-item";

const planOptions: PlanType[] = [
  {
    id: "silver",
    name: "Silver",
    description: `
House:
- 1 Commanders
- 2 Team-builder Templates
- 1 Map-editor Templates
- 2 Open Attendance Events
`,
    pricePLN: 3000,
    priceEURO: 660,
    priceUSD: 730,
  },
  {
    id: "gold",
    name: "Gold",
    description: `
House:
- 1 Right Hand Role
- 2 Commanders
- 3 Team-builder Templates
- 2 Map-editor Templates
- 1 Open Attendance Cyclical Events
- 3 Open Attendance Events

Member:
- House Unit Builds
`,
    pricePLN: 6000,
    priceEURO: 1300,
    priceUSD: 1400,
  },
  {
    id: "platinum",
    name: "Platinum",
    description: `
House:
- No Limit Right Hand Role
- No Limit Commanders
- No Limit Team-builder Templates
- No Limit Map-editor Templates
- No Limit Open Attendance Cyclical Events
- No Limit Open Attendance Events
- Change house name via Konqbot

Member:
- House Unit Builds
`,
    pricePLN: 10000,
    priceEURO: 2200,
    priceUSD: 2400,
  },
];

const PickPremiumPlanStep = ({
  selectedPlan,
  onPlanSelect,
  currency,
  onCurrencyChange,
}: {
  selectedPlan: PlanType | null;
  onPlanSelect: (plan: PlanType) => void;
  currency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Select a Boost</h2>
      <div className="flex items-center self-end">
        <label htmlFor="currency" className="mr-2">
          Currency:
        </label>
        <Select
          value={currency}
          onValueChange={(e) => {
            onCurrencyChange(e as CurrencyType);
          }}
        >
          <SelectTrigger className="w-fit self-end mx-4">
            <SelectValue>{currency}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="PLN">PLN</SelectItem>
            <SelectItem value="EURO">EURO</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 justify-center">
        {planOptions.map((plan) => (
          <PremiumPlanItem
            key={plan.id}
            plan={plan}
            currency={currency}
            onPlanSelect={onPlanSelect}
            selectedPlan={selectedPlan}
          />
        ))}
      </div>
    </div>
  );
};
export default PickPremiumPlanStep;
