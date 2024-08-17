"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Role {
  _id: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}

type RolesrContextType = Role[] | [];
export const RolesContext = createContext<RolesrContextType | []>([]);

export const useRolesContext = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("Error fetching roles");
  }
  return context;
};
export const RolesProvider = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const origin = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${origin}/api/roles`).then((res) =>
          res.json()
        );
        setRoles(data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <RolesContext.Provider value={roles}>{children}</RolesContext.Provider>
  );
};
