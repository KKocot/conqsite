import {
  useDeleteHistoryPostMutation,
  useEditHistoryPostMutation,
} from "@/components/hooks/use-history-post-mutation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { HistoryPost } from "@/lib/get-data";
import { Trash } from "lucide-react";

const TWCard = ({
  roleDisable,
  data,
  pageType,
}: {
  data: HistoryPost;
  pageType: "user" | "house";
  roleDisable?: boolean;
}) => {
  const youtubeLinkRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed|shorts\/|v\/)?([a-zA-Z0-9_-]+)/i;
  const match = data.ytUrl.match(youtubeLinkRegex);
  const deletePost = useDeleteHistoryPostMutation();
  const movePostToProfileOnly = useEditHistoryPostMutation();
  const handleDelete = () => {
    deletePost.mutate(data?._id ?? "");
  };
  const handleMoveToProfileOnly = () => {
    movePostToProfileOnly.mutate(data._id ?? "");
  };
  return (
    <Card className="w-fit flex flex-col">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="justify-self-center">
          <iframe
            width="426"
            height="240"
            src={`https://www.youtube.com/embed/${match?.[1]}`}
            title={data.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center gap-2 text-xs w-full">
          <span>{data.author}</span>
          <span>{data.publicDate.toString().split("T")[0]}</span>
          <span className="justify-self-end">Visible to: {data.visibleTo}</span>
          {pageType === "user" ? (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash />
            </Button>
          ) : pageType === "house" && !roleDisable ? (
            <Button variant="destructive" onClick={handleMoveToProfileOnly}>
              Delete from House
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};
export default TWCard;
