import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteSheetParams {
  house: string;
  date: string;
  name: string;
}

interface ErrorData {
  message?: string;
}

const useDeleteSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ house, date, name }: DeleteSheetParams) => {
      const response = await fetch(
        `/api/publicLineup?house=${house}&date=${date}&name=${name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData: ErrorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete the sheet");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { house, date } = data;
      queryClient.invalidateQueries({ queryKey: ["lineup", house, date] });
    },
    onError: (error: Error) => {
      console.error("Error deleting:", error.message);
    },
  });
};

export default useDeleteSheet;
