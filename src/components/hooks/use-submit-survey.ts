import { Survey } from "@/lib/get-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useSubmitSurvey = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      values,
      user_id,
      avatar,
    }: {
      values: Survey;
      user_id: string;
      avatar: string;
    }) => {
      const data = {
        ...values,
        discordId: user_id,
        avatar: avatar,
      };

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to submit survey");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { id } = data;
      console.log("Success:", data);
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      router.push(`/profile`);
    },
    onError: (error: Error) => {
      console.error("Error occurred:", error.message);
    },
  });
};

export default useSubmitSurvey;
