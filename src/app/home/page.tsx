"use client";

import CallToAction from "@/feature/landingPage/call-to-action";
import Hero from "@/feature/landingPage/hero";
import Problem from "@/feature/landingPage/problem";
import Solution from "@/feature/landingPage/solution";
import Image from "next/image";

const Home = () => {
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
      <Hero />
      <Problem />
      <Solution />
      <CallToAction />
    </div>
  );
};
export default Home;
