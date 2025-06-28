"use client";

import HoverClickTooltip from "@/components/hover-click-tooltip";
import { Badge } from "@/lib/get-data";
import Image from "next/image";

const HouseBadges = ({ badgesData }: { badgesData?: Badge }) => {
  return (
    <div className="absolute sm:-right-6  -right-0 top-2 flex flex-col gap-2 z-50">
      {badgesData?.premium ? (
        <HoverClickTooltip
          triggerChildren={
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/premium-badge.png`}
              alt="premiumBadge"
              width={50}
              height={50}
            />
          }
          contentStyle="w-48"
          buttonStyle="hover:bg-transparent"
        >
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/premium-badge.png`}
              alt="premiumBadge"
              width={120}
              height={120}
            />
            <p className="text-sm">
              supports the project and gets premium features with over 25 euro
              donation per month
            </p>
          </div>
        </HoverClickTooltip>
      ) : null}
      {(badgesData?.surveys ?? 0) > 90 ? (
        <HoverClickTooltip
          triggerChildren={
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/surveys-badge.png`}
              alt="premiumBadge"
              width={50}
              height={50}
            />
          }
          contentStyle="w-48"
          buttonStyle="hover:bg-transparent"
        >
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/surveys-badge.png`}
              alt="premiumBadge"
              width={120}
              height={120}
            />
            <p className="text-sm">over 90% of filled surveys</p>
          </div>
        </HoverClickTooltip>
      ) : null}
      {(badgesData?.history ?? 0) > 50 ? (
        <HoverClickTooltip
          triggerChildren={
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/recorded-badge.png`}
              alt="recordedBadge"
              width={50}
              height={50}
            />
          }
          contentStyle="w-48"
          buttonStyle="hover:bg-transparent"
        >
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/recorded-badge.png`}
              alt="recordedBadge"
              width={120}
              height={120}
            />
            <p className="text-sm">House has over 50 PoVs in archive</p>
          </div>
        </HoverClickTooltip>
      ) : null}
      {(badgesData?.conqBot ?? 0) > 50 ? (
        <HoverClickTooltip
          triggerChildren={
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/conq-bot.png`}
              alt="conqBotBadge"
              width={50}
              height={50}
            />
          }
          contentStyle="w-48"
          buttonStyle="hover:bg-transparent"
        >
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/conq-bot.png`}
              alt="conqBotBadge"
              width={120}
              height={120}
            />
            <p className="text-sm">House used ConqBot events over 50 times</p>
          </div>
        </HoverClickTooltip>
      ) : null}
      {(badgesData?.lineups ?? 0) > 100 ? (
        <HoverClickTooltip
          triggerChildren={
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/public-badge.png`}
              alt="publicBadge"
              width={50}
              height={50}
            />
          }
          contentStyle="w-48"
          buttonStyle="hover:bg-transparent"
        >
          <div className="flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_IP_HOST}/images/badges/public-badge.png`}
              alt="publicBadge"
              width={120}
              height={120}
            />
            <p className="text-sm">over 100 of public lineups</p>
          </div>
        </HoverClickTooltip>
      ) : null}
    </div>
  );
};
export default HouseBadges;
