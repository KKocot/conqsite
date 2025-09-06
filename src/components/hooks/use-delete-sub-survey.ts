import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
        let message = "Failed to delete sub survey";
        try {
          const errorData = await response.clone().json();
          message = errorData?.message || message;
        } catch {
          try {
            const text = await response.text();
            if (text) message = text;
          } catch {
            // ignore, keep default message
          }
        }
        throw new Error(message);
      }
      toast.success("Sub survey deleted successfully, refrashe the page");
      // Safely handle empty or non-JSON response bodies (e.g., 204 No Content)
      try {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      } catch {
        return null;
      }
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
