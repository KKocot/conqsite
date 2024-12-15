"use client";

import { useState, useMemo, FC, useCallback, useEffect } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Label } from "./ui/label";

type TreeNode = {
  id: number;
  name: string;
  description: string;
  img: string;
  prev: number | null;
  value: number;
  children?: TreeNode[];
};

interface TreeProps {
  nodes: TreeNode[];
  unitlvl: number;
  mode: "edit" | "view";
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

const Tree = ({ nodes, unitlvl, mode }: TreeProps) => {
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
        <RenderTree
          nodes={[tree]}
          values={value}
          nodesMap={nodesMap}
          onSkillUpdate={handleBadgeClick}
          disabled={sumOfPoints === unitlvl || mode === "view"}
          mode={mode}
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

const RenderTree: FC<{
  nodes?: TreeNode[];
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  onSkillUpdate: (nodeId: number) => void;
  mode: "edit" | "view";
}> = (props) => {
  const { nodes = [], mode, ...rest } = props;
  if (nodes.length === 0) return null;
  return (
    <ul>
      {nodes.map((node) => {
        return (
          <li key={node.id} className="flex items-center">
            <SkillButton {...rest} node={node} mode={mode} />
            <RenderTree {...props} nodes={node.children} />
          </li>
        );
      })}
    </ul>
  );
};

const SkillButton: FC<{
  node: TreeNode;
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  onSkillUpdate: (nodeId: number) => void;
  mode: "edit" | "view";
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
  );
};
