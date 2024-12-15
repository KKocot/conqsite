"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_FORM_DATA } from "@/components/wizard-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loading from "react-loading";
import { useRouter } from "next/navigation";
import { getHousesDetails, getSurvey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servers } from "@/lib/utils";
import Content from "./content";

const CreateHousePage = () => {
  const { data: user } = useSession();
  const t = useTranslations("HousePage");

  const router = useRouter();
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["profile", user?.user.id],
    queryFn: () => getSurvey(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const { data: housesData, isLoading: housesIsLoading } = useQuery({
    queryKey: ["houses"],
    queryFn: getHousesDetails,
  });
  const unavailableHouseNames = housesData
    ? [...housesData.map((house) => house.name), "none"]
    : ["none"];

  if (surveyIsLoading || housesIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  return <Content />;
};
export default CreateHousePage;
