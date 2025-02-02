import { authOptions } from "@/lib/auth";
import { Role } from "@/queries/roles.query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/home");

  const origin = process.env.ORIGIN;
  const reviewer = await fetch(
    `${origin}/api/roles?id=${session.user.id}`
  ).then((res) => res.json());
  const data: Role[] | undefined = reviewer.roles;
  if (data && !data.filter((e: Role) => e.role === "Reviewer")) redirect("/");
  return children;
};
export default Layout;
