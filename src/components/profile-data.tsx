import { ownedUnits } from "@/lib/utils";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import { weapons } from "@/assets/weapons";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Survey, UnitAssetsGroup } from "@/lib/get-data";
import Image from "next/image";
import List from "@/feature/unit-builder/unit-list";

interface ProfileDataProps {
  profile: Survey;
  unitsAssets: UnitAssetsGroup;
}

const ProfileData = ({ profile, unitsAssets }: ProfileDataProps) => {
  const { goldenEra, heroicEra, blueEra, greenEra, greyEra } = unitsAssets;
  const t = useTranslations("MyProfile");
  const golden = ownedUnits(goldenEra, profile.units.golden);
  const heroic = ownedUnits(heroicEra, profile.units.heroic);
  const blue = ownedUnits(blueEra, profile.units.low);
  const green = ownedUnits(greenEra, profile.units.low);
  const grey = ownedUnits(greyEra, profile.units.low);
  const weapons_list = weapons.map((weapon) => {
    const matchingWeapon = profile.weapons.find(
      (w, index) => index + 1 === weapon.id
    );
    return { ...weapon, matchingWeapon };
  });
  return (
    <>
      <ul className="flex gap-8 flex-wrap">
        {weapons_list.map((e) =>
          e.matchingWeapon?.value ? (
            <li
              key={e.id}
              className="flex flex-col items-center w-18"
              title={t("leadership") + ": " + e.matchingWeapon.leadership}
            >
              <Image
                height={48}
                width={48}
                src={e.src}
                alt={e.name}
                className="rounded-full"
              />
              <span
                className={clsx("text-sm", {
                  "text-yellow-600": e.matchingWeapon.pref === 1,
                  "text-purple-600": e.matchingWeapon.pref === 2,
                  "text-blue-600": e.matchingWeapon.pref === 3,
                  "text-green-600": e.matchingWeapon.pref === 4,
                })}
              >
                {t("leadership")}: {e.matchingWeapon.leadership}
              </span>
            </li>
          ) : null
        )}
      </ul>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-0 text-yellow-500">
              {t("max_and_preffer")}
            </TableHead>
            <TableHead className="text-center px-0 text-purple-500">
              {t("preffer")}
            </TableHead>
            <TableHead className="text-center px-0 text-blue-500">
              {t("maxed")}
            </TableHead>
            <TableHead className="text-center px-0 text-green-500">
              {t("i_have")}{" "}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[golden, heroic, blue, green, grey].map((units, index) => (
            <TableRow key={index}>
              {[4, 3, 2, 1].map((value) => (
                <List key={value} units={units} value={value.toString()} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProfileData;
