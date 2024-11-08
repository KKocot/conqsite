import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteSheetParams {
  house: string;
  date: string;
  name: string;
}

interface ErrorData {
  message?: string;
}

const useDeleteSheet = ({ house, date, name }: DeleteSheetParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lineup", house, date] });
    },
    onError: (error: Error) => {
      console.error("Error deleting:", error.message);
    },
  });
};

export default useDeleteSheet;
