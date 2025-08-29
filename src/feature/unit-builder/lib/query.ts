import { queryOptions } from "@tanstack/react-query";

export const getFullPostInfoOptions = (
  unit: string | undefined,
  queryKey?: string,
  id?: string
) => {
  const enabled = Boolean(id && unit);
  return queryOptions({
    queryKey: ["fullPostInfo", id, unit, queryKey],
    enabled,
    queryFn: async () => {
      if (!enabled) return null;
      const base =
        process.env.ORIGIN ||
        (typeof window !== "undefined" ? window.location.origin : "");
      const url = new URL("/api/units/post/full-data", base);
      url.searchParams.set("id", id!);
      url.searchParams.set("unit", unit!);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch full post info (${response.status})`);
      }
      return response.json();
    },
  });
};
