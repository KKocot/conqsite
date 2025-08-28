import { queryOptions } from "@tanstack/react-query";

export const getFullPostInfoOptions = (id: string, unit: string) =>
  queryOptions({
    queryKey: ["fullPostInfo", id, unit],
    queryFn: async () => {
      const response = await fetch(
        new URL(
          `/api/units/post/full-data?id=${id}&unit=${unit}`,
          process.env.ORIGIN
        )
      );

      return response.json();
    },
  });
