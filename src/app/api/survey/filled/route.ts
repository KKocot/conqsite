import { authOptions } from "@/lib/auth";
import { highCommandAllowed } from "@/lib/endpoints-protections";
import { Survey as SurveyList } from "@/lib/get-data";
import connectMongoDB from "@/lib/mongodb";
import Roles from "@/models/roles";
import Survey from "@/models/surveys";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });
    const highCommandAccess = highCommandAllowed(roles, session, house);
    if (!highCommandAccess) return new Response("401");

    const surveys: SurveyList[] = await Survey.find({ house });
    const sortedSurveys = surveys.filter((survey) =>
      Number(survey.characterLevel) > 1 ? "filled" : null
    );

    return NextResponse.json({
      filled_surveys: sortedSurveys.length,
      not_filled_surveys: surveys.length - sortedSurveys.length,
    });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
