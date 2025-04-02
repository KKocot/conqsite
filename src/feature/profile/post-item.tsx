import { UserUnitPost } from "@/lib/get-data";
import Link from "next/link";
import { Calendar, Trash2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "react-loading";

const PostCard = ({
  post,
  userId,
  onDeletePost,
  isLoading,
}: {
  post: UserUnitPost["posts"][0];
  userId: string;
  onDeletePost: () => void;
  isLoading: boolean;
}) => {
  const profileOwner = post.author === userId;
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
      {profileOwner ? (
        <CardFooter className="flex justify-between">
          <div />
          <Button
            onClick={onDeletePost}
            variant="destructive"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default PostCard;
