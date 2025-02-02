import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ChangeWikiStatusData {
  id: string;
  status: "accepted" | "rejected" | "pending";
  reviewNotes: string;
}

const useChangeWikiStatus = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ChangeWikiStatusData) => {
      console.log(data, JSON.stringify(data));
      const response = await fetch(`/api/units/wiki/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to change Wiki Status");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["previewUnit", data.id] });
      queryClient.invalidateQueries({ queryKey: ["wiki-requests"] });
      router.push(`/dashboard/wiki-requests`);
    },
  });
};

export default useChangeWikiStatus;
