"use client";

import {
  command_whitelist_blackforge,
  command_whitelist_erebus,
  command_whitelist_kop,
} from "@/assets/whitelists";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Roles {
  id: string;
  discordId: string;
  house: string;
  username: string;
}

const SettingsPage = () => {
  const { data: commander } = useSession();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Roles[]>();
  const commander_house = commander?.user?.id
    ? command_whitelist_kop.includes(commander?.user?.id)
      ? "KingdomOfPoland"
      : command_whitelist_blackforge.includes(commander?.user?.id)
      ? "BlackForge"
      : command_whitelist_erebus.includes(commander?.user?.id)
      ? "Erebus"
      : ""
    : null;

  const fetchRoles = async (house: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/roles?house=${house}`);
      const data = await response.json();
      console.log(data);
      setRoles(data.roles);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoles("Erebus");
  }, []);
  console.log(roles);
  return (
    <div>
      <h1>Settings Page</h1>
      <div>
        <span>Username</span>
        <Input />
      </div>
      <div>
        <span>Discord ID</span>
        <Input />
      </div>
      <div>
        {roles?.map((role) => (
          <div key={role.id}>
            <span>{role.username}</span>
            <span>{role.discordId}</span>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
