import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserUnitPost } from "@/lib/get-data";
import Image from "next/image";

const ProfileHeader = ({
  author,
  postCount,
}: {
  author: UserUnitPost["author"];
  postCount: number;
}) => {
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
};
export default ProfileHeader;
