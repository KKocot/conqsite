import { MoveRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import StepGeneral from "./step-general";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { FormData } from "@/lib/type";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import FormCol from "./form-col";

export const DEFAULT_FORM_DATA: FormData = {
  discordNick: "",
  inGameNick: "",
  discordId: "",
  characterLevel: "",
  artyAmount: "none",
  weapons: weapons.map(() => ({ value: false, leadership: 0, preferences: 0 })),
  units: {
    low: lowUnits.map((unit) => ({ id: unit.id, value: "0" })),
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
  const onSubmit = async (values: FormData) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 gap-6"
      >
        <h1 className="text-3xl font-bold">Form</h1>
        <ul className="flex gap-4 items-center">
          <Item tooltip="General" page={1} moveToStep={setStep} />
          <MoveRight />
          <Item tooltip="Low Eras" page={2} moveToStep={setStep} />
          <MoveRight />
          <Item tooltip="Heroic Era" page={3} moveToStep={setStep} />
          <MoveRight />
          <Item tooltip="Golden Era" page={4} moveToStep={setStep} />
        </ul>
        {step === 1 ? (
          <StepGeneral form={form} />
        ) : step === 2 ? (
          <FormCol data={lowUnits} controller={form.control} />
        ) : step === 3 ? (
          <FormCol data={heroicUnits} controller={form.control} />
        ) : step === 4 ? (
          <FormCol data={goldenUnits} controller={form.control} />
        ) : null}
        <div className="flex justify-around w-full">
          <Button
            disabled={step === 1}
            onClick={() => setStep((prev) => prev - 1)}
            type="button"
          >
            Previous
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((prev) => prev + 1)} type="button">
              Next
            </Button>
          ) : (
            <Link
              className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              href={`/profile/${user_id}`}
              type="submit"
            >
              Send
            </Link>
          )}
        </div>
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
    <li
      title={tooltip}
      onClick={() => moveToStep(page)}
      className="border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-primary border-primary"
    >
      {page}
    </li>
  );
};
