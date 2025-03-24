import { FC } from "react";
import BranchButton from "./branch-button";
import { TreeNode } from "./tree";

const TreeRenderer: FC<{
  nodes?: TreeNode[];
  values: Map<number, number>;
  nodesMap: Map<number, TreeNode>;
  disabled: boolean;
  onSkillUpdate: (nodeId: number) => void;
  mode: "edit" | "view" | "builded";
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
