import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Survey } from "@/queries/profile.query";

interface Signup {
  name: string;
  signup: string[];
}

interface RaidsFilterProps {
  lineups?: Signup[];
  setLineup: Dispatch<SetStateAction<string[]>>;
  surveys?: Survey[];
  setAllPlayers: Dispatch<SetStateAction<Survey[]>>;
}

const RaidsFilter: FC<RaidsFilterProps> = ({
  lineups,
  setLineup,
  surveys,
  setAllPlayers,
}) => {
  const [loadedLineup, setLoadedLineup] = useState<string[]>([]);
  const t = useTranslations("BuildTeam");
  const addLineup = (lineup: Signup) => {
    setLoadedLineup((prev) => [...prev, lineup.name]);
    setLineup((prev) => [...(prev || []), ...lineup.signup]);
  };
  const removeLineup = (lineup: Signup) => {
    setLoadedLineup((prev) => prev.filter((e) => !lineup.name.includes(e)));
    setLineup((prev) => (prev || []).filter((e) => !lineup.signup.includes(e)));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tab">
          <SlidersHorizontal className="w-5 h-5" />
          {t("lineups")}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4 flex flex-col w-fit">
        {lineups
          ? lineups.map((e) => (
              <Button
                className="w-full justify-start"
                variant="tab"
                key={e.name}
                onClick={() =>
                  loadedLineup.includes(e.name) ? removeLineup(e) : addLineup(e)
                }
              >
                {loadedLineup.includes(e.name)
                  ? "Remove Lineup: "
                  : "Load Lineup: "}
                {e.name}
              </Button>
            ))
          : null}
        {surveys ? (
          <>
            <Button
              onClick={() => setAllPlayers(surveys)}
              variant="tab"
              className="justify-start"
            >
              {t("upload_all")}
            </Button>
            <Button
              onClick={() => setAllPlayers(surveys)}
              variant="tab"
              className="justify-start"
            >
              {t("clean_list")}
            </Button>
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};
export default RaidsFilter;
