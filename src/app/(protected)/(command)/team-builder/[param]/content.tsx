"use client";

import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes } from "@/lib/type";
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { weapons } from "@/assets/weapons";
import Item from "@/feature/team-builder/sheet-form-item";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { others } from "@/assets/other-units-data";
import Preview from "@/components/preview";
import { ScanEye } from "lucide-react";
import UsersList from "@/feature/team-builder/users-list";
import { HouseAssets, Survey } from "@/lib/get-data";
import { DEFAULT_CARD } from "@/lib/defaults";
import Filters from "@/feature/team-builder/filters";
import Templates from "@/feature/team-builder/templates";
import LineupLoader from "@/feature/team-builder/lineupLoader";
import { PublicDialog } from "@/feature/team-builder/public-dialog";
import { useParams } from "next/navigation";
import ItemRow from "@/feature/team-builder/sheet-form-item-row";
import { Switch } from "@/components/ui/switch";

interface PageProps {
  surveysData: Survey[];
  assets?: HouseAssets;
}

const Content: React.FC<PageProps> = ({ surveysData, assets }) => {
  const { param: house }: { param: string } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [userList, setUserList] = useState<Survey[]>(surveysData);
  const [row, setRow] = useState(false);
  const [sheetData, setSheetData] = useState<SheetTypes[]>(
    Array(10).fill(DEFAULT_CARD)
  );
  const [filterUnits, setFilterUnits] = useState({
    rustic_checked: true,
    chivalric_checked: true,
    silver_checked: true,
    heroic_checked: true,
    golden_checked: true,
    other_checked: true,
    meta_units_only: true,
  });
  const units = useMemo(() => {
    const golden_era = filterUnits.golden_checked ? goldenUnits : [];
    const heroic_era = filterUnits.heroic_checked ? heroicUnits : [];
    const silver_era = filterUnits.silver_checked ? blueUnits : [];
    const chivalric_era = filterUnits.chivalric_checked ? greenUnits : [];
    const rustic_era = filterUnits.rustic_checked ? greyUnits : [];
    const others_unit = filterUnits.other_checked ? others : [];
    return [
      ...golden_era,
      ...heroic_era,
      ...silver_era,
      ...chivalric_era,
      ...rustic_era,
      ...others_unit,
    ];
  }, [
    filterUnits.golden_checked,
    filterUnits.heroic_checked,
    filterUnits.silver_checked,
    filterUnits.chivalric_checked,
    filterUnits.rustic_checked,
    filterUnits.other_checked,
  ]);
  const handleEdit = (
    index: number,
    username: string,
    unit1: string,
    unit2: string,
    unit3: string,
    weapon: string,
    description: string,
    color: string,
    artillery: ArtilleryProps[]
  ) => {
    setSheetData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              username: username,
              unit1: unit1,
              unit2: unit2,
              unit3: unit3,
              weapon: weapon,
              description: description,
              color: color,
              artillery: artillery,
            }
          : item
      )
    );
  };
  const usedUsersList = sheetData.map((e) => e.username);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className={clsx("flex flex-col gap-5 p-2", { hidden: showPreview })}>
        <UsersList usedPlayers={usedUsersList} allPlayers={userList} />
        {row ? (
          <ul className="">
            {sheetData.map((e, index) => (
              <ItemRow
                users={userList}
                weapons={weapons}
                key={index}
                index={index}
                units={
                  filterUnits.meta_units_only
                    ? units.filter((e) => e.value > 7)
                    : units
                }
                data={e}
                onEdit={handleEdit}
                usedUsers={usedUsersList}
              />
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-5 gap-4">
            {sheetData.map((e, index) => (
              <Item
                users={userList}
                weapons={weapons}
                key={index}
                index={index}
                units={
                  filterUnits.meta_units_only
                    ? units.filter((e) => e.value > 7)
                    : units
                }
                data={e}
                onEdit={handleEdit}
                usedUsers={usedUsersList}
              />
            ))}
          </ul>
        )}
        <Button
          onClick={() =>
            setSheetData((prev) => [...prev, ...Array(5).fill(DEFAULT_CARD)])
          }
        >
          + 5
        </Button>
      </div>
      <div className={clsx({ hidden: !showPreview })}>
        <Preview data={sheetData} units={units} />
      </div>
      <nav className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-full bg-background px-1 py-2 shadow-lg">
        <PublicDialog data={[]} house={house} />
        <Templates
          assets={assets}
          house={house}
          setSheetData={setSheetData}
          sheetData={sheetData}
        />
        <LineupLoader
          setUserList={setUserList}
          surveysData={surveysData}
          house={house}
        />
        <Filters filters={filterUnits} setFilter={setFilterUnits} />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          <ScanEye className="h-5 w-5" />
        </Button>
        <Switch checked={row} onCheckedChange={(checked) => setRow(checked)} />
      </nav>
    </div>
  );
};

export default Content;
// TODO translation
