import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { TreeNode } from "./tree";
import clsx from "clsx";
import { UnitObject } from "@/lib/get-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BranchButton: FC<{
  node: TreeNode;
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  onSkillUpdate: (nodeId: number) => void;
  mode: "edit" | "view" | "builded";
}> = ({ node, values, nodesMap, disabled, onSkillUpdate, mode }) => {
  const value = values.get(node.id)!;
  const prevValue = values.get(node.prev ?? -1);
  const prevNode = nodesMap.get(node.prev ?? -1);
  const isDisabled =
    (prevValue !== undefined &&
      prevNode !== undefined &&
      prevValue < prevNode.value) ||
    value === node.value;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="flex flex-col h-24 w-12 m-2 items-center select-none"
        disabled={isDisabled || disabled}
        onClick={() => onSkillUpdate(node.id)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images${node.img}`}
                alt={node.name}
                width={48}
                height={48}
                title={node.name}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <h2 className="p-2 text-xl">{node.name}</h2>
              <p>{node.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
