import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UnitObject } from "@/lib/get-data";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
type Status = "pending" | "accepted" | "rejected";
const Content = ({
  data,
  status,
  setStatus,
}: {
  data: UnitObject[];
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
}) => {
  const [filteredList, setFilteredList] = useState(data);
  useEffect(() => {
    setFilteredList(data);
  }, [status]);
  return (
    <div className="container px-2">
      <div className="flex justify-center gap-4 my-4">
        <Button
          variant="custom"
          className="bg-accent"
          onClick={() => setStatus("pending")}
        >
          Pending
        </Button>
        <Button
          variant="custom"
          className="bg-green-600"
          onClick={() => setStatus("accepted")}
        >
          Accepted
        </Button>
        <Button
          variant="custom"
          className="bg-red-600"
          onClick={() => setStatus("rejected")}
        >
          Rejected
        </Button>
      </div>
      <Input
        onChange={(e) => {
          const value = e.target.value;
          const filtered = data.filter((unit) =>
            unit.name.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredList(filtered);
        }}
        placeholder="Search"
      />
      <div className="py-4 flex flex-wrap justify-center gap-4">
        {filteredList.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            {`No ${status} requests`}
          </div>
        ) : (
          filteredList.map((unit) => (
            <Card className="w-[350px] flex flex-col" key={unit._id}>
              <CardHeader>
                <CardTitle>{unit.name}</CardTitle>
                <CardDescription>
                  Author: {unit.authors[unit.authors.length - 1]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>Era: {unit.era}</div>
                {status === "rejected" && unit.reviewNotes ? (
                  <div>
                    <div>Review Notes:</div>
                    <div>{unit.reviewNotes}</div>
                  </div>
                ) : null}
              </CardContent>
              <div className="flex-grow" />
              <CardFooter className="flex justify-end">
                <Link href={`/unit/review/${unit._id}`}>
                  <Button variant="custom">Go to review</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
