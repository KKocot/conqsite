import { queryOptions } from "@tanstack/react-query";

export const getFullPostInfoOptions = (
  unit: string | undefined,
  queryKey?: string,
  id?: string
) => {
  return queryOptions({
    queryKey: ["fullPostInfo", id, unit, queryKey],
    queryFn: async () => {
      const base =
        process.env.ORIGIN ||
        (typeof window !== "undefined" ? window.location.origin : "");
      const url = new URL("/api/units/post/full-data", base);
      if (id) url.searchParams.set("id", id!);
      if (unit) url.searchParams.set("unit", unit!);

      const response = await fetch(url.toString(), {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch full post info (${response.status})`);
      }
      return response.json();
    },
  });
};
