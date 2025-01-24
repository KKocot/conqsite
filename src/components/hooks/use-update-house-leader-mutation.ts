import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateLeaderProps {
  exLeaderName: string;
  exLeaderId: string;
  exLeaderNewRole: string;
  newLeaderName: string;
  newLeaderId: string;
  house: string;
}
export const useUpdateLeaderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateLeaderProps) => {
      const response = await fetch("/api/roles-management/update-leader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to update roles");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { exLeader } = data;
      queryClient.invalidateQueries({
        queryKey: ["highRolesList", exLeader.house],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", exLeader.discordId],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
