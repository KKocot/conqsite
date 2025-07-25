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
    <div className="w-full h-64">
      <section className="relative py-56 overflow-hidden">
        <Image
          src="/logov2_ver1.png"
          alt="Conquerors Blade Battle Scene"
          layout="fill"
          objectFit="cover"
        />
      </section>
      <Hero data={data} />
      <div className="flex justify-center">
        <div className="aspect-video w-full overflow-hidden rounded-md max-w-4xl">
          <iframe
            src="https://www.youtube.com/embed/tpehq6c5zeE"
            title="Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
      <Problem />
      <Solution />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/graf.png`}
        alt="graf"
        width={600}
        height={800}
        className="mx-auto my-20"
      />
      <CallToAction />
    </div>
  );
};
export default Home;
