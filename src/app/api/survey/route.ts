import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");

  //Allow access to logged in users and Discord Bot
  if (!(session || (discordKey && discordKey === process.env.BOT_KEY)))
    return new Response("401");

  try {
    await connectMongoDB();
    const surveys = await Survey.find({ house: query });
    return NextResponse.json({ surveys });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");

  //Allow access to logged in users and Discord Bot
  if (!(session || (discordKey && discordKey === process.env.BOT_KEY)))
    return new Response("401");

  try {
    await connectMongoDB();
    const data = putSurveySchema.parse(await request.json());
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
export async function DELETE(request: Request) {
  const discordKey = request.headers.get("discord-key");

  // Allow access only to the Discord Bot
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    await Survey.findByIdAndDelete(id);
    return NextResponse.json({ message: "Survey deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
