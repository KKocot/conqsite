"use client";

import { DoctrineType, UnitAsset, UnitData, UnitObject } from "@/lib/get-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import DoctrinesGroup from "@/feature/unit-builder/post/doctrines-group";
import Tree from "@/feature/unit-builder/tree";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import BuilderForm from "@/feature/unit-builder/builder-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFullPostInfoOptions } from "@/feature/unit-builder/lib/query";
import { useParams } from "next/navigation";
import NoData from "@/feature/ifs/no-data";
import LoadingComponent from "@/feature/ifs/loading";

const Content = () => {
  const { data: user } = useSession();
  const params = useParams();
  const fullPostInfoOptions = getFullPostInfoOptions(
    params.unit.toString(),
    "postPage",
    params.id.toString()
  );
  const { data, isLoading } = useSuspenseQuery(fullPostInfoOptions);
  const doctrines: DoctrineType[] = data.doctrinesForUnit;
  const unitAssets: UnitAsset = data.asset;
  const unitTree: UnitObject = data.wiki;
  const post: UnitData = data.fullPost;
  const doctrinesMap: DoctrineType[] = data.doctrinesMap;

  const isAuthor = user?.user.id === post.author;

  const [editMode, setEditMode] = useState(false);
  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return editMode ? (
    <BuilderForm
      data={unitAssets}
      unitTree={unitTree}
      doctrines={doctrines}
      dataToEdit={post}
    />
  ) : (
    <Card className="max-w-3xl mx-auto overflow-hidden h-fit my-8">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <Link
              href={`/unit/${unitTree.name.replaceAll(" ", "_")}`}
              className="flex items-center gap-2"
            >
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                }/images/unit-icons/${unitTree.name
                  .toLowerCase()
                  .replace(/[ ':]/g, "-")}-icon.png`}
                alt={unitTree.name}
                width={48}
                height={48}
              />
              <div>{unitAssets.name}</div>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {post.ytlink && (
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <iframe
              src={`https://www.youtube.com/embed/${
                post.ytlink.split("v=")[1]?.split("&")[0] || post.ytlink
              }`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p>{post.description}</p>
        </div>
        <div className="gap-2 w-full grid grid-cols-3">
          <DoctrinesGroup doctrines={doctrinesMap} />
          <div className="col-span-1">
            {doctrinesMap.map((doctrine) => (
              <div key={doctrine.name} className="my-3">
                <h4
                  className={clsx("text-sm", {
                    "text-purple-500": doctrine.rarity === "epic",
                    "text-blue-500": doctrine.rarity === "rare",
                    "text-green-500": doctrine.rarity === "uncommon",
                    "text-gray-500": doctrine.rarity === "common",
                  })}
                >
                  {doctrine.name}
                </h4>
                <p className="text-xs">{doctrine.stats}</p>
              </div>
            ))}
          </div>
        </div>
        {post.tree.structure && Array(post.tree.structure).length > 0 ? (
          <Tree
            nodes={unitTree.treeStructure || []}
            unitlvl={Number(unitTree.maxlvl)}
            mode="builded"
            unitTree={unitTree}
            entry={post.tree.structure}
          />
        ) : null}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.authorAvatar} alt={post.authorNick} />
            <AvatarFallback>{post.authorNick}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${post.author}`}
              className="text-sm font-medium"
            >
              {post.authorNick}
            </Link>
            <p className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-GB")}
            </p>
          </div>
          {isAuthor && (
            <Button
              className="rounded-full p-2"
              variant="custom"
              onClick={() => setEditMode(() => true)}
            >
              <PenIcon />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Content;
