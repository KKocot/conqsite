import { PlanPublic } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddMapPublicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planPublic: PlanPublic) => {
      const response = await fetch("/api/plan-public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planPublic),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add public plan");
      }

      return response.json();
    },

    onSuccess: (data) => {
      const { name } = data;
      queryClient.invalidateQueries({ queryKey: ["plan", name] });
      toast.success("Map connected successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Error occurred: ${error.message}`);
      console.error("Error occurred:", error.message);
    },
  });
};

export const useDeletePlanPublicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/plan-public?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete public plan");
      }
      return response.json();
    },

    onSuccess: (data) => {
      const { name } = data;
      queryClient.invalidateQueries({
        queryKey: ["plan", name],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
