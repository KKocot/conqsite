import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnitObject } from "@/lib/get-data";
import Link from "next/link";

const Content = ({ data }: { data: UnitObject[] }) => {
  return (
    <div className="container py-4 flex flex-wrap gap-4">
      {data.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          No pending requests
        </div>
      ) : (
        data.map((unit) => (
          <Card className="w-[350px] h-fit" key={unit._id}>
            <CardHeader>
              <CardTitle>{unit.name}</CardTitle>
              <CardDescription>
                Author: {unit.authors[unit.authors.length - 1]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>Era: {unit.era}</div>
              <div>
                Season: {unit.season.number} - {unit.season.name}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={`/unit/review/${unit._id}`}>
                <Button variant="custom">Go to review</Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default Content;
