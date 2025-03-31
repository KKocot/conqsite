import { UnitData, UserUnitPost } from "@/lib/get-data";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Calendar, Youtube, ChevronDown, ChevronUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentProps {
  data: UserUnitPost;
}

const Content = ({ data }: ContentProps) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <ProfileHeader author={data.author} postCount={data.posts.length} />

      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="grid w-full max-w-md grid-cols-1">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {/* <TabsTrigger value="about">About</TabsTrigger> */}
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <PostsList posts={data.posts} />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <Card className="">
            <CardHeader>
              <CardTitle>About {data.author.nick}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This user has shared {data.posts.length} posts about various
                units and strategies.
              </p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Favorite Houses:</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(data.posts.map((post) => post.house))
                  ).map((house) => (
                    <Badge key={house} variant="secondary">
                      {house}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Favorite Units:</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(data.posts.map((post) => post.unit))).map(
                    (unit) => (
                      <Badge key={unit}>{unit}</Badge>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function ProfileHeader({
  author,
  postCount,
}: {
  author: UserUnitPost["author"];
  postCount: number;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="h-32 w-32">
        <AvatarImage src={author.img} alt={author.nick} />
        <AvatarFallback>
          <Image width={32} height={32} src="/logo.png" alt="logo" />
        </AvatarFallback>
      </Avatar>
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold">{author.nick}</h1>
        <p className="text-muted-foreground mt-2">
          {postCount} {postCount === 1 ? "post" : "posts"}
        </p>
        <div className="flex gap-2 mt-4 justify-center md:justify-start">
          {/* <Button>Follow</Button>
          <Button variant="outline">Message</Button> */}
        </div>
      </div>
    </div>
  );
}

function PostsList({ posts }: { posts: UnitData[] }) {
  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: UserUnitPost["posts"][0] }) {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="text-xl">
          <Link
            href={`/unit/builder/${post.unit.replaceAll(" ", "_")}/${post._id}`}
          >
            {post.title}
          </Link>
        </CardTitle>

        <CardDescription className="flex flex-col gap-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <Link
            href={`/unit/${post.unit.replaceAll(" ", "_")}`}
            target="_blank"
          >
            <Badge variant="tree">{post.unit}</Badge>
          </Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default Content;
