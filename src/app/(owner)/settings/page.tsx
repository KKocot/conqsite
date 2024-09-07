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
  house: { name: string; id: string };
  member: { name: string; id: string };
  lineup: { name: string; id: string; roleId: string }[];
  logs: { logs: string; attendance: string };
  tw: { server: string; member: string };
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
    house: { name: "", id: "" },
    member: { name: "", id: "" },
    lineup: [{ name: "", id: "", roleId: "" }],
    logs: { logs: "", attendance: "" },
    tw: { server: "", member: "" },
  });

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
      setData((prev) => ({
        ...prev,
        house: { name: house, id: prev.house.id },
      }));
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
    const confirmed = confirm(
      "Are you sure you want to delete this player from his role?"
    );
    if (confirmed) {
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
    }
  };

  return (
    <div className="p-12">
      <h1 className="text-center text-3xl">Settings Page</h1>
      <div className="flex gap-4">
        <div>
          <RolesTable
            rolesList={rolesList}
            house={user.house}
            onDelete={onDelete}
          />
          <UserForm
            user={user}
            setUser={setUser}
            disabled={disabled}
            onAdd={onAdd}
          />
        </div>
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
  <div className="flex gap-2 my-6">
    <div>
      <Input
        className="w-[120px]"
        placeholder="Nick"
        value={user.discordNick}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, discordNick: e.target.value }))
        }
      />
    </div>
    <div>
      <Input
        className="w-[120px]"
        placeholder="Discord ID"
        value={user.discordId}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, discordId: e.target.value }))
        }
      />
    </div>
    <div>
      <Select onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Pick a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HighCommand">HighCommand</SelectItem>
          <SelectItem value="RightHand">RightHand</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button disabled={disabled} className="w-fit self-end" onClick={onAdd}>
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
  <div className="flex flex-col">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[180px]">Name</TableHead>
          <TableHead className="w-[180px]">ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>House</TableCell>
          <TableCell>Your unical house name</TableCell>
          <TableCell>
            <Input
              placeholder="House"
              value={data.house.name}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  house: { name: e.target.value, id: prev.house.id },
                }))
              }
              disabled={true}
            />
          </TableCell>
          <TableCell>
            <Input
              placeholder="Discord"
              value={data.house.id}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  house: { name: prev.house.name, id: e.target.value },
                }))
              }
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
              placeholder="Role"
              value={data.member.name}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  member: { name: e.target.value, id: prev.member.id },
                }))
              }
            />
          </TableCell>
          <TableCell>
            <Input
              placeholder="Role"
              value={data.member.id}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  member: { name: prev.member.name, id: e.target.value },
                }))
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Logs</TableCell>
          <TableCell>Channel to see bot logs</TableCell> <TableCell></TableCell>
          <TableCell>
            <Input
              placeholder="Channel"
              className="mb-6"
              value={data.logs.logs}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  logs: {
                    logs: e.target.value,
                    attendance: prev.logs.attendance,
                  },
                }))
              }
            />
            <Input
              placeholder="Channel"
              value={data.logs.attendance}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  logs: { logs: prev.logs.logs, attendance: e.target.value },
                }))
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>Tw Zone</span>
          </TableCell>
          <TableCell>Discord, member role </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Input
              placeholder="Server"
              className="mb-6"
              value={data.tw.server}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  tw: { server: e.target.value, member: prev.tw.member },
                }))
              }
            />
            <Input
              placeholder="Role"
              value={data.tw.member}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  tw: { server: prev.tw.server, member: e.target.value },
                }))
              }
            />
          </TableCell>
        </TableRow>
        {data.lineup.map((element, i) => (
          <TableRow>
            <TableCell>{`Lineup ${i + 1}`}</TableCell>
            <TableCell>
              Bot need to know how to split your house to lineups if you have
              more them one raid
            </TableCell>
            <TableCell>
              <Input
                placeholder="Role"
                className="mb-6"
                value={element.name}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    lineup: data.lineup.map((lineup, index) =>
                      index === i ? { ...lineup, name: e.target.value } : lineup
                    ),
                  }))
                }
              />
              <div className="flex gap-2">
                {data.lineup.length === 1 ? null : (
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        lineup: prev.lineup.filter((_, index) => index !== i),
                      }))
                    }
                  >
                    Delete Lineup
                  </Button>
                )}
                {data.lineup.length !== i + 1 ? null : (
                  <Button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        lineup: [
                          ...prev.lineup,
                          { name: "", id: "", roleId: "" },
                        ],
                      }))
                    }
                  >
                    Add Lineup
                  </Button>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Input
                className="mb-6"
                placeholder="Channel"
                value={element.id}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    lineup: data.lineup.map((lineup, index) =>
                      index === i ? { ...lineup, id: e.target.value } : lineup
                    ),
                  }))
                }
              />
              <Input
                placeholder="Role"
                value={element.roleId}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    lineup: data.lineup.map((lineup, index) =>
                      index === i
                        ? { ...lineup, roleId: e.target.value }
                        : lineup
                    ),
                  }))
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {/* <Button className="rounded-none w-fit self-end">Save</Button> */}
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
