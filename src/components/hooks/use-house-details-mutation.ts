import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useHouseDetailsMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (params: { id: string }) => {
      const response = await fetch(`/api/house-details?id=${params.id}`);
      return response.json();
    },
  });
}
