import { queryOptions } from "@tanstack/react-query";

export const artilleriesAssetsOptions = queryOptions({
  queryKey: ["artilleries"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/assets/artillery", process.env.ORIGIN)
    );

    return response.json();
  },
});

export const getArtilleryAssetOptions = (name: string) => {
  return queryOptions({
    queryKey: ["artilleries", name],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/assets/artillery?name=${name}`, process.env.ORIGIN)
      );

      return response.json();
    },
  });
};
