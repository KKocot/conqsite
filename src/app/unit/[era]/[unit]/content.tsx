import useWikiMutation from "@/components/hooks/use-wiki-mutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ChallengesArea from "@/feature/unit-builder/challenges-area";
import DoctrinesArea from "@/feature/unit-builder/dosctrines-area";
import FormationsArea from "@/feature/unit-builder/formations-area";
import KitsArea from "@/feature/unit-builder/kits-area";
import SkillsArea from "@/feature/unit-builder/skills-area";
import Tree from "@/feature/unit-builder/tree";
import { getRoleById, UnitObject } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigLeft, ArrowBigRight, PenIcon, Save, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Content = ({
  entry,
  shortEntry,
}: {
  entry?: UnitObject;
  shortEntry: Unit;
}) => {
  const { data: user } = useSession();
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["roles", user?.user.id],
    queryFn: () => getRoleById(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const autoStatus =
    roles?.some((role) => role.role === "Reviewer") ||
    roles?.some((role) => role.role === "Trusted")
      ? "accepted"
      : "pending";

  const banned = roles?.some((role) => role.role === "Banned");
  const form = useForm<UnitObject>({
    values: {
      name: shortEntry.name,
      icon: shortEntry.icon,
      era: shortEntry.era,
      image: shortEntry.src,
      leadership: entry?.leadership || shortEntry.leadership.toString(),
      value: entry?.value || [],
      authors: entry?.authors || [],
      masteryPoints: entry?.masteryPoints || false,
      maxlvl: entry?.maxlvl || "",
      season: entry?.season || { number: "", name: "" },
      description: entry?.description || "",
      skills: entry?.skills || [],
      formations: entry?.formations || [],
      treeStructure: entry?.treeStructure || [],
      challenges: entry?.challenges || [],
      status: autoStatus,
    },
  });
  const [editMode, setEditMode] = useState(false);
  const wikiMutation = useWikiMutation();
  const [unit, setUnit] = useState<UnitObject>(form.getValues());
  const treeStructure = form.watch("treeStructure");
  const maxlvl = form.watch("maxlvl");
  const onSubmit = form.handleSubmit(async (data) => {
    wikiMutation.mutate({
      ...data,
      season: {
        number: data.season.number ?? 0,
        name: data.season.name ?? "No season",
      },
      authors: [...data.authors, user?.user.name ?? "error"],
    });
  });
  useEffect(() => {
    if (wikiMutation.isSuccess) {
      toast.success("Unit submitted successfully");
    }
    if (wikiMutation.isError) {
      toast.error("Failed to submit unit");
    }
  }, [wikiMutation.isSuccess, wikiMutation.isError]);
  return (
    <Form {...form}>
      <form className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <ArrowBigLeft
            className="cursor-pointer relative top-0 left-0 ml-4 mt-4"
            onClick={() => history.back()}
          />
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
                <FormField
                  control={form.control}
                  name="leadership"
                  render={({ field }) => (
                    <FormItem>
                      {editMode ? (
                        <FormControl>
                          <Input className="w-16" {...field} />
                        </FormControl>
                      ) : (
                        <p className="font-medium">{field.value}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="font-medium">{shortEntry.value}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Mastery Points
                </p>
                <FormField
                  control={form.control}
                  name="masteryPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {editMode ? (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        ) : (
                          <Badge
                            variant={field.value ? "default" : "secondary"}
                          >
                            {field.value ? "Yes" : "No"}
                          </Badge>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Era</p>
                <p className="font-medium">
                  {shortEntry.era.charAt(0).toUpperCase() +
                    shortEntry.era.slice(1)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Season</p>
                <FormField
                  control={form.control}
                  name="season.number"
                  render={({ field }) => (
                    <FormItem>
                      {editMode ? (
                        <FormControl>
                          <Input className="w-16" {...field} />
                        </FormControl>
                      ) : (
                        <p className="font-medium">{field.value}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="season.name"
                  render={({ field }) => (
                    <FormItem>
                      {editMode ? (
                        <FormControl>
                          <Input className="w-32" {...field} />
                        </FormControl>
                      ) : (
                        <p className="font-medium">{field.value}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Max Level</p>
                <FormField
                  control={form.control}
                  name="maxlvl"
                  render={({ field }) => (
                    <FormItem>
                      {editMode ? (
                        <FormControl>
                          <Input className="w-16" {...field} />
                        </FormControl>
                      ) : (
                        <p className="font-medium">{field.value}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="max-w-64">
                <Image
                  src={shortEntry.src}
                  alt={shortEntry.name}
                  width={500}
                  height={500}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {editMode ? (
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                    ) : (
                      <p className="font-medium">{field.value}</p>
                    )}
                  </FormItem>
                )}
              />

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
                nodes={treeStructure || []}
                unitlvl={Number(maxlvl) || 0}
                mode="view"
                setUnit={setUnit}
              />
            </div>
            <SkillsArea editMode={editMode} form={form} />
            <FormationsArea editMode={editMode} form={form} />
            <div className="flex justify-around flex-col items-center lg:flex-row">
              <DoctrinesArea unitName={shortEntry.name} />
              <KitsArea unitName={shortEntry.name} />
            </div>
            <ChallengesArea editMode={editMode} form={form} />
            <div className="flex items-end justify-between">
              <div className="flex gap-1 mt-4 justify-self-end flex-col">
                <h5 className="font-semibold">Authors</h5>
                <div className="flex gap-4 text-xs">
                  {Array.from(new Set(entry?.authors)).map((author) => (
                    <p key={author} className="text-center">
                      {author}
                    </p>
                  )) ?? "No authors"}
                </div>
              </div>
              {!user?.user.name || banned ? (
                <div />
              ) : editMode ? (
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      form.reset();
                      setEditMode(!editMode);
                    }}
                    className="flex gap-1 rounded-3xl text-xs py-0 h-6"
                    variant="destructive"
                  >
                    <X />
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setEditMode(!editMode);
                      onSubmit();
                    }}
                    className="flex gap-1 rounded-3xl text-xs py-0 h-6"
                    variant="custom"
                  >
                    <Save />
                    Save
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setEditMode(!editMode)}
                  className="flex gap-1 rounded-3xl text-xs py-0 h-6"
                  variant="custom"
                  disabled={rolesLoading}
                >
                  <PenIcon className="w-4 h-4" />
                  Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
export default Content;
