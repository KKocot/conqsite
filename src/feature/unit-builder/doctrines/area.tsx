import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DoctrineType } from "@/lib/get-data";
import Image from "next/image";
import Link from "next/link";

const DoctrinesArea = ({ doctrines }: { doctrines: DoctrineType[] }) => {
  return doctrines.length === 0 ? null : (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Dedicated Doctrines
      </h2>
      <div className="flex justify-around gap-2">
        {doctrines.map((doctrine) => (
          <div
            key={doctrine.name}
            className="text-center flex flex-col items-center"
          >
            <Link
              href={`/dashboard/doctrines/${doctrine.name}`}
              className="hover:bg-accent/10 rounded-full p-2"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                      }/images/doctrines/${doctrine.name
                        .toLowerCase()
                        .replace(/[ ':]/g, "-")}.png`}
                      alt={doctrine.name}
                      width={128}
                      height={128}
                      className="rounded-lg cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <h2 className="p-2 text-xl">{doctrine.name}</h2>
                    <p>{doctrine.stats}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DoctrinesArea;
