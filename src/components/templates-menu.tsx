import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SheetTypes, SurveyProps } from "@/lib/type";
import { useTranslations } from "next-intl";

const TemplateMenu = ({
  userHouse,
  data,
  setData,
  players,
}: {
  userHouse: string;
  data: SheetTypes[];
  setData: (data: SheetTypes[]) => void;
  players: SurveyProps[];
}) => {
  const t = useTranslations("BuildTeam");
  const [templates, setTemplates] = useState<
    { house: string; templateName: string; sheet: SheetTypes[] }[] | undefined
  >(undefined);
  const [templateName, setTemplateName] = useState("");
  const house_tag =
    userHouse === "KingdomOfPoland"
      ? "KoP"
      : userHouse === "Erebus"
      ? "E"
      : userHouse === "BlackForge"
      ? "BF"
      : "";

  const fetchTemplate = async (house: string) => {
    try {
      const response = await fetch(`/api/template?house=${house}`);
      const data = await response.json();
      setTemplates(data.surveys);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const onSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateName: templateName.includes(`${house_tag}_`)
            ? templateName
            : `${house_tag}_${templateName}`,
          house: userHouse,
          sheet: values,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    fetchTemplate(userHouse);
  }, []);

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
            {templates
              ? templates.map((e) => (
                  <SelectLabel
                    className="cursor-pointer p-2"
                    key={e.templateName}
                    onClick={() => {
                      setData(e.sheet);
                      setTemplateName(e.templateName);
                    }}
                  >
                    {e.templateName}
                  </SelectLabel>
                ))
              : null}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default TemplateMenu;
