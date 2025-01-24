"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const SettingsNavbar = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  return (
    <div className="flex justify-around bg-accent w-full text-background font-bold">
      <Item href={`/settings/bot-config/${house}`} title="Bot Config" />
      <Item href={`/settings/high-roles/${house}`} title="High Roles" />
      <Item href={`/settings/house-card/${house}`} title="House Card" />
      <Item href={`/settings/delete/${house}`} title="Delete House" />
      <Item href={`/settings/members-check/${house}`} title="Members Check" />
    </div>
  );
};
export default SettingsNavbar;

const Item = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="hover:bg-background hover:text-accent py-1 px-8 text-sm"
    >
      {title}
    </Link>
  );
};
