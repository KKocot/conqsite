"use client";

import Steper from "@/components/steper";
import { Button } from "@/components/ui/button";
import { FormType } from "@/feature/premium/lib/utils";
import PickHouseStep from "@/feature/premium/pick-house-step";
import PickPremiumPlanStep from "@/feature/premium/pick-premium-plan-step";
import SummaryStep from "@/feature/premium/summary-step";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useState } from "react";

const Content = () => {
  const [form, setForm] = useState<FormType>({
    house: null,
    plan: null,
    currency: "USD",
  });
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col p-12 w-full gap-8">
      <h1 className="text-2xl font-bold text-center">Premium</h1>
      <Steper
        tooltips={[]}
        step={step}
        maxSteps={3}
        className="flex justify-center sm:mb-[-76px]"
      />
      <div className="flex items-center justify-between">
        <Button
          disabled={step === 1}
          variant="custom"
          className="flex items-center gap-2"
          onClick={() => setStep((prev) => prev - 1)}
        >
          <ArrowLeftSquare />
          <span>Back</span>
        </Button>
        <Button
          disabled={
            (step === 1 && form.house === null) ||
            (step === 2 && form.plan === null) ||
            step === 3
          }
          variant="custom"
          className="flex items-center gap-2"
          onClick={() => setStep((prev) => prev + 1)}
        >
          <span>Next</span>
          <ArrowRightSquare />
        </Button>
      </div>
      {step === 1 ? (
        <PickHouseStep
          selectedHouse={form.house}
          onHouseSelect={(house) => {
            setForm((prev) => ({ ...prev, house }));
            setStep(2);
          }}
        />
      ) : null}
      {step === 2 ? (
        <PickPremiumPlanStep
          selectedPlan={form.plan}
          onPlanSelect={(plan) => {
            setForm((prev) => ({ ...prev, plan }));
            setStep(3);
          }}
          currency={form.currency}
          onCurrencyChange={(currency) => {
            setForm((prev) => ({ ...prev, currency }));
          }}
        />
      ) : null}
      {step === 3 ? <SummaryStep form={form} /> : null}
    </div>
  );
};

export default Content;
