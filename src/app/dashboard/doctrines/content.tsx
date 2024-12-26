import { Doctrine, epicDoctrines } from "@/assets/doctrines";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

const Content = () => {
  const dedicatedForAll = epicDoctrines.filter(
    (doctrine) => doctrine.dedicated === "all"
  );
  const dedicatedForGruops = epicDoctrines.filter(
    (doctrine) => doctrine.dedicated === "group"
  );
  const dedicatedForUnits = epicDoctrines.filter(
    (doctrine) => doctrine.dedicated === "unit"
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex justify-between w-full">
        {["all", "group", "unit"].map((value) => (
          <TabsTrigger key={value} value={value}>
            {value === "all" ? "General Doctrines" : `Dedicated for ${value}s`}
          </TabsTrigger>
        ))}
      </TabsList>
      {[
        { value: "all", doctrines: dedicatedForAll },
        { value: "group", doctrines: dedicatedForGruops },
        { value: "unit", doctrines: dedicatedForUnits },
      ].map(({ value, doctrines }) => (
        <TabsContent key={value} value={value}>
          <DoctrinesList doctrines={doctrines} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;

const DoctrinesList = ({ doctrines }: { doctrines: Doctrine[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {doctrines.map((doctrine) => (
        <DoctrinesLisItem key={doctrine.name} doctrine={doctrine} />
      ))}
    </div>
  );
};

const DoctrinesLisItem = ({ doctrine }: { doctrine: Doctrine }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px]">
      <CardHeader>
        <CardTitle className="text-lg">{doctrine.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          className="justify-self-center"
          src={doctrine.img}
          alt={doctrine.name}
          width={91}
          height={100}
        />
        <ul className="mt-2">
          {statsList.map((stat, index) => (
            <li key={index} className="text-sm">
              {stat}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
