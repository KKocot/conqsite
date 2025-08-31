"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "../../components/ui/button";
import RadioComponent from "./radio-component";
import { useTranslations } from "next-intl";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { CustomSwitch } from "@/components/ui/customSwitch";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Unit } from "@/lib/type";
import Image from "next/image";
import { FormSurveyControl } from "./lib/utils";

const FormCol = ({
  era,
  data,
  controller,
  moveToStep,
  step,
}: {
  era: "golden" | "heroic" | "low";
  data: Unit[];
  controller: FormSurveyControl;
  moveToStep: (step: number) => void;
  step: number;
}) => {
  const t = useTranslations("AddForm");
  const [showMore, setShowMore] = useState(false);
  const sortedUnitData = showMore ? data : data.filter((e) => e.value > 7);
  const sortedData = sortedUnitData.sort((a, b) => b.value - a.value);
  return (
    <div className="flex flex-wrap sm:shadow-gray-600 sm:shadow-lg p-4 gap-4 justify-center">
      {sortedData.map((e) => (
        <div key={e.id + e.name} className="w-[270px]">
          <h2
            className={clsx("text-lg font-medium text-center", {
              "bg-gradient-to-r from-yellow-300 to-yellow-800":
                e.era === "golden",
              "bg-gradient-to-r from-violet-300 to-violet-800":
                e.era === "heroic",
              "bg-gradient-to-r from-green-300 to-green-800": e.era === "green",
              "bg-gradient-to-r from-blue-300 to-blue-800": e.era === "blue",
              "bg-gradient-to-r from-gray-300 to-gray-800": e.era === "grey",
            })}
          >
            {e.name}
          </h2>
          <div className="items-center grid grid-cols-2">
            <div className="flex justify-center">
              <Image
                width={160}
                height={160}
                alt={e.name}
                src={`${
                  process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                }/images/units-cards/${e.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}-sm.png`}
              />
            </div>
            <RadioComponent unitData={e} controller={controller} era={era} />
          </div>
          <FormField
            control={controller}
            name={`units.${era}.${e.id - 1}.reduceCost`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center">
                    <CustomSwitch
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? true : false)
                      }
                      label="Leadership Doctrine"
                      icon={
                        field.value === true ? (
                          <ShieldCheck className="h-3 w-3" />
                        ) : (
                          <ShieldX className="h-3 w-3" />
                        )
                      }
                      variant="warning"
                      size="lg"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        className="sticky bottom-0 w-full"
        type="button"
        variant="custom"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? t("show_meta_only") : t("show_all")}
      </Button>
      <div className="flex w-full gap-4">
        <Button
          type="button"
          onClick={() => moveToStep(step - 1)}
          disabled={step === 1}
          className="w-1/2"
          variant="custom"
        >
          {t("previous")}
        </Button>

        <Button
          type="button"
          onClick={() => moveToStep(step + 1)}
          className="w-1/2"
          variant="custom"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default FormCol;
