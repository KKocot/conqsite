"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Unit } from "@/lib/type";
import { getUnit } from "@/lib/utils";
import { useParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const params = useParams();
  const unit = params.unit.toString();
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(unit, era) ?? null;
  if (!found_unit) {
    return <div>Unit not found</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src={found_unit.icon}
              alt={found_unit.name}
              className="w-16 h-16 object-contain"
            />
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl">
              {found_unit.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form className="flex flex-col gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" />
            </div>
            <div>
              <Label htmlFor="ytlink">Youtube Link</Label>
              <Input id="ytlink" type="url" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" />
            </div>
            <Tree nodes={found_unit.tree?.structure || []} />
            <img src={found_unit.tree?.img} alt={found_unit.name} />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;

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
}

const Tree = ({ nodes }: TreeProps) => {
  // Helper function to build the tree structure from flat data
  const buildTree = (data: TreeNode[]): TreeNode[] => {
    const nodeMap = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    // Create a map of all nodes by ID
    data.forEach((node) => {
      node.children = []; // Initialize children as an empty array
      nodeMap.set(node.id, node);
    });

    // Build the tree structure
    data.forEach((node) => {
      if (node.prev === null) {
        // Root nodes have no parent
        roots.push(node);
      } else {
        // Attach node to its parent's children array
        const parent = nodeMap.get(node.prev);
        parent?.children?.push(node);
      }
    });

    return roots;
  };

  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id} className="flex items-center">
            <div className="flex flex-col h-24 w-16 items-center">
              <Image
                src={node.img}
                alt={node.name}
                width={48}
                height={48}
                title={node.name}
              />
              <Badge className="w-fit">{`0/${node.value}`}</Badge>
            </div>
            {node.children &&
              node.children.length > 0 &&
              renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  const treeData = buildTree(nodes);

  return <div>{renderTree(treeData)}</div>;
};
