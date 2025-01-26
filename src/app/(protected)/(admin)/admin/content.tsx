import WikiRoles from "@/feature/admin-controler/wiki-roles";
import { Roles } from "@/lib/get-data";
import { FC } from "react";

interface ContentProps {
  wikiRoles: Roles[];
}
const Content: FC<ContentProps> = ({ wikiRoles }) => {
  return (
    <div className="w-full p-12">
      <WikiRoles data={wikiRoles} />
    </div>
  );
};
export default Content;
