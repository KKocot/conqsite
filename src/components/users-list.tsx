import clsx from "clsx";
import { Badge } from "./ui/badge";
import { UserProfile } from "./user-profile";
import { SurveyProps } from "@/lib/type";

const UsersList = ({
  players,
  allPlayers,
}: {
  players: SurveyProps[];
  allPlayers: SurveyProps[];
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {players.map((survey) => (
        <div key={survey.discordId}>
          <UserProfile player={survey}>
            <Badge
              variant="secondary"
              className={clsx({
                "bg-red-800 text-white hover:text-black dark:hover:text-white":
                  !allPlayers.some((e) => e.discordId === survey.discordId),
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
