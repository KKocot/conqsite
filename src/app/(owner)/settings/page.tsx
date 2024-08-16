"use client";

import {
  command_whitelist_blackforge,
  command_whitelist_erebus,
  command_whitelist_kop,
} from "@/assets/whitelists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Roles {
  _id?: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}

const SettingsPage = () => {
  const { data: commander } = useSession();
  const [roles, setRoles] = useState<Roles[]>();
  const commander_house = commander?.user?.id
    ? command_whitelist_kop.includes(commander?.user?.id)
      ? "KingdomOfPoland"
      : command_whitelist_blackforge.includes(commander?.user?.id)
      ? "BlackForge"
      : command_whitelist_erebus.includes(commander?.user?.id)
      ? "Erebus"
      : ""
    : "";

  const [user, setUser] = useState<Roles>({
    discordNick: "",
    discordId: "",
    house: "",
    role: "",
  });
  const disabled = !user.discordNick || !user.discordId || !user.role;
  function onAdd() {
    try {
      fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error adding:", error);
    }
  }
  const fetchRoles = async (house: string) => {
    try {
      const response = await fetch(`/api/roles?house=${house}`);
      const data = await response.json();
      setRoles(data.roles);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    if (commander_house) {
      fetchRoles(commander_house);
      setUser((prev) => ({ ...prev, house: commander_house }));
    }
  }, [commander_house]);
  return (
    <div className="p-12">
      <div className="flex flex-col gap-2">
        <h1>Settings Page</h1>
        <div>
          <span>Username</span>
          <Input
            value={user.discordNick}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, discordNick: e.target.value }))
            }
          />
        </div>
        <div>
          <span>Discord ID</span>
          <Input
            value={user.discordId}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, discordId: e.target.value }))
            }
          />
        </div>
        <div>
          <span>Role</span>
          <Select
            onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HighCommand">HighCommand</SelectItem>
              <SelectItem value="RightHand">RightHand</SelectItem>
              <SelectItem value="Blacklist">Blacklist</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={disabled}
          className="w-fit self-end"
          onClick={() => onAdd()}
        >
          Add Role
        </Button>
      </div>
      {roles ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nick</TableHead>
                <TableHead>Role</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ItemsList roles={roles} role="HouseLeader" />
              <ItemsList roles={roles} role="RightHand" />
              <ItemsList roles={roles} role="HighCommand" />
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default SettingsPage;

const ItemsList = ({ roles, role }: { roles: Roles[]; role: string }) => {
  function onDelete(discordId: string) {
    try {
      fetch(`/api/roles?id=${discordId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
  return (
    <>
      {roles
        ?.filter((e) => e.role === role)
        .map((role) => (
          <TableRow
            key={role._id}
            className={clsx({
              "bg-yellow-500 text-secondary hover:text-white":
                role.role === "HouseLeader",
              "bg-purple-500": role.role === "RightHand",
              "bg-blue-500": role.role === "HighCommand",
            })}
          >
            <TableCell className="font-bold p-2">{role.discordNick}</TableCell>
            <TableCell className="p-2">{role.role}</TableCell>
            <TableCell className="p-2">
              <Button
                variant="destructive"
                className="rounded-none"
                onClick={() => onDelete(role.discordId)}
                disabled={role.role === "HouseLeader"}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};
