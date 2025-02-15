import SurveysStats from "@/feature/admin-controler/surveys-stats";
import WikiRoles from "@/feature/admin-controler/wiki-roles";
import { FilledSurveys, Roles } from "@/lib/get-data";
import { FC } from "react";

interface ContentProps {
  wikiRoles: Roles[];
  surveysStats: FilledSurveys;
}
const Content: FC<ContentProps> = ({ wikiRoles, surveysStats }) => {
  return (
    <div className="w-full p-12">
      <WikiRoles data={wikiRoles} />
      <SurveysStats stats={surveysStats} />
    </div>
  );
};
export default Content;
