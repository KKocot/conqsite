"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HouseProps {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}
const HousesPage = () => {
  const [houses, setHouses] = useState<HouseProps[]>([]);
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
      <ul className="flex justify-around w-full">
        {houses.map((house) => (
          <li key={house.name}>
            <h2>{house.name}</h2>
            <img src={house.avatar} alt="House Avatar" />
            <Link target="_blank" href={house.discordLink}>
              Join Discord
            </Link>
            <p>{house.description}</p>
            <p>{house.country}</p>
            <p>{house.server}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
