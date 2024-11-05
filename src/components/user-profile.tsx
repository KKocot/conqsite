import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileData from "./profile-data";
import { ReactNode } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Survey } from "@/lib/get-data";

export function UserProfile({
  player,
  children,
}: {
  player: Survey;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-full md:w-3/4 w-full h-fit max-h-full">
        <DialogHeader className="flex-row items-center gap-2">
          {player.avatar ? (
            <Avatar className="w-16 h-16">
              <AvatarImage
                alt="avatar"
                className="rounded-full"
                src={player.avatar}
              />
            </Avatar>
          ) : null}
          <div>
            <DialogTitle>
              {player.inGameNick}
              <span className="text-red-500">({player.characterLevel})</span>
            </DialogTitle>
            <DialogDescription>{player.discordNick}</DialogDescription>
          </div>
        </DialogHeader>
        <ProfileData profile={player} />
      </DialogContent>
    </Dialog>
  );
}
