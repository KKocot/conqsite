import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@/queries/roles.query";
import SettingsNavbar from "@/feature/house-settings/settings-navbar";

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
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <SettingsNavbar />
      {children}
    </div>
  );
}
