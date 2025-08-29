"use client";

import { useVoteUnitMutation } from "@/components/hooks/use-vote-unit-mutation";
import useWikiMutation from "@/components/hooks/use-wiki-mutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Stars from "@/components/ui/stars";
import { Switch } from "@/components/ui/switch";
import ChallengesArea from "@/feature/unit-builder/challenges-area";
import DoctrinesArea from "@/feature/unit-builder/doctrines/area";
import FormationsArea from "@/feature/unit-builder/formations-area";
import KitsArea from "@/feature/unit-builder/kits-area";
import PostCard from "@/feature/unit-builder/post/card";
import SkillsArea from "@/feature/unit-builder/skills-area";
import Tree from "@/feature/unit-builder/tree";
import { getFullUnitInfoOptions } from "@/feature/units/lib/query";
import {
  DoctrineType,
  getRoleById,
  getUnitRate,
  KitsAssets,
  UnitData,
  UnitObject,
} from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowBigLeft, PenIcon, PlusCircle, Save, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "react-loading";
import { toast } from "react-toastify";

const Content = ({ unitName }: { unitName: string }) => {
  const { data: user } = useSession();
  const fullUnitInfoOptions = getFullUnitInfoOptions(unitName, "unitPage");
  const { data } = useSuspenseQuery(fullUnitInfoOptions);
  const shortEntry: Unit = data.asset;
  const entry: UnitObject | undefined = data.wiki;
  const posts: UnitData[] = data.posts;
  const doctrines: DoctrineType[] = data.doctrines;
  const kits: KitsAssets[] = data.kits;

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["roles", user?.user.id],
    queryFn: () => getRoleById(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const { data: votesData, isLoading: votesLoading } = useQuery({
    queryKey: ["unitRate", unitName],
    queryFn: () => getUnitRate(unitName),
    enabled: !!unitName,
  });
  const votes = votesData?.votes || [];
  const autoStatus =
    roles?.some((role) => role.role === "Reviewer") ||
    roles?.some((role) => role.role === "Trusted")
      ? "accepted"
      : "pending";
  const userVote = votes?.find((v) => v.id === user?.user.id)?.rate || 0;

  const averageVote =
    votes?.reduce((acc, curr) => acc + curr.rate, 0) / votes.length;
  const banned = roles?.some((role) => role.role === "Banned");
  const editor = roles?.some(
    (role) => role.role === "Trusted" || role.role === "Reviewer"
  );
  const form = useForm<UnitObject>({
    values: {
      name: shortEntry.name,
      icon: shortEntry.icon,
      era: shortEntry.era,
      image: shortEntry.src,
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
  const treeStructure = form.watch("treeStructure");
  const wikiMutation = useWikiMutation();
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

  const voteUnitMutation = useVoteUnitMutation();
  const onVote = async (rate: number) => {
    if (!user?.user.id) {
      toast.error("You need to be logged in to vote");
      return;
    }
    voteUnitMutation.mutate({ unit: shortEntry.name, rate });
  };
  useEffect(() => {
    if (voteUnitMutation.isSuccess) {
      toast.success("Vote submitted successfully");
    }
    if (voteUnitMutation.isError) {
      toast.error("Failed to submit vote");
    }
  }, [voteUnitMutation.isSuccess, voteUnitMutation.isError]);
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
                src={`${
                  process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                }/images/unit-icons/${shortEntry.name
                  .toLowerCase()
                  .replace(/[ ':]/g, "-")}-icon.png`}
                alt={shortEntry.name}
                className="object-contain"
                width={64}
                height={64}
              />
              <CardTitle className="text-3xl sm:text-4xl lg:text-5xl">
                {shortEntry.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            {votesLoading ? (
              <div className="flex justify-center items-center w-full">
                <Loading color="#94a3b8" />
              </div>
            ) : (
              <div className="flex justify-center flex-col items-center gap-2">
                <span>
                  Average rate:{" "}
                  {votes.length === 0 ? (
                    "No votes"
                  ) : (
                    <>
                      <span className="font-bold underline text-accent">
                        {averageVote.toFixed(2)}
                      </span>
                      {` from ${votes.length} votes`}
                    </>
                  )}
                </span>

                <span>{`Your rate: ${userVote}`}</span>
                <Stars rating={userVote} setRating={(e: number) => onVote(e)} />
              </div>
            )}
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
                        <p className="font-medium">{shortEntry.leadership}</p>
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
              <div>
                <p className="text-sm text-muted-foreground">Unit Types:</p>
                <div className="flex gap-2 flex-col">
                  {shortEntry.types.map((type) => (
                    <Link
                      href={`/dashboard/units?card=fillList&sort=${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      }`}
                      key={type}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal hover:underline hover:text-accent"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full">
              <Image
                alt={shortEntry.name}
                width={512}
                height={512}
                className="col-span-1"
                src={`${
                  process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                }/images/units-cards/${shortEntry.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}-lg.png`}
              />
              <div className="flex w-full p-2 flex-col gap-2 h-[512px] overflow-y-scroll col-span-1">
                <h1 className="text-xl text-center p-2 flex items-center justify-center gap-2">
                  Community builds
                  <Link
                    href={`/unit/builder/${entry?.name.replaceAll(" ", "_")}`}
                    className="hover:text-accent"
                  >
                    <PlusCircle />
                  </Link>
                </h1>
                {posts && posts.length > 0 ? (
                  posts.map((e) => <PostCard key={e._id} post={e} />)
                ) : (
                  <div>No Posts</div>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-col py-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">Tree</h2>
              {entry ? (
                <Tree
                  nodes={treeStructure || []}
                  unitlvl={Number(maxlvl) || 0}
                  mode="view"
                  unitTree={entry}
                />
              ) : null}
            </div>
            <SkillsArea editMode={editMode} form={form} />
            <FormationsArea editMode={editMode} form={form} />
            <div className="flex justify-around flex-col items-center lg:flex-row">
              <DoctrinesArea doctrines={doctrines} />
              <KitsArea kits={kits} />
            </div>
            <ChallengesArea editMode={editMode} form={form} />
            <div className="flex items-end justify-between">
              {!user?.user.name || banned || !editor ? (
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
