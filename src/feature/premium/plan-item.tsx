import clsx from "clsx";
import { CurrencyType, PlanType } from "./lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const PremiumPlanItem = ({
  plan,
  currency,
  onPlanSelect,
  selectedPlan,
}: {
  plan: PlanType;
  currency: CurrencyType;
  onPlanSelect: (plan: PlanType) => void;
  selectedPlan: PlanType | null;
}) => {
  return (
    <Card
      className={clsx(
        "flex flex-col h-full border-2 rounded-2xl w-80 justify-self-center",
        {
          "border-slate-200": plan.id === "silver",
          "border-yellow-500": plan.id === "gold",
          "border-blue-500": plan.id === "platinum",
        }
      )}
    >
      <CardHeader className="text-lg font-bold">{plan.name} Plan</CardHeader>
      <CardContent className="whitespace-pre text-sm text-gray-300">
        {plan.description}
      </CardContent>
      <div className="flex-grow" />
      <CardFooter className="flex justify-center">
        <Badge
          key={plan.id}
          variant="secondary"
          onClick={() => onPlanSelect(plan)}
          className={clsx(
            "cursor-pointer items-center p-2 border-4 flex gap-2 w-48 justify-center justify-self-center",
            {
              "bg-green-400 text-black": selectedPlan?.id === plan.id,
              "border-slate-200": plan.id === "silver",
              "border-yellow-500": plan.id === "gold",
              "border-blue-500": plan.id === "platinum",
            }
          )}
        >
          <h3>{plan.name}</h3>
          {currency === "USD" && <p>${(plan.priceUSD / 100).toFixed(2)}</p>}
          {currency === "PLN" && <p>{(plan.pricePLN / 100).toFixed(2)}zł</p>}
          {currency === "EURO" && <p>€{(plan.priceEURO / 100).toFixed(2)}</p>}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PremiumPlanItem;
