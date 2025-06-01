import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtilleryAsset, getPublicLineup, PublicLineup } from "@/lib/get-data";
import clsx from "clsx";
import { useState } from "react";

const LineupsTab = ({
  artAssets,
  dates,
  unitsAssetsList,
  house,
  value,
  onChangeLineup,
}: {
  artAssets: ArtilleryAsset[];
  dates: string[];
  unitsAssetsList: { name: string; icon: string }[];
  house: string;
  value: PublicLineup;
  onChangeLineup: (lineup: PublicLineup) => void;
}) => {
  const [lineupsSheets, setLineupSheets] = useState<PublicLineup[] | null>(
    null
  );
  const onDateChange = async (date: string) => {
    try {
      const response = await getPublicLineup(house, date);
      if (!response) {
        console.error("Error occurred:", response);
      } else {
        setLineupSheets(response);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div className="space-y-2">
      <Select onValueChange={onDateChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select date" />
        </SelectTrigger>
        <SelectContent>
          {dates.map((date) => (
            <SelectItem key={date} value={date}>
              {date}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-2 items-center">
        {!lineupsSheets ? (
          <div>Load Date</div>
        ) : (
          lineupsSheets.map((sheet) => (
            <Button
              variant="ghost"
              key={sheet.name}
              className={clsx("p-1 w-full", {
                "bg-background": value.name === sheet.name,
              })}
              onClick={() => {
                onChangeLineup(sheet);
              }}
            >
              {sheet.name}
            </Button>
          ))
        )}
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium mb-2">Current Lineup</h3>
          <div className="flex flex-col gap-1">
            {value.sheet
              .filter((e) => e.username !== "")
              .map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{`${i + 1}. ${
                      member.username
                    }`}</h4>
                    <div className="flex gap-1">
                      {member.unit1 !== "" ? (
                        <img
                          src={
                            unitsAssetsList.find((e) => e.name === member.unit1)
                              ?.icon
                          }
                          alt={member.unit1}
                          className="w-6 h-6"
                        />
                      ) : null}
                      {member.unit2 !== "" ? (
                        <img
                          src={
                            unitsAssetsList.find((e) => e.name === member.unit2)
                              ?.icon
                          }
                          alt={member.unit2}
                          className="w-6 h-6"
                        />
                      ) : null}
                      {member.unit3 !== "" ? (
                        <img
                          src={
                            unitsAssetsList.find((e) => e.name === member.unit3)
                              ?.icon
                          }
                          alt={member.unit3}
                          className="w-6 h-6"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!!member.artillery
                      ? member.artillery
                          .filter((elem) => elem.check)
                          .map((e, i) => (
                            <img
                              key={i}
                              src={
                                artAssets.find((asset) => asset.id === e.id)
                                  ?.src
                              }
                              alt={e.id.toString()}
                              className="w-6 h-6 rounded-full"
                            />
                          ))
                      : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineupsTab;
