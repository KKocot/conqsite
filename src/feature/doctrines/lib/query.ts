import { queryOptions } from "@tanstack/react-query";

export const doctrineAssetsOptions = queryOptions({
  queryKey: ["doctrines"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/assets/doctrines", process.env.ORIGIN)
    );

    return response.json();
  },
});
