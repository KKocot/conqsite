"use client";

import { useState, useEffect } from "react";
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

const Tree = ({ nodes, unitlvl, mode }: TreeProps) => {
  const [values, setValues] = useState<
    {
      id: number;
      max: number;
      current: number;
    }[]
  >([]);

  useEffect(() => {
    const initialValues = nodes.map((node) => ({
      id: node.id,
      max: node.value,
      current: 0,
    }));
    setValues(initialValues);
  }, [nodes]);

  const handleBadgeClick = (id: number) => {
    setValues((prevValues) =>
      prevValues.map((value) =>
        value.id === id
          ? { ...value, current: Math.min(value.current + 1, value.max) }
          : value
      )
    );
  };
  const handleReset = () => {
    setValues((prevValues) =>
      prevValues.map((value) => ({ ...value, current: 0 }))
    );
  };
  const buildTree = (data: TreeNode[]): TreeNode[] => {
    const nodeMap = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    data.forEach((node) => {
      node.children = [];
      nodeMap.set(node.id, node);
    });

    data.forEach((node) => {
      if (node.prev === null) {
        roots.push(node);
      } else {
        const parent = nodeMap.get(node.prev);
        parent?.children?.push(node);
      }
    });

    return roots;
  };
  const sumOfPoints = values.reduce((sum, value) => sum + value.current, 0);
  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map((node) => {
          const value = values.find((v) => v.id === node.id);
          const prevNode = node.prev
            ? values.find((v) => v.id === node.prev)
            : null;
          const isDisabled =
            (prevNode && prevNode.current < prevNode.max) ||
            sumOfPoints === unitlvl ||
            mode === "view";
          return (
            <li key={node.id} className="flex items-center">
              <div className="flex flex-col h-24 w-12 m-2 items-center">
                <Image
                  src={node.img}
                  alt={node.name}
                  width={48}
                  height={48}
                  title={node.name}
                  className="cursor-pointer"
                  onClick={() => !isDisabled && handleBadgeClick(node.id)}
                />
                <Badge
                  variant="tree"
                  className={clsx({
                    "opacity-50 cursor-not-allowed": isDisabled,
                    "bg-primary": value?.current === value?.max,
                  })}
                >
                  {`${value?.current ?? 0}/${node.value}`}
                </Badge>
              </div>
              {node.children &&
                node.children.length > 0 &&
                renderTree(node.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  const treeData = buildTree(nodes);

  return (
    <div className="flex flex-col">
      {renderTree(treeData)}
      <div className="flex flex-col w-16 self-end">
        <div className=" flex flex-col items-center gap-2">
          <Label>Points</Label>
          <Badge variant="tree">{`${sumOfPoints}/${unitlvl}`}</Badge>
        </div>
        <Button variant="destructive" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Tree;
