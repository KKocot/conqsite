import React, { useId } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotEvent, DiscordProps } from "@/lib/get-data";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const EventForm = ({
  discordData,
  form,
}: {
  discordData: DiscordProps;
  form: UseFormReturn<BotEvent, any, undefined>;
}) => {
  const t = useTranslations("CommandPages.BotController");
  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_start_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">{t("date_text")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.getValues("interval") === -1}
                    required
                    type="date"
                    {...field}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  {t("date")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_start_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">{t("hour_text")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.getValues("interval") === -1}
                    id="time"
                    type="time"
                    {...field}
                    required
                    min={1}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  {t("hour")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">{t("interval_text")}</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <div>
                    <Label htmlFor="tw" className="cursor-pointer">
                      <Badge
                        className={clsx("p-3 text-sm", {
                          "bg-accent text-slate-900 font-bold":
                            field.value === -1,
                        })}
                      >
                        {t("tw")}
                      </Badge>
                    </Label>
                    <Input
                      id="tw"
                      type="radio"
                      checked={field.value === -1}
                      onChange={() => field.onChange(-1)}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <Label htmlFor="never" className="cursor-pointer">
                      <Badge
                        className={clsx("p-3 text-sm", {
                          "bg-accent text-slate-900 font-bold":
                            field.value === 0,
                        })}
                      >
                        {t("never")}
                      </Badge>
                    </Label>
                    <Input
                      id="never"
                      type="radio"
                      checked={field.value === 0}
                      onChange={() => field.onChange(0)}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom" className="cursor-pointer">
                      <Badge
                        className={clsx("p-3 text-sm", {
                          "bg-accent text-slate-900 font-bold":
                            field.value === 1,
                        })}
                      >
                        Custom
                      </Badge>
                    </Label>
                    <Input
                      id="custom"
                      type="radio"
                      checked={field.value === 1}
                      onChange={() => field.onChange(1)}
                      className="hidden"
                    />
                  </div>
                  {field.value > 0 ? (
                    <Input id="interval" type="number" {...field} />
                  ) : null}
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                {t("interval")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="channel_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">{t("channel_text")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {discordData.channels.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                {t("channel")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("advanced_settings")}</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{t("title_text")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required min={1} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t("title")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      {t("description_text")}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required min={1} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t("enter_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activity_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      {t("activity_time_title")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="activity_time"
                        type="number"
                        {...field}
                        min={1}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t("activity_time_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{t("role_text")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_role")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {discordData.roles.map((e) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      {t("role_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};

export default EventForm;
