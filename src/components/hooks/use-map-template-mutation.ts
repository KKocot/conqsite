import { PlanTemplate } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMapTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planTemplate: PlanTemplate) => {
      const response = await fetch("/api/map-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...planTemplate,
          layers: planTemplate.layers.map((layer, index) => ({
            ...layer,
            title: layer.title || `Layer ${index + 1}`,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add plan template");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { house } = data;
      queryClient.invalidateQueries({ queryKey: ["PlanTemplateList", house] });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export const useDeletePlanTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/map-template?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete template");
      }
      return response.json();
    },

    onSuccess: (data) => {
      const { template } = data;
      queryClient.invalidateQueries({
        queryKey: ["PlanTemplateList", template.house],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
