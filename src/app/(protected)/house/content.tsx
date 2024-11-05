import Preview from "@/components/preview";
import { getPublicLineup } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";

interface ContentProps {
  house: string;
  date: string;
}

const Content: FC<ContentProps> = ({ house, date }) => {
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
  return (
    <div>
      {data.map((e) => (
        <div key={e.name}>
          <h1 className="text-2xl font-bold">Lineup: {e.name}</h1>
          <Preview data={e.sheet} units={units} />
        </div>
      ))}
    </div>
  );
};
export default Content;
// TODO translate
