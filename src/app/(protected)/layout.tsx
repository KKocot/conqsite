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
  const blacklist = await fetch(`${origin}/api/roles`).then((res) =>
    res.json()
  );

  if (!session || blacklist.some((e: Role) => e.role === "Blacklist"))
    redirect("/");
  return children;
}
