import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");
  await connectMongoDB();
  const surveys = await Survey.find({ house: query });
  return NextResponse.json({ surveys });
}
export async function POST(request: Request) {
  try {
    const data = putSurveySchema.parse(await request.json());
    await connectMongoDB();

    const existingSurvey = await Survey.findOne({ discordId: data.discordId });
    let survey;
    if (existingSurvey) {
      survey = await Survey.findByIdAndUpdate(existingSurvey._id, data, {
        new: true,
      });
    } else {
      survey = await Survey.create(data);
    }

    return NextResponse.json(survey, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
