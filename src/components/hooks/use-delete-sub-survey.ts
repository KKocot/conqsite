import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const useDeleteSubSurvey = () => {
  const queryClient = useQueryClient();
  const data = useSession();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/survey/sub-acc/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete sub survey");
      }
      toast.success("Sub survey deleted successfully");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subProfile", data?.data?.user.id],
      });
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};
export default useDeleteSubSurvey;
