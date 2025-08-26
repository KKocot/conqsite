import { PremiumStatus } from "@/lib/get-data";

export interface PlanType {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  pricePLN: number;
  priceEURO: number;
}

export type CurrencyType = "USD" | "PLN" | "EURO";

export interface FormType {
  house: PremiumStatus | null;
  plan: PlanType | null;
  currency: CurrencyType;
}

export const getPrice = (curr: CurrencyType, plan: PlanType | null) => {
  switch (curr) {
    case "EURO":
      return plan?.priceEURO ?? 0;
    case "USD":
      return plan?.priceUSD ?? 0;
    case "PLN":
      return plan?.pricePLN ?? 0;
    default:
      return 0;
  }
};
