import useChangeWikiStatus from "@/components/hooks/use-change-wiki-status";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import LoadingComponent from "@/feature/ifs/loading";
import { getUnitWiki, Roles, UnitObject } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Content = ({ data, roles }: { data: UnitObject; roles?: Roles[] }) => {
  const { data: prevData, isLoading: prevLoading } = useQuery({
    queryKey: ["prevUnit", data.name],
    queryFn: () => getUnitWiki(data.name, "accepted"),
    enabled: !!data,
  });
  const reviewer = roles?.some((role) => role.role === "reviewer") ?? false;
  const changeWikiStatus = useChangeWikiStatus();
  const [note, setNote] = useState("");
  const lastAccepted = prevData ? prevData[prevData.length - 1] : undefined;
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Button
        variant="custom"
        onClick={() => window.history.back()}
        className="flex items-center gap-2"
      >
        <ArrowBigLeft />
        Back
      </Button>
      <div className="flex gap-4">
        <Version data={data} version="new" />
        {prevLoading ? (
          <LoadingComponent />
        ) : lastAccepted ? (
          <Version data={lastAccepted} version="prev" />
        ) : null}
      </div>
      {reviewer ? (
        <>
          <Textarea
            placeholder="Review Notes"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <div className="flex justify-end space-x-4">
            <Button
              variant="destructive"
              className="font-bold text-md"
              onClick={() =>
                changeWikiStatus.mutate({
                  id: data._id ?? "",
                  status: "rejected",
                  reviewNotes: note,
                })
              }
            >
              Reject
            </Button>
            <Button
              variant="custom"
              onClick={() => {
                changeWikiStatus.mutate({
                  id: data._id ?? "",
                  status: "accepted",
                  reviewNotes: note,
                });
              }}
            >
              Accept
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Content;

const Version = ({
  data,
  version,
}: {
  data: UnitObject;
  version: "new" | "prev";
}) => {
  return (
    <div
      className={clsx("border-2 p-4", {
        "border-yellow-500": version === "new",
        "border-green-500": version === "prev",
      })}
    >
      <div className="text-3xl font-semibold">
        {version === "new" ? "New version" : "Previous accepetd version"}
      </div>
      {/* Hero Section */}
      <Card>
        <CardHeader className="text-3xl font-semibold">{data.name}</CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div>Authors</div>
              <div className="font-medium">{data.authors.join(", ")}</div>
            </div>
            {data.leadership && (
              <div className="space-y-1">
                <div>Leadership</div>
                <div className="font-medium">{data.leadership}</div>
              </div>
            )}
            {data.masteryPoints && (
              <div className="space-y-1">
                <div>Mastery Points</div>
                <div className="font-medium">Yes</div>
              </div>
            )}
            <div className="space-y-1">
              <div>Max Level</div>
              <div className="font-medium">{data.maxlvl}</div>
            </div>
          </div>

          {data.description && (
            <div className="text-muted-foreground">{data.description}</div>
          )}
        </CardContent>
      </Card>
      <section className="space-y-6">
        <div className="text-3xl font-semibold">Skills</div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.skills.map((skill, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src={`/skills/${skill.image}`}
                    alt={skill.name}
                    width={40}
                    height={40}
                  />
                  {skill.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>{skill.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Challenges Section */}
      <section className="space-y-6">
        <div className="text-3xl font-semibold">Challenges</div>
        <div className="space-y-4">
          {data.challenges.map((challenge, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Tier {challenge.tier}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {challenge.quests.map((quest, questIndex) => (
                    <li key={questIndex} className="text-muted-foreground">
                      {quest}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Formations Section */}
      <section className="space-y-6">
        <div className="text-3xl font-semibold">Formations</div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.formations.map((formation, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src={`/formations/${formation.image}`}
                    alt={formation.name}
                    width={40}
                    height={40}
                  />
                  {formation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>{formation.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
