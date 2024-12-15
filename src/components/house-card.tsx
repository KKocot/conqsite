import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "react-toastify";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Castle } from "lucide-react";
import { HouseDetails } from "@/lib/get-data";

const HouseCard = ({ house }: { house: HouseDetails }) => {
  const t = useTranslations("HousePage");
  return (
    <li
      className="shadow-background/50 w-[362px] hover:shadow-background/50 shadow hover:shadow-lg transition-all grid  rounded-sm overflow-hidden bg-background"
      key={house.name}
    >
      <div className="relative w-full h-auto aspect-square">
        <img
          src={house.avatar}
          alt="House Avatar"
          className="w-[362px] h-[362px]"
        />
        <div className="absolute top-2 -right-16 rotate-45 h-10 w-44 bg-accent"></div>
        <div className="absolute top-3 right-2 text-sm  text-center text-background font-bold">
          {house.server}
        </div>
      </div>
      <div className="px-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl pt-2">{house.name}</h2>
          <p className="text-sm">{house.country}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{house.description}</p>
        </div>
      </div>
      <div className="flex mt-2">
        <Button className="w-full gap-1 border-r-2" asChild variant="custom">
          <Link className="w-full" target="_blank" href={house.discordLink}>
            <SiDiscord className="size-4" /> {t("join_discord")}
          </Link>
        </Button>

        <Button
          variant="custom"
          className="w-full gap-1 border-l-2"
          onClick={() => {
            toast.error("Not working yet");
          }}
        >
          {t("join_to_house")} <Castle className="size-4" />
        </Button>
      </div>
    </li>
  );
};
export default HouseCard;
