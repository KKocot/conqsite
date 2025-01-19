import { UnitObject } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useWikiMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UnitObject) => {
      const response = await fetch("/api/units/wiki", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to submit unit");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { name } = data;
      queryClient.invalidateQueries({ queryKey: ["unit", name] });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export default useWikiMutation;
