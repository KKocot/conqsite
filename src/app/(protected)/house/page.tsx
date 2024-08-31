"use client";
import { SurveyProps } from "@/lib/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const HousePage = () => {
  const { data: user_data } = useSession();
  const [profile, setProfile] = useState<SurveyProps | undefined>();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/survey/${user_data?.user.id}`);
      const data = await response.json();
      setProfile(data.survey);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center">
      {profile && profile.house === "none" ? (
        <div>Create House</div>
      ) : (
        <div>
          <h1>{profile?.house}</h1>
        </div>
      )}
    </div>
  );
};
export default HousePage;
