"use client";

import {
  useState,
  useMemo,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnitObject } from "@/lib/get-data";
import TreeRenderer from "./tree-renderer";

export type TreeNode = {
  id: number;
  name: string;
  description: string;
  img: string;
  prev: number | null;
  value: number;
  children?: TreeNode[];
};

export interface TreeProps {
  nodes: TreeNode[];
  unitlvl: number;
  editMode: boolean;
  mode: "edit" | "view";
  setUnit: Dispatch<SetStateAction<UnitObject>>;
}
const generateTree = (nodes: TreeNode[]) => {
  const root = nodes.find((d) => d.prev === null);
  if (!root) return null;
  const mapWithChildren = (node: TreeNode): TreeNode => {
    const children = nodes.filter((d) => d.prev === node.id);
    if (children.length === 0) return node;
    return { ...node, children: children.map(mapWithChildren) };
  };
  return mapWithChildren(root);
};

const Tree = ({ nodes, unitlvl, mode, editMode, setUnit }: TreeProps) => {
  const [value, setValue] = useState<Map<number, number>>(
    new Map(nodes.map((node) => [node.id, 0]))
  );
  const nodesMap = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );

  const tree = useMemo(() => generateTree(nodes), [nodes]);

  const sumOfPoints = Array.from(value).reduce(
    (sum, [_id, value]) => sum + value,
    0
  );

  const handleBadgeClick = useCallback((id: number) => {
    setValue((prevValues) => {
      const valuesMap = new Map(prevValues);
      const value = valuesMap.get(id);
      if (value !== undefined) valuesMap.set(id, value + 1);

      return valuesMap;
    });
  }, []);

  const handleReset = () => {
    setValue(new Map(nodes.map((node) => [node.id, 0])));
  };

  return (
    <div className="flex flex-col">
      {tree && (
        <TreeRenderer
          nodes={[tree]}
          values={value}
          nodesMap={nodesMap}
          onSkillUpdate={handleBadgeClick}
          disabled={sumOfPoints === unitlvl || mode === "view"}
          mode={mode}
          editMode={editMode}
          setUnit={setUnit}
        />
      )}
      <div className="flex flex-col w-16 self-end">
        {mode === "view" ? null : (
          <>
            <div className=" flex flex-col items-center gap-2">
              <Label>Points</Label>
              <Badge variant="tree">{`${sumOfPoints}/${unitlvl}`}</Badge>
            </div>

            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tree;
