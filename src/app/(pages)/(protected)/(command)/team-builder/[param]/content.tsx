"use client";

import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes } from "@/lib/type";
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import Item from "@/feature/team-builder/sheet-form-item";
import { Rows4, ScanEye, Table, TableIcon } from "lucide-react";
import UsersList from "@/feature/team-builder/users-list";
import { Survey } from "@/lib/get-data";
import { DEFAULT_CARD } from "@/lib/defaults";
import Filters from "@/feature/team-builder/filters";
import Templates from "@/feature/team-builder/templates";
import LineupLoader from "@/feature/team-builder/lineup-loader";
import { PublicDialog } from "@/feature/team-builder/public-dialog";
import { useParams } from "next/navigation";
import ItemRow from "@/feature/team-builder/sheet-form-item-row";
import Preview from "@/feature/team-builder/preview";
import Loading from "react-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PickedUnitsStats from "@/feature/team-builder/picked-units-stats";
import TooltipContainer from "@/components/tooltip-container";
import { useLocalStorage } from "usehooks-ts";
import {
  ContentProps,
  DEFAULT_FILTERS,
  FiltersProps,
} from "@/feature/team-builder/utils/lib";

const Content = ({
  surveysData,
  assets,
  publicLineups,
  unitsAssets,
  artillery,
  weapons,
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
  const [storedFilters, setStoredFilters] = useLocalStorage<FiltersProps>(
    `filters-${house}`,
    DEFAULT_FILTERS
  );

  const units = useMemo(() => {
    const golden_era = storedFilters.golden_checked ? goldenEra : [];
    const heroic_era = storedFilters.heroic_checked ? heroicEra : [];
    const silver_era = storedFilters.silver_checked ? blueEra : [];
    const chivalric_era = storedFilters.chivalric_checked ? greenEra : [];
    const rustic_era = storedFilters.rustic_checked ? greyEra : [];
    const others_unit = storedFilters.other_checked ? otherEra : [];
    return [
      ...golden_era,
      ...heroic_era,
      ...silver_era,
      ...chivalric_era,
      ...rustic_era,
      ...others_unit,
    ];
  }, [
    storedFilters.golden_checked,
    storedFilters.heroic_checked,
    storedFilters.chivalric_checked,
    storedFilters.silver_checked,
    storedFilters.rustic_checked,
    storedFilters.other_checked,
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
          weapons={weapons}
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
          <ul>
            {sheetData.map((e, index) => (
              <ItemRow
                artillery={artillery}
                users={userList}
                weapons={weapons}
                key={index}
                index={index}
                units={
                  storedFilters.meta_units_only
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
                artillery={artillery}
                users={userList}
                weapons={weapons}
                key={index}
                index={index}
                units={
                  storedFilters.meta_units_only
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
        <Preview
          data={sheetData}
          units={units}
          commander={commander}
          artillery={artillery}
          weapons={weapons}
        />
      </div>
      <nav className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-full bg-background px-1 py-2 shadow-lg">
        <TooltipContainer title="Sheet Stats">
          <PickedUnitsStats
            sheetData={sheetData}
            units={units.map((e) => ({
              name: e.name,
              types: e.types,
            }))}
          />
        </TooltipContainer>
        <TooltipContainer title="Public Lineups">
          {publicLineups.loading ? (
            <div className="flex w-full items-center justify-center">
              <Loading type="spin" color="#94a3b8" height={30} width={30} />
            </div>
          ) : (
            <PublicDialog
              premium={assets?.premium}
              data={sheetData}
              house={house}
              commander={commander}
              setCommander={setCommander}
              setSheetData={setSheetData}
              dates={publicLineups.dates}
              discordData={publicLineups.discordData}
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
          <Filters filters={storedFilters} setFilter={setStoredFilters} />
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
