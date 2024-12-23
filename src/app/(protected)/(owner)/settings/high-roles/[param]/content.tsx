"use client";

import { useAddRole, useDeleteRole } from "@/components/hooks/use-update-roles";
import CreateHouseHighRoles from "@/feature/create-house/create-house-high-roles";
import { DiscordUsersProps, Roles } from "@/lib/get-data";

export interface HighRolesValues {
  highcommand: Roles[];
  righthand: Roles[];
  houseLeader: Roles[];
}

const Content = ({
  members,
  highRoles,
}: {
  members: DiscordUsersProps;
  highRoles: Roles[];
}) => {
  const values: HighRolesValues = {
    highcommand: highRoles.filter((role) => role.role === "HighCommand"),
    righthand: highRoles.filter((role) => role.role === "RightHand"),
    houseLeader: highRoles.filter((role) => role.role === "HouseLeader"),
  };
  const addRole = useAddRole();
  const deleteRole = useDeleteRole();
  return (
    <div className="flex flex-col gap-6 container">
      <CreateHouseHighRoles
        type="edit"
        discordUsers={members}
        values={values}
        onDelete={(discordId, house) => deleteRole.mutate({ discordId, house })}
        onAdd={(user) => addRole.mutate(user)}
      />
    </div>
  );
};
export default Content;
