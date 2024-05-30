import { db } from "@/db/db";
import { insertSurveySchema, surveys } from "@/db/schema/survey";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface Params {
  params: { userId: string };
}

export async function GET(request: Request, { params: { userId } }: Params) {
  try {
    return NextResponse.json(
      await db.select().from(surveys).where(eq(surveys.userId, userId)),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching survey:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
