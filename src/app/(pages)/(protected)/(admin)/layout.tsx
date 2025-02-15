import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/home");

  if (!["303156898532818944", "373563828513931266"].includes(session.user.id))
    redirect("/");
  return children;
}
