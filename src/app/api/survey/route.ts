import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/user/surveys";
import { NextResponse } from "next/server";
import { putSurveySchema } from "./schema";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { houseUserAllowed } from "@/lib/endpoints-protections";
import SubSurvey from "@/models/user/subSurvey";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const subSurvey = searchParams.get("subSurvey");
  try {
    await connectMongoDB();
    const data = putSurveySchema.parse(await request.json());

    const userAccount = data.discordId === session?.user.id;
    if (!userAccount) return new Response("401");
    console.log(subSurvey);
    if (subSurvey === "true") {
      console.log("subSurvey");
      const subSurveyExist = await SubSurvey.findOne({
        inGameNick: data.inGameNick,
      });
      if (subSurveyExist) {
        console.log("subSurveyExist");
        const survey = await SubSurvey.findByIdAndUpdate(
          subSurveyExist._id,
          { ...data, discordId: session?.user.id },
          { new: true }
        );
        console.log("survey1", survey);
        return NextResponse.json(survey, { status: 201 });
      } else {
        const survey = await SubSurvey.create({
          ...data,
          discordId: session?.user.id,
        });
        console.log("survey2", survey);
        return NextResponse.json(survey, { status: 201 });
      }
    }
    const existingSurvey = await Survey.findOne({ discordId: data.discordId });
    console.log("existingSurvey", existingSurvey);
    if (existingSurvey) {
      const survey = await Survey.findByIdAndUpdate(existingSurvey._id, data, {
        new: true,
      });
      console.log("survey3", survey);
      return NextResponse.json(survey, { status: 201 });
    } else {
      const survey = await Survey.create(data);
      console.log("survey4", survey);
      return NextResponse.json(survey, { status: 201 });
    }
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
      const subSurveys = await SubSurvey.find({ house: query });

      const mergedSurveys = surveys.map((survey) => {
        const matchingSubSurvey = subSurveys.find(
          (sub) => sub.discordId === survey.discordId
        );
        return matchingSubSurvey || survey;
      });

      return NextResponse.json({ surveys: mergedSurveys });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
