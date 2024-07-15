import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { command_whitelist } from "@/assets/whitelists";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!command_whitelist.some((e) => e === session?.user.id)) redirect("/");
  return children;
}
