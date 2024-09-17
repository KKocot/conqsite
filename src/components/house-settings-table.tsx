import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { HouseSettings } from "@/lib/get-data";
import { FC, useState } from "react";
import { useTranslations } from "next-intl";

const validate = (data: HouseSettings) => {
  if (
    !data.name ||
    !data.id ||
    !data.member.name ||
    !data.member.id ||
    !data.logs.logs ||
    !data.logs.attendance ||
    !data.tw.server ||
    !data.tw.member ||
    data.lineup.some((e) => !e.name || !e.id || !e.roleId)
  ) {
    return true;
  }
  return false;
};

const areAllNamesUnique = (data: { lineup: { name: string }[] }) => {
  const names = data.lineup.map((item) => item.name);
  const uniqueNames = new Set(names);
  return uniqueNames.size === names.length;
};

interface DataFormProps {
  data: HouseSettings;
}

const DataForm: FC<DataFormProps> = ({ data }) => {
  const t = useTranslations("SettingsPage");
  const [houseSettings, setHouseSettings] = useState<HouseSettings>(data);
  const check = validate(houseSettings);
  const uniqueNames = areAllNamesUnique(houseSettings);

  const saveSettings = async () => {
    try {
      const response = await fetch(
        `/api/houseSettings?name=${houseSettings.name}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...houseSettings,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(t("error_occurred"), errorData);
      } else {
        toast.success(t("house_settings_saved"));
        console.log(t("success"), await response.json());
      }
    } catch (error) {
      console.error(t("error_adding"), error);
    }
  };

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-extrabold text-xl text-primary">
              {t("name")}
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              {t("description")}
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              {t("name")}
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              {t("id")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{t("house")}</TableCell>
            <TableCell>{t("house_description")}</TableCell>
            <TableCell>
              <Input
                placeholder={t("house")}
                value={houseSettings.name}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                disabled={true}
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder={t("discord")}
                type="number"
                value={houseSettings.id}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    id: e.target.value,
                  }))
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("member")}</TableCell>
            <TableCell>{t("member_description")}</TableCell>
            <TableCell>
              <Input
                placeholder={t("role")}
                value={houseSettings.member.name}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    member: { name: e.target.value, id: prev.member.id },
                  }))
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder={t("role")}
                type="number"
                value={houseSettings.member.id}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    member: { name: prev.member.name, id: e.target.value },
                  }))
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("logs")}</TableCell>
            <TableCell>{t("logs_description")}</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Input
                placeholder={t("logs_channel")}
                type="number"
                className="mb-6"
                value={houseSettings.logs.logs}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    logs: {
                      logs: e.target.value,
                      attendance: prev.logs.attendance,
                    },
                  }))
                }
              />
              <Input
                placeholder={t("attendance_channel")}
                type="number"
                value={houseSettings.logs.attendance}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    logs: { logs: prev.logs.logs, attendance: e.target.value },
                  }))
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("tw_zone")}</TableCell>
            <TableCell>{t("tw_zone_description")}</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Input
                placeholder={t("server")}
                className="mb-6"
                type="number"
                value={houseSettings.tw.server}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    tw: { server: e.target.value, member: prev.tw.member },
                  }))
                }
              />
              <Input
                placeholder={t("role")}
                value={houseSettings.tw.member}
                type="number"
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    tw: { server: prev.tw.server, member: e.target.value },
                  }))
                }
              />
            </TableCell>
          </TableRow>
          {houseSettings.lineup.map((element, i) => (
            <TableRow key={i}>
              <TableCell>{`${t("lineup")} ${i + 1}`}</TableCell>
              <TableCell>{t("lineup_description")}</TableCell>
              <TableCell>
                <Input
                  placeholder={t("role")}
                  className="mb-6"
                  value={element.name}
                  onChange={(e) =>
                    setHouseSettings((prev) => ({
                      ...prev,
                      lineup: houseSettings.lineup.map((lineup, index) =>
                        index === i
                          ? { ...lineup, name: e.target.value }
                          : lineup
                      ),
                    }))
                  }
                />
                <div className="flex gap-2">
                  {houseSettings.lineup.length === 1 ? null : (
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setHouseSettings((prev) => ({
                          ...prev,
                          lineup: prev.lineup.filter((_, index) => index !== i),
                        }))
                      }
                    >
                      {t("delete_lineup")}
                    </Button>
                  )}
                  {houseSettings.lineup.length !== i + 1 ? null : (
                    <Button
                      onClick={() =>
                        setHouseSettings((prev) => ({
                          ...prev,
                          lineup: [
                            ...prev.lineup,
                            { name: "", id: "", roleId: "" },
                          ],
                        }))
                      }
                    >
                      {t("add_lineup")}
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Input
                  className="mb-6"
                  type="number"
                  placeholder={t("channel")}
                  value={element.id}
                  onChange={(e) =>
                    setHouseSettings((prev) => ({
                      ...prev,
                      lineup: houseSettings.lineup.map((lineup, index) =>
                        index === i ? { ...lineup, id: e.target.value } : lineup
                      ),
                    }))
                  }
                />
                <Input
                  placeholder={t("role")}
                  type="number"
                  value={element.roleId}
                  onChange={(e) =>
                    setHouseSettings((prev) => ({
                      ...prev,
                      lineup: houseSettings.lineup.map((lineup, index) =>
                        index === i
                          ? { ...lineup, roleId: e.target.value }
                          : lineup
                      ),
                    }))
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        disabled={check || !uniqueNames}
        onClick={saveSettings}
        className="w-fit self-center"
      >
        {t("save_settings")}
      </Button>
      {!uniqueNames ? (
        <div className="bg-red-500 text-white p-2 rounded-md mt-4 w-fit self-center">
          {t("unique_lineup_names")}
        </div>
      ) : null}
    </div>
  );
};

export default DataForm;
