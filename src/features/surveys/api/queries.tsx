import { queryOptions } from "@tanstack/react-query";
import { surveySchema } from "./schema";
import { getUrl } from "@/features/shared/utils";

export const getSurveysOptions = (house: string) =>
  queryOptions({
    queryKey: ["surveysList"],
    queryFn: async () => {
      const response = await fetch(getUrl(`/api/survey`, { house })).then((r) =>
        r.json()
      );
      return surveySchema.array().parse(response.surveys);
    },
  });

export const getSurveyOptions = (discordId: string) =>
  queryOptions({
    queryKey: ["profile", discordId],
    queryFn: async () => {
      const data = await fetch(getUrl(`/api/survey/${discordId}`)).then((res) =>
        res.json()
      );
      return surveySchema.parse(data.survey);
    },
  });
