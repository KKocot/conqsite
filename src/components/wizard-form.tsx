import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import StepGeneral from "./step-general";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormCol from "./form-col";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Loading from "react-loading";
import { useTranslations } from "next-intl";
import { getSurvey, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

export const DEFAULT_FORM_DATA: Survey = {
  discordNick: "",
  inGameNick: "",
  discordId: "",
  characterLevel: "",
  avatar: "",
  house: "",
  artyAmount: "none",
  weapons: weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
  units: {
    low: lowUnits.map((unit) => ({ id: unit.id, value: "0", pref: "0" })),
    heroic: heroicUnits.map((unit) => ({ id: unit.id, value: "0" })),
    golden: goldenUnits.map((unit) => ({ id: unit.id, value: "0" })),
  },
};
interface Unit {
  id: number;
  value: string;
}
const createNewUnits = (
  existingUnits: Unit[],
  diff: number,
  baseId: number
): Unit[] => {
  const newUnits: Unit[] = [];
  for (let i = 0; i < diff; i++) {
    newUnits.push({ id: baseId + i + 1, value: "0" });
  }
  return [...existingUnits, ...newUnits];
};

export default function WizardForm({
  user_id,
  avatar,
}: {
  user_id: string;
  avatar?: string;
}) {
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryKey: ["profile", user_id],
    queryFn: () => getSurvey(user_id),
    enabled: !!user_id,
  });

  const t = useTranslations("AddForm");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const no_new_units = 0;
  const low_units_diff = profileData
    ? lowUnits.length - profileData.units.low.length
    : 0;
  const heroic_units_diff = profileData
    ? heroicUnits.length - profileData.units.heroic.length
    : 0;
  const golden_units_diff = profileData
    ? goldenUnits.length - profileData.units.golden.length
    : 0;
  const form = useForm({
    values: {
      ...profileData,
      discordNick: profileData?.discordNick ?? "",
      inGameNick: profileData?.inGameNick ?? "",
      discordId: profileData?.discordId ?? "",
      characterLevel: profileData?.characterLevel ?? "",
      avatar: profileData?.avatar ?? "",
      house: profileData?.house ?? "",
      artyAmount: profileData?.artyAmount ?? "none",
      weapons:
        profileData?.weapons ??
        weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
      units: {
        low:
          low_units_diff > no_new_units
            ? createNewUnits(
                profileData?.units.low ?? [],
                low_units_diff,
                profileData?.units.low.length ?? 0
              )
            : profileData?.units.low ?? [],
        heroic:
          heroic_units_diff > no_new_units
            ? createNewUnits(
                profileData?.units.heroic ?? [],
                heroic_units_diff,
                profileData?.units.heroic.length ?? 0
              )
            : profileData?.units.heroic ?? [],
        golden:
          golden_units_diff > no_new_units
            ? createNewUnits(
                profileData?.units.golden ?? [],
                golden_units_diff,
                profileData?.units.golden.length ?? 0
              )
            : profileData?.units.golden ?? [],
      },
    },
  });
  const onSubmit = async (values: Survey) => {
    const data = {
      ...values,
      discordId: user_id,
      avatar: avatar,
      house: values.house === "" ? "none" : values.house,
    };
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
    router.push(`/profile`);
  };
  if (profileIsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Fill form first
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 gap-6"
      >
        <h1 className="text-3xl font-bold">{t("form")}</h1>
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
      className="border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-primary border-primary"
    >
      {page}
    </div>
  );
};
