import { Survey } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useSubmitSurveyMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Survey) => {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to submit survey");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { discordId } = data;
      queryClient.invalidateQueries({ queryKey: ["profile", discordId] });
      router.push(`/member/profile`);
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export default useSubmitSurveyMutation;
