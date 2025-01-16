import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteHouseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (house: string) => {
      const response = await fetch(`/api/deleteHouse?house=${house}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add Lineup");
      }
      return response.json();
    },
    onSuccess: (data) => {
      const { houseLeader } = data;
      queryClient.invalidateQueries({
        queryKey: ["profile", houseLeader.discordId],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
export default useDeleteHouseMutation;
