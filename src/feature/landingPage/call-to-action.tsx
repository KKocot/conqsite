"use client";

import Link from "next/link";
import { Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CallToAction() {
  const t = useTranslations("Home.CallSection");
  return (
    <section id="cta" className="my-20 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in-down">
          {t("call_one")}
        </h2>
        <p className="text-xl mb-8 animate-fade-in-up">{t("call_two")}</p>
        <Link href="/member/create-house">
          <Button variant="custom" className="px-8 py-6 rounded-3xl text-xl">
            <Sword className="mr-2" />
            {t("button_title")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
