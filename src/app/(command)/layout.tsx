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
  const data: Role[] | undefined = commanders.roles;
  if (data && !data.some((e: Role) => e.discordId === session?.user.id))
    redirect("/");
  return children;
}
