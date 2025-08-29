import { queryOptions } from "@tanstack/react-query";

export const allUnitsAssetsOptions = queryOptions({
  queryKey: ["unitsAssets"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/assets/units", process.env.ORIGIN)
    );

    return response.json();
  },
});

export const tierListOptions = queryOptions({
  queryKey: ["tier-list"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/units/tierList", process.env.ORIGIN)
    );

    return response.json();
  },
});

export const mostUsedUnitsOptions = queryOptions({
  queryKey: ["most-used-units"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/units/most-used-units", process.env.ORIGIN)
    );

    return response.json();
  },
});

export const getFullUnitInfoOptions = (unitName: string, queryKey?: string) =>
  queryOptions({
    queryKey: ["full-unit-info", unitName, queryKey],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/units/full-info?name=${unitName}`, process.env.ORIGIN)
      );
      return response.json();
    },
  });
