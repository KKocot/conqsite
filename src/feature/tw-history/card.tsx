import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { HistoryPost } from "@/lib/get-data";

const TWCard = ({ data }: { data: HistoryPost }) => {
  const youtubeLinkRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed|shorts\/|v\/)?([a-zA-Z0-9_-]+)/i;
  const match = data.ytUrl.match(youtubeLinkRegex);

  return (
    <Card className="w-full flex flex-col">
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
        <div className="flex items-center gap-2 text-xs">
          <span>{data.author}</span>
          <span>{data.publicDate.toString().split("T")[0]}</span>
          <span className="justify-self-end">Visible to: {data.visibleTo}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
export default TWCard;
