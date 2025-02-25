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
import { useAddBotEventMutation } from "@/components/hooks/use-bot-event-mutation";
import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DialogDescription } from "@radix-ui/react-dialog";
import { getCloserDay } from "@/lib/utils";

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
};
const next_tw = getCloserDay();

const AddEventDialog = ({
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
  const form = useForm<BotEvent>({
    values: {
      ...(entry ?? defaultValues),
      house_name: entry?.house_name ?? house,
      role_id: entry?.role_id ?? roleId,
    },
  });
  const addBotEventMutation = useAddBotEventMutation();
  const onSubmit = () => {
    const data = form.getValues();
    addBotEventMutation.mutate({
      ...data,
      activity_time: Number(data.activity_time),
    });
  };
  useEffect(() => {
    if (addBotEventMutation.isSuccess) {
      setOpen(false);
      form.reset();
      toast.success("Event created");
    }
    if (addBotEventMutation.isError) {
      toast.error("Failed to create event");
    }
  }, [
    addBotEventMutation.isSuccess,
    addBotEventMutation.isPending,
    addBotEventMutation.isError,
    form,
  ]);

  // Date formated for input date
  const date = `${next_tw?.getFullYear()}-${String(
    Number(next_tw?.getMonth()) + 1
  ).padStart(2, "0")}-${String(next_tw?.getDate()).padStart(2, "0")}`;

  // Default TW hour
  const tw_hour = 19;

  // Hour formated for input time with added timezone
  const hour = `${
    Number(next_tw?.toLocaleTimeString().split(":")[0]) + tw_hour
  }:00`;

  const tw_tilte = `TW Event ${date}`;
  // Set default date and hour for TW event
  useEffect(() => {
    if (form.getValues("interval") === -1) {
      form.setValue("date_start_event", date);
      form.setValue("time_start_event", hour);
      form.setValue("title", tw_tilte);
    }
  }, [form.getValues("interval")]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="custom" disabled={disabled}>
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create Attendance Event</DialogTitle>
          <DialogDescription>
            Event will be posted in the selected channel after you press Create
            Event
          </DialogDescription>
        </DialogHeader>
        <EventForm discordData={discordData} form={form} />
        <DialogFooter>
          <Button onClick={onSubmit}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
