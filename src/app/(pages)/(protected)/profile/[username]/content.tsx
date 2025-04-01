import { UserUnitPost } from "@/lib/get-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/feature/profile/header";
import PostsList from "@/feature/profile/posts-list";

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

export default Content;
