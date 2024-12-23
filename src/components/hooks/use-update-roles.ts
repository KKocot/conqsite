import { Roles } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Roles) => {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add role");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { house } = data;
      queryClient.invalidateQueries({ queryKey: ["highRolesList", house] });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      discordId,
      house,
    }: {
      discordId: string;
      house: string;
    }) => {
      const response = await fetch(
        `/api/roles?id=${discordId}&house=${house}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete role");
      }
      return response.json();
    },

    onSuccess: (data) => {
      const { roles } = data;
      queryClient.invalidateQueries({
        queryKey: ["highRolesList", roles.house],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
