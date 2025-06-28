"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BotEvent, DiscordProps } from "@/lib/get-data";
import EventForm from "./event-form";
import { useBotEventMutation } from "@/components/hooks/use-bot-event-mutation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DialogDescription } from "@radix-ui/react-dialog";
import { getCloserDay } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon, PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

// Default values for the form
const defaultValues = {
  title: "My Event",
  description: "Attendance on event...",
  date_start_event: "",
  time_start_event: "",
  interval: 0,
  activity_time: 1,
  house_name: "",
  channel_id: "",
  role_id: "",
  bot_type: "Konquerus",
  signUps: [],
  active: true,
};

// Get the next TW date, next Tuesday or Saturday
const next_tw = getCloserDay();

// Sign up schema
const signUpSchema = z.object({
  name: z.string(),
  status: z.string(),
  lineup: z.string(),
  userId: z.string(),
});

const EventDialog = ({
  disabled,
  discordData,
  house,
  entry,
  roleId,
}: {
  disabled: boolean;
  discordData: DiscordProps;
  house: string;
  entry?: BotEvent;
  roleId: string;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("CommandPages.BotController");

  // Event schema with all required fields
  const putEventSchema = z.object({
    _id: z.string().optional(),
    bot_type: z.string(),
    date_start_event: z.string().min(1, t("date_required")),
    time_start_event: z.string().min(1, t("hour_required")),
    interval: z.coerce.number().min(-1),
    activity_time: z.coerce.number().min(1, t("activity_time_min")),
    title: z.string().min(1, t("title_required")),
    description: z
      .string()
      .min(1, t("description_required"))
      .max(250, t("description_too_long")),
    house_name: z.string(),
    channel_id: z.string().min(1, t("channel_required")),
    role_id: z.string().min(1, t("role_required")),
    signUps: z.array(signUpSchema),
    active: z.boolean(),
  });
  const form = useForm<BotEvent>({
    resolver: zodResolver(putEventSchema),
    values: {
      ...(entry ?? defaultValues),
      // Set house based on member house
      house_name: entry?.house_name ?? house,
      // Set role based house settings
      role_id: entry?.role_id ?? roleId,
    },
  });

  // This dialog is used for create and edit events
  const edit_mode = !!entry;

  const botEventMutation = useBotEventMutation(edit_mode ? "edit" : "create");
  const onSubmit = () => {
    const data = form.getValues();
    botEventMutation.mutate({
      ...data,
      interval: Number(data.interval),
      activity_time: Number(data.activity_time),
    });
  };

  useEffect(() => {
    // On reqiest success close dialog, reset form and show success toast message
    if (botEventMutation.isSuccess) {
      setOpen(false);
      form.reset();
      // toast.success(`Event ${edit_mode ? "update" : "created"}`);
      toast.success(
        t("event_success", {
          action: edit_mode ? t("updated") : t("created"),
        })
      );
    }
    // On request fail show error toast message
    if (botEventMutation.isError) {
      toast.error(
        t("event_failed", {
          action: edit_mode ? t("update") : t("create"),
        })
      );
    }
  }, [
    botEventMutation.isSuccess,
    botEventMutation.isPending,
    botEventMutation.isError,
    form,
  ]);

  // Date formated for input date
  const date = `${next_tw?.getFullYear()}-${String(
    Number(next_tw?.getMonth()) + 1
  ).padStart(2, "0")}-${String(next_tw?.getDate()).padStart(2, "0")}`;

  // Default TW hour
  const tw_hour = 18;

  // Default time formated for input with added timezone
  const hour = `${
    Number(next_tw?.toLocaleTimeString().split(":")[0]) + tw_hour
  }:00`;

  // Default title for TW event
  const tw_tilte = t("tw_tilte", { date: date });

  // Set default title, date and hour for TW event
  useEffect(() => {
    if (form.getValues("interval") === -1) {
      form.setValue("date_start_event", date);
      form.setValue("time_start_event", hour);
      form.setValue("title", tw_tilte);
    }
  }, [form.getValues("interval")]);

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {edit_mode ? (
              <Button variant="custom" className="rounded-full p-2 h-fit">
                <PenIcon className="w-4 h-4" />
              </Button>
            ) : (
              <TooltipTrigger asChild>
                <Button
                  variant="custom"
                  disabled={disabled}
                  className="rounded-full p-2 h-fit"
                >
                  <PlusCircle size={24} />
                </Button>
              </TooltipTrigger>
            )}
          </DialogTrigger>
          <DialogContent className="max-h-screen overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>{t("create_attendance")}</DialogTitle>
              <DialogDescription>{t("event_info")}</DialogDescription>
            </DialogHeader>
            <EventForm discordData={discordData} form={form} />
            <DialogFooter>
              <Button onClick={form.handleSubmit(onSubmit)}>
                {t("create_event")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TooltipContent> {t("create_event")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EventDialog;
