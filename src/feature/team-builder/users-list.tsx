import clsx from "clsx";
import { Badge } from "../../components/ui/badge";
import { UserProfile } from "../../components/user-profile";
import { Survey } from "@/lib/get-data";

const UsersList = ({
  usedPlayers,
  allPlayers,
}: {
  usedPlayers: string[];
  allPlayers: Survey[];
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {allPlayers.map((survey) => (
        <div key={survey.discordId}>
          <UserProfile player={survey}>
            <Badge
              variant="secondary"
              className={clsx("bg-red-800 text-white", {
                "hover:text-black dark:hover:text-white bg-slate-600":
                  !usedPlayers.some((e) => e === survey.inGameNick),
              })}
            >
              {survey.inGameNick}
            </Badge>
          </UserProfile>
        </div>
      ))}
    </div>
  );
};
export default UsersList;
