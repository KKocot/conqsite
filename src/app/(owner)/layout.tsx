import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@/components/providers/globalData";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const origin = process.env.ORIGIN;

  const owners = await fetch(`${origin}/api/roles`).then((res) => res.json());
  if (
    !owners.roles
      .filter((e: Role) => e.role === "HouseLeader" || e.role === "RightHand")
      .some((e: Role) => e.discordId === session?.user.id)
  ) {
    redirect("/");
  }
  return children;
}
