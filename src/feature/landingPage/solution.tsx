"use client";

import {
  CheckCircle,
  Shield,
  Users,
  Calendar,
  ClipboardList,
  Lock,
  LogIn,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Solution() {
  const t = useTranslations("Home.SolutionSection");
  const features = [
    {
      icon: Shield,
      text: t("features_one"),
    },
    {
      icon: Users,
      text: t("features_two"),
    },
    {
      icon: Calendar,
      text: t("features_three"),
    },
    {
      icon: ClipboardList,
      text: t("features_four"),
    },
    {
      icon: Lock,
      text: t("features_five"),
    },
    {
      icon: LogIn,
      text: t("features_six"),
    },
  ];

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-background flex items-center bg-accent/70 p-4 rounded-lg medieval-border transform hover:scale-105 transition-transform duration-300"
            >
              <feature.icon className="mr-2 mt-1 flex-shrink-0" />
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
