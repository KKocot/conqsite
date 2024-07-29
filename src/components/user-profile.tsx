import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SurveyProps } from "@/lib/type";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import ProfileData from "./profile-data";

export function UserProfile({
  player,
  playersList,
}: {
  player: SurveyProps;
  playersList: SurveyProps[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant="secondary"
          className={clsx("cursor-pointer", {
            "bg-red-800 text-white hover:text-black dark:hover:text-white":
              playersList.some((e) => e.discordId === player.discordId),
          })}
        >
          {player.inGameNick}
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-w-full md:w-3/4 w-full h-fit max-h-full">
        <DialogHeader>
          <DialogTitle>{player.inGameNick}</DialogTitle>
          <DialogDescription>{player.discordNick}</DialogDescription>
        </DialogHeader>
        <ProfileData profile={player} />
      </DialogContent>
    </Dialog>
  );
}
