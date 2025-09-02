import { queryOptions } from "@tanstack/react-query";

export const getProfileTierlistOptions = (id: string) =>
  queryOptions({
    queryKey: ["tierList", id],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/user/tierList?userId=${id}`, process.env.ORIGIN),
        {
          cache: "no-store",
        }
      );

      return response.json();
    },
  });
