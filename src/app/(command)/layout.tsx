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

  const commanders = await fetch(`${origin}/api/roles`).then((res) =>
    res.json()
  );
  if (
    !commanders.roles
      .filter((e: Role) => e.role !== "Blacklist")
      .some((e: Role) => e.discordId === session?.user.id)
  )
    redirect("/");
  return children;
}
