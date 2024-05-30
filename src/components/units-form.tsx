"use client";
import { Input } from "./ui/input";
import FormCol from "./form-col";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import clsx from "clsx";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Survey } from "@/db/schema/survey";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export const DEFAULT_FORM_DATA: Omit<Survey, "userId" | "id"> = {
  inGameNick: "",
  characterLevel: 0,
  artyleryAmount: "none",
  weapons: weapons.map((weapon) => ({
    id: weapon.id,
    value: 0,
  })),
  units: {
    low: lowUnits.map((unit) => ({ id: unit.id, value: "0" })),
    heroic: heroicUnits.map((unit) => ({ id: unit.id, value: "0" })),
    golden: goldenUnits.map((unit) => ({ id: unit.id, value: "0" })),
  },
};
const amounts = [
  {
    value: "none",
    label: "Nie mam",
  },
  {
    value: "some",
    label: "Malo",
  },
  {
    value: "average",
    label: "Srednio",
  },
  {
    value: "many",
    label: "Duzo",
  },
];

interface FormDataProps {
  surveyData: Survey | null;
}
export default function UnitsForm({ surveyData }: FormDataProps) {
  const session = useSession();
  const [disabled, setDisabled] = useState(false);
  const form = useForm({
    values: surveyData ?? DEFAULT_FORM_DATA,
  });
  const { fields: weaponsArray } = useFieldArray({
    control: form.control,
    name: "weapons",
  });

  const onSubmit = async (values: FormData) => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);

    try {
      await fetch(`/api/survey`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          characterLevel: 123,
          userId: session.data?.user?.id,
        }),
      });
      toast.success("Ankieta zaktualizowana!");
    } catch (error) {
      console.error(error);
      // toast.error(
      //   `Wystąpił błąd podczas ${
      //     formData._id ? "aktualizowania" : "wysyłania"
      //   } ankiety`
      // );
    }
  };

  return (
    <Form {...form}>
      <form
        // @ts-ignore
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center sm:grid sm:grid-flow-col sm:col-span-4 h-[calc(100vh-48px)]"
      >
        <div className="flex flex-col col-span-1 h-full w-fit justify-start sm:shadow-gray-600 sm:shadow-lg p-4">
          <div className="w-80 p-2 flex flex-col gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormField
                control={form.control}
                name="inGameNick"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nick w Grze</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormField
                control={form.control}
                name="characterLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Level Postaci</FormLabel>
                    <FormControl>
                      <Input {...field} min={1} type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="px-2 w-full">
            <FormField
              control={form.control}
              name="artyleryAmount"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="font-bold text-md">
                    Ilosc Artylerii
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 w-full justify-center"
                    >
                      {amounts.map((amount) => (
                        <FormItem
                          key={amount.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={amount.value}
                              className="hidden"
                            />
                          </FormControl>
                          <FormLabel
                            className={clsx(
                              "p-2 rounded-sm cursor-pointer w-24 text-center hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white border-2 border-black",
                              {
                                "bg-red-700 text-white": field.value === "none",
                              }
                            )}
                          >
                            {amount.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  className="flex items-center pt-4 pl-2"
                >
                  <>
                    <h2 className="font-bold text-md">
                      Broń i ilosc Dowodzenia
                    </h2>
                    <Info className="h-5 hover:scale-110 ease-in-out duration-300" />
                  </>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>Wybierajac Bronie,</p>
                    <p>pod nimi pojawi nam sie pole do</p>
                    <p> wpisania naszej ilosci dowodzenia na tym ekwipunku</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ul className="flex flex-wrap p-2 gap-2 w-80 justify-center">
              {weaponsArray.map((weapon, i) => (
                <li
                  key={i}
                  className="flex flex-col items-center whitespace-nowrap gap-2 h-[85px]"
                >
                  <Controller
                    name={`weapons.${i}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          title={weapons[i].name}
                          src={weapons[i].src}
                          alt={weapons[i].name}
                          onMouseUp={() => {
                            field.onChange(field.value === 0 ? 1 : 0);
                          }}
                          className={clsx(
                            "h-16 w-16 rounded-full p-2 cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                            { "bg-red-700 hover:bg-red-900": field.value }
                          )}
                        />
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          max={999}
                          className={cn(
                            "h-5 py-0 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            {
                              invisible: field.value === 0,
                            }
                          )}
                        />
                      </>
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button disabled={disabled} type="submit" className="w-full my-2">
            Wyslij
          </Button>
        </div>
        <div className="flex p-4 col-span-3 h-full sm:overflow-y-hidden flex-col xl:justify-around">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <div className="flex items-center justify-center pb-3">
                  <h2 className="font-bold text-4xl text-center">Koszary</h2>
                  <Info className="hover:scale-110 ease-in-out duration-300" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p>Wybieranie jednostek,</p>
                  <p>
                    Priorytetowo powinienes uzupelnic dane o jednostakach na
                    zwinietej liscie
                  </p>
                  <p>
                    Jesli chcesz, mozesz rozwinac liste i uzupelnic wszystkie
                    jednostki
                  </p>
                  <br />
                  <p>
                    &ldquo;Wymasterowane&ldquo;- na liscie wyborow, oznacza ze
                    mamy na jednostce dobre Doktrymy i Masterki(jesli jednostaka
                    je posiada)
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex lg:flex-row items-center sm:overflow-y-hidden flex-col xl:justify-around">
            <FormCol data={lowUnits} controller={form.control} />
            <FormCol data={heroicUnits} controller={form.control} />
            <FormCol data={goldenUnits} controller={form.control} />
          </div>
        </div>
      </form>
    </Form>
  );
}
