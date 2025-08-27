import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormType, getPrice } from "./lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { clsx } from "clsx";

const SummaryStep = ({ form }: { form: FormType }) => {
  const [loading, setLoading] = useState(false);
  const price = getPrice(form.currency, form.plan);
  const pay = async () => {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Option 1: Use a valid Stripe price ID (recommended)
        // priceId: "price_1234567890abcdef",

        // Option 2: Use dynamic pricing
        amount: 1999, // $19.99 in cents
        currency: "usd",
        quantity: 1,
        origin: window.location.origin,
      }),
    });
    const { url } = await res.json();
    if (url) {
      window.location.href = url;
    }
  };
  const housePlanExpirated =
    form.house?.premiumEndTime != null &&
    new Date(form.house.premiumEndTime).getTime() < Date.now();

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Summary</h2>
      <Card
        className={clsx("border-2 rounded-2xl", {
          "border-slate-200": form.plan?.id === "silver",
          "border-yellow-500": form.plan?.id === "gold",
          "border-blue-500": form.plan?.id === "platinum",
        })}
      >
        <CardHeader className="flex flex-row items-center gap-1">
          {form.house?.premiumEndTime && !housePlanExpirated && (
            <span className="text-sm text-accent">
              {`${form.house?.name} is an active ${
                form.plan?.name
              } boost till ${new Date(
                form.house.premiumEndTime
              ).toLocaleDateString()}`}
            </span>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>House:</span>
              <span className="flex items-center gap-1 font-bold">
                <Image
                  src={form.house?.avatar ?? "https://i.imgur.com/4VEMy1m.png"}
                  alt={form.house?.name ?? "house"}
                  width={30}
                  height={30}
                />
                {form.house?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-bold">{form.plan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-bold">{`${form.currency} ${
                price / 100
              }`}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-bold">30 days</span>
            </div>
            <div className="flex justify-between">
              <span>Boost Expiration:</span>
              <span className="font-bold">
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <pre className="w-1">{JSON.stringify(form, null, 2)}</pre>
      <Button
        onClick={pay}
        variant="success"
        className="mt-4 w-fit"
        disabled={loading || !form.plan || !form.house}
      >
        {loading ? "Redirecting…" : "BUY"}
      </Button>
    </div>
  );
};

export default SummaryStep;
