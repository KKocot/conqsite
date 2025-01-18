import { Dispatch, FC, SetStateAction } from "react";
import BranchButton from "./branch-button";
import { TreeNode } from "./tree";
import { UnitObject } from "@/lib/get-data";

const TreeRenderer: FC<{
  nodes?: TreeNode[];
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  editMode: boolean;
  setUnit: Dispatch<SetStateAction<UnitObject>>;
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
            <BranchButton {...rest} node={node} mode={mode} />
            <TreeRenderer {...props} nodes={node.children} />
          </li>
        );
      })}
    </ul>
  );
};

export default TreeRenderer;
