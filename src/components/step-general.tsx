import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { weapons } from "@/assets/weapons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { HouseDetails } from "@/lib/get-data";

const StepGeneral = ({
  form,
  moveToStep,
}: {
  form: any;
  moveToStep: (e: number) => void;
}) => {
  const [houses, setHouses] = useState<HouseDetails[]>([]);
  const fetchHouses = async () => {
    try {
      const response = await fetch("/api/house");
      const data = await response.json();
      setHouses(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    fetchHouses();
  }, []);

  const t = useTranslations("AddForm");
  const prev_step = 3;
  return (
    <div className="flex flex-col sm:shadow-gray-600 dark:sm:shadow-slate-900 sm:shadow-lg p-4 gap-4">
      <div className="flex flex-col sm:flex-row justify-start p-4 gap-4">
        <div className="flex flex-col gap-2 min-w-56">
          <FormField
            control={form.control}
            name="discordNick"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("discord_nick")}</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inGameNick"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("nick_in_game")}</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="characterLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("hero_level")}</FormLabel>
                <FormControl>
                  <Input {...field} min={1} type="number" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="house"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("house")}</FormLabel>
                <Select
                  disabled={true}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your house" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {houses.map((e) => (
                      <SelectItem value={e.name} key={e.name}>
                        {e.name} - {e.server}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="artyAmount"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="font-bold text-md">
                  {t("amount_of_artillery")}
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 w-full justify-center"
                >
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="none" className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        "p-2 rounded-sm cursor-pointer w-24 text-center hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white border-2 border-black",
                        {
                          "bg-red-700 text-white": field.value === "none",
                        }
                      )}
                    >
                      {t("not_at_all")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="some" className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        "p-2 rounded-sm cursor-pointer w-24 text-center hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white border-2 border-black",
                        {
                          "bg-red-700 text-white": field.value === "some",
                        }
                      )}
                    >
                      {t("some")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="average" className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        "p-2 rounded-sm cursor-pointer w-24 text-center hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white border-2 border-black",
                        {
                          "bg-red-700 text-white": field.value === "average",
                        }
                      )}
                    >
                      {t("average")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="aLot" className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        "p-2 rounded-sm cursor-pointer w-24 text-center hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white border-2 border-black",
                        {
                          "bg-red-700 text-white": field.value === "aLot",
                        }
                      )}
                    >
                      {t("a_lot")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button" className="flex items-center">
                <>
                  <h2 className="font-bold text-md">{t("weapons")}</h2>
                  <Info className="h-5 hover:scale-110 ease-in-out duration-300" />
                </>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p>1 - {t("i_preffer")}</p>
                  <p>4 - {t("not_preffer")}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ul className="flex flex-wrap p-2 gap-2">
            {form.watch("weapons").map((e: any, i: number) => (
              <li
                key={i}
                className="flex flex-col items-center whitespace-nowrap gap-2 h-[200px]"
              >
                <img
                  title={weapons[i].name}
                  src={weapons[i].src}
                  alt={weapons[i].name}
                  onClick={() => {
                    const newValue = !e.value;
                    form.setValue(`weapons.${i}.value`, newValue);
                    if (!newValue) {
                      form.setValue(`weapons.${i}.leadership`, 0);
                    }
                  }}
                  className={clsx(
                    "h-20 w-20 rounded-full p-2 mx-6 cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                    { "bg-red-700 hover:bg-red-900": e.value }
                  )}
                />
                {e.value ? (
                  <>
                    <Controller
                      name={`weapons.${i}.leadership`}
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <Label className="font-bold text-xs">
                            {t("leadership")}
                          </Label>
                          <Input
                            {...field}
                            type="number"
                            min={700}
                            max={800}
                            className="h-5 py-0 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={(event) => {
                              const leadershipValue = parseInt(
                                event.target.value
                              );
                              form.setValue(
                                `weapons.${i}.leadership`,
                                leadershipValue
                              );
                            }}
                          />
                        </>
                      )}
                    />
                    <Controller
                      name={`weapons.${i}.pref`}
                      control={form.control}
                      render={({ field }) => (
                        <>
                          <Label className="font-bold text-xs">
                            {t("preferences")}
                          </Label>
                          <Input
                            {...field}
                            type="number"
                            min={1}
                            max={4}
                            className="h-5 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={(event) => {
                              const preferencesValue = parseInt(
                                event.target.value
                              );
                              form.setValue(
                                `weapons.${i}.pref`,
                                preferencesValue
                              );
                            }}
                          />
                        </>
                      )}
                    />
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          type="button"
          onClick={() => moveToStep(prev_step)}
          className="w-1/2 bg-accent text-background text-md font-bold hover:text-accent"
        >
          {t("previous")}
        </Button>

        <Button
          type="submit"
          className="w-1/2 bg-accent text-background text-md font-bold hover:text-accent"
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};
export default StepGeneral;
