import { HistoryPost } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddHistoryPostMutation = () => {
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
      console.log("Success", data);
      queryClient.invalidateQueries({
        queryKey: ["latestTW", data.house, data.twDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", data.house],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", data.authorID],
      });
    },

    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export const useDeleteHistoryPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/house/tw-history/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete post");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { historyPost } = data;
      queryClient.invalidateQueries({
        queryKey: ["latestTW", historyPost.house, historyPost.twDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["latestTW", historyPost.authorID, historyPost.twDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", historyPost.house],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", historyPost.authorID],
      });
    },

    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export const useEditHistoryPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/house/tw-history/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to update post");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { historyPost } = data;
      queryClient.invalidateQueries({
        queryKey: ["latestTW", historyPost.house, historyPost.twDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", historyPost.house],
      });
      queryClient.invalidateQueries({
        queryKey: ["dateslist", historyPost.authorID],
      });
    },

    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
