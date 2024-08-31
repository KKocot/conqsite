import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import StepGeneral from "./step-general";
import { useLocalStorage } from "usehooks-ts";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormCol from "./form-col";
import clsx from "clsx";
import { SurveyProps } from "@/lib/type";
import { useRouter } from "next/navigation";
import Loading from "react-loading";
import { useTranslations } from "next-intl";

export const DEFAULT_FORM_DATA: SurveyProps = {
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

export default function WizardForm({
  user_id,
  avatar,
}: {
  user_id: string;
  avatar?: string;
}) {
  const t = useTranslations("AddForm");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [storage, setStorage] = useLocalStorage("MyForm", DEFAULT_FORM_DATA);
  const [unitForm, setUnitForm] = useState<SurveyProps>(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  interface Unit {
    id: number;
    value: string;
  }

  const low_units_diff = lowUnits.length - unitForm.units.low.length;
  const heroic_units_diff = heroicUnits.length - unitForm.units.heroic.length;
  const golden_units_diff = goldenUnits.length - unitForm.units.golden.length;
  const no_new_units = 0;
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
  const form = useForm({
    values: {
      ...unitForm,
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
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/survey/${user_id}`);
      const data = await response.json();
      setUnitForm(
        data.survey === null
          ? { ...DEFAULT_FORM_DATA, discordId: user_id }
          : data.survey
      );
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit = async (values: SurveyProps) => {
    const data = {
      ...values,
      discordId: user_id,
      avatar: avatar,
      house: values.house === "" ? "none" : values.house,
    };
    setStorage(data);
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
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
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
