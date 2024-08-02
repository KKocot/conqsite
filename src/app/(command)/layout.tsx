import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  command_whitelist_kop,
  command_whitelist_erebus,
  command_whitelist_blackforge,
} from "@/assets/whitelists";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const commanders = [
    ...command_whitelist_kop,
    ...command_whitelist_erebus,
    ...command_whitelist_blackforge,
  ];
  if (!commanders.some((e) => e === session?.user.id)) redirect("/");
  return children;
}
