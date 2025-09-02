import { queryOptions } from "@tanstack/react-query";

export const doctrineAssetsOptions = queryOptions({
  queryKey: ["doctrines"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/assets/doctrines", process.env.ORIGIN),
      {
        cache: "no-store",
      }
    );

    return response.json();
  },
});

export const getDoctrineAssetOptions = (name: string) =>
  queryOptions({
    queryKey: ["doctrine", name],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/assets/doctrines?doctrine=${name}`, process.env.ORIGIN),
        {
          cache: "no-store",
        }
      );

      return response.json();
    },
  });
