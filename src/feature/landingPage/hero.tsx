"use client";

import { useTranslations } from "next-intl";

export default function Hero({
  data,
}: {
  data?: { houses: number; surveys: number };
}) {
  const t = useTranslations("Home.HeroSection");
  return (
    <section className="relative my-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold mb-4 animate-fade-in-down text-ac">
          {t("title")}
        </h2>
        <p className="text-xl mb-8 animate-fade-in-up">{t("description")}</p>
        <div className="flex justify-center space-x-8 text-background">
          <div className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg medieval-border bg-accent/70">
            <p className="text-3xl font-bold">{data?.houses}</p>
            <p>{t("stat_one")}</p>
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg medieval-border bg-accent/70">
            <p className="text-3xl font-bold">{data?.surveys}</p>
            <p>{t("stat_two")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
