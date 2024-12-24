import { HouseAssets } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateHouseAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (houseAssets: HouseAssets) => {
      const response = await fetch("/api/houseAssets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(houseAssets),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to update house assets");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { houseAssets } = data;
      queryClient.invalidateQueries({
        queryKey: ["houseAssets", houseAssets.name],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
