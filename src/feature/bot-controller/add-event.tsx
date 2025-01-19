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
import { useId, useState } from "react";
import { toast } from "react-toastify";

const defaultValues = {
  event_template_id: "",
  date_start_event: "",
  time_start_event: "",
  interval: 0,
  activity_time: 0,
  title: "",
  description: "",
  house_name: "",
  channel_id: "",
  role_id: "",
  signUps: [],
};

const AddEventDialog = ({
  disabled,
  discordData,
  house,
  entry,
}: {
  disabled: boolean;
  discordData: DiscordProps;
  house: string;
  entry?: BotEvent;
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const date = new Date();
  const form = useForm<BotEvent>({
    values: {
      ...(entry ?? defaultValues),
      house_name: entry?.house_name ?? house,
    },
  });
  const addBotEventMutation = useAddBotEventMutation();
  const onSubmit = () => {
    const data = form.getValues();
    addBotEventMutation.mutate({
      ...data,
      activity_time: Number(data.activity_time),
      event_template_id:
        entry?.event_template_id ?? `id_${id}_${house}_${date.getTime()}`,
    });
    addBotEventMutation.isSuccess && toast.success("Event created");
    setOpen(false);
    form.reset();
  };
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
