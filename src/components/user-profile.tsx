import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SurveyProps } from "@/lib/type";
import ProfileData from "./profile-data";
import { ReactNode } from "react";

export function UserProfile({
  player,
  children,
}: {
  player: SurveyProps;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-full md:w-3/4 w-full h-fit max-h-full">
        <DialogHeader>
          <DialogTitle>
            {player.inGameNick}{" "}
            <span className="text-red-500">({player.characterLevel})</span>
          </DialogTitle>
          <DialogDescription>{player.discordNick}</DialogDescription>
        </DialogHeader>
        <ProfileData profile={player} />
      </DialogContent>
    </Dialog>
  );
}
