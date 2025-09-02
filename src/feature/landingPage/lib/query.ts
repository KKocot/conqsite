import { queryOptions } from "@tanstack/react-query";

export const surveysAndHousesNumberOptions = queryOptions({
  queryKey: ["surveysAndHousesNumber"],
  queryFn: async () => {
    const response = await fetch(
      new URL("/api/housesAndSurveysInfo", process.env.ORIGIN),
      {
        cache: "no-store",
      }
    );

    return response.json();
  },
});
