import { MoveRight } from "lucide-react";
import { useState } from "react";
import StepGeneral from "./step-general";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormCol from "./form-col";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getSurvey, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import useSubmitSurvey from "../../components/hooks/use-submit-survey";
import LoadingComponent from "../ifs/loading";
import { createNewUnits, createNewWeapons } from "@/lib/utils";

export const DEFAULT_FORM_DATA: Survey = {
  discordNick: "",
  inGameNick: "",
  discordId: "",
  characterLevel: "",
  avatar: "",
  house: [],
  artyAmount: "none",
  weapons: weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
  units: {
    low: lowUnits.map((unit) => ({ id: unit.id, value: "0", pref: "0" })),
    heroic: heroicUnits.map((unit) => ({ id: unit.id, value: "0" })),
    golden: goldenUnits.map((unit) => ({ id: unit.id, value: "0" })),
  },
};

export default function WizardForm({
  user_id,
  avatar,
}: {
  user_id: string;
  avatar?: string;
}) {
  const t = useTranslations("AddForm");
  const [step, setStep] = useState(1);
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryKey: ["profile", user_id],
    queryFn: () => getSurvey(user_id),
    enabled: !!user_id,
  });

  const unitForm = profileData ?? DEFAULT_FORM_DATA;

  const low_units_diff = lowUnits.length - unitForm.units.low.length;
  const heroic_units_diff = heroicUnits.length - unitForm.units.heroic.length;
  const golden_units_diff = goldenUnits.length - unitForm.units.golden.length;
  const no_new_units = 0;
  const weapons_diff = weapons.length - unitForm.weapons.length;
  const no_new_weapons = 0;

  const form = useForm({
    values: {
      ...unitForm,
      weapons:
        weapons_diff > no_new_weapons
          ? createNewWeapons(unitForm.weapons, weapons_diff)
          : unitForm.weapons,
      units: {
        low:
          low_units_diff > no_new_units
            ? createNewUnits(
                unitForm.units.low,
                low_units_diff,
                unitForm.units.low.length
              )
            : unitForm.units.low,
        heroic:
          heroic_units_diff > no_new_units
            ? createNewUnits(
                unitForm.units.heroic,
                heroic_units_diff,
                unitForm.units.heroic.length
              )
            : unitForm.units.heroic,
        golden:
          golden_units_diff > no_new_units
            ? createNewUnits(
                unitForm.units.golden,
                golden_units_diff,
                unitForm.units.golden.length
              )
            : unitForm.units.golden,
      },
    },
  });

  const submitMutation = useSubmitSurvey();

  const onSubmit = (values: Survey) => {
    submitMutation.mutate({ values, user_id, avatar: avatar || "" });
  };
  if (profileIsLoading || submitMutation.isPending) return <LoadingComponent />;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 gap-6 w-full"
      >
        <h1 className="text-3xl font-bold">{t("form")}</h1>
        <ul className="flex gap-4 text-accent">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-4">
              <div
                className={clsx("rounded-full", {
                  "border-4 border-accent font-bold": step === i + 1,
                })}
              >
                <Item
                  moveToStep={setStep}
                  tooltip={
                    i === 0
                      ? t("low_eras")
                      : i === 1
                      ? t("heroic_eras")
                      : i === 2
                      ? t("golden_era")
                      : t("general")
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
      className="border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-accent border-accent"
    >
      {page}
    </div>
  );
};
