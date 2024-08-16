import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const owners = [
    "303156898532818944", // me
  ];
  if (!owners.some((e) => e === session?.user.id)) redirect("/");
  return children;
}
