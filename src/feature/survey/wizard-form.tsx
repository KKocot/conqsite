import { useState } from "react";
import StepGeneral from "./step-general";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormCol from "./form-col";
import { useTranslations } from "next-intl";
import { Survey, UnitAssetsGroup, WeaponAsset } from "@/lib/get-data";
import useSubmitSurveyMutation from "../../components/hooks/use-survey-mutation";
import LoadingComponent from "../ifs/loading";
import { createNewUnits, createNewWeapons } from "@/lib/utils";
import Steper from "@/components/steper";
import { no_new_units, no_new_weapons } from "./lib/utils";

export default function WizardForm({
  user_id,
  avatar,
  unitsAssets,
  weapons,
  profileData,
  profileIsLoading,
  surveyType,
  userHouses,
}: {
  user_id: string;
  avatar?: string;
  unitsAssets: UnitAssetsGroup;
  weapons: WeaponAsset[];
  profileData: Survey;
  profileIsLoading: boolean;
  surveyType: "main" | "sub" | "newSub";
  userHouses: string[];
}) {
  const t = useTranslations("AddForm");
  const [step, setStep] = useState(1);

  const { goldenEra, heroicEra, blueEra, greenEra, greyEra } = unitsAssets;
  const lowEras = [...greyEra, ...greenEra, ...blueEra].sort(
    (a, b) => a.id - b.id
  );

  const low_units_diff = lowEras.length - profileData.units.low.length;
  const heroic_units_diff = heroicEra.length - profileData.units.heroic.length;
  const golden_units_diff = goldenEra.length - profileData.units.golden.length;
  const weapons_diff = weapons.length - profileData.weapons.length;

  const form = useForm({
    values: {
      ...profileData,
      weapons:
        weapons_diff > no_new_weapons
          ? createNewWeapons(profileData.weapons, weapons_diff)
          : profileData.weapons,
      units: {
        low:
          low_units_diff > no_new_units
            ? createNewUnits(
                profileData.units.low,
                low_units_diff,
                profileData.units.low.length
              )
            : profileData.units.low,
        heroic:
          heroic_units_diff > no_new_units
            ? createNewUnits(
                profileData.units.heroic,
                heroic_units_diff,
                profileData.units.heroic.length
              )
            : profileData.units.heroic,
        golden:
          golden_units_diff > no_new_units
            ? createNewUnits(
                profileData.units.golden,
                golden_units_diff,
                profileData.units.golden.length
              )
            : profileData.units.golden,
      },
    },
  });

  const submitMutation = useSubmitSurveyMutation();
  const today = new Date().toString();
  const onSubmit = (values: Survey) => {
    submitMutation.mutate({
      surveyType,
      values: {
        ...values,
        updates: [...(values?.updates ?? []), today],
        discordId: user_id,
        avatar: avatar || "",
      },
    });
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
          maxSteps={4}
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
            era="low"
            data={lowEras}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 2 ? (
          <FormCol
            era="heroic"
            data={heroicEra}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 3 ? (
          <FormCol
            era="golden"
            data={goldenEra}
            controller={form.control}
            moveToStep={setStep}
            step={step}
          />
        ) : step === 4 ? (
          <StepGeneral
            form={form}
            moveToStep={setStep}
            weapons={weapons}
            surveyType={surveyType}
            userHouses={userHouses}
          />
        ) : null}
      </form>
    </Form>
  );
}
