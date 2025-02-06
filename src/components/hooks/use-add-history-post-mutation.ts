import { HistoryPost } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddHistoryPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (historyPost: HistoryPost) => {
      const response = await fetch("/api/house/tw-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historyPost),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to update post");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export default useAddHistoryPostMutation;
