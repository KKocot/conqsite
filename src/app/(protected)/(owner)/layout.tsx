import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@/queries/roles.query";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/home");

  const origin = process.env.ORIGIN;

  const highestCommanders = await fetch(`${origin}/api/roles`).then((res) =>
    res.json()
  );
  const data: Role[] | undefined = highestCommanders.roles;
  if (
    data &&
    !data
      .filter((e: Role) => e.role === "HouseLeader" || e.role === "RightHand")
      .some((e: Role) => e.discordId === session?.user.id)
  )
    redirect("/");
  const house = data ? data[0].house : "";
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex justify-around bg-accent w-full text-background font-bold">
        <Item href={`/settings/bot-config/${house}`} title="Bot Config" />
        <Item href={`/settings/high-roles/${house}`} title="High Roles" />
        <Item href={`/settings/house-card/${house}`} title="House Card" />
        <Item href={`/settings/delete/${house}`} title="Delete House" />
        <Item href={`/settings/change-leader/${house}`} title="Change Leader" />
      </div>
      {children}
    </div>
  );
}

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
