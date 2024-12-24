import { Template } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (template: Template) => {
      const response = await fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add template");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { house } = data;
      queryClient.invalidateQueries({ queryKey: ["templateList", house] });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/template?id=${id}`, {
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
        queryKey: ["templateList", template.house],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
