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
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Survey, UnitAssetsGroup, WeaponAsset } from "@/lib/get-data";
import Link from "next/link";
import { CircleUser } from "lucide-react";

export function UserProfile({
  player,
  children,
  unitsAssets,
  weapons,
}: {
  player: Survey;
  children: ReactNode;
  unitsAssets: UnitAssetsGroup;
  weapons: WeaponAsset[];
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
              <AvatarFallback>
                {player.inGameNick.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : null}
          <div>
            <DialogTitle>
              {player.inGameNick}
              <span className="text-red-500">({player.characterLevel})</span>
            </DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              {player.discordNick}
              <Link
                href={`/profile/${player.discordId}`}
                className="hover:text-accent"
                target="_blank"
              >
                <CircleUser />
              </Link>
            </DialogDescription>
          </div>
        </DialogHeader>
        {player.updates && player.updates?.length! > 0 ? (
          <div className="text-xs">{`Survey last update: ${
            player.updates[player.updates.length - 1]
          }`}</div>
        ) : null}
        <ProfileData
          profile={player}
          unitsAssets={unitsAssets}
          weapons={weapons}
        />
      </DialogContent>
    </Dialog>
  );
}
