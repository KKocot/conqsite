"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UnitData } from "@/lib/get-data";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: UnitData;
}
const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="w-48 hover:shadow-xl">
      <CardHeader className="h-1/4">
        <h2>
          <Link
            href={`/unit/builder/${post.unit.replaceAll(" ", "_")}/${post._id}`}
          >
            {post.title}
          </Link>
        </h2>
      </CardHeader>
      <CardContent className="text-xs flex flex-col h-3/4">
        <div>
          <Link
            href={`/unit/builder/${post.unit.replaceAll(" ", "_")}/${post._id}`}
          >
            {post.description}
          </Link>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center gap-1">
          {post.authorAvatar ? (
            <Image
              className="rounded-full"
              src={post.authorAvatar}
              alt="author avatar"
              width={24}
              height={24}
            />
          ) : null}
          {post?.authorNick}
        </div>
        <div>{post.date}</div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
