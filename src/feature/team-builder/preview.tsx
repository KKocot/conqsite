import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { SheetTypes, Unit } from "@/lib/type";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArtilleryAsset, WeaponAsset } from "@/lib/get-data";
import ImageComponent from "@/components/image-component";
import Image from "next/image";

const Preview = ({
  data,
  units,
  username,
  commander,
  artillery,
  weapons,
}: {
  data: SheetTypes[];
  units: Unit[];
  username?: string | null;
  commander?: string;
  artillery: ArtilleryAsset[];
  weapons: WeaponAsset[];
}) => {
  const [show, setShow] = useState<boolean>(true);
  const t = useTranslations("Lineups");
  return (
    <div>
      <div className="flex justify-around">
        <Button onClick={() => setShow((prev) => !prev)} variant="tab">
          {show ? t("hide_name") : t("show_name")}
        </Button>
      </div>
      {commander || commander !== "" ? (
        <div className="my-12">
          <h3 className="text-xl font-bold text-center">Lineup Commander</h3>
          <h2 className="text-lg font-bold text-center">{commander}</h2>
        </div>
      ) : null}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("username")}</TableHead>
            <TableHead className="w-2">{show ? t("1st_unit") : "1"}</TableHead>
            <TableHead className="w-2">{show ? t("2nd_unit") : "2"}</TableHead>
            <TableHead className="w-2">{show ? t("3rd_unit") : "3"}</TableHead>
            <TableHead className="w-[10px] text-center">
              {t("weapon")}
            </TableHead>
            <TableHead className="text-center">{t("artillery")}</TableHead>
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
            const art = artillery.filter((a) =>
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
                  className={`text-white font-extrabold bg-gradient-to-r to-slate-900 to-20% border-2 border-stale-400 from${e.color} bg-slate-900 hover:bg-slate-800`}
                >
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <span className="flex items-center gap-2">
                      {index + 1 + ". " + e.username}
                      {username === e.username ? (
                        <span title={t("you")}>
                          <OctagonAlert className="animate-ping" />
                        </span>
                      ) : null}
                    </span>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      {unit1 ? (
                        <Link
                          href={`/unit/${unit1.name.replaceAll(" ", "_")}`}
                          target="_blank"
                          className="w-8 h-8"
                        >
                          <ImageComponent name={unit1.name} />
                        </Link>
                      ) : null}
                      {show ? <span>{unit1?.name}</span> : null}
                    </div>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      {unit2 ? (
                        <Link
                          href={`/unit/${unit2?.name.replaceAll(" ", "_")}`}
                          target="_blank"
                          className="w-8 h-8"
                        >
                          <ImageComponent
                            name={unit2.name}
                            width={32}
                            height={32}
                          />
                        </Link>
                      ) : null}
                      {show ? <span>{unit2?.name}</span> : null}
                    </div>
                  </TableCell>
                  <TableCell className="p-1 px-2 whitespace-nowrap overflow-clip">
                    <div className="flex items-center gap-2">
                      {unit3 ? (
                        <Link
                          href={`/unit/${unit3.name.replaceAll(" ", "_")}`}
                          target="_blank"
                          className="w-8 h-8"
                        >
                          <ImageComponent
                            name={unit3.name}
                            width={32}
                            height={32}
                          />
                        </Link>
                      ) : null}
                      {show ? <span>{unit3?.name}</span> : null}
                    </div>
                  </TableCell>
                  <TableCell className="p-1 w-fit">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-8 w-8">
                        <Image
                          alt={weapon?.name ?? "Weapon"}
                          width={32}
                          height={32}
                          className="rounded-full"
                          src={
                            weapon?.src
                              ? `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/${weapon.src}`
                              : `${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/others/logo.png`
                          }
                          title={weapon?.name}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-1 w-fit">
                    <div className="flex items-center gap-1 justify-center">
                      {art.map((a) => (
                        <div key={a.id} className="h-8 w-8">
                          <Image
                            alt={a.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                            src={`${
                              process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                            }/images/artillery/${a.name
                              .toLowerCase()
                              .replaceAll(" ", "-")}.png`}
                            title={a.name}
                          />
                        </div>
                      ))}
                    </div>
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
