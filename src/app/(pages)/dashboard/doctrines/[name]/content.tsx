import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unitTypes } from "@/feature/units/lib/utils";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DoctrineType {
  name: string;
  img: string;
  forUnit: string[];
  dedicated: "all" | "group" | "unit";
  stats: string;
  rarity: "common" | "uncommon" | "rare" | "epic";
}

interface DoctrinePageProps {
  doctrine: DoctrineType;
}

const Content = ({ doctrine }: DoctrinePageProps) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={clsx("backdrop-blur-sm border-b sticky top-0 z-10", {
          "bg-gray-500/50": doctrine.rarity === "common",
          "bg-green-500/50": doctrine.rarity === "uncommon",
          "bg-blue-500/50": doctrine.rarity === "rare",
          "bg-purple-500/50": doctrine.rarity === "epic",
        })}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {doctrine.name}
              </h1>
              <p className="text-muted-foreground">Doctrine Details</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="relative justify-center items-center flex">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                }/images/doctrines/${doctrine.name
                  .toLowerCase()
                  .replace(/[ ':]/g, "-")}.png`}
                alt={doctrine.name}
                width={256}
                height={256}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {doctrine.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium leading-relaxed whitespace-pre-line">
                  {doctrine.stats}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Applicable Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This doctrine can be applied to the following units:
                  </p>
                  <div className="flex gap-3 flex-wrap justify-around items-center">
                    {doctrine.forUnit.map((unit, index) =>
                      doctrine.dedicated === "all" ? (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">
                            <Link href="/dashboard/units">{unit}</Link>
                          </span>
                        </div>
                      ) : doctrine.dedicated === "group" &&
                        unitTypes.includes(unit) ? (
                        <Link
                          href={`/dashboard/units?card=fillList&sort=${unit}`}
                          key={index}
                          className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">{unit}</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/unit/${unit.replaceAll(" ", "_")}`}
                          key={index}
                          className="flex flex-col items-center gap-1 hover:bg-muted/30 rounded-lg p-1 w-32"
                        >
                          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border">
                            <span className="font-medium">{unit}</span>
                          </div>
                          <Image
                            src={`${
                              process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                            }/images/units-cards/${unit
                              .toLowerCase()
                              .replaceAll(" ", "-")}-sm.png`}
                            alt={unit}
                            width={128}
                            height={128}
                          />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Doctrine Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">
                      Rarity
                    </h4>
                    <Badge
                      className={clsx(
                        "backdrop-blur-sm border-b sticky top-0 z-10",
                        {
                          "bg-gray-500/50": doctrine.rarity === "common",
                          "bg-green-500/50": doctrine.rarity === "uncommon",
                          "bg-blue-500/50": doctrine.rarity === "rare",
                          "bg-purple-500/50": doctrine.rarity === "epic",
                        }
                      )}
                    >
                      {doctrine.rarity.charAt(0).toUpperCase() +
                        doctrine.rarity.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">
                      Aplicable for
                    </h4>
                    <div>{doctrine.dedicated}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
