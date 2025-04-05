import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useVoteUnitMutation = () => {
  const queryClient = useQueryClient();
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
      const { unit } = data;
      queryClient.invalidateQueries({
        queryKey: ["unitRate", unit.replaceAll(" ", "_")],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
