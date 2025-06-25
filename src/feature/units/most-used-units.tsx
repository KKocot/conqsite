import { getMostUsedUnits } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../ifs/loading";
import Link from "next/link";
import ImageComponent from "@/components/image-component";

const MostUsedUnits = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["most-used-units"],
    queryFn: getMostUsedUnits,
  });
  return (
    <div className="flex flex-col gap-6 mt-6">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((unit) => (
            <div
              key={unit.id}
              className="flex flex-col items-center justify-center"
            >
              <Link
                href={`/unit/${unit.name.replaceAll(" ", "_")}`}
                key={unit.id}
                className="p-[2px]"
              >
                <ImageComponent name={unit.name} width={90} height={90} />
              </Link>
              <span className="text-sm font-semibold">{unit.name}</span>
              <span className="text-xs">Popularity points: {unit.rating}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MostUsedUnits;
