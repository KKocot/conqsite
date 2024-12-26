import { epicDoctrines } from "@/assets/doctrines";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Content = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...epicDoctrines].map((doctrine) => (
        <Card key={doctrine.name}>
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-2">
              <Avatar className="w-16 h-18">
                <AvatarImage src={doctrine.img} alt={doctrine.name} />
                <AvatarFallback>D </AvatarFallback>
              </Avatar>
              <span>{doctrine.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p>{doctrine.stats}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Content;
