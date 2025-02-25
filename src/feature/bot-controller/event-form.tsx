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

const EventForm = ({
  discordData,
  form,
}: {
  discordData: DiscordProps;
  form: UseFormReturn<BotEvent, any, undefined>;
}) => {
  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_start_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Date</FormLabel>
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
                  Enter the date of the event
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
                <FormLabel className="text-lg">Hour</FormLabel>
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
                  Enter the hour of the event
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
              <FormLabel className="text-lg">Interval</FormLabel>
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
                        TW
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
                        Never
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
                Enter when the event will come back again in days
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
              <FormLabel className="text-lg">Channel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel" />
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
                Select a channel where the event will be posted
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Advanced Settings</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required min={1} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the title of the event
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
                    <FormLabel className="text-lg">Description</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required min={1} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the description of the event
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
                    <FormLabel className="text-lg">Activity Time</FormLabel>
                    <FormControl>
                      <Input
                        id="activity_time"
                        type="number"
                        {...field}
                        min={1}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the time in hours the event will be active
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
                    <FormLabel className="text-lg">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
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
                      Select a role to be mentioned when the event starts
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
