import { useEffect, useState } from "react";

import { SheetTypes } from "@/lib/type";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getTemplates, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TemplateMenu = ({
  userHouse,
  data,
  setData,
  players,
}: {
  userHouse: string;
  data: SheetTypes[];
  setData: (data: SheetTypes[]) => void;
  players: Survey[];
}) => {
  const user = useSession();
  const { data: roles = [] } = useQuery(rolesQueryOptions());

  const highestRole = roles
    .filter((e) => e.role === "HouseLeader" || e.role === "RightHand")
    .some((e) => e.discordId === user.data?.user?.id);
  const t = useTranslations("BuildTeam");
  const [templateName, setTemplateName] = useState("");

  const { data: templatesData, isLoading } = useQuery({
    queryKey: ["templateList", userHouse],
    queryFn: () => getTemplates(userHouse),
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateName: templateName.includes(`${userHouse}_`)
            ? templateName
            : `${userHouse}_${templateName}`,
          house: userHouse,
          sheet: values,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        const responseData = await response.json();
        toast.success("Template Saved", {
          data: {
            title: "Template Saved in Database",
          },
        });
        console.log("Success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 bg-indigo-950 p-1">
      <div className="flex">
        <Input
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Name new template"
          className="w-48"
          value={templateName}
        />
        <Button
          onClick={() => onSubmit(data)}
          disabled={templateName === ""}
          variant="tab"
          className="hover:bg-green-700"
        >
          {t("save_template_to_db")}
        </Button>
      </div>
      <Select disabled={players.length === 0}>
        <SelectTrigger>
          <SelectValue placeholder={t("select_template")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templatesData
              ? templatesData.map((e) => (
                  <div
                    className="cursor-pointer p-2 flex justify-between items-center"
                    key={e.templateName}
                  >
                    <SelectLabel
                      onClick={() => {
                        setData(e.sheet);
                        setTemplateName(
                          e.templateName.replace(`${userHouse}_`, "")
                        );
                        toast.info("Template loaded");
                      }}
                    >
                      {e.templateName.replace(`${userHouse}_`, "")}
                    </SelectLabel>
                    {highestRole ? (
                      <Button
                        variant="ghost"
                        className="text-destructive"
                        onClick={async () => {
                          const confirmed = confirm(
                            "Are you sure you want to delete this template?"
                          );
                          if (confirmed) {
                            try {
                              const response = await fetch(
                                `/api/template?id=${e._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              if (!response.ok) {
                                const errorData = await response.json();
                                console.error("Error occurred:", errorData);
                              } else {
                                const responseData = await response.json();
                                console.log("Success:", responseData);
                                setTemplateName("");
                                toast.error("Template Deleted");
                              }
                            } catch (error) {
                              console.error("Error occurred:", error);
                            }
                          }
                        }}
                      >
                        X
                      </Button>
                    ) : null}
                  </div>
                ))
              : null}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default TemplateMenu;
