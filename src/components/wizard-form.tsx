import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import StepGeneral from "./step-general";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import FormCol from "./form-col";
import clsx from "clsx";
import { SurveyProps } from "@/lib/type";

export const DEFAULT_FORM_DATA: SurveyProps = {
  discordNick: "",
  inGameNick: "",
  discordId: "",
  characterLevel: "",
  house: "",
  artyAmount: "none",
  weapons: weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
  units: {
    low: lowUnits.map((unit) => ({ id: unit.id, value: "0", pref: "" })),
    heroic: heroicUnits.map((unit) => ({ id: unit.id, value: "0" })),
    golden: goldenUnits.map((unit) => ({ id: unit.id, value: "0" })),
  },
};

export default function WizardForm({ user_id }: { user_id: string }) {
  const [step, setStep] = useState(1);
  const [storage, setStorage] = useLocalStorage("MyForm", DEFAULT_FORM_DATA);
  const form = useForm({
    values: storage,
  });
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/survey/${user_id}`);
      const data = await response.json();
      setStorage(data.survey);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    if (!storage) {
      fetchData();
    }
  }, []);
  const onSubmit = async (values: SurveyProps) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 gap-6"
      >
        <h1 className="text-3xl font-bold">Form</h1>
        <ul className="flex gap-4 text-primary">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-4">
              <div
                className={clsx("rounded-full", {
                  "border-4 border-primary font-bold": step === i + 1,
                })}
              >
                <Item
                  moveToStep={setStep}
                  tooltip={
                    i === 0
                      ? "General"
                      : i === 1
                      ? "Low Eras"
                      : i === 2
                      ? "Heroic Era"
                      : "Golden Era"
                  }
                  page={i + 1}
                />
              </div>
              {i !== 3 ? <MoveRight /> : null}
            </li>
          ))}
        </ul>
        {step === 1 ? (
          <FormCol
            data={lowUnits}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 2 ? (
          <FormCol
            data={heroicUnits}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 3 ? (
          <FormCol
            data={goldenUnits}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 4 ? (
          <StepGeneral form={form} moveToStep={setStep} />
        ) : null}
      </form>
    </Form>
  );
}

const Item = ({
  tooltip,
  page,
  moveToStep,
}: {
  tooltip: string;
  page: number;
  moveToStep: (e: number) => void;
}) => {
  return (
    <div
      title={tooltip}
      onClick={() => moveToStep(page)}
      className="border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-primary border-primary"
    >
      {page}
    </div>
  );
};
