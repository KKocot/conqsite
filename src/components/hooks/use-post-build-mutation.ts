import { UnitData } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostBuildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UnitData) => {
      const redtructuredData = {
        ...data,
        tree: {
          ...data.tree,
          structure: Object.fromEntries(data.tree.structure),
        },
      };
      const response = await fetch("/api/units/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redtructuredData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to post");
      }
      return response.json();
    },
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
