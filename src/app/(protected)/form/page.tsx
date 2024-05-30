import UnitsForm from "@/components/units-form";
import React from "react";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db/db";
import { surveys } from "@/db/schema/survey";
import { eq } from "drizzle-orm";

const Page: React.FC = async () => {
  const session = await auth();
  const [surveyData] = await db
    .select()
    .from(surveys)
    .where(eq(surveys.userId, session?.user?.id!));

  return <UnitsForm surveyData={surveyData ?? null} />;
};

export default Page;
