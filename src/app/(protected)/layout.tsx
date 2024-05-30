import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/");
  return children;
}
