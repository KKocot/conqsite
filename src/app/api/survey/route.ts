import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { botAllowed, highCommandAllowed } from "@/lib/endpoints-protections";
import Roles from "@/models/roles";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;

  try {
    await connectMongoDB();
    const data = putSurveySchema.parse(await request.json());
    const existingSurvey = await Survey.findOne({ discordId: data.discordId });

    const userAccount = data.discordId === session?.user.id;
    if (!(userAccount || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");

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
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: query });
    const highCommandAccess = highCommandAllowed(roles, session, query);
    if (!(highCommandAccess || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");
    const surveys = await Survey.find({ house: query });
    return NextResponse.json({ surveys });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
