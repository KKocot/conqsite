import { UnitAsset, UnitData } from "@/lib/get-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Doctrine } from "@/assets/doctrines";
import DoctrinesGroup from "@/feature/unit-builder/post/doctrines-group";
import Tree from "@/feature/unit-builder/tree";

interface ContentProps {
  data: UnitData;
  unitAssets: UnitAsset;
  doctrines: Doctrine[];
}

const Content = ({ data, unitAssets, doctrines }: ContentProps) => {
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
              href={`/unit/${unitAssets.era}/${unitAssets.name.replaceAll(
                " ",
                "_"
              )}`}
              className="flex items-center gap-2"
            >
              <Image
                src={unitAssets.icon}
                alt={unitAssets.name}
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
        <DoctrinesGroup doctrines={doctrinesMap} />
        {/* <Tree
                editMode={false}
                nodes={treeStructure || []}
                unitlvl={Number(maxlvl) || 0}
                mode="view"
                setUnit={setUnit}
              /> */}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={data.authorAvatar} alt={data.authorNick} />
            <AvatarFallback>{data.authorNick}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{data.authorNick}</p>
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
