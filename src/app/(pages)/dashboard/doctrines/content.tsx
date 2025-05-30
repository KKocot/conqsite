"use client";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import DoctrinesList from "@/feature/doctrines/doctrines-list";
import { useTranslations } from "next-intl";
import { DoctrineType } from "@/lib/get-data";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

type CardType = "all" | "groups" | "unit" | null;

const Content = ({ doctrines }: { doctrines: DoctrineType[] }) => {
  const params = useSearchParams();
  const router = useRouter();
  const card = params.get("card") as CardType;
  const [tab, setTab] = useState(card ?? "all");
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("Doctrines");

  const filterDoctrines = (doctrines: DoctrineType[]) => {
    return doctrines.filter((doctrine) => {
      const matchesSearch = doctrine.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const dedicatedForAll = filterDoctrines(
    doctrines.filter((doctrine) => doctrine.dedicated === "all")
  );
  const dedicatedForGruops = filterDoctrines(
    doctrines.filter((doctrine) => doctrine.dedicated === "group")
  );
  const dedicatedForUnits = filterDoctrines(
    doctrines.filter((doctrine) => doctrine.dedicated === "unit")
  );

  const onTabChange = (value: CardType) => {
    if (value === null) return;
    setTab(value);
    router.push(`/dashboard/doctrines?card=${value}`);
  };
  return (
    <div className="relative w-full">
      <Tabs value={tab} onValueChange={(e) => onTabChange(e as CardType)}>
        <TabsList className="flex justify-between flex-col sm:flex-row">
          {["all", "group", "unit"].map((value) => (
            <TabsTrigger
              key={value}
              value={value}
              className={clsx("", {
                "text-accent/80": tab !== value,
              })}
            >
              {value === "all"
                ? t("general_doctrines")
                : value === "group"
                ? t("dedicated_for_groups")
                : t("dedicated_for_units")}
            </TabsTrigger>
          ))}
        </TabsList>
        {[
          { value: "all", doctrines: dedicatedForAll },
          { value: "group", doctrines: dedicatedForGruops },
          { value: "unit", doctrines: dedicatedForUnits },
        ].map(({ value, doctrines }) => (
          <TabsContent
            key={value}
            value={value}
            className="flex flex-col w-fill gap-4"
          >
            {Array.from(new Set(doctrines.map((d) => d.rarity))).map(
              (rarity) => (
                <Accordion type="multiple" key={rarity} defaultValue={[rarity]}>
                  <AccordionItem value={rarity}>
                    <AccordionTrigger
                      className={clsx("capitalize px-4", {
                        "bg-gray-500": rarity === "common",
                        "bg-green-500": rarity === "uncommon",
                        "bg-blue-500": rarity === "rare",
                        "bg-purple-500": rarity === "epic",
                      })}
                    >
                      {rarity} Doctrines
                    </AccordionTrigger>
                    <AccordionContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-6">
                      {doctrines
                        .filter((d) => d.rarity === rarity)
                        .map((doctrine) => (
                          <DoctrinesList
                            key={doctrine.name}
                            doctrines={[doctrine]}
                          />
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4 shadow-lg w-64">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search doctrines..."
            className="w-full px-3 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
