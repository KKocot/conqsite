import { useMutation } from "@tanstack/react-query";

export interface BotEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  interval: "TW" | "Never" | number;
  activity_time: number;
  guild_id: string;
  house_name: string;
  channel_id: string;
  role_id: string;
}

export const useCreateEventMutation = () => {
  return useMutation({
    mutationFn: async (event: BotEvent) => {
      const response = await fetch("/api/discord-bot/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add Event");
      }

      return response.json();
    },

    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
