import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { TreeNode } from "./tree";
import clsx from "clsx";
import { UnitObject } from "@/lib/get-data";

const BranchButton: FC<{
  node: TreeNode;
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  editMode: boolean;
  onSkillUpdate: (nodeId: number) => void;
  setUnit: Dispatch<SetStateAction<UnitObject>>;
  mode: "edit" | "view";
}> = ({
  node,
  values,
  nodesMap,
  disabled,
  onSkillUpdate,
  mode,
  editMode,
  setUnit,
}) => {
  const value = values.get(node.id)!;
  const prevValue = values.get(node.prev ?? -1);
  const prevNode = nodesMap.get(node.prev ?? -1);
  const isDisabled =
    (prevValue !== undefined &&
      prevNode !== undefined &&
      prevValue < prevNode.value) ||
    value === node.value;

  const onAdd = () => {
    setUnit((prevUnit) => {
      return {
        ...prevUnit,
        treeStructure: [
          ...prevUnit.treeStructure,
          {
            description: "Some description",
            id: prevUnit.treeStructure.length,
            img: "/logo.png",
            name: "Some name",
            prev: node.id,
            value: 3,
          },
        ],
      };
    });
  };
  return (
    <div className="flex flex-col items-center">
      {editMode ? (
        <div className="flex items-center">
          <button className="p-0 h-4">
            <Trash2 />
          </button>
          <button className="p-0 h-4" onClick={onAdd}>
            <Plus />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="flex flex-col h-24 w-12 m-2 items-center select-none"
        disabled={isDisabled || disabled}
        onClick={() => onSkillUpdate(node.id)}
      >
        <Image
          src={node.img}
          alt={node.name}
          width={48}
          height={48}
          title={node.name}
          className="cursor-pointer"
        />
        <Badge
          variant="tree"
          className={clsx({
            "opacity-50 cursor-not-allowed": isDisabled || disabled,
            "bg-primary": value === node?.value,
          })}
        >
          {mode === "view" ? node.value : `${value ?? 0}/${node.value}`}
        </Badge>
      </button>
    </div>
  );
};

export default BranchButton;
