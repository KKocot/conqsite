import { DoctrineType, UnitData, UnitObject } from "@/lib/get-data";
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

interface ContentProps {
  data: UnitData;
  doctrines: DoctrineType[];
  unitTree: UnitObject;
}

const Content = ({ data, doctrines, unitTree }: ContentProps) => {
  const doctrinesMap = doctrines.filter((d) =>
    data.doctrines.some((e) => e.name === d.name)
  );

  return (
    <Card className="max-w-3xl mx-auto overflow-hidden h-fit my-8">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
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
              <div>{data.unit}</div>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {data.ytlink && (
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <iframe
              src={`https://www.youtube.com/embed/${
                data.ytlink.split("v=")[1]?.split("&")[0] || data.ytlink
              }`}
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p>{data.description}</p>
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
        {data.tree.structure && Array(data.tree.structure).length > 0 ? (
          <Tree
            nodes={unitTree.treeStructure || []}
            unitlvl={Number(unitTree.maxlvl)}
            mode="builded"
            unitTree={unitTree}
            entry={data.tree.structure}
          />
        ) : null}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={data.authorAvatar} alt={data.authorNick} />
            <AvatarFallback>{data.authorNick}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${data.author}`}
              className="text-sm font-medium"
            >
              {data.authorNick}
            </Link>
            <p className="text-xs text-muted-foreground">
              {new Date(data.date).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Content;
