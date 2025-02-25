import { BotEvent } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBotEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: BotEvent) => {
      const response = await fetch("/api/event", {
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
    onSuccess: (data) => {
      const { house_name } = data;
      queryClient.invalidateQueries({
        queryKey: ["events", house_name],
      });
      fetch(`/api/discord-bot/create-event?eventId=${data._id}&action=create`);
    },
  });
};

export const useDeleteBotEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, house }: { id: string; house: string }) => {
      const response = await fetch(
        `/api/event?eventId=${id}&house=house${house}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete Event");
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      const { house_name } = data;
      queryClient.invalidateQueries({
        queryKey: ["events", house_name],
      });
    },
  });
};
