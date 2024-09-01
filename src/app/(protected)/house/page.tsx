"use client";
import { Button } from "@/components/ui/button";
import { SurveyProps } from "@/lib/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const HOUSE_DATA = {
  name: "Hufflepuff",
  description:
    "Hufflepuff values hard work, dedication, patience, loyalty, and fair play rather than a particular aptitude in its members. Its emblematic animal is the badger, and yellow and black are its colours. The Head of this house is Pomona Sprout and the Fat Friar is the ghost. The house ghost is The Fat Friar.",
  country: "United Kingdom",
  discordLing: "https://discord.gg/z2EEGBRF",
  avatar: "logo.png",
  members: 90,
  serwer: "EU1",

  //   all: 90,
  //   average_on_tw: 60,
  //   list_of_members: []
  //   lineups: []
  //
};

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
    <div className="flex flex-col">
      {profile && profile.house === "none" ? (
        <div>
          <Button>Create House</Button>
          <Button>Join House</Button>
        </div>
      ) : (
        <div className="flex flex-col w-52">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">{HOUSE_DATA?.name}</h1>
            <img src={HOUSE_DATA?.avatar} alt="House Avatar" />
          </div>
          <div className="">{HOUSE_DATA?.description}</div>
        </div>
      )}
    </div>
  );
};
export default HousePage;
