"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TreeRenderer from "./tree-renderer";
import { UnitData, UnitObject } from "@/lib/get-data";
import { UseFormSetValue } from "react-hook-form";

function transformToMap(obj: Map<number, number>): Map<number, number> {
  const map = new Map<number, number>();
  Object.entries(obj).forEach(([key, value]) => {
    map.set(Number(key), value);
  });
  return map;
}

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
  mode: "edit" | "view" | "builded";
  unitTree: UnitObject;
  setValue?: UseFormSetValue<UnitData>;
  entry?: Map<number, number>;
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

const Tree = ({
  nodes,
  unitlvl,
  mode,
  unitTree,
  setValue,
  entry,
}: TreeProps) => {
  const [treeValue, setTreeValue] = useState<Map<number, number>>(
    entry
      ? transformToMap(entry)
      : () => new Map(unitTree.treeStructure.map((node) => [node.id, 0]))
  );

  const nodesMap = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );
  const tree = useMemo(() => generateTree(nodes), [nodes]);

  const sumOfPoints = Array.from(treeValue).reduce(
    (sum, [_id, value]) => sum + value,
    0
  );
  useEffect(() => {
    if (setValue) {
      setValue("tree", {
        structure: treeValue,
        maxlvl: unitlvl,
      });
    }
  }, [treeValue, unitlvl]);
  const handleBadgeClick = useCallback((id: number) => {
    setTreeValue((prevValues) => {
      const valuesMap = new Map(prevValues);
      const value = valuesMap.get(id);
      if (value !== undefined) valuesMap.set(id, value + 1);

      return valuesMap;
    });
  }, []);

  const handleReset = () => {
    setTreeValue(new Map(nodes.map((node) => [node.id, 0])));
  };

  return (
    <div className="flex flex-col items-center">
      {tree && (
        <TreeRenderer
          nodes={[tree]}
          values={treeValue}
          nodesMap={nodesMap}
          onSkillUpdate={handleBadgeClick}
          disabled={
            sumOfPoints === unitlvl || mode === "view" || mode === "builded"
          }
          mode={mode}
        />
      )}
      <div className="flex flex-col w-16 self-end">
        {mode === "edit" ? (
          <>
            <div className=" flex flex-col items-center gap-2">
              <Label>Points</Label>
              <Badge variant="tree">{`${sumOfPoints}/${unitlvl}`}</Badge>
            </div>

            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Tree;
