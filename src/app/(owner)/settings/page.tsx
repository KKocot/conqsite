"use client";

import UserForm from "@/components/high-role-form";
import RolesTable from "@/components/high-role-table";
import DataForm from "@/components/house-settings-table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "react-loading";

export interface Roles {
  _id?: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}

export interface Data {
  house: { name: string; id: string };
  member: { name: string; id: string };
  lineup: { name: string; id: string; roleId: string }[];
  logs: { logs: string; attendance: string };
  tw: { server: string; member: string };
}

const SettingsPage = () => {
  const { data: commander } = useSession();
  const [rolesList, setRolesList] = useState<Roles[]>([]);
  const [pending, setPending] = useState(false);
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
    setPending(true);
    try {
      const response = await fetch("/api/roles");
      const result = await response.json();
      setRolesList(result.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setPending(false);
    }
  };
  const fetchSettings = async () => {
    setPending(true);
    try {
      const response = await fetch(`/api/houseSettings?house=${house}`);
      const result = await response.json();
      setData({
        ...result,
        house: { name: house, id: result.house.id },
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const house =
    rolesList.find((e) => e.discordId === commander?.user.id)?.house || "";
  useEffect(() => {
    if (house) {
      fetchSettings();
      setUser((prev) => ({ ...prev, house }));
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
  if (pending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  return (
    <div className="p-12">
      <h1 className="text-center text-3xl">Settings Page</h1>
      <div className="flex gap-6 flex-col">
        <div>
          <UserForm
            user={user}
            setUser={setUser}
            disabled={disabled}
            onAdd={onAdd}
          />
          <RolesTable
            rolesList={rolesList}
            house={user.house}
            onDelete={onDelete}
          />
        </div>
        {commander && commander.user.id ? (
          <DataForm data={data} setData={setData} userId={commander?.user.id} />
        ) : null}
      </div>
    </div>
  );
};

export default SettingsPage;
