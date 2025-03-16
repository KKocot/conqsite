import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { houseUserAllowed } from "@/lib/endpoints-protections";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const data = putSurveySchema.parse(await request.json());
    const existingSurvey = await Survey.findOne({ discordId: data.discordId });

    const userAccount = data.discordId === session?.user.id;
    if (!userAccount) return new Response("401");

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
  const { searchParams } = new URL(request.url);
  const list = searchParams.get("list");
  const query =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");

  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: session?.user.id });
    const membersAllowed = houseUserAllowed(survey, query ?? "");
    if (!membersAllowed) return new Response("401");
    if (list) {
      const data = await Survey.find({ house: query });
      const surveys = data.map((survey) => {
        return {
          discordId: survey.discordId,
          inGameNick: survey.inGameNick,
        };
      });
      return NextResponse.json({ surveys });
    } else {
      const surveys = await Survey.find({ house: query });
      return NextResponse.json({ surveys });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
