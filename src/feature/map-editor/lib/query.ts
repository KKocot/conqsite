import { queryOptions } from "@tanstack/react-query";

export const mapsAssetsOptions = queryOptions({
  queryKey: ["maps"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/assets/maps", process.env.ORIGIN)
    );

    return response.json();
  },
});

export const getMapAssetsOptions = (map: string) =>
  queryOptions({
    queryKey: ["maps", map],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/assets/maps?map=${map}`, process.env.ORIGIN)
      );

      return response.json();
    },
  });
