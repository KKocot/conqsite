"use client";

import {
  useAddRoleMutation,
  useDeleteRoleMutation,
} from "@/components/hooks/use-roles-mutation";
import CreateHouseHighRoles from "@/feature/create-house/create-house-high-roles";
import { DiscordUsersProps, HouseAssets, Roles } from "@/lib/get-data";

export interface HighRolesValues {
  highcommand: Roles[];
  righthand: Roles[];
  houseLeader: Roles[];
}

const Content = ({
  members,
  highRoles,
  assets,
}: {
  members: DiscordUsersProps;
  highRoles: Roles[];
  assets?: HouseAssets;
}) => {
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
      />
    </div>
  );
};
export default Content;
