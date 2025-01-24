"use client";

import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("Home.ProblemSection");

  return (
    <section id="problem" className="my-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-background mx-auto bg-accent/70 bg-opacity-25 p-6 rounded-lg medieval-border transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-4">{t("problem_one")}</h3>
          <p className="text-lg">{t("problem_two")}</p>
        </div>
      </div>
    </section>
  );
}
