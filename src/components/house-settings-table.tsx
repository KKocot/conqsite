import ReactLoading from "react-loading";
import { Button } from "./ui/button";
import { CircleArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Data } from "@/app/(owner)/settings/page";
import { useState } from "react";
import { NextResponse } from "next/server";
import { Input } from "./ui/input";

const validate = (data: Data) => {
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

interface DataFormProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  userId: string;
}

const DataForm: React.FC<DataFormProps> = ({ data, setData, userId }) => {
  const check = validate(data);
  const [checkConnection, setCheckConnection] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorBox, setErrorBox] = useState(false);
  const fetchCheck = async () => {
    setPending(true);
    try {
      const response = await fetch(
        `http://bot.host2play.com:2005/api/server_verification?guild_id=${data.house.id}&member_id=${userId}&member=${data.member.id}&logs=${data.logs.logs}&attendance=${data.logs.attendance}&tw_server=${data.tw.server}&tw_member=${data.tw.member}`
      );
      if (response.ok) {
        setCheckConnection(true);
        console.log("Connection with discord is ok");
        setErrorBox(false);
      } else {
        setErrorBox(true);
        console.error("Error fetching data");
      }
    } catch (error) {
      if (error instanceof Error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
      setPending(false);
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch(
        `/api/houseSettings?house=${data.house.name}`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, id: data.house.name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
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
            <TableHead className="font-extrabold text-xl text-primary-foreground">
              Name
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary-foreground">
              Description
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary-foreground">
              Name
            </TableHead>
            <TableHead className="font-extrabold text-xl text-primary-foreground">
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
              should work.
            </TableCell>
            <TableCell>
              <Input
                placeholder="House"
                value={data.house.name}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    house: { name: e.target.value, id: prev.house.id },
                  }))
                }
                disabled={true}
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Discord"
                disabled={checkConnection}
                type="number"
                value={data.house.id}
                onChange={(e) =>
                  setData((prev) => ({
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
                value={data.member.name}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    member: { name: e.target.value, id: prev.member.id },
                  }))
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Role"
                disabled={checkConnection}
                type="number"
                value={data.member.id}
                onChange={(e) =>
                  setData((prev) => ({
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
                disabled={checkConnection}
                className="mb-6"
                value={data.logs.logs}
                onChange={(e) =>
                  setData((prev) => ({
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
                disabled={checkConnection}
                type="number"
                value={data.logs.attendance}
                onChange={(e) =>
                  setData((prev) => ({
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
                disabled={checkConnection}
                type="number"
                value={data.tw.server}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    tw: { server: e.target.value, member: prev.tw.member },
                  }))
                }
              />
              <Input
                placeholder="Role"
                value={data.tw.member}
                disabled={checkConnection}
                type="number"
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    tw: { server: prev.tw.server, member: e.target.value },
                  }))
                }
              />
            </TableCell>
          </TableRow>
          {data.lineup.map((element, i) => (
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
                    setData((prev) => ({
                      ...prev,
                      lineup: data.lineup.map((lineup, index) =>
                        index === i
                          ? { ...lineup, name: e.target.value }
                          : lineup
                      ),
                    }))
                  }
                />
                <div className="flex gap-2">
                  {data.lineup.length === 1 ? null : (
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          lineup: prev.lineup.filter((_, index) => index !== i),
                        }))
                      }
                    >
                      Delete Lineup
                    </Button>
                  )}
                  {data.lineup.length !== i + 1 ? null : (
                    <Button
                      onClick={() =>
                        setData((prev) => ({
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
                  disabled={checkConnection}
                  type="number"
                  placeholder="Channel"
                  value={element.id}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      lineup: data.lineup.map((lineup, index) =>
                        index === i ? { ...lineup, id: e.target.value } : lineup
                      ),
                    }))
                  }
                />
                <Input
                  placeholder="Role"
                  disabled={checkConnection}
                  type="number"
                  value={element.roleId}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      lineup: data.lineup.map((lineup, index) =>
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
      <div className="flex justify-center mt-6 items-center">
        <Button onClick={() => fetchCheck()} disabled={check}>
          Check connection with discord
        </Button>
        {pending ? (
          <div className="flex items-center">
            <ReactLoading type="balls" color="#fff" />
            <ReactLoading type="balls" color="#fff" className="ml-[-7.5px]" />
            <CircleArrowRight />
          </div>
        ) : (
          <div className="w-[144.5px]" />
        )}
        <Button disabled={!checkConnection} onClick={saveSettings}>
          Save Settings
        </Button>
      </div>
      {errorBox ? (
        <div className="bg-red-500 text-white p-2 rounded-md mt-4 w-fit self-center">
          Error occurred while checking connection with discord
        </div>
      ) : null}
    </div>
  );
};

export default DataForm;
