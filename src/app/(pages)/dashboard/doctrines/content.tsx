"use client";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import DoctrinesList from "@/feature/doctrines/doctrines-list";
import { useTranslations } from "next-intl";
import { DoctrineType } from "@/lib/get-data";

const Content = ({ doctrines }: { doctrines: DoctrineType[] }) => {
  const t = useTranslations("Doctrines");
  const dedicatedForAll = doctrines.filter(
    (doctrine) => doctrine.dedicated === "all"
  );
  const dedicatedForGruops = doctrines.filter(
    (doctrine) => doctrine.dedicated === "group"
  );
  const dedicatedForUnits = doctrines.filter(
    (doctrine) => doctrine.dedicated === "unit"
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex justify-between w-full flex-col sm:flex-row">
        {["all", "group", "unit"].map((value) => (
          <TabsTrigger key={value} value={value}>
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
        <TabsContent key={value} value={value} className="flex justify-center">
          <DoctrinesList doctrines={doctrines} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
