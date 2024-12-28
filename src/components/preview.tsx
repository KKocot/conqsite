import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { artillery } from "@/assets/artillery";
import { SheetTypes, Unit } from "@/lib/type";
import { weapons } from "@/assets/weapons";
import { Button } from "./ui/button";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";

const Preview = ({
  data,
  units,
  username,
}: {
  data: SheetTypes[];
  units: Unit[];
  username?: string | null;
}) => {
  const [show, setShow] = useState<boolean>(true);
  const t = useTranslations("BuildTeam");
  return (
    <div>
      <div className="flex justify-around">
        <Button onClick={() => setShow((prev) => !prev)} variant="tab">
          {show ? t("hide_names") : t("show_names")}
        </Button>
      </div>
      <Table className="my-12">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("username")}</TableHead>
            <TableHead className="w-2">{show ? t("1st_unit") : "1"}</TableHead>
            <TableHead className="w-2">{show ? t("2nd_unit") : "2"}</TableHead>
            <TableHead className="w-2">{show ? t("3rd_unit") : "3"}</TableHead>
            <TableHead className="w-[10px] text-center">
              {t("weapon")}
            </TableHead>
            <TableHead className="w-[180px] text-center">
              {t("artillery")}
            </TableHead>
            <TableHead>{t("description")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => {
            const groupNumber = Math.floor(index / 5) + 1;
            const unit1 = units.find((unit) => unit.name === e.unit1);
            const unit2 = units.find((unit) => unit.name === e.unit2);
            const unit3 = units.find((unit) => unit.name === e.unit3);
            const weapon = weapons.find((w) => w.name === e.weapon);
            const artli = artillery.filter((a) =>
              e.artillery.find((art) => art.id === a.id && art.check)
            );
            return e.username !== "" ? (
              <Fragment key={index}>
                {index % 5 === 0 ? (
                  <TableRow className="text-lg px-6 py-2 font-bold">
                    <TableCell>{`${t("group")} ${groupNumber}`}</TableCell>
                  </TableRow>
                ) : null}
                <TableRow
                  className={`text-white font-extrabold bg-gradient-to-r to-slate-950 to-20% border-2 border-stale-400 from${e.color}`}
                >
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <span className="flex items-center gap-2">
                      {index + 1 + ". " + e.username}
                      {username === e.username ? (
                        <span title="Its You">
                          <OctagonAlert className="animate-ping" />
                        </span>
                      ) : null}
                    </span>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit1?.name}>
                        <Link
                          href={`/unit/${unit1?.era}/${unit1?.name
                            .replaceAll(" ", "_")
                            .toLocaleLowerCase()}`}
                          target="_blank"
                        >
                          <AvatarImage alt={unit1?.name} src={unit1?.icon} />
                        </Link>
                      </Avatar>
                      {show ? <span>{unit1?.name}</span> : null}
                    </div>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit2?.name}>
                        <Link
                          href={`/unit/${unit2?.era}/${unit2?.name
                            .replaceAll(" ", "_")
                            .toLocaleLowerCase()}`}
                          target="_blank"
                        >
                          <AvatarImage alt={unit2?.name} src={unit2?.icon} />
                        </Link>
                      </Avatar>
                      {show ? <span>{unit2?.name}</span> : null}
                    </div>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit3?.name}>
                        <Link
                          href={`/unit/${unit3?.era}/${unit3?.name
                            .replaceAll(" ", "_")
                            .toLocaleLowerCase()}`}
                          target="_blank"
                        >
                          <AvatarImage alt={unit3?.name} src={unit3?.icon} />
                        </Link>
                      </Avatar>
                      {show ? <span>{unit3?.name}</span> : null}
                    </div>
                  </TableCell>

                  <TableCell className="p-1 w-fit">
                    <div className="flex items-center gap-2 justify-center">
                      <Avatar className="h-8 w-8" title={weapon?.name}>
                        <AvatarImage
                          className="rounded-full"
                          alt={weapon?.name}
                          src={weapon?.src}
                        />
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell className="w-fit py-1">
                    <Avatar className="flex gap-1">
                      {artli.map((a) => (
                        <AvatarImage
                          key={a.id}
                          className="h-8 w-8 rounded-full"
                          alt={a?.name}
                          src={a?.src}
                          title={a?.name}
                        />
                      ))}
                    </Avatar>
                  </TableCell>
                  <TableCell className="pr-2 py-1 font-semibold">
                    {e.description}
                  </TableCell>
                </TableRow>
              </Fragment>
            ) : null;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Preview;
