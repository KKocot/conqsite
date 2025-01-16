import clsx from "clsx";
import { Badge } from "../../components/ui/badge";
import { UserProfile } from "../../components/user-profile";
import { Survey } from "@/lib/get-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const UsersList = ({
  usedPlayers,
  allPlayers,
}: {
  usedPlayers: string[];
  allPlayers: Survey[];
}) => {
  const t = useTranslations("BuildTeam");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-center">
          <div className="flex gap-2">
            <span className="text-yellow-500">{t("maxed_and_preffer")}</span>
            <span className="text-purple-500">{t("preffer")}</span>
            <span className="text-blue-500">{t("maxed")}</span>
            <span className="text-green-500">{t("i_have")}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 p-4">
            {allPlayers.map((survey) => (
              <div key={survey.discordId}>
                <UserProfile player={survey}>
                  <Badge
                    variant="secondary"
                    className={clsx("bg-red-800 text-white", {
                      "bg-slate-600": !usedPlayers.some(
                        (e) => e === survey.inGameNick
                      ),
                    })}
                  >
                    {survey.inGameNick}
                  </Badge>
                </UserProfile>
              </div>
            ))}
          </div>{" "}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default UsersList;
