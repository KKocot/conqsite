"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotEvent, DiscordProps } from "@/lib/get-data";
import { useState } from "react";

const AddEventDialog = ({
  disabled,
  discordData,
}: {
  disabled: boolean;
  discordData: DiscordProps;
}) => {
  const [values, setValues] = useState<BotEvent>({
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
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom" disabled={disabled}>
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Attendance Event</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
          <div>
            <Label htmlFor="interval">Interval</Label>
            <Input id="interval" type="text" />
          </div>
          <div>
            <Label htmlFor="activity_time">Activity Time</Label>
            <Input id="activity_time" type="number" />
          </div>
          <div>
            <Label htmlFor="channel_id">Channel ID</Label>
            <Select required>
              <SelectTrigger id="channel_id">
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discordData.channels.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="role_id">Role ID</Label>
            <Select required>
              <SelectTrigger id="role_id">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discordData.roles.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
