"use client";

import { Button } from "@/components/ui/button";
import { HouseDetails } from "@/lib/get-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HousesPage = () => {
  const [houses, setHouses] = useState<HouseDetails[]>([]);
  const fetchHouses = async () => {
    try {
      const response = await fetch("/api/house");
      const data = await response.json();
      setHouses(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    fetchHouses();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="m-10">Houses</h1>
      <ul className="flex gap-12 flex-wrap m-12 justify-center">
        {houses.map((house) => (
          <li
            className="border border-sky-500 flex flex-col justify-between items-center gap-2 w-[180px] rounded-sm"
            key={house.name}
          >
            <div>
              <h2 className="text-xl text-center p-2">{house.name}</h2>
              <img
                className="w-[180px] h-[180px]"
                src={house.avatar}
                alt="House Avatar"
              />
            </div>
            <p className="px-2 text-sm">{house.description}</p>
            <p>{house.country}</p>
            <p>{house.server}</p>
            <div>
              <Link className="w-full" target="_blank" href={house.discordLink}>
                <Button
                  variant="tab"
                  className="w-full text-black dark:text-white hover:text-white"
                >
                  Join Discord
                </Button>
              </Link>
              <Button
                variant="tab"
                className="w-full text-black dark:text-white hover:text-white"
                onClick={() => {
                  toast.error("Not working yet");
                }}
              >
                Join to House
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
