"use client";

import {
  useAddRoleMutation,
  useDeleteRoleMutation,
} from "@/components/hooks/use-roles-mutation";
import CreateHouseHighRoles from "@/feature/house-settings/create-house-high-roles";
import { DiscordUsersProps, HouseAssets, Roles } from "@/lib/get-data";
import { FC } from "react";

export interface HighRolesValues {
  highcommand: Roles[];
  righthand: Roles[];
  houseLeader: Roles[];
}

const Content: FC<{
  members: DiscordUsersProps;
  highRoles: Roles[];
  assets?: HouseAssets;
  house: string;
}> = ({ members, highRoles, assets, house }) => {
  const values: HighRolesValues = {
    highcommand: highRoles.filter((role) => role.role === "HighCommand"),
    righthand: highRoles.filter((role) => role.role === "RightHand"),
    houseLeader: highRoles.filter((role) => role.role === "HouseLeader"),
  };
  const addRole = useAddRoleMutation();
  const deleteRole = useDeleteRoleMutation();
  return (
    <div className="flex flex-col gap-6 container">
      <CreateHouseHighRoles
        type="edit"
        discordUsers={members}
        values={values}
        onDelete={(discordId, house) => deleteRole.mutate({ discordId, house })}
        onAdd={(user) => addRole.mutate(user)}
        premium={assets?.premium ?? false}
        house={house}
      />
    </div>
  );
};
export default Content;
