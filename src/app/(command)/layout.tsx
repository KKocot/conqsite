import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  command_whitelist_kov,
  command_whitelist_erebus,
} from "@/assets/whitelists";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const commanders = [...command_whitelist_kov, ...command_whitelist_erebus];
  if (!commanders.some((e) => e === session?.user.id)) redirect("/");
  return children;
}
