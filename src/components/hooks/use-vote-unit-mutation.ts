import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useVoteUnitMutation = () => {
  const queryClient = useQueryClient();
  const user = useSession();
  return useMutation({
    mutationFn: async (data: { unit: string; rate: number }) => {
      const response = await fetch("/api/units/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to vote");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const id = user.data?.user?.id;
      const { unit } = data;
      queryClient.invalidateQueries({ queryKey: ["tierList", id] });
      queryClient.invalidateQueries({ queryKey: ["tier-list"] });
      queryClient.invalidateQueries({
        queryKey: ["unitRate", unit.replaceAll(" ", "_")],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
