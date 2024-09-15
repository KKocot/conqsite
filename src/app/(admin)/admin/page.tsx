"use client";

import { Role } from "@/components/providers/globalData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_FORM_DATA } from "@/components/wizard-form";
import { Survey } from "@/lib/get-data";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [surveyData, setSurveyData] = useState<Survey>(DEFAULT_FORM_DATA);
  const [rolesData, setRolesData] = useState<Role>({
    _id: "",
    discordId: "",
    house: "",
    role: "",
    discordNick: "",
  });
  const [pending, setPending] = useState(false);

  const fetchAdminData = async () => {
    setPending(true);
    try {
      const surveyResponse = await fetch("/api/survey/303156898532818944");
      const rolesResponse = await fetch("/api/roles?id=303156898532818944");
      const survetResult = await surveyResponse.json();
      const rolesResult = await rolesResponse.json();
      setSurveyData(survetResult.survey);
      setRolesData(rolesResult.roles);
    } catch (error) {
      console.error("Error fetching:", error);
    }
    {
      setPending(false);
    }
  };

  const saveAdminData = async () => {
    try {
      await fetch("/api/survey", {
        method: "POST",
        body: JSON.stringify(surveyData),
      });
      await fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify(rolesData),
      });
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      console.info(surveyData);
      console.table(rolesData);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);
  if (pending) {
    return <div className="text-center mt-12">Loading...</div>;
  }
  return (
    <div>
      <Input
        className="w-1/2"
        value={surveyData?.house}
        onChange={(e) => {
          setRolesData((prev) => ({ ...prev, house: e.target.value }));
          setSurveyData((prev) => ({ ...prev, house: e.target.value }));
        }}
      />
      <Button onClick={saveAdminData}>Save</Button>
    </div>
  );
};

export default AdminPage;
