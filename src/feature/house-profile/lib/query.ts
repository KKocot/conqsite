import { queryOptions } from "@tanstack/react-query";

export const getHousesDetailsOptions = (house: string) =>
  queryOptions({
    queryKey: ["houseCard", house],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/house/card?name=${house}`, process.env.ORIGIN)
      );

      return response.json();
    },
  });
export const getHousesBadgesOptions = (house: string) =>
  queryOptions({
    queryKey: ["houseBadges", house],
    queryFn: async () => {
      const response = await fetch(
        new URL(`/api/house/badges?house=${house}`, process.env.ORIGIN)
      );

      return response.json();
    },
  });
