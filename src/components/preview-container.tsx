import { FC } from "react";
import { Button } from "./ui/button";
import Preview from "./preview";
import { Unit } from "@/lib/type";
import { PublicLineup } from "@/lib/get-data";
import useDeleteSheet from "./hooks/use-delete-sheet";
import Loading from "react-loading";

interface PreviewContainerProps {
  canDelete: boolean;
  date: string;
  house: string;
  units: Unit[];
  lineup: string;
  data: PublicLineup[];
  username: string;
}

const PreviewContainer: FC<PreviewContainerProps> = ({
  canDelete,
  date,
  house,
  units,
  lineup,
  data,
  username,
}) => {
  const deleteSheetMutation = useDeleteSheet();

  const onDelete = (name: string) => {
    const confirmed = confirm("Are you sure you want to delete this sheet?");
    if (confirmed) {
      deleteSheetMutation.mutate({ house, date, name });
    }
  };

  return (
    <div className="flex gap-4 p-12">
      {data.map((e) =>
        deleteSheetMutation.isPending ? (
          <Loading color="#94a3b8" />
        ) : e.name === lineup ? (
          <div key={e.name}>
            <div className="flex items-center gap-5">
              <h1 className="text-2xl font-bold">Lineup: {e.name}</h1>
              {canDelete ? (
                <Button
                  onClick={() => onDelete(e.name)}
                  variant="destructive"
                  className="rounded-full"
                >
                  X
                </Button>
              ) : null}
            </div>
            <Preview data={e.sheet} units={units} username={username} />
          </div>
        ) : null
      )}
    </div>
  );
};
export default PreviewContainer;
// TODO translate
