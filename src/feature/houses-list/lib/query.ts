import { queryOptions } from "@tanstack/react-query";

export const allHousesBadgesOptions = queryOptions({
  queryKey: ["housesBadges"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/house/badges", process.env.ORIGIN),
      { cache: "no-store" }
    );

    return response.json();
  },
});
