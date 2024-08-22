"use client";

import { useRolesContext } from "@/components/providers/globalData";
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
interface Data {
  house: string;
  member: string;
  lineup: string;
  technical: string;
  logs: string;
}

const SettingsPage = () => {
  const { data: commander } = useSession();
  const rolesList = useRolesContext();
  const house = rolesList
    ? rolesList.find((e) => e.discordId === commander?.user.id)?.house
    : "";

  const roles = rolesList ? rolesList.filter((e) => e.house === house) : [];
  const [user, setUser] = useState<Roles>({
    discordNick: "",
    discordId: "",
    house: "",
    role: "",
  });
  const [data, setData] = useState<Data>({
    house: "",
    member: "",
    lineup: "",
    technical: "",
    logs: "",
  });
  useEffect(() => {
    if (house) {
      setUser((prev) => ({ ...prev, house: house }));
      setData((prev) => ({ ...prev, house: house }));
    }
  }, [house]);
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

  return (
    <div className="p-12">
      <h1 className="text-center text-3xl">Settings Page</h1>
      <div className="flex gap-2">
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
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HighCommand">HighCommand</SelectItem>
              <SelectItem value="RightHand">RightHand</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={disabled}
          className="w-fit self-end m-6"
          onClick={() => onAdd()}
        >
          Add To List
        </Button>
      </div>
      <div className="flex justify-around">
        {roles ? (
          <div className="w-1/3">
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
        <div className="w-1/3 flex flex-col">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[180px]">Discord ID/Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>House</TableCell>
                <TableCell>Your unical house name</TableCell>
                <TableCell>
                  <Input
                    placeholder="name"
                    value={data.house}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, house: e.target.value }))
                    }
                    disabled={true}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>
                  Bot need to know who should have access to website
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="discord id"
                    value={data.member}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, member: e.target.value }))
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lineup</TableCell>
                <TableCell>
                  Bot need to know how to split your house to lineups if you
                  have more them one raid
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="discord id"
                    value={data.lineup}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, lineup: e.target.value }))
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Technical</TableCell>
                <TableCell>Who on discord can manage bot options</TableCell>
                <TableCell>
                  <Input
                    placeholder="discord id"
                    value={data.technical}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        technical: e.target.value,
                      }))
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Logs</TableCell>
                <TableCell>Channel to see bot logs</TableCell>
                <TableCell>
                  <Input
                    placeholder="discord id"
                    value={data.logs}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, logs: e.target.value }))
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="rounded-none w-fit self-end">Save</Button>
        </div>
      </div>
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
            <TableCell className="font-bold p-2" title={role.discordId}>
              {role.discordNick}
            </TableCell>
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
