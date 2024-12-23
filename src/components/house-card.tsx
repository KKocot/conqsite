import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface HouseDetails {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}

export default function HouseCard({ house }: { house: HouseDetails }) {
  return (
    <Card className="w-[362px] overflow-hidden flex flex-col">
      <div className="relative w-full h-[362px]">
        <Image
          src={house.avatar}
          alt={`${house.name} avatar`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader className="pt-2 ">
        <CardTitle className="text-xl font-bold">{house.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          <span title="Server">{house.server}</span> {house.country}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm mb-2">{house.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="custom">
          <Link
            href={house.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Join Discord <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
