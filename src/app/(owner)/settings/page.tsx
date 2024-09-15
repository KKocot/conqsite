"use client";

import UserForm from "@/components/high-role-form";
import RolesTable from "@/components/high-role-table";
import HouseDetailsForm from "@/components/house-details";
import DataForm from "@/components/house-settings-table";
import {
  getHousesDetails,
  getHouseSettings,
  getRoles,
  HouseDetails,
  HouseSettings,
  Roles,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loading from "react-loading";

const SettingsPage = () => {
  const { data: commander } = useSession();
  const { data: rolesData, isLoading: rolesIsLoading } = useQuery({
    queryKey: ["rolesList"],
    queryFn: getRoles,
  });
  const house =
    rolesData?.find((e) => e.discordId === commander?.user.id)?.house || "";

  const { data: houseDetails, isLoading: houseDetailsIsLoading } = useQuery({
    queryKey: ["houseDetails"],
    queryFn: () => getHousesDetails(house),
    enabled: !!house,
  });

  const { data: houseSettings, isLoading: houseSettingsIsLoading } = useQuery({
    queryKey: ["houseSettings"],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });

  if (
    rolesIsLoading ||
    houseDetailsIsLoading ||
    !houseDetails ||
    houseSettingsIsLoading ||
    !houseSettings
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

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
      <div className="flex gap-6 flex-col">
        <div>
          <UserForm house={house} />
          {rolesData ? (
            <RolesTable
              rolesList={rolesData}
              house={house}
              onDelete={onDelete}
            />
          ) : null}
        </div>
        <DataForm data={houseSettings} />
        <HouseDetailsForm data={houseDetails} />
      </div>
    </div>
  );
};

export default SettingsPage;
