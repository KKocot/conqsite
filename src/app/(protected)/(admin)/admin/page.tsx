"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBotSettings, getRoleById, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "react-loading";

const AdminPage = () => {
  const { data: roleData, isLoading: roleIsLoading } = useQuery({
    queryKey: ["rolesList", "303156898532818944"],
    queryFn: () => getRoleById("303156898532818944"),
  });
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["surveyList", "303156898532818944"],
    queryFn: () => getRoleById("303156898532818944"),
  });
  const [house, setHouse] = useState<string>("");

  const saveAdminData = async () => {
    try {
      await fetch("/api/survey", {
        method: "POST",
        body: JSON.stringify({ ...surveyData, house: house }),
      });
      await fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify({ ...roleData, house: house }),
      });
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  if (roleIsLoading || surveyIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  const botSettings = {
    guild_id: 1232957904597024882,
    member_id: 373563828513931266,
    member: 1236647699831586838,
    logs: 1250376514042593322,
    attendance: 1250376514042593322,
    tw_server: 1232957904597024882,
    tw_member: 1236647699831586838,
  };
  return (
    <div>
      <Input
        className="w-1/2"
        value={house}
        onChange={(e) => {
          setHouse(e.target.value);
        }}
      />
      <Button onClick={saveAdminData}>Save</Button>
      <Button
        onClick={() =>
          getBotSettings(
            "1232957904597024882",
            "373563828513931266",
            "1236647699831586838",
            "1250376514042593322",
            "1250376514042593322",
            "1232957904597024882",
            "1236647699831586838"
          )
        }
      >
        Data
      </Button>
    </div>
  );
};

export default AdminPage;
