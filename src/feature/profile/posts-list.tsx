import { UnitData } from "@/lib/get-data";
import PostCard from "./post-item";
import { useSession } from "next-auth/react";
import { useDeletePostMutation } from "@/components/hooks/use-post-build-mutation";

const PostsList = ({ posts }: { posts: UnitData[] }) => {
  const { data } = useSession();
  const deletePostMutation = useDeletePostMutation();

  return (
    <div className="flex flex-wrap gap-6">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          userId={data?.user.id ?? ""}
          onDeletePost={() => deletePostMutation.mutate(post._id ?? "")}
          isLoading={deletePostMutation.isPending}
        />
      ))}
    </div>
  );
};
export default PostsList;
