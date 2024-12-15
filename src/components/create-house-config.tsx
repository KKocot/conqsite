import { DiscordProps } from "@/lib/get-data";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

export interface ConfigProps {
  member: string;
  logs: string;
  tw_member: string;
  lineup: { channelID: string; roleID: string }[];
}

const CreateHouseConfig = ({
  data,
  handleStep,
  values,
  setValues,
}: {
  data: DiscordProps;
  handleStep: (e: number) => void;
  values: ConfigProps;
  setValues: Dispatch<SetStateAction<ConfigProps>>;
}) => {
  const t = useTranslations("SettingsPage");

  const onSubmit = async () => {
    handleStep(3);
  };

  return (
    <div>
      <Card>
        <CardHeader className="text-center text-2xl font-bold">
          Konquerus Config
        </CardHeader>
        <CardContent className="flex flex-col w-full">
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-extrabold text-xl text-primary">
                  {t("name")}
                </TableHead>
                <TableHead className="font-extrabold text-xl text-primary">
                  {t("description")}
                </TableHead>
                <TableHead className="font-extrabold text-xl text-primary w-64">
                  Lists
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Member Role</TableCell>
                <TableCell>
                  Choose the common member discord role to let the bot know who
                  should be added to your house.
                </TableCell>
                <TableCell>
                  <Select
                    value={values.member}
                    onValueChange={(e) =>
                      setValues((prev) => ({ ...prev, member: e }))
                    }
                  >
                    <Item label="Member" value={data.roles} />
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Logs Channel</TableCell>
                <TableCell>
                  Konquerus need a channel to communicate you who joined or
                  leave your house.
                </TableCell>
                <TableCell>
                  <Select
                    value={values.logs}
                    onValueChange={(e) =>
                      setValues((prev) => ({ ...prev, logs: e }))
                    }
                  >
                    <Item label="Logs" value={data.channels} />
                  </Select>
                </TableCell>
              </TableRow>

              {data.twRoles ? (
                <TableRow>
                  <TableCell>TW Role</TableCell>
                  <TableCell>
                    Konquerus need to know the common role on the TW discord to
                  </TableCell>
                  <TableCell>
                    <Select
                      value={values.tw_member}
                      onValueChange={(e) =>
                        setValues((prev) => ({ ...prev, tw_member: e }))
                      }
                    >
                      <Item
                        label="Common role on TW discord"
                        value={data.twRoles}
                      />
                    </Select>
                  </TableCell>
                </TableRow>
              ) : null}
              {values.lineup.map((element, i) => (
                <TableRow key={i}>
                  <TableCell>{`${t("lineup")} ${i + 1}`}</TableCell>
                  <TableCell>{t("lineup_description")}</TableCell>
                  <TableCell className="flex flex-col gap-4">
                    <div>
                      <Label>{t("channel")}</Label>
                      <Select
                        value={element.channelID}
                        onValueChange={(value) =>
                          setValues((prev) => ({
                            ...prev,
                            lineup: prev.lineup.map((e, index) =>
                              index === i ? { ...e, channelID: value } : e
                            ),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pick sign up bot channel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data.channels.map((e, i) => (
                              <SelectItem
                                key={i + "bot"}
                                value={e.id.toString()}
                              >
                                {e.label}
                              </SelectItem>
                            ))}{" "}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t("role")}</Label>
                      <Select
                        value={element.roleID}
                        onValueChange={(value) =>
                          setValues((prev) => ({
                            ...prev,
                            lineup: prev.lineup.map((e, index) =>
                              index === i ? { ...e, roleID: value } : e
                            ),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pick Lineup Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data.roles.map((e, i) => (
                              <SelectItem
                                key={i + "role"}
                                value={e.id.toString()}
                              >
                                {e.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      {values.lineup.length === 1 ? (
                        <div className="w-28" />
                      ) : (
                        <Button
                          variant="destructive"
                          onClick={() =>
                            setValues((prev) => ({
                              ...prev,
                              lineup: prev.lineup.filter(
                                (_, index) => index !== i
                              ),
                            }))
                          }
                        >
                          {t("delete_lineup")}
                        </Button>
                      )}
                      {values.lineup.length !== i + 1 ? null : (
                        <Button
                          className="self-end justify-self-end"
                          onClick={() =>
                            setValues((prev) => ({
                              ...prev,
                              lineup: [
                                ...prev.lineup,
                                { channelID: "", roleID: "" },
                              ],
                            }))
                          }
                        >
                          {t("add_lineup")}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between w-full">
            <Button variant="custom" onClick={() => handleStep(1)}>
              Previes
            </Button>
            <Button
              disabled={
                (data.twRoles !== null && values.tw_member === "") ||
                values.member === "" ||
                values.logs === "" ||
                values.lineup.some((e) => e.channelID === "" || e.roleID === "")
              }
              className="self-end"
              variant="custom"
              onClick={onSubmit}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateHouseConfig;

const Item = ({
  label,
  value,
}: {
  label: string;
  value: { id: number; label: string }[];
}) => {
  return (
    <>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {value.map((e, i) => (
            <SelectItem key={i + label} value={e.id.toString()}>
              {e.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </>
  );
};
