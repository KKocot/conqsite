import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAuthorityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await fetch(`/api/authority?token=${token}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete authority");
      }
      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authority"],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
