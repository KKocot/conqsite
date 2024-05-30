import { db } from "@/db/db";
import { insertSurveySchema, surveys } from "@/db/schema/survey";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  // await connectMongoDB();
  // const surveys = await Survey.find();
  // return NextResponse.json({ surveys });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = insertSurveySchema
      .pick({
        characterLevel: true,
        inGameNick: true,
        artyleryAmount: true,
        weapons: true,
        units: true,
        userId: true,
      })
      .parse(body);

    await db.insert(surveys).values(data).onConflictDoUpdate({
      target: surveys.userId,
      set: data,
    });
    return NextResponse.json({ message: "Survey Created" }, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError) return NextResponse.json(e, { status: 400 });
    return NextResponse.json(e, { status: 500 });
  }
}
