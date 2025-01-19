"use client";

import CallToAction from "@/feature/landingPage/call-to-action";
import Hero from "@/feature/landingPage/hero";
import Problem from "@/feature/landingPage/problem";
import Solution from "@/feature/landingPage/solution";
import { getSurveysAndHousesNumber } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["surveysAndHousesNumber"],
    queryFn: () => getSurveysAndHousesNumber(),
    enabled: true,
  });
  return (
    <div className="container w-full h-64">
      <section className="relative py-56 overflow-hidden">
        <Image
          src="/logov2_ver1.png"
          alt="Conquerors Blade Battle Scene"
          layout="fill"
          objectFit="cover"
        />
      </section>
      <Hero data={data} />
      <Problem />
      <Solution />
      <CallToAction />
    </div>
  );
};
export default Home;
