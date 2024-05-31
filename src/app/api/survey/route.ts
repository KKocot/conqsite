import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";

export async function GET() {
  await connectMongoDB();
  const surveys = await Survey.find();
  return NextResponse.json({ surveys });
}

export async function POST(request: Request) {
  try {
    const data = putSurveySchema.parse(await request.json());
    await connectMongoDB();

    const survey = await Survey.create(data);
    return NextResponse.json(survey, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
