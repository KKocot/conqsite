import { FileDown, FileUp, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalStorage } from "usehooks-ts";
import { SheetTypes } from "@/lib/type";
import { useTranslations } from "next-intl";
import { DEFAULT_CARD } from "@/app/(command)/team-builder/page";
import { Dispatch, FC } from "react";

interface ChildComponentProps {
  data: SheetTypes[];
  setData: Dispatch<React.SetStateAction<SheetTypes[]>>;
  playersNum: number;
}

const StorageTemplate: FC<ChildComponentProps> = ({
  data,
  setData,
  playersNum,
}) => {
  const t = useTranslations("BuildTeam");
  const [storage, setStorage] = useLocalStorage<SheetTypes[]>(`sheetData`, []);

  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={() => setStorage(data)}
        variant="tab"
        className="hover:bg-green-700"
      >
        <FileDown className="w-5 h-5" />
        {t("save_template")}
      </Button>
      <Button
        onClick={() => setData(storage)}
        disabled={playersNum === 0}
        variant="tab"
      >
        <FileUp className="w-5 h-5" />
        {t("load_template")}
      </Button>
      <Button
        variant="tab"
        className="hover:bg-red-700"
        onClick={() =>
          setData(() => {
            const requiredLength = playersNum + 10;
            return Array.from({ length: requiredLength }, () => DEFAULT_CARD);
          })
        }
      >
        <Trash2 className="w-5 h-5" />
        {t("clean_sheet")}
      </Button>
    </div>
  );
};
export default StorageTemplate;
