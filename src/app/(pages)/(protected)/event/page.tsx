"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getBotEvent } from "@/lib/get-data";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Fetch data about specific event
  const { data, isLoading } = useQuery({
    queryKey: ["data", id],
    queryFn: () => getBotEvent(id ?? ""),
    enabled: !!id,
  });
  // Show loading component while fetching data
  if (isLoading) return <LoadingComponent />;
  // Show no data component if no data is found
  if (!data) return <NoData />;
  return (
    <Card className="max-w-2xl mx-auto h-fit my-12">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{data.title}</CardTitle>
          <Badge variant={data.active ? "default" : "secondary"}>
            {data.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">{data.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span>{data.date_start_event}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-muted-foreground" />
              <span>{data.time_start_event}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Repeat after: </strong>
              {data.interval >= 0 ? `${data.interval} days` : "Next TW"}
            </div>
            <div>
              <strong>Activity Time:</strong> {data.activity_time} hours
            </div>
          </div>

          <div>
            <strong>House:</strong> {data.house_name}
          </div>

          <div>
            <strong>Bot Type:</strong> {data.bot_type}
          </div>

          <div className="text-sm text-muted-foreground">
            <div>
              <strong>Channel ID:</strong> {data.channel_id}
            </div>
            <div>
              <strong>Role ID:</strong> {data.role_id}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            <span>{data.signUps.length} sign-ups</span>
          </div>
          {data.signUps.length > 0 ? (
            <div>
              <strong>Sign-ups:</strong>
              <ul className="list-disc pl-4">
                {data.signUps.map((e) => (
                  <li key={e.userId} className="flex items-center space-x-2">
                    <div>{e.name}</div>
                    <div className="flex-grow" />
                    <div
                      className={clsx("", {
                        "text-green-500": e.status === "Yes",
                        "text-red-500": e.status === "No",
                        "text-yellow-500": e.status === "Maybe",
                      })}
                    >
                      {e.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
export default Page;
