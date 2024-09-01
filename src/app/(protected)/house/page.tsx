"use client";
import { Button } from "@/components/ui/button";
import { SurveyProps } from "@/lib/type";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

//   all: 90,
//   average_on_tw: 60,
//   list_of_members: []
//   lineups: []
//

interface HouseProps {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}
const HousePage = () => {
  const { data: user_data } = useSession();
  const [profile, setProfile] = useState<SurveyProps | undefined>();
  const [house, setHouse] = useState<HouseProps>();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/survey/${user_data?.user.id}`);
      const data = await response.json();
      setProfile(data.survey);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const fetchHouses = async () => {
    try {
      const response = await fetch(`/api/house?name=${profile?.house}`);
      const data = await response.json();
      setHouse(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    if (!profile) fetchData();
    if (profile) fetchHouses();
  }, [profile]);
  return (
    <div className="flex flex-col">
      {house ? (
        <div className="flex flex-col w-52">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">{house.name}</h1>
            <img src={house.avatar} alt="House Avatar" />
          </div>
          <div>{house.description}</div>
          <div>{house.country}</div>
          <div>{house.server}</div>
          <Link target="_blank" href={house.discordLink}>
            <Button>Join Discord</Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-evenly p-4">
          <Link href="/houses">
            <Button>Join House</Button>
          </Link>
          <Button>
            <Link href="/create-house">Create House</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default HousePage;
