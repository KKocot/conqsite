"use client";

import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes } from "@/lib/type";
import React, { FC, ReactNode, useMemo, useState } from "react";
import clsx from "clsx";
import { weapons } from "@/assets/weapons";
import Item from "@/feature/team-builder/sheet-form-item";
import { Rows4, ScanEye, Table, TableIcon } from "lucide-react";
import UsersList from "@/feature/team-builder/users-list";
import { HouseAssets, Survey, UnitAssetsGroup } from "@/lib/get-data";
import { DEFAULT_CARD } from "@/lib/defaults";
import Filters from "@/feature/team-builder/filters";
import Templates from "@/feature/team-builder/templates";
import LineupLoader from "@/feature/team-builder/lineupLoader";
import { PublicDialog } from "@/feature/team-builder/public-dialog";
import { useParams } from "next/navigation";
import ItemRow from "@/feature/team-builder/sheet-form-item-row";
import Preview from "@/feature/team-builder/preview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "react-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContentProps {
  surveysData: Survey[];
  assets?: HouseAssets;
  publicLineups: { dates?: string[]; loading: boolean };
  unitsAssets: UnitAssetsGroup;
}

const Content = ({
  surveysData,
  assets,
  publicLineups,
  unitsAssets,
}: ContentProps) => {
  const { goldenEra, heroicEra, blueEra, greenEra, greyEra, otherEra } =
    unitsAssets;
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const [showPreview, setShowPreview] = useState(false);
  const [userList, setUserList] = useState<Survey[]>(surveysData);
  const [row, setRow] = useState(false);
  const [commander, setCommander] = useState("");
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
    const golden_era = filterUnits.golden_checked ? goldenEra : [];
    const heroic_era = filterUnits.heroic_checked ? heroicEra : [];
    const silver_era = filterUnits.silver_checked ? blueEra : [];
    const chivalric_era = filterUnits.chivalric_checked ? greenEra : [];
    const rustic_era = filterUnits.rustic_checked ? greyEra : [];
    const others_unit = filterUnits.other_checked ? otherEra : [];
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
  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newItems = [...sheetData];
      [newItems[index - 1], newItems[index]] = [
        newItems[index],
        newItems[index - 1],
      ];
      setSheetData(newItems);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < sheetData.length - 1) {
      const newItems = [...sheetData];
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
      setSheetData(newItems);
    }
  };
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
    <div className="flex justify-center flex-col items-center overflow-x-hidden">
      <div className={clsx("flex flex-col gap-5 p-2", { hidden: showPreview })}>
        <UsersList
          usedPlayers={usedUsersList}
          allPlayers={userList}
          unitsAssets={unitsAssets}
        />
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-2 items-center w-fit">
            <Label htmlFor="commander">Lineup Commander</Label>
            <Input
              value={commander}
              onChange={(e) => setCommander(e.target.value)}
              id="commander"
            />
          </div>
        </div>
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
                moveUp={moveItemUp}
                moveDown={moveItemDown}
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
                moveUp={moveItemUp}
                moveDown={moveItemDown}
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
        <Preview data={sheetData} units={units} commander={commander} />
      </div>
      <nav className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-full bg-background px-1 py-2 shadow-lg">
        <TooltipContainer title="Public Lineups">
          {publicLineups.loading ? (
            <Loading type="spin" color="#94a3b8" />
          ) : (
            <PublicDialog
              data={sheetData}
              house={house}
              commander={commander}
              setCommander={setCommander}
              setSheetData={setSheetData}
              dates={publicLineups.dates}
            />
          )}
        </TooltipContainer>
        <TooltipContainer title="Templates">
          <Templates
            commander={commander}
            assets={assets}
            house={house}
            setCommander={setCommander}
            setSheetData={setSheetData}
            sheetData={sheetData}
          />
        </TooltipContainer>
        <TooltipContainer title="Lineup Loader">
          <LineupLoader
            setUserList={setUserList}
            surveysData={surveysData}
            house={house}
          />
        </TooltipContainer>
        <TooltipContainer title="Filters">
          <Filters filters={filterUnits} setFilter={setFilterUnits} />
        </TooltipContainer>
        <TooltipContainer title="Preview">
          <div
            className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background"
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? (
              <Table className="h-5 w-5" />
            ) : (
              <ScanEye className="h-5 w-5" />
            )}
          </div>
        </TooltipContainer>
        <TooltipContainer title="Row View">
          <div
            className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background"
            onClick={() => setRow((prev) => !prev)}
          >
            {row ? (
              <TableIcon className="h-5 w-5" />
            ) : (
              <Rows4 className="h-5 w-5" />
            )}
          </div>
        </TooltipContainer>
      </nav>
    </div>
  );
};

export default Content;
// TODO translation

const TooltipContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="left">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
