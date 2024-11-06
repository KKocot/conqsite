import Preview from "@/components/preview";
import { getPublicLineup } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { Button } from "@/components/ui/button";

interface ContentProps {
  house: string;
  date: string;
  canDelete: boolean;
}

const Content: FC<ContentProps> = ({ house, date, canDelete }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["lineup", house, date],
    queryFn: () => getPublicLineup(house, date),
    enabled: !!house,
  });
  const units = [
    ...goldenUnits,
    ...heroicUnits,
    ...blueUnits,
    ...greenUnits,
    ...greyUnits,
  ];
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const onDelete = async (name: string) => {
    const confirmed = confirm("Are you sure you want to delete this sheet?");
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/publicLineup?house=${house}&date=${date}&name=${name}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error occurred:", errorData);
        } else {
          console.log("Success:", await response.json());
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };
  return (
    <div>
      {data.map((e) => (
        <div key={e.name}>
          <div className="flex items-center gap-5">
            <h1 className="text-2xl font-bold">Lineup: {e.name}</h1>
            <Button
              onClick={() => onDelete(e.name)}
              variant="destructive"
              className="rounded-full"
            >
              X
            </Button>
          </div>
          <Preview data={e.sheet} units={units} />
        </div>
      ))}
    </div>
  );
};
export default Content;
// TODO translate
