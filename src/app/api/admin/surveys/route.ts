import { authOptions } from "@/lib/auth";
import { Survey as SurveyList } from "@/lib/get-data";
import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !["303156898532818944", "373563828513931266"].includes(session.user.id)
  ) {
    return new Response("401");
  }
  try {
    await connectMongoDB();
    const surveys: SurveyList[] = await Survey.find();
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
