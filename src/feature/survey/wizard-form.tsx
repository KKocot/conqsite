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
  profileData?: Survey;
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
  const DEFAULT_FORM_DATA: Survey = {
    discordNick: "",
    inGameNick: "",
    discordId: "",
    characterLevel: "",
    avatar: "",
    house: userHouses,
    artyAmount: "none",
    updates: [],
    weapons: weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
    units: {
      low: lowEras.map((unit) => ({
        id: unit.id,
        value: "0",
        pref: "0",
        reduceCost: false,
      })),
      heroic: heroicEra.map((unit) => ({
        id: unit.id,
        value: "0",
        reduceCost: false,
      })),
      golden: goldenEra.map((unit) => ({
        id: unit.id,
        value: "0",
        reduceCost: false,
      })),
    },
  };
  const unitForm = profileData ?? DEFAULT_FORM_DATA;
  const low_units_diff = lowEras.length - unitForm.units.low.length;
  const heroic_units_diff = heroicEra.length - unitForm.units.heroic.length;
  const golden_units_diff = goldenEra.length - unitForm.units.golden.length;
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
