"use client";

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
import { set } from "mongoose";
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
  const [rolesList, setRolesList] = useState<Roles[]>([]);
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

  // Fetch roles data from API
  const fetchData = async () => {
    try {
      const response = await fetch("/api/roles");
      const result = await response.json();
      setRolesList(result.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const house =
    rolesList.find((e) => e.discordId === commander?.user.id)?.house || "";
  useEffect(() => {
    if (house) {
      setUser((prev) => ({ ...prev, house }));
      setData((prev) => ({ ...prev, house }));
    }
  }, [rolesList, commander]);

  const disabled = !user.discordNick || !user.discordId || !user.role;

  const onAdd = async () => {
    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        fetchData();
        setUser({
          discordNick: "",
          discordId: "",
          house: house,
          role: "",
        });
        console.log("Success:", await response.json());
      }
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  const onDelete = async (discordId: string) => {
    try {
      const response = await fetch(`/api/roles?id=${discordId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        fetchData();
        console.log("Success:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="p-12">
      <h1 className="text-center text-3xl">Settings Page</h1>
      <UserForm
        user={user}
        setUser={setUser}
        disabled={disabled}
        onAdd={onAdd}
      />
      <div className="flex justify-around">
        <RolesTable
          rolesList={rolesList}
          house={user.house}
          onDelete={onDelete}
        />
        <DataForm data={data} setData={setData} />
      </div>
    </div>
  );
};

interface UserFormProps {
  user: Roles;
  setUser: React.Dispatch<React.SetStateAction<Roles>>;
  disabled: boolean;
  onAdd: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  setUser,
  disabled,
  onAdd,
}) => (
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
      <Select onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HighCommand">HighCommand</SelectItem>
          <SelectItem value="RightHand">RightHand</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button disabled={disabled} className="w-fit self-end m-6" onClick={onAdd}>
      Add To List
    </Button>
  </div>
);

interface RolesTableProps {
  rolesList: Roles[];
  house: string;
  onDelete: (discordId: string) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({
  rolesList,
  house,
  onDelete,
}) => (
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
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="HouseLeader"
          handleDelete={onDelete}
        />
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="RightHand"
          handleDelete={onDelete}
        />
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="HighCommand"
          handleDelete={onDelete}
        />
      </TableBody>
    </Table>
  </div>
);

interface DataFormProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const DataForm: React.FC<DataFormProps> = ({ data, setData }) => (
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
            Bot need to know how to split your house to lineups if you have more
            them one raid
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
                setData((prev) => ({ ...prev, technical: e.target.value }))
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
);

interface ItemsListProps {
  roles: Roles[];
  role: string;
  handleDelete: (discordId: string) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ roles, role, handleDelete }) => (
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
              onClick={() => handleDelete(role.discordId)}
              disabled={role.role === "HouseLeader"}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
  </>
);

export default SettingsPage;
