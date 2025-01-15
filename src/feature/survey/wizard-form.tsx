import { useState } from "react";
import StepGeneral from "./step-general";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormCol from "./form-col";
import { useTranslations } from "next-intl";
import { getSurvey, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import useSubmitSurveyMutation from "../../components/hooks/use-survey-mutation";
import LoadingComponent from "../ifs/loading";
import { createNewUnits, createNewWeapons } from "@/lib/utils";
import Steper from "@/components/steper";

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

  const submitMutation = useSubmitSurveyMutation();

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
        <Steper
          step={step}
          tooltips={[
            t("low_eras"),
            t("heroic_eras"),
            t("golden_era"),
            t("general"),
          ]}
        />
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
