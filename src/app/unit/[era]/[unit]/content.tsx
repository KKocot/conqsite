import { Doctrine } from "@/assets/doctrines";
import NumberInput from "@/components/number-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Tree from "@/feature/unit-builder/tree";
import { UnitObject } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { PenIcon, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
const DEFAULT_UNIT = {
  name: "", // Uneditable
  icon: "", // Uneditable
  era: "", // Uneditable
  image: "", // Uneditable
  leadership: 0, // Editable
  value: [], // Editable
  authors: [], // Editable
  masteryPoints: false, // Editable
  maxlvl: 0, // Editable
  season: { number: 0, name: "" },
  description: "", // Editable
  kits: [], // Editable
  skills: [], // Editable
  formations: [], // Editable
  treeStructure: [], // Editable
  challenges: [], // Editable
};
const Content = ({
  entry,
  doctrines,
  shortEntry,
}: {
  entry?: UnitObject;
  doctrines: Doctrine[];
  shortEntry: Unit;
}) => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["unitPost", unit.name],
  //   queryFn: () => getUnitPosts(unit.name),
  // });
  const [unit, setUnit] = useState<UnitObject>(entry || DEFAULT_UNIT);
  const [editMode, setEditMode] = useState(false);
  const { data } = useSession();
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              height={64}
              width={64}
              src={shortEntry.icon}
              alt={shortEntry.name}
              className="object-contain"
            />
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl">
              {shortEntry.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">Leadership</p>
              {editMode ? (
                <NumberInput
                  className="w-16"
                  value={unit.leadership ?? ""}
                  onChange={(value) =>
                    setUnit({
                      ...unit,
                      leadership: value === "" ? undefined : Number(value),
                    })
                  }
                />
              ) : (
                <p className="font-medium">{entry?.leadership ?? "No Data"}</p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">Value</p>
              <p className="font-medium">
                {entry && entry.value
                  ? entry.value.reduce((acc, val) => acc + val, 0) /
                    entry.value.length /
                    100
                  : 0}
              </p>
              {/* TODO: Add a tooltip to show the values */}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-2">
                Mastery Points
              </p>
              {editMode ? (
                <Switch
                  checked={unit.masteryPoints}
                  onCheckedChange={(value) =>
                    setUnit({ ...unit, masteryPoints: value })
                  }
                />
              ) : (
                <Badge variant={entry?.masteryPoints ? "default" : "secondary"}>
                  {entry?.masteryPoints ? "Yes" : "No"}
                </Badge>
              )}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">Era</p>
              <p className="font-medium">
                {shortEntry.era.charAt(0).toUpperCase() +
                  shortEntry.era.slice(1)}
              </p>
            </div>
            {entry?.season?.number === -1 ? null : (
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Season</p>
                {editMode ? (
                  <>
                    <NumberInput
                      className="w-16"
                      value={unit.season?.number ?? ""}
                      onChange={(value) =>
                        setUnit({
                          ...unit,
                          season: {
                            number: value === "" ? 0 : Number(value),
                            name: unit.season?.name ?? "",
                          },
                        })
                      }
                    />
                    <Input
                      value={unit.season?.name}
                      onChange={(e) =>
                        setUnit({
                          ...unit,
                          season: {
                            number: unit.season?.number ?? 0,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-32"
                      placeholder="Season Name"
                    />
                  </>
                ) : (
                  <p className="font-medium">{entry?.season?.number ?? 0}</p>
                )}
              </div>
            )}
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">Max Level</p>
              {editMode ? (
                <NumberInput
                  className="w-16"
                  value={unit.maxlvl ?? ""}
                  onChange={(value) =>
                    setUnit({
                      ...unit,
                      maxlvl: value === "" ? 0 : Number(value),
                    })
                  }
                />
              ) : (
                <p className="font-medium">{entry?.maxlvl ?? 0}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between w-full">
            <img src={shortEntry.src} alt={shortEntry.name} className="h-64" />
            {editMode ? (
              <Textarea
                value={unit.description}
                onChange={(e) =>
                  setUnit({ ...unit, description: e.target.value })
                }
                className="w-3/4"
                placeholder="Description"
              />
            ) : (
              <p>{entry?.description}</p>
            )}
            {/* <div className="w-[750px] h-64 overflow-y-scroll">
              <div className="w-full bg-background p-2 flex justify-between">
                <h2>Community build</h2>
                <Link href={`${unit.name}/builder`}>
                  <CirclePlus />
                </Link>
              </div>
              {isLoading ? (
                <LoadingComponent />
              ) : data && data.length !== 0 ? (
                data.map((post) => (
                  <Card key={post.id} className="p-2 mb-2">
                    <Link href={`${post.unit}/${post.id}`}>
                      <div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </div>
                      <div>
                        <div>{post.description}</div>
                      </div>
                    </Link>
                  </Card>
                ))
              ) : (
                <NoData />
              )} 
            </div>*/}
          </div>

          <div className="flex justify-center flex-col py-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Tree</h2>
            <Tree
              editMode={false}
              nodes={unit.treeStructure || []}
              unitlvl={unit.maxlvl || 0}
              setUnit={setUnit}
              mode="view"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {!entry?.skills
                ? "No information yet"
                : entry?.skills.map((skill) => (
                    <Card key={skill.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-5">
                          <img
                            src={skill.image}
                            alt={skill.name}
                            className="object-cover rounded"
                          />
                          <h3 className="font-semibold">{skill.name}</h3>
                        </div>
                        <p className="text-sm mt-4">{skill.description}</p>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Formations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {!entry?.formations
                ? "No information yet"
                : entry?.formations.map((formation) => (
                    <Card key={formation.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-5">
                          <img
                            src={formation.image}
                            alt={formation.name}
                            className="object-cover rounded"
                          />
                          <h3 className="font-semibold">{formation.name}</h3>
                        </div>
                        <p className="text-sm mt-4">{formation.description}</p>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          <div className="flex justify-around">
            {doctrines.length === 0 ? null : (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Dedicated Doctrines
                </h2>
                <div className="flex gap-4">
                  {doctrines.map((doctrine) => (
                    <div key={doctrine.name} className="text-center">
                      <img
                        src={doctrine.img}
                        alt={doctrine.name}
                        title={doctrine.name}
                        className="w-full h-24 object-contain mb-2"
                      />
                      <p className="text-sm font-medium">{doctrine.stats}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Kits</h2>
              {entry?.kits?.map((kit) => (
                <div key={kit.name}>
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-24 object-contain mb-2"
                  />
                  <p className="text-sm font-medium">{kit.name}</p>
                </div>
              )) ?? "No information yet"}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Challenges
            </h2>
            {entry ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {entry.challenges?.map((challenge) => (
                  <Card key={challenge.tier}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Tier {challenge.tier}</h3>
                      <ul>
                        {challenge.quests.map((quest) => (
                          <li key={quest}>{quest}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center">No information yet</div>
            )}
            <div className="flex items-end justify-between">
              <div className="flex gap-1 mt-4 justify-self-end flex-col">
                <h5 className="font-semibold">Authors</h5>
                <div className="flex gap-4 text-xs">
                  {entry?.authors.map((author) => (
                    <p key={author} className="text-center">
                      {author}
                    </p>
                  )) ?? "No authors"}
                </div>
              </div>
              {!data?.user.name ? (
                <div />
              ) : editMode ? (
                <Button
                  onClick={() => setEditMode(!editMode)}
                  className="flex gap-2 rounded-3xl"
                  variant="custom"
                >
                  <Save />
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setEditMode(!editMode)}
                  className="flex gap-1 rounded-3xl text-xs py-0 h-6"
                  variant="custom"
                >
                  <PenIcon className="w-4 h-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Content;
