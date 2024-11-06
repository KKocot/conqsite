import { Survey } from "@/queries/profile.query";
import { Role } from "@/queries/roles.query";
import { Session } from "next-auth";

// Bot Access
export const botAllowed = (botKey: string, envKey?: string) => {
  if (!botKey || !envKey) return false;
  return botKey === envKey;
};

// Leader Access
export const highestRolesAllowed = (
  roles: Role[] | null,
  session: Session | null,
  house: string | null
) => {
  if (!roles || !session || !house) return false;
  return roles.some(
    (role) =>
      role.discordId === session?.user?.id &&
      role.house === house &&
      (role.role === "HouseLeader" || role.role === "RightHand")
  );
};

// High Command Access
export const highCommandAllowed = (
  roles: Role[] | null,
  session: Session | null,
  house: string | null | undefined
) => {
  if (!roles || !session || !house) return false;
  return roles.some(
    (role) => role.discordId === session.user.id && role.house === house
  );
};

// House User Access
export const houseUserAllowed = (
  survey: Survey | undefined,
  house: string | null
) => {
  if (!survey || !house) return false;
  return survey.house.includes(house);
};
