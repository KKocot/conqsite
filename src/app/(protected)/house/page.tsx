"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "react-loading";

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
  const [house, setHouse] = useState<HouseProps>();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    try {
      // Fetch survey data
      const surveyResponse = await fetch(`/api/survey/${user_data?.user.id}`);
      const surveyData = await surveyResponse.json();

      // Fetch house data if survey data is successfully fetched
      if (surveyData.survey) {
        const houseResponse = await fetch(
          `/api/house?name=${surveyData.survey.house}`
        );
        const houseData = await houseResponse.json();
        setHouse(houseData);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (!!user_data) fetchData();
  }, [!!user_data]);

  if (pending)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );

  return (
    <div>
      {house ? (
        <div className="flex min-h-screen">
          <div className="flex flex-col items-center w-1/6 gap-2 shadow-lg shadow-primary-foreground min-h-screen">
            <h1 className="text-4xl font-bold">{house.name}</h1>
            <img src={house.avatar} alt="House Avatar" />
            <div>{house.description}</div>
            <div>{house.country}</div>
            <div>{house.server}</div>
            <Link target="_blank" href={house.discordLink}>
              <Button>Discord</Button>
            </Link>
          </div>
          <div className="w-5/6 ">
            <div>Next TW Preview</div>
          </div>
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
