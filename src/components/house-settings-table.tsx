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

const validate = (data: HouseSettings) => {
  if (
    !data.house.name ||
    !data.house.id ||
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
  const [houseSettings, setHouseSettings] = useState<HouseSettings>(data);
  const check = validate(data);
  const uniqueNames = areAllNamesUnique(data);

  const saveSettings = async () => {
    try {
      const response = await fetch(
        `/api/houseSettings?house=${houseSettings.house.name}`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, id: houseSettings.house.name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        toast.success("House settings saved");
        console.log("Success:", await response.json());
      }
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-extrabold text-xl text-primary">
              Name
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              Description
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              Name
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary">
              ID
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>House</TableCell>
            <TableCell>
              We need to know what is your House Discord. Make sure Konquerus is
              on your discord. By this ID we know on what serwer Konquerus
              should work. If you want change house name, type to support.
            </TableCell>
            <TableCell>
              <Input
                placeholder="House"
                value={houseSettings.house.name}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    house: { name: e.target.value, id: prev.house.id },
                  }))
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Discord"
                type="number"
                value={houseSettings.house.id}
                onChange={(e) =>
                  setHouseSettings((prev) => ({
                    ...prev,
                    house: { name: prev.house.name, id: e.target.value },
                  }))
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>
              What is your Discord member role name and his DiscordID. By this
              ID Konquerus know who is member of your house.
            </TableCell>
            <TableCell>
              <Input
                placeholder="Role"
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
                placeholder="Role"
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
            <TableCell>Logs</TableCell>
            <TableCell>
              Channels or channel to see logs about actions on discord and
              attendance on TW after event. You can use same channel or even
              channel Tread
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Input
                placeholder="Logs channel"
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
                placeholder="Attendance channel"
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
            <TableCell>Tw Zone</TableCell>
            <TableCell>
              We need to know if you play TW on main DC server or difren one.
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Input
                placeholder="Server"
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
                placeholder="Role"
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
              <TableCell>{`Lineup ${i + 1}`}</TableCell>
              <TableCell>
                Bot need to know how to split your house to lineups if you have
                more them one raid
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Role"
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
                      Delete Lineup
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
                      Add Lineup
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Input
                  className="mb-6"
                  type="number"
                  placeholder="Channel"
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
                  placeholder="Role"
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
        Save Settings
      </Button>
      {!uniqueNames ? (
        <div className="bg-red-500 text-white p-2 rounded-md mt-4 w-fit self-center">
          Lineups names must be unique
        </div>
      ) : null}
    </div>
  );
};

export default DataForm;
